import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_supabaseUrl;
// const supabaseUrl = 'https://pmdubdmaqrdawtogjxon.supabase.co';
const supabaseKey = process.env.REACT_APP_supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;