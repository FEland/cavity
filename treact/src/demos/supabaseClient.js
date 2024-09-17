import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pmdubdmaqrdawtogjxon.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtZHViZG1hcXJkYXd0b2dqeG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNjQ2NTEsImV4cCI6MjAzOTY0MDY1MX0.wwxzexYDjMzwsDHLkPyTLf1DmJSFyhazu3p41pcsiMA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;