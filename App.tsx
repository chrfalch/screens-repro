import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

const Stack = createNativeStackNavigator();
const MenuStack = createNativeStackNavigator();

const MenuPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <View style={styles.box} />
      <Button title="Close" onPress={navigation.goBack} />
      <View style={styles.box} />
    </View>
  );
};

const MenuNavigator = () => {
  return (
    <MenuStack.Navigator>
      <Stack.Screen
        name="Menu"
        component={MenuPage}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Settings" component={MenuPage} />
    </MenuStack.Navigator>
  );
};

const HomePage = () => {
  const {navigate} = useNavigation();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: '0deg'}],
  }));
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Button
          title="Go to Menu"
          onPress={() => {
            console.log('Go to Menu');
            // @ts-ignore
            navigate('Menu');
          }}
        />
        {/** WITH THIS: we see the error in the modal screen */}
        <Animated.View style={animatedStyle}>
          <Text style={styles.icon}>👋</Text>
        </Animated.View>
      </View>
    </View>
  );
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen
          name="Menu"
          component={MenuNavigator}
          options={{presentation: 'modal', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  box: {
    backgroundColor: 'red',
    height: 40,
    width: '100%',
  },
  icon: {
    fontSize: 28,
  },
});
