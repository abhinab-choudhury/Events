import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import Ionicons from '@expo/vector-icons/Ionicons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          padding: 10,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <Ionicons size={focused ? 28 : 24} name={focused ? 'bar-chart' : 'bar-chart-outline'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <Ionicons size={focused ? 28 : 24} name={focused ? 'add-circle' : 'add-circle-outline' } color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <Ionicons size={focused ? 28 : 24} name={focused ? 'information-circle' : 'information-circle-outline'} color={color} />,
        }}
      />
    </Tabs>
  );
}
