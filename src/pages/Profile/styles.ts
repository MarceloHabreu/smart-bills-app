import { StyleSheet } from 'react-native';
import colors from '@/constants/colors';
import { fonts } from '@/fonts/fonts';

export const styles = StyleSheet.create({
   container: {
      flexGrow: 1,
      backgroundColor: '#fff',
      padding: 20,
      paddingTop: 50,
      alignItems: 'center',
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%',
      marginBottom: 20,
      alignItems: 'center',
   },
   backButton: {
      backgroundColor: '#f0f0f0',
      borderRadius: 50,
      padding: 8,
   },
   logo: {
      width: 70,
      height: 70,

      resizeMode: 'contain',
   },
   avatarContainer: {
      alignItems: 'center',
      marginVertical: 20,
   },
   avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
   },
   avatarPlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#E1E1E1',
      alignItems: 'center',
      justifyContent: 'center',
   },

   card: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
   },
   title: {
      textAlign: 'center',
      fontSize: 16,
      fontFamily: fonts.body_poppins600,
      color: '#2D2D2D',
   },
   subtitle: {
      textAlign: 'center',
      color: '#6B7280',
      fontFamily: 'Poppins-SemiBold',
      marginBottom: 20,
   },
   input: {
      borderWidth: 1,
      borderColor: '#D1D5DB',
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
   },
   saveButton: {
      backgroundColor: colors.paybutton,
      borderRadius: 25,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 10,
      elevation: 3,
   },
   saveButtonText: {
      color: '#fff',
      fontFamily: 'Poppins_600SemiBold',
      fontSize: 16,
   },
   logoutButton: {
      marginTop: 20,
      alignItems: 'center',
   },
   logoutText: {
      color: '#EF4444',
      fontFamily: 'Poppins_600SemiBold',
   },
});
