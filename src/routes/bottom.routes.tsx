import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Profile } from '../pages/Profile';
import { Home } from '../pages/Home';

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
   return (
      <Tab.Navigator
         screenOptions={{
            headerShown: false,
         }}
      >
         <Tab.Screen name="Home" component={Home} />
         <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
   );
}
