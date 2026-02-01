/*
 * @Author: liuxiang
 * @Date: 2026-01-30 15:53:30
 * @LastEditors: liuxiang
 * @LastEditTime: 2026-02-01 22:42:21
 * @Description: file content
 */
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CustomHeader } from '@/components/CustomHeader';
import { TabStack } from '@/stacks/tabStack';


import { DoctorDetail } from '@/modules/index/screens/doctorDetail'
import { SubmitAppoint } from '@/modules/index/screens/submitAppoint'
import { MyAppointments } from '@/modules/mine/screens/myAppointments'


const MAIN_SCREENS = [
  {
    name: 'Tab',
    component: TabStack,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'DoctorDetail',
    component: DoctorDetail,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'SubmitAppoint',
    component: SubmitAppoint,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'MyAppointments',
    component: MyAppointments,
    options: {
      headerShown: false,
    },
  },
];


const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName={'Tab'}
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
        animationDuration: 200,
        headerBackTitleVisible: false,
        header: CustomHeader,
      }}
    >
      <Stack.Group
        screenOptions={{
          presentation: 'card',
        }}
      >
        {MAIN_SCREENS.map(screen => (
          <Stack.Screen key={screen.name} {...screen} />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  );
}
