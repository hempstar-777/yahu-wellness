-- Create table for educational content (teachings, articles, resources)
CREATE TABLE IF NOT EXISTS public.teachings_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  tags TEXT[] DEFAULT '{}',
  is_vip_only BOOLEAN DEFAULT false,
  author_id UUID REFERENCES auth.users(id),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.teachings_content ENABLE ROW LEVEL SECURITY;

-- Public can view published non-VIP content
CREATE POLICY "Anyone can view published public teachings"
ON public.teachings_content
FOR SELECT
TO authenticated
USING (published_at IS NOT NULL AND is_vip_only = false);

-- VIP users can view all published content
CREATE POLICY "VIP users can view all published teachings"
ON public.teachings_content
FOR SELECT
TO authenticated
USING (published_at IS NOT NULL AND is_vip_user(auth.uid()));

-- Admins can manage all content
CREATE POLICY "Admins can manage teachings content"
ON public.teachings_content
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for better query performance
CREATE INDEX idx_teachings_content_category ON public.teachings_content(category);
CREATE INDEX idx_teachings_content_slug ON public.teachings_content(slug);
CREATE INDEX idx_teachings_content_published ON public.teachings_content(published_at) WHERE published_at IS NOT NULL;

-- Insert the habits formation content
INSERT INTO public.teachings_content (
  title,
  slug,
  category,
  content,
  excerpt,
  tags,
  is_vip_only,
  published_at
) VALUES (
  'How Habits Form: Neurological and Spiritual Perspectives',
  'how-habits-form',
  'Spiritual Growth',
  E'# How Habits Form (Neurologically and Spiritually)\n\nHabits aren''t random; they''re automated behaviors etched into the brain and spirit through repetition and reinforcement.\n\n## Neurological Perspective\n\nHabits form via the "habit loop"—a three-step pattern: cue (trigger), routine (action), and reward (dopamine hit). The basal ganglia (a brain region for motor control) strengthens stimulus-response associations, disconnecting actions from goals over time. Repetition creates new neural pathways, making behaviors automatic after 3 months of consistency.\n\n2025 studies emphasize rewards and context: e.g., consistent cues (like a morning alarm) rewire the brain faster than willpower alone. Myths like "21 days to form a habit" are debunked—it varies by person and complexity.\n\n## Spiritual/Biblical Perspective\n\nHabits reflect the battle for the soul, where bad ones become "spiritual strongholds" (entrenched sin patterns) that hinder freedom in Yahusha. Scripture views habit formation as "renewing the mind" (Romans 12:2), transforming through faith, joy in Messiah, and reliance on the Ruach Ha Quodesh.\n\nGood habits (love, kindness, forgiveness) are fruits of the Spirit (Galatians 5:22-23), cultivated via deliberate virtue formation and breaking old bonds. Bad habits tie to generational iniquities (Exodus 20:5), requiring confession and Ruach-led change. Faith roots habits, works fruit them.\n\n## Habit Change Mechanics\n\nEffective change leverages small, sustainable shifts rather than overhauls, combining neuroplasticity (brain rewiring) with spiritual surrender.\n\n### Core Techniques\n\n- **Self-Analysis**: Map your habit loop in writing, then replace routines (e.g., swap scrolling for prayer)\n- **Tiny Habits**: Scale down (e.g., 2-minute meditations) for momentum\n- **Environment Design**: Remove cues for bad habits, stack good ones (e.g., Bible after coffee)\n- **Track Progress**: Use self-monitoring and reinforcements; aim for context repetition until automatic (e.g., 66 days average)\n- **Grace & Accountability**: Forgive slips, use accountability partners\n\n### Spiritual Mechanics\n\nInvoke Ruach for discernment; confess bad habits as strongholds, renounce via deliverance prayers, and affirm good ones with scripture (e.g., "I am transformed by renewing my mind"). View change as partnering with Yahuah''s power, not self-effort.',
  'Learn how habits form from both neurological and spiritual perspectives, and discover practical techniques for lasting change through faith and science.',
  ARRAY['habits', 'spiritual growth', 'neuroscience', 'deliverance', 'transformation'],
  false,
  now()
);