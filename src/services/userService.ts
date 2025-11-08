import { supabase } from '@/lib/supabase';

export async function fetchUserName(userId: string): Promise<string> {
   const { data, error } = await supabase.from('users').select('name').eq('id', userId).single();

   if (error || !data) {
      console.log('Error fetching user name:', error);
      return 'Caro Usuário';
   }

   return data.name;
}
