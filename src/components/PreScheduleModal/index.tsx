import React, { useState } from 'react';
import {
   Modal,
   View,
   Text,
   TouchableOpacity,
   Platform,
   TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import colors from '@/constants/colors';
import { Button } from '../Button';

interface PreScheduleModalProps {
   visible: boolean;
   onClose: () => void;
   onSave: (date: string) => void;
   initialDate?: string;
}

export default function PreScheduleModal({
   visible,
   onClose,
   onSave,
   initialDate,
}: PreScheduleModalProps) {
   const [date, setDate] = useState(initialDate ? new Date(initialDate) : new Date());
   const [showPicker, setShowPicker] = useState(false);

   const handleConfirm = (_event: any, selectedDate?: Date) => {
      if (selectedDate) setDate(selectedDate);
      if (Platform.OS === 'android') setShowPicker(false);
   };

   const handleSave = () => {
      const formatted = date.toISOString().split('T')[0]; // yyyy-mm-dd
      onSave(formatted);
      onClose();
   };

   return (
      <Modal transparent visible={visible} animationType="fade">
         <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.overlay}>
               <TouchableWithoutFeedback onPress={() => {}}>
                  <View style={styles.modalContainer}>
                     <Text style={styles.title}>Pré-Agendar Pagamento</Text>
                     <Text style={styles.subtitle}>Escolha a nova data de pagamento</Text>

                     <Text style={styles.label}>Data:</Text>
                     <TouchableOpacity style={styles.dateInput} onPress={() => setShowPicker(true)}>
                        <Text style={styles.dateText}>{date.toLocaleDateString('pt-BR')}</Text>
                     </TouchableOpacity>

                     {showPicker && (
                        <DateTimePicker
                           value={date}
                           mode="date"
                           display="default"
                           onChange={handleConfirm}
                           minimumDate={new Date()}
                        />
                     )}

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
                           backgroundColor={colors.paybutton}
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
