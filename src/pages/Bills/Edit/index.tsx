import React, { useState, useEffect } from 'react';
import {
   View,
   Text,
   TextInput,
   TouchableOpacity,
   Alert,
   ScrollView,
   KeyboardAvoidingView,
   Platform,
   Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { styles } from './styles';
import colors from '@/constants/colors';
import MaskInput, { Masks } from 'react-native-mask-input';
import { ArrowLeft } from 'lucide-react-native';

export function BillsEdit({ route, navigation }: any) {
   const { user } = useAuth();
   const { bill } = route.params; // ID da conta que veio da navegação

   const [name, setName] = useState('');
   const [amount, setAmount] = useState('');
   const [dueDate, setDueDate] = useState<Date | null>(null);
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [status, setStatus] = useState<'pending' | 'overdue' | 'paid'>('pending');
   const [description, setDescription] = useState('');

   const statusColors = {
      pending: colors.primary,
      overdue: colors.red,
      paid: colors.paybutton,
   };

   // 🔹 Carrega os dados da conta para edição
   useEffect(() => {
      if (bill) {
         setName(bill.name);
         setAmount(parseFloat(bill.amount).toFixed(2).replace('.', ','));
         setDueDate(new Date(bill.due_date));
         setStatus(bill.status);
         setDescription(bill.description || '');
      }
   }, [bill]);

   // 🔹 Atualiza conta no banco
   const handleUpdate = async () => {
      if (!name || !amount || !dueDate) {
         Alert.alert('Campos obrigatórios', 'Preencha nome, valor e data de vencimento.');
         return;
      }

      try {
         const { error } = await supabase
            .from('bills')
            .update({
               name,
               amount: parseFloat(amount.replace(/[R$\s.]/g, '').replace(',', '.')),
               due_date: dueDate.toISOString(),
               status,
               description,
            })
            .eq('id', bill.id)
            .eq('user_id', user?.id);

         if (error) throw error;

         Alert.alert('✅ Sucesso', 'Conta atualizada com sucesso!');
         navigation.goBack();
      } catch (err: any) {
         Alert.alert('Erro', err.message || 'Não foi possível atualizar a conta.');
      }
   };

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={{ flex: 1 }}
      >
         <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
         >
            {/* HEADER */}
            <View style={styles.header}>
               <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                  <ArrowLeft color={colors.gray} size={30} />
               </TouchableOpacity>

               <Image
                  source={require('@/assets/smartBills_second_logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
               />
            </View>

            <Text style={styles.title}>Editar conta</Text>

            <Text style={styles.label}>Nome:</Text>
            <TextInput
               value={name}
               onChangeText={setName}
               placeholder="Digite o nome da conta"
               style={styles.input}
            />

            <Text style={styles.label}>Valor:</Text>
            <MaskInput
               value={amount}
               onChangeText={(masked, unmasked) => setAmount(masked)}
               mask={Masks.BRL_CURRENCY}
               placeholder="R$ 00,00"
               keyboardType="numeric"
               style={styles.input}
            />

            <Text style={styles.label}>Data de Vencimento:</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
               <Text>{dueDate ? dueDate.toLocaleDateString('pt-BR') : 'dd/mm/aaaa'}</Text>
            </TouchableOpacity>

            {showDatePicker && (
               <DateTimePicker
                  value={dueDate || new Date()}
                  mode="date"
                  display="calendar"
                  onChange={(event, date) => {
                     setShowDatePicker(false);
                     if (date) setDueDate(date);
                  }}
               />
            )}

            <Text style={styles.label}>Situação da Conta:</Text>
            <TouchableOpacity
               style={styles.input}
               onPress={() =>
                  setStatus((prev) =>
                     prev === 'pending' ? 'overdue' : prev === 'overdue' ? 'paid' : 'pending'
                  )
               }
            >
               <Text style={[styles.statusText, { color: statusColors[status] }]}>
                  {status === 'pending' ? 'Pendente' : status === 'overdue' ? 'Vencida' : 'Paga'}
               </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Descrição:</Text>
            <TextInput
               value={description}
               onChangeText={setDescription}
               placeholder="Comente observações, lembretes etc..."
               multiline
               numberOfLines={4}
               style={[styles.input, styles.textArea]}
            />

            <View style={styles.buttonRow}>
               <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={[styles.button, styles.cancelButton]}
               >
                  <Text style={styles.buttonText}>Cancelar</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={handleUpdate} style={[styles.button, styles.saveButton]}>
                  <Text style={styles.buttonText}>Salvar</Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   );
}
