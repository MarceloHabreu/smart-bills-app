import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export async function fetchUserName(userId: string): Promise<string> {
   const { data, error } = await supabase.from('users').select('name').eq('id', userId).single();

   if (error || !data) {
      console.log('Error fetching user name:', error);
      return 'Caro Usuário';
   }

   return data.name;
}

/* Update profile */
export async function updateProfile(id: string, updates: { name?: string; email?: string }) {
   const { data, error } = await supabase
      .from('users')
      .update({
         ...updates,
      })
      .eq('id', id)
      .select()
      .single();

   if (error) {
      console.log('Error updating user: ', error);
      throw new Error(`Error updating user: ${error.message}`);
   }

   return data;
}
