export interface Bill {
   id: string;
   name: string;
   amount: number;
   status: 'pending' | 'overdue' | 'paid';
   due_date: string;
   payment_date?: string | null;
   description?: string;
   user_id: string;
   created_at?: string;
   updated_at?: string;
}
