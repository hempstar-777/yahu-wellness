import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.74.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const trackId = url.searchParams.get('track');

    if (!trackId) {
      return new Response(
        JSON.stringify({ error: 'Missing track ID' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get track details
    const { data: track, error: trackError } = await supabase
      .from('music_tracks')
      .select('file_url, file_name, title, artist')
      .eq('id', trackId)
      .single();

    if (trackError || !track) {
      console.error('Track not found:', trackError);
      return new Response(
        JSON.stringify({ error: 'Track not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse storage URL
    const match = track.file_url.match(/\/storage\/v1\/object\/(?:(?:public|sign)\/)?([^/]+)\/(.+?)(?:\?.*)?$/);
    if (!match) {
      return new Response(
        JSON.stringify({ error: 'Invalid file URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const [, bucket, path] = match;

    // Download file from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from(bucket)
      .download(path);

    if (downloadError || !fileData) {
      console.error('Download error:', downloadError);
      return new Response(
        JSON.stringify({ error: 'Could not download file' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Determine MIME type
    const fileName = track.file_name.toLowerCase();
    let contentType = 'audio/mpeg';
    if (fileName.endsWith('.m4a')) contentType = 'audio/mp4';
    else if (fileName.endsWith('.wav')) contentType = 'audio/wav';
    else if (fileName.endsWith('.ogg')) contentType = 'audio/ogg';

    // Stream the file with proper headers
    return new Response(fileData, {
      headers: {
        ...corsHeaders,
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${track.file_name}"`,
        'Cache-Control': 'public, max-age=3600',
        'Accept-Ranges': 'bytes',
      },
    });
  } catch (error) {
    console.error('Stream audio error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
