import { Bill } from '@/interfaces';

export type BottomTabParamList = {
   Home: undefined;
   History: undefined;
   BillsCreate: undefined;
   BillsEdit: { bill: Bill };
   BillsView: { bill: Bill };
   Dashboard: undefined;
   Profile: undefined;
};
