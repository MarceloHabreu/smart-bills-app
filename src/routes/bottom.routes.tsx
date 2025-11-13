import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Profile } from '../pages/Profile';
import { Home } from '../pages/Home';
import CustomTabBar from '../components/CustomTabBar';
import { BillsCreate } from '../pages/Bills/Create';
import { Dashboard } from '../pages/Dashboard';
import { BillsEdit } from '@/pages/Bills/Edit';
import { BillsView } from '@/pages/Bills/View';
import { HistoryPayments } from '@/pages/History';

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
   return (
      <Tab.Navigator
         initialRouteName="Home"
         screenOptions={{
            headerShown: false,
            tabBarStyle: {
               display: 'none',
            },
         }}
         tabBar={(props) => <CustomTabBar {...props} />}
      >
         <Tab.Screen name="Home" component={Home} />
         <Tab.Screen name="History" component={HistoryPayments} />
         <Tab.Screen name="BillsCreate" component={BillsCreate} />
         <Tab.Screen name="BillsEdit" component={BillsEdit} />
         <Tab.Screen name="BillsView" component={BillsView} />
         <Tab.Screen name="Dashboard" component={Dashboard} />
         <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
   );
}
