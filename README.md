# Getting Started

This is a reproduction for the following issues:

**react-native-screens**
https://github.com/software-mansion/react-native-screens/issues/2455

**expo**
https://github.com/expo/expo/issues/32450

Run:

```bash
yarn
yarn ios
```

## Reproduction

### Step 1

In the file `App.tsx` we have a main screen (home) with a button that pushes a new screen (menu) to the navigation stack with presentation mode `modal`.

When running the app directly and push the "Go to menu" button, we'll see a screen that should contain a red box on top/bottom - but we only see the top one:

<img alt="Missing red box at the bottom" src="docs/menu-wrong.png" width="150" />

### Step 2

If we change the following lines in `App.tsx` from this:

```tsx
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
          <Text style={styles.icon}>👎</Text>
        </Animated.View>
      </View>
    </View>
  );
};
```

To this:

```tsx
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
          <Text style={styles.icon}>👎</Text>
        </Animated.View>
      </View>
    </View>
  );
};
```

We see a working screen when we press the "Go to menu" button:

<img alt="Correct red box at the bottom" src="docs/menu-correct.png" width="150" />
