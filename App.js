
import { StyleSheet, Text, View } from 'react-native';
import Login from "./Components/Login"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogScreen from './Components/LogScreen';
import SignIn from './Components/SignIn';
import HomeView from './Components/HomeScreens/HomeView';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from "@rneui/themed";
import tw from 'twrnc'





  const HomeStack = createNativeStackNavigator();

function HomeScreen () {
  return (
      <HomeStack.Navigator>
        <HomeStack.Screen  name="Home" component={HomeView} options={{ headerShown: false, }}/>
      </HomeStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

function TabNavigation () {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarStyle: { backgroundColor: "white", height: 60,  },
      tabBarLabelStyle: { fontSize: 15, fontFamily: 'sans-serif', fontWeight: '500', },
      tabBarShowLabel:  false,
      // tabBarIcon: ({ focused, color, size }) => {
      //   let iconName;

      //   if (route.name === "Home-S") {
      //     return <Icon type='ionicon' name='home-sharp' size={28}   color={color} />} else if (route.name === "Chambres") {
      //      return <Icon type='ionicon' name='md-bed-sharp' size={28}   color={color} />
      //     } else if (route.name === "Creer") {
      //       return (
      //          <View style={[tw`top-2`]}>

      //            <Icon type='antdesign' name='pluscircle' size={28}   color={color} />
      //          </View>
      //       )
      //     } else if (route.name === "Creer") {
      //       return <Icon type='antdesign' name='pluscircle' size={28}   color={color} />
      //     }
         

      // },
      // tabBarActiveTintColor: '#062737',
      // tabBarInactiveTintColor: '#B4BEC3',
      headerShown: false
    })}
    >
        <Tab.Screen name="Home-S" component={HomeScreen} options={{ headerShown: false,
       
         tabBarIcon: ({color, size}) => (
          <View style={[tw``]}>

            <Icon type='ionicon' name='home-sharp' size={26}   color={color} />
          </View>
         ),
         
         tabBarActiveTintColor: '#062737',
         tabBarInactiveTintColor: '#B4BEC3'
         }}/>

        <Tab.Screen name="Chambres" component={HomeScreen} options={{ headerShown: false, 
         tabBarIcon: ({color, size}) => (
          <Icon type='ionicon' name='md-bed-sharp' size={26}   color={color} />
        ),
        tabBarActiveTintColor: '#062737',
        tabBarInactiveTintColor: '#B4BEC3'
        }}/>



     
        
        <Tab.Screen name="Reservation" component={HomeScreen} options={{ headerShown: false, 
        tabBarIcon: ({color, size}) => (
          <Icon type='antdesign' name='wallet' size={26}   color={color} />
        ),
        tabBarActiveTintColor: '#062737',
        tabBarInactiveTintColor: '#B4BEC3'
        }}/>

        <Tab.Screen name="Notification" component={HomeScreen} options={{ headerShown: false, 
        tabBarIcon: ({color, size}) => (
          <Icon type='antdesign' name='notification' size={26}   color={color} />
        ),
        tabBarActiveTintColor: '#062737',
        tabBarInactiveTintColor: '#B4BEC3'
        }}/>

<Tab.Screen name="Creer" component={HomeScreen} options={{ headerShown: false, 
          tabBarIcon: ({color, size}) => (
            <View style={[tw``, styles.elevation]}>
              <LinearGradient 
               colors={['#FF2A2A','#FF6D21', '#FF6D21']}
               style={styles.backGround}
              >
                 <View style={[tw` `, { }]}>
              

              <Icon type='fontisto' name='plus-a' size={26}   color="white" />
             

                </View>
              </LinearGradient>
            </View>
           
          ),
         tabBarActiveTintColor: "",
         tabBarInactiveTintColor: "#B4BEC3"
        }}/>

      

        
    </Tab.Navigator>
  )
}



const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LogScreen'>
        <Stack.Screen name="LogScreen" component={LogScreen} options={{ headerShown: false, }} />
        <Stack.Screen name="Login" component={Login}  options={{ headerShown: false, }} />
        <Stack.Screen name="SignIn" component={SignIn}  options={{ headerShown: false, }} />
        <Stack.Screen name="Home-G" component={TabNavigation}  options={{ headerShown: false, }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  backGround: {
    left: 0,
    right: 0,
    // top: -30,
    height: 60,
    width: 60,
    padding: 4,
    
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
   

},
elevation: {
  top: -27,
  height: 60,
  width: 60,
 
  elevation: 18,
  borderRadius: 50
 
}
});
