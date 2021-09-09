import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Home, Filter, About, Account, Login, Register } from '../Screens';
import { Header } from '../Components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';

// Stacks
const HomeStack = createStackNavigator();
const FilterStack = createStackNavigator();
const AccountStack = createStackNavigator();
const AboutStack = createStackNavigator();
const AllStacks = createStackNavigator();
const BottomTabs = createMaterialBottomTabNavigator();

// Home screens
const HomeScreens = () => (
  <HomeStack.Navigator screenOptions={{ headerMode: 'screen', header: () => null }}>
    <HomeStack.Screen
      name="HomeScreen"
      component={Home}
      options={{
        header: (props) => (
          <Header
            {...props}
            showback={false}
            leftIcons={[ { name: 'plus', onPress: () => null }, { name: 'minus', onPress: () => null } ]}
            title="Home screen"
          />
        ),
        cardStyle: { backgroundColor: '#fff', paddingHorizontal: RFValue(0) }
      }}
    />
  </HomeStack.Navigator>
);

// Filter screens
const FilterScreens = () => (
  <FilterStack.Navigator screenOptions={{ headerMode: 'screen', header: () => null }}>
    <FilterStack.Screen name="FilterScreen" component={Filter} />
  </FilterStack.Navigator>
);

// Account screens
const AccountScreens = () => (
  <AccountStack.Navigator screenOptions={{ headerMode: 'screen', header: () => null }}>
    <AccountStack.Screen name="AccountScreen" component={Account} />
  </AccountStack.Navigator>
);

// About screens
const AboutScreens = () => (
  <AboutStack.Navigator screenOptions={{ headerMode: 'screen', header: () => null }}>
    <AboutStack.Screen name="AboutScreen" component={About} />
  </AboutStack.Navigator>
);

// About screens
const MainScreens = () => (
  <BottomTabs.Navigator screenOptions={{}}>
    <BottomTabs.Screen name="Home" component={HomeScreens} />
    <BottomTabs.Screen name="Filter" component={FilterScreens} />
    <BottomTabs.Screen name="Account" component={AccountScreens} options={{}} />
    <BottomTabs.Screen name="About" component={AboutScreens} />
  </BottomTabs.Navigator>
);

// ::::: ALL TAB SCREENS :::::
const AllScreens = () => (
  <AllStacks.Navigator initialRouteName="Login" screenOptions={{ headerMode: 'screen', header: () => null }}>
    <AllStacks.Screen name="Main" component={MainScreens} />
    <AllStacks.Screen name="Login" component={Login} />
    <AllStacks.Screen name="Register" component={Register} />
    {/* <AllStacks.Screen name="About" component={AboutScreens} /> */}
  </AllStacks.Navigator>
);

export default () => (
  <NavigationContainer>
    <AllScreens />
  </NavigationContainer>
);
