-- Create minister_clients table for tracking people being ministered to
CREATE TABLE public.minister_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  minister_id UUID NOT NULL,
  client_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  initial_concerns TEXT,
  prayer_focus TEXT[],
  status TEXT NOT NULL DEFAULT 'active',
  first_session_date TIMESTAMPTZ,
  last_session_date TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create minister_sessions table for session notes
CREATE TABLE public.minister_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  minister_id UUID NOT NULL,
  client_id UUID REFERENCES public.minister_clients(id) ON DELETE CASCADE,
  session_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  session_type TEXT NOT NULL,
  duration_minutes INTEGER,
  topics_covered TEXT[],
  prayer_points TEXT,
  breakthrough_moments TEXT,
  follow_up_needed TEXT,
  next_steps TEXT,
  private_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.minister_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.minister_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for minister_clients
CREATE POLICY "Ministers can view own clients"
  ON public.minister_clients FOR SELECT
  USING (auth.uid() = minister_id);

CREATE POLICY "Ministers can insert own clients"
  ON public.minister_clients FOR INSERT
  WITH CHECK (auth.uid() = minister_id);

CREATE POLICY "Ministers can update own clients"
  ON public.minister_clients FOR UPDATE
  USING (auth.uid() = minister_id);

CREATE POLICY "Ministers can delete own clients"
  ON public.minister_clients FOR DELETE
  USING (auth.uid() = minister_id);

-- RLS Policies for minister_sessions
CREATE POLICY "Ministers can view own sessions"
  ON public.minister_sessions FOR SELECT
  USING (auth.uid() = minister_id);

CREATE POLICY "Ministers can insert own sessions"
  ON public.minister_sessions FOR INSERT
  WITH CHECK (auth.uid() = minister_id);

CREATE POLICY "Ministers can update own sessions"
  ON public.minister_sessions FOR UPDATE
  USING (auth.uid() = minister_id);

CREATE POLICY "Ministers can delete own sessions"
  ON public.minister_sessions FOR DELETE
  USING (auth.uid() = minister_id);

-- Add update trigger for timestamps
CREATE TRIGGER update_minister_clients_updated_at
  BEFORE UPDATE ON public.minister_clients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_minister_sessions_updated_at
  BEFORE UPDATE ON public.minister_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();