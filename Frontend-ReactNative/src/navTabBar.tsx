import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { isMobileDevice } from './utils';

const ACTIVE_COLOR = 'tomato';
const INACTIVE_COLOR = 'gray';

const PROFILE_INDEX = 0;
const ROOT_HOME_INDEX = 1;

// This is based of off the docs: https://reactnavigation.org/docs/bottom-tab-navigator/#tabbar
export default function NavTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [homeFocused, setHomeFocused] = useState<boolean>(true);
  const [homeIndex, setHomeIndex] = useState<number>(ROOT_HOME_INDEX);

  useEffect(() => {
    if (state.index !== PROFILE_INDEX) setHomeFocused(true);
    else setHomeFocused(false);
  }, [state.index])

  useEffect(() => {
    state.index !== PROFILE_INDEX && setHomeIndex(state.index)
  }, [state.index])

  const onHomePress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: 'Home',
      canPreventDefault: true
    })
    if (!event.defaultPrevented) {
      // If home is focused, then we want to bring the user back to the Home screen
      if (homeFocused) {
        // But only if we are not already at the home screen
        homeIndex !== ROOT_HOME_INDEX && navigation.navigate("Home");
      } else {
        // Home is not focused, so we want ot bring the user back to the previous screen that was on the home tab (homeIndex)
        navigation.navigate(state.routes[homeIndex].name, state.routes[homeIndex].params);
      }
    }
  }

  const onProfilePress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: 'Profile',
      canPreventDefault: true
    })
    if (state.index !== PROFILE_INDEX && !event.defaultPrevented) {
      navigation.navigate("Profile");
    }
  }

  function onLongPress(route: string) {
    navigation.emit({
      type: 'tabLongPress',
      target: route,
    });
  };


  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={homeFocused ? { selected: true } : {}}
        accessibilityLabel="Home"
        onPress={onHomePress}
        onLongPress={() => onLongPress("Home")}
        style={{ flex: 1, alignItems: 'center' }}
      >
        <Ionicons name="home" color={homeFocused ? ACTIVE_COLOR : INACTIVE_COLOR} size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={!homeFocused ? { selected: true } : {}}
        accessibilityLabel="Profile"
        onPress={onProfilePress}
        onLongPress={() => onLongPress("Profile")}
        style={{ flex: 1, alignItems: 'center' }}
      >
        <Ionicons name="person" color={!homeFocused ? ACTIVE_COLOR : INACTIVE_COLOR} size={25} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: isMobileDevice() ? 30 : 10,
    borderTopWidth: 1,
    borderTopColor: '#C7C7C7'
  }
})