import { Bill } from '@/interfaces';
import { supabase } from '@/lib/supabase';

interface SearchParams {
   userId: string;
   searchName?: string;
   startDate?: string;
   endDate?: string;
}

export async function searchBills({
   userId,
   searchName = '',
   startDate,
   endDate,
}: SearchParams): Promise<{
   pending: Bill[];
   overdue: Bill[];
   paid: Bill[];
}> {
   let query = supabase.from('bills').select('*').eq('user_id', userId);
   // Se o campo de busca por nome estiver preenchido, aplica filtro por nome (case-insensitive)
   if (searchName.trim()) {
      query = query.ilike('name', `%${searchName.trim()}%`);
   }
   if (startDate) {
      // se preenchida faz a busca filtrando pela data inicial
      const [day, month, year] = startDate.split('/'); // assumindo formato dd/mm/aaaa
      query = query.gte('due_date', `${year}-${month}-${day}`); // buscando pelo formato aaaa-mm-dd
   }
   if (endDate) {
      const [day, month, year] = endDate.split('/');
      query = query.lte('due_date', `${year}-${month}-${day}`);
   }
   const { data, error } = await query.order('due_date', { ascending: true });
   if (error) {
      console.log(error);
      throw new Error(`Error fetching bills: ${error.message}`);
   }
   // separa dados por status
   const pending = data.filter((bill) => bill.status === 'pending');
   const overdue = data.filter((bill) => bill.status === 'overdue');
   const paid = data.filter((bill) => bill.status === 'paid');
   return { pending, overdue, paid };
}

/* Fetch bills by status */
export async function fetchBillsByStatus(userId: string, status: Bill['status']): Promise<Bill[]> {
   const { data, error } = await supabase
      .from('bills')
      .select('*')
      .eq('user_id', userId)
      .eq('status', status)
      .order('due_date', { ascending: true });

   if (error) {
      console.log(error);

      throw new Error(`Error fetching bills: ${error.message}`);
   }
   return data || [];
}

/* Mark a bill as paid  */

export async function markAsPaid(billId: string, paymentDate: string) {
   const { data, error } = await supabase
      .from('bills')
      .update({
         status: 'paid',
         payment_date: paymentDate || new Date().toISOString(),
         updated_at: new Date().toISOString(),
      })
      .eq('id', billId);

   if (error) {
      console.log('Error to mark as paid: ', error);
      throw new Error(`Error marking bill as paid: ${error.message}`);
   }
   return data;
}

/* Create a new bill */
export async function createBill(
   userId: string,
   billData: Omit<Bill, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'status'>
) {
   const { data, error } = await supabase
      .from('bills')
      .insert([{ ...billData, user_id: userId, status: 'pending' }])
      .select()
      .single();

   if (error) {
      console.log('Error creating bill: ', error);
      throw new Error(`Error creating bill: ${error.message}`);
   }
   if (!data) {
      throw new Error('Failed to create bill');
   }
   return data;
}

/* Update an existing bill */
export async function updateBill(billId: string, updates: Partial<Bill>) {
   const { data, error } = await supabase
      .from('bills')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', billId)
      .select()
      .single();

   if (error) {
      console.log('Error updating bill: ', error);
      throw new Error(`Error updating bill: ${error.message}`);
   }
   return data;
}

export async function getBillById(billId: string) {
   const { data, error } = await supabase.from('bills').select('*').eq('id', billId).single();

   if (error) {
      console.log('Error fetching bill by ID: ', error);
      throw new Error(`Error fetching bill: ${error.message}`);
   }
   return data;
}

/* Delete a bill */
export async function deleteBill(billId: string) {
   const { error } = await supabase.from('bills').delete().eq('id', billId);

   if (error) {
      console.log('Error deleting bill: ', error);
      throw new Error(`Error deleting bill: ${error.message}`);
   }
}

/**
 * Pré-agendar uma conta para outra data
 * Cria uma nova conta para o mesmo usuário e marca a antiga como paga
 */
export async function preScheduleBill(billId: string, newDueDate: string) {
   // Search the bill
   const { data: bill, error: fetchError } = await supabase
      .from('bills')
      .select('*')
      .eq('id', billId)
      .single();

   if (fetchError || !bill) {
      console.log('Error fetching bill for pre-scheduling: ', fetchError);
      throw new Error(`Error fetching bill: ${fetchError?.message}`);
   }
   // Create a new bill with the new due date
   const { error: insertError } = await supabase.from('bills').insert([
      {
         user_id: bill.user_id,
         name: bill.name,
         amount: bill.amount,
         due_date: newDueDate,
         status: 'pending',
      },
   ]);

   if (insertError) {
      console.log('Error creating new bill during pre-scheduling: ', insertError);
      throw new Error(`Error creating new bill: ${insertError.message}`);
   }
}
