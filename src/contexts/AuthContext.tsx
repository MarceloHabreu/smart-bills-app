import { User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface AuthContextProps {
   user: User | null;
   setAuth: (authUser: User | null) => void;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = useState<User | null>(null);

   useEffect(() => {
      // verifica se existe uma sessão salva localmente e caso exista, recupera o usuário logado e seta no estado
      const restoreSession = async () => {
         const { data, error } = await supabase.auth.getUser();
         if (data?.user) {
            setUser(data.user);
         }
      };
      restoreSession();
   }, []);

   function setAuth(authUser: User | null) {
      setUser(authUser);
   }
   return <AuthContext.Provider value={{ user, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error('useAuth must be used within a AuthProvider');
   }
   return context;
};
