/*
 * @Author: liuxiang
 * @Date: 2026-01-31 15:46:11
 * @LastEditors: liuxiang
 * @LastEditTime: 2026-02-01 03:09:43
 * @Description: file content
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { helpers, Text } from '@td-design/react-native';

import { Index } from '@/modules/index/screens';
import { Mine } from '@/modules/mine/screens';

import Icon, { IconNames } from '../../components/Icon';

const { px } = helpers;
const Tab = createBottomTabNavigator();
const tabItems: { name: string; title?: string; label: string; icon: IconNames; iconAct: IconNames; component: () => JSX.Element }[] = [
  {
    name: 'Index',
    component: Index,
    label: 'Home',
    icon: 'home',
    iconAct: 'homeAct',
    title: 'Home',
  },
  {
    name: 'Mine',
    component: Mine,
    label: 'Mine',
    icon: 'my',
    iconAct: 'myAct',
    title: 'Mine',
  },
];

export const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Homepage"
      screenOptions={{
        // 懒加载TabScreen
        lazy: true,
        headerTitleAlign: 'center',
        // 不显示TabScreen的header
        headerShown: false,

        tabBarStyle: {
          paddingTop: px(4),
        },
      }}
    >
      {tabItems.map(item => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            title: item.title || item.label,
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? '#0F62FE' : '#616161',
                  fontWeight: focused ? '500' : 'normal',
                  fontSize: px(10),
                  lineHeight: px(16),
                }}
              >
                {item?.label}
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Icon name={focused ? item.iconAct : item.icon} size={px(20)} color={focused ? '#0F62FE' : '#616161'} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
