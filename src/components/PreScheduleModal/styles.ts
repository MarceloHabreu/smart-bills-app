import { StyleSheet } from 'react-native';
import { fonts } from '@/fonts/fonts';

export const styles = StyleSheet.create({
   overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
   },
   modalContainer: {
      width: '85%',
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
   },
   title: {
      fontSize: 20,
      fontFamily: fonts.body_poppins700,
      color: '#333',
      marginBottom: 5,
   },
   subtitle: {
      fontFamily: fonts.body_poppins400,
      color: '#777',
      fontSize: 15,
      marginBottom: 20,
   },
   label: {
      alignSelf: 'flex-start',
      fontFamily: fonts.body_poppins600,
   },
   dateInput: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 12,
      marginBottom: 25,
      backgroundColor: '#f9f9f9',
   },
   dateText: {
      color: '#333',
   },
   modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 10,
   },
});
