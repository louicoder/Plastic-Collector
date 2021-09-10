import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Filter, About, Account, Login, Register, AddColleciton } from '../Screens';
import { DesignIcon, Header } from '../Components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';

// Stacks
const HomeStack = createStackNavigator();
const FilterStack = createStackNavigator();
const AccountStack = createStackNavigator();
const AboutStack = createStackNavigator();
const AddStack = createStackNavigator();
const AllStacks = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

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
            // leftIcons={[ { name: 'plus', onPress: () => null }, { name: 'deleteuser', onPress: () => null } ]}
            title="Home screen"
          />
        ),
        cardStyle: { backgroundColor: '#fff' }
      }}
    />
  </HomeStack.Navigator>
);

// Filter screens
const AddScreens = () => (
  <AddStack.Navigator screenOptions={{ headerMode: 'screen', header: () => null }}>
    <AddStack.Screen
      name="AddScreen"
      component={AddColleciton}
      options={{
        header: (props) => (
          <Header
            {...props}
            showback={false}
            // leftIcons={[ { name: 'plus', onPress: () => null }, { name: 'deleteuser', onPress: () => null } ]}
            title="Add Package"
          />
        ),
        cardStyle: { backgroundColor: '#fff' }
      }}
    />
  </AddStack.Navigator>
);

// Filter screens
const FilterScreens = () => (
  <FilterStack.Navigator screenOptions={{ headerMode: 'screen', header: () => null }}>
    <FilterStack.Screen
      name="FilterScreen"
      component={Filter}
      options={{
        header: (props) => (
          <Header
            {...props}
            showback={false}
            // leftIcons={[ { name: 'plus', onPress: () => null }, { name: 'deleteuser', onPress: () => null } ]}
            title="All Collections"
          />
        ),
        cardStyle: { backgroundColor: '#fff' }
      }}
    />
  </FilterStack.Navigator>
);

// Account screens
const AccountScreens = () => (
  <AccountStack.Navigator screenOptions={{ headerMode: 'screen', header: () => null }}>
    <AccountStack.Screen
      name="AccountScreen"
      component={Account}
      options={{
        header: (props) => (
          <Header
            {...props}
            showback={false}
            // leftIcons={[ { name: 'plus', onPress: () => null }, { name: 'deleteuser', onPress: () => null } ]}
            title="Your Account"
          />
        ),
        cardStyle: { backgroundColor: '#fff' }
      }}
    />
  </AccountStack.Navigator>
);

// About screens
const AboutScreens = () => (
  <AboutStack.Navigator screenOptions={{ headerMode: 'screen', header: () => null }}>
    <AboutStack.Screen
      name="AboutScreen"
      component={About}
      options={{
        header: (props) => (
          <Header
            {...props}
            showback={false}
            // leftIcons={[ { name: 'plus', onPress: () => null }, { name: 'deleteuser', onPress: () => null } ]}
            title="About Platic Collector"
          />
        ),
        cardStyle: { backgroundColor: '#fff' }
      }}
    />
  </AboutStack.Navigator>
);

// About screens
const MainScreens = () => (
  <BottomTabs.Navigator
    screenOptions={{
      tabBarStyle: { backgroundColor: '#000', height: RFValue(60), paddingBottom: RFValue(0) },
      tabBarActiveTintColor: '#fff',
      headerShown: false,
      tabBarShowLabel: false
    }}
  >
    <BottomTabs.Screen
      name="Home"
      component={HomeScreens}
      options={{
        tabBarIcon: ({ color }) => <DesignIcon name="home" color={color} />,
        // tabBarLabel: '',
        tabBarIconStyle: { marginTop: RFValue(5) }
      }}
    />
    <BottomTabs.Screen
      name="Filter"
      component={FilterScreens}
      options={{
        tabBarIcon: ({ color }) => <DesignIcon name="linechart" color={color} />,
        // tabBarLabel: '',
        tabBarIconStyle: { marginTop: RFValue(5) }
      }}
    />

    <BottomTabs.Screen
      name="Add"
      component={AddScreens}
      options={{
        tabBarIcon: ({ color }) => <DesignIcon name="pluscircle" color={color} size={45} />,
        tabBarLabel: '',
        // tabBarIconStyle: { marginTop: RFValue(5) },
        tabBarShowLabel: false
      }}
    />

    <BottomTabs.Screen
      name="Account"
      component={AccountScreens}
      options={{}}
      options={{
        tabBarIcon: ({ color }) => <DesignIcon name="user" color={color} />,
        // tabBarLabel: '',
        tabBarIconStyle: { marginTop: RFValue(5) }
      }}
    />
    <BottomTabs.Screen
      name="About"
      component={AboutScreens}
      options={{
        tabBarIcon: ({ color }) => <DesignIcon name="infocirlceo" color={color} />,
        // tabBarLabel: '',
        tabBarIconStyle: { marginTop: RFValue(5) }
      }}
    />
  </BottomTabs.Navigator>
);

// ::::: ALL TAB SCREENS :::::
const AllScreens = () => (
  <AllStacks.Navigator initialRouteName="Main" screenOptions={{ header: () => null, cardStyle: { borderWidth: 0 } }}>
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
