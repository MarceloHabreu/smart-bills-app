import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity, View, Text, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '../Button';
import { fonts } from '@/fonts/fonts';
import { styles } from './styles';
import colors from '@/constants/colors';
import { Bill } from '@/interfaces';

interface ModalPaymentProps {
   visible: boolean;
   onClose: () => void;
   bill: Bill | null;
}

export default function ModalPayment({ visible, onClose, bill }: ModalPaymentProps) {
   const [date, setDate] = useState(new Date());
   const [time, setTime] = useState(new Date());
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [showTimePicker, setShowTimePicker] = useState(false);

   useEffect(() => {
      if (visible) {
         setDate(new Date());
         setTime(new Date());
      }
   }, [visible]);

   const handleSave = () => {
      if (!bill) return;
      console.log('Conta paga:', bill.name);
      console.log('Data:', date.toLocaleDateString());
      console.log('Hora:', time.toLocaleTimeString());
      onClose();
   };

   return (
      <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
         <TouchableWithoutFeedback onPress={onClose}>
            {/* TouchableWithoutFeedback Fecha o modal ao tocar fora */}
            <View style={styles.modalOverlay}>
               <TouchableWithoutFeedback onPress={() => {}}>
                  <View style={styles.modalContainer}>
                     <Text style={styles.modalTitle}>Marcar como paga</Text>
                     <Text style={styles.modalSubtitle}>
                        Quando a conta{' '}
                        <Text style={{ fontFamily: fonts.body_poppins600 }}>{bill?.name}</Text> foi
                        paga?
                     </Text>

                     <View style={styles.inputGroup}>
                        <Text style={styles.label}>Data:</Text>
                        <TouchableOpacity
                           style={styles.input}
                           onPress={() => setShowDatePicker(true)}
                        >
                           <Text>{date.toLocaleDateString('pt-BR')}</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                           <DateTimePicker
                              value={date}
                              mode="date"
                              display="default"
                              onChange={(event, selectedDate) => {
                                 setShowDatePicker(false);
                                 if (selectedDate) setDate(selectedDate);
                              }}
                           />
                        )}
                     </View>

                     <View style={styles.inputGroup}>
                        <Text style={styles.label}>Hora:</Text>
                        <TouchableOpacity
                           style={styles.input}
                           onPress={() => setShowTimePicker(true)}
                        >
                           <Text>
                              {time.getHours().toString().padStart(2, '0')}:
                              {time.getMinutes().toString().padStart(2, '0')}
                           </Text>
                        </TouchableOpacity>
                        {showTimePicker && (
                           <DateTimePicker
                              value={time}
                              mode="time"
                              is24Hour
                              display="default"
                              onChange={(event, selectedTime) => {
                                 setShowTimePicker(false);
                                 if (selectedTime) setTime(selectedTime);
                              }}
                           />
                        )}
                     </View>

                     <View style={styles.modalButtons}>
                        <Button
                           text="Cancelar"
                           backgroundColor={colors.gray}
                           width="45%"
                           height={40}
                           borderRadius={10}
                           fontSize={16}
                           onPress={onClose}
                        />
                        <Button
                           text="Salvar"
                           backgroundColor={colors.primary}
                           width="45%"
                           height={40}
                           borderRadius={10}
                           fontSize={16}
                           onPress={handleSave}
                        />
                     </View>
                  </View>
               </TouchableWithoutFeedback>
            </View>
         </TouchableWithoutFeedback>
      </Modal>
   );
}
