import { View, FlatList, Text } from 'react-native';
import colors from '../../../constants/colors';
import { styles } from './styles';
import { Button } from '../../../components/Button';

interface Bill {
   id: string;
   name: string;
   amount: number;
   due_date: Date;
}

interface OverdueListProps {
   data: Bill[];
}

export default function OverdueList({ data }: OverdueListProps) {
   const renderItem = ({ item }: { item: Bill }) => (
      <View style={[styles.billCard, { borderLeftColor: '#EF4444', borderLeftWidth: 4 }]}>
         <View style={styles.billHeader}>
            <Text style={styles.billType}>{item.name}</Text>
            <Text style={styles.billAmount}>R$ {item.amount.toFixed(2)}</Text>
         </View>
         <Text style={styles.billDueDate}>
            Vencido em {new Date(item.due_date).toLocaleDateString()}
         </Text>
         <Button
            text="Pagar"
            backgroundColor={'#DC2626'}
            width="100%"
            height={40}
            borderRadius={10}
            fontSize={16}
         />
      </View>
   );

   return (
      <FlatList
         data={data}
         renderItem={renderItem}
         keyExtractor={(item) => item.id}
         contentContainerStyle={styles.billsContainer}
         showsVerticalScrollIndicator={false}
         ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: '#aaa', marginTop: 30 }}>
               Nenhuma conta atrasada
            </Text>
         }
      />
   );
}
