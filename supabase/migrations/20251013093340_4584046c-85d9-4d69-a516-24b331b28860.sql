-- Fix security issues - Step 2: Apply security policies

-- 1. Block direct client-side inserts to course_purchases (only Stripe webhook via service role should insert)
DROP POLICY IF EXISTS "Block all direct inserts to purchases" ON course_purchases;
CREATE POLICY "Block all direct inserts to purchases" 
ON course_purchases 
FOR INSERT 
WITH CHECK (false);

-- 2. Add validation constraint for assessment_results to prevent storage bloat
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'check_responses_size'
  ) THEN
    ALTER TABLE assessment_results 
    ADD CONSTRAINT check_responses_size 
    CHECK (pg_column_size(responses) < 50000);
  END IF;
END $$;

-- 3. Update minister_sessions policies to verify active role status
DROP POLICY IF EXISTS "Ministers can view own sessions" ON minister_sessions;
DROP POLICY IF EXISTS "Ministers can insert own sessions" ON minister_sessions;
DROP POLICY IF EXISTS "Ministers can update own sessions" ON minister_sessions;
DROP POLICY IF EXISTS "Ministers can delete own sessions" ON minister_sessions;

CREATE POLICY "Ministers can view own sessions" 
ON minister_sessions 
FOR SELECT 
USING (
  auth.uid() = minister_id 
  AND (
    has_role(auth.uid(), 'admin'::app_role) 
    OR has_role(auth.uid(), 'minister'::app_role)
  )
);

CREATE POLICY "Ministers can insert own sessions" 
ON minister_sessions 
FOR INSERT 
WITH CHECK (
  auth.uid() = minister_id 
  AND (
    has_role(auth.uid(), 'admin'::app_role) 
    OR has_role(auth.uid(), 'minister'::app_role)
  )
);

CREATE POLICY "Ministers can update own sessions" 
ON minister_sessions 
FOR UPDATE 
USING (
  auth.uid() = minister_id 
  AND (
    has_role(auth.uid(), 'admin'::app_role) 
    OR has_role(auth.uid(), 'minister'::app_role)
  )
);

CREATE POLICY "Ministers can delete own sessions" 
ON minister_sessions 
FOR DELETE 
USING (
  auth.uid() = minister_id 
  AND (
    has_role(auth.uid(), 'admin'::app_role) 
    OR has_role(auth.uid(), 'minister'::app_role)
  )
);

-- 4. Update minister_clients policies similarly
DROP POLICY IF EXISTS "Ministers can view own clients" ON minister_clients;
DROP POLICY IF EXISTS "Ministers can insert own clients" ON minister_clients;
DROP POLICY IF EXISTS "Ministers can update own clients" ON minister_clients;
DROP POLICY IF EXISTS "Ministers can delete own clients" ON minister_clients;

CREATE POLICY "Ministers can view own clients" 
ON minister_clients 
FOR SELECT 
USING (
  auth.uid() = minister_id 
  AND (
    has_role(auth.uid(), 'admin'::app_role) 
    OR has_role(auth.uid(), 'minister'::app_role)
  )
);

CREATE POLICY "Ministers can insert own clients" 
ON minister_clients 
FOR INSERT 
WITH CHECK (
  auth.uid() = minister_id 
  AND (
    has_role(auth.uid(), 'admin'::app_role) 
    OR has_role(auth.uid(), 'minister'::app_role)
  )
);

CREATE POLICY "Ministers can update own clients" 
ON minister_clients 
FOR UPDATE 
USING (
  auth.uid() = minister_id 
  AND (
    has_role(auth.uid(), 'admin'::app_role) 
    OR has_role(auth.uid(), 'minister'::app_role)
  )
);

CREATE POLICY "Ministers can delete own clients" 
ON minister_clients 
FOR DELETE 
USING (
  auth.uid() = minister_id 
  AND (
    has_role(auth.uid(), 'admin'::app_role) 
    OR has_role(auth.uid(), 'minister'::app_role)
  )
);