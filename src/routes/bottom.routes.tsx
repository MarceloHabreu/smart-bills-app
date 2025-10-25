import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Profile } from '../pages/Profile';
import { Home } from '../pages/Home';
import CustomTabBar from '../components/CustomTabBar';
import { History } from '../pages/History';
import { BillsCreate } from '../pages/Bills/Create';
import { Dashboard } from '../pages/Dashboard';
import { BillsEdit } from '../pages/Bills/Edit';

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
   return (
      <Tab.Navigator
         initialRouteName="Home"
         screenOptions={{
            headerShown: false,
         }}
         tabBar={(props) => <CustomTabBar {...props} />}
      >
         <Tab.Screen name="Home" component={Home} />
         <Tab.Screen name="History" component={History} />
         <Tab.Screen name="BillsCreate" component={BillsCreate} />
         <Tab.Screen name="Dashboard" component={Dashboard} />
         <Tab.Screen name="Profile" component={Profile} />
         <Tab.Screen name="BillsEdit" component={BillsEdit} />
      </Tab.Navigator>
   );
}
