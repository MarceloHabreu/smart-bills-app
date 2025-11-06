import { StyleSheet } from 'react-native';
import { fonts } from '../../fonts/fonts';

export const styles = StyleSheet.create({
   modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
   },
   modalContainer: {
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 24,
      width: '85%',
      alignItems: 'center',
   },
   modalTitle: {
      fontFamily: fonts.body_poppins700,
      fontSize: 20,
      marginBottom: 3,
   },
   modalSubtitle: {
      fontFamily: fonts.body_poppins400,
      fontSize: 15,
      color: '#777',
      marginBottom: 20,
   },
   inputGroup: {
      width: '100%',
      marginBottom: 16,
   },
   label: {
      fontFamily: fonts.body_poppins600,
   },
   input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      backgroundColor: '#f9f9f9',
   },
   modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 10,
   },
});
