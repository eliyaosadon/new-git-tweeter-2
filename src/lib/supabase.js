import { createClient } from '@supabase/supabase-js'

// Replace these with YOUR credentials from Supabase dashboard
const supabaseUrl = 'https://hvlaicghpgbzrbhdyztz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2bGFpY2docGdienJiaGR5enR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExOTc5OTMsImV4cCI6MjA4Njc3Mzk5M30.asF5hr8KlvUkzXTymRGDncIQ-8gycBN84gogeDgrrf4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)