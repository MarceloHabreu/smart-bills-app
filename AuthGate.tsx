import { useEffect } from 'react';
import { useAuth } from './src/contexts/AuthContext';
import { supabase } from './src/lib/supabase';

function AuthGate({ navigationRef }: { navigationRef: any }) {
   const { setAuth } = useAuth();

   useEffect(() => {
      supabase.auth.onAuthStateChange((_event, session) => {
         if (session) {
            setAuth(session.user);
            navigationRef.navigate('BottomRoutes');
            return;
         } else {
            setAuth(null);
            navigationRef.navigate('Login');
         }
      });
   }, []);

   return null;
}

export default AuthGate;
