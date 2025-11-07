import { Alert, Text, View } from 'react-native';
import { Button } from '@/components/auth/Button';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export function Profile() {
   const { setAuth, user } = useAuth();
   async function handleSignout() {
      const { error } = await supabase.auth.signOut();
      setAuth(null);

      if (error) {
         Alert.alert('Error', 'Erro ao sair da conta, tente novamente mais tarde.');
         return;
      }
   }
   return (
      <View>
         <Text>Profile</Text>
         <Button
            text="Logout"
            style={{ marginTop: '100%', alignItems: 'center', backgroundColor: 'red' }}
            onPress={handleSignout}
         />
      </View>
   );
}
