-- Fix security issues - Step 1: Add minister role
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'minister';