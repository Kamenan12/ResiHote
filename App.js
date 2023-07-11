
import { StyleSheet, Text, View } from 'react-native';
import Login from "./Components/Login"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogScreen from './Components/LogScreen';
import SignIn from './Components/SignIn';
import HomeView from './Components/HomeScreens/HomeView';
import ResidenceView from './Components/ResidenceScreens/ResidenceView';
import ReservationView from './Components/ReservationScreen/ReservationView';
import NotificationView from './Components/NotificationScreen/NotificationView';
import ChambreView from './Components/ChambreScreen/ChambreView';
import ImageModif from './Components/ResidenceScreens/Details/Modif/Images';
import EquipementModif from './Components/ResidenceScreens/Details/Modif/Equipement';
import CalendrierModif from './Components/ResidenceScreens/Details/Modif/Calendrier';
import MenuParametre from './Components/Profil/MenuParametre';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from "@rneui/themed";
import tw from 'twrnc'
import DetailsView from './Components/ResidenceScreens/DetailsView';
import { Provider } from 'react-redux'
import { store } from './Components/Store/store';
import OneSignal from 'react-native-onesignal';
import Constants from "expo-constants";
import { useEffect } from 'react';
OneSignal.setAppId("aa4ac4ba-af7d-4cda-8026-880f02f59063")



 






  // const ChambreStack = createNativeStackNavigator();

  // function ChambreScreen () {
  //     return (
  //       <ChambreStack.Navigator>
  //         <ChambreStack.Screen name='Chambres'  component={ChambreView} />
  //       </ChambreStack.Navigator>
  //     )
  // }


  const NotificationStack = createNativeStackNavigator();

  function NotificationScreen () {
    return (
      <NotificationStack.Navigator>
        <NotificationStack.Screen name="Notifications" component={NotificationView} />
      </NotificationStack.Navigator>
    )
  } 

  const ReservationStack = createNativeStackNavigator();
  function ReservationScreen () {
    return (
      <ReservationStack.Navigator>
        <ReservationStack.Screen name="Resavation" component={ReservationView} options={{ headerShown: false, }} />
      </ReservationStack.Navigator>
    ) 
  }

  const ResidenceStack = createNativeStackNavigator();

  function ResidenceScreen () {
    return (
        <ResidenceStack.Navigator>
          <ResidenceStack.Screen name="Residence" component={ResidenceView} options={{ headerShown: false, }}/>
          {/* <ResidenceStack.Screen  />  */}
          {/* <ResidenceStack.Screen /> */}
        </ResidenceStack.Navigator>
    )
  }
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
      tabBarStyle: { backgroundColor: "white", height: 60,},
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

         {/* debut bouton de home screnn  */}
        <Tab.Screen name="Home-S" component={HomeScreen} options={{ headerShown: false,
       
         tabBarIcon: ({color, size}) => (
          <View style={[tw``]}>

            <Icon type='ionicon' name='home-sharp' size={29}   color={color} />
          </View>
         ),
          
         tabBarActiveTintColor: '#062737',
         tabBarInactiveTintColor: '#B4BEC3'
         }}/>
            {/* fin de bouton Home screen  */}

        <Tab.Screen name="Residences" component={ResidenceScreen} options={{ headerShown: false, 
         tabBarIcon: ({color, size}) => (
          <Icon type='ionicon' name='md-bed-sharp' size={29}   color={color} />
        ),
        tabBarActiveTintColor: '#062737',
        tabBarInactiveTintColor: '#B4BEC3'
        }}/>
 


     
        
        <Tab.Screen name="Reservation" component={ReservationScreen} options={{ headerShown: false, 
        tabBarIcon: ({color, size}) => (
          <Icon type='antdesign' name='wallet' size={29}   color={color} />
        ),
        tabBarActiveTintColor: '#062737',
        tabBarInactiveTintColor: '#B4BEC3'
        }}/>

        <Tab.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false, 
        tabBarIcon: ({color, size}) => (
          <Icon type='antdesign' name='notification' size={29}   color={color} />
        ),
        tabBarActiveTintColor: '#062737',
        tabBarInactiveTintColor: '#B4BEC3'
        }}/>

        {/* <Tab.Screen name="Creer" component={ChambreScreen} options={{ headerShown: false, 
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
        }}/> */}

      

        
    </Tab.Navigator>
  )
}



const Stack = createNativeStackNavigator();


export default function App() {

  // const userIdOnesignal = async() => {
  //   const data = await OneSignal.getDeviceState();
  //   console.log("dtattaa",data)
  // }

  // useEffect(() => {
  //   userIdOnesignal()
  // }, [])


  return (
    <Provider store={store}>

      <NavigationContainer>
        <Stack.Navigator initialRouteName='LogScreen'>
          <Stack.Screen name="LogScreen" component={LogScreen} options={{ headerShown: false, }} />
          <Stack.Screen name="Login" component={Login}  options={{ headerShown: false, }} />
          <Stack.Screen name="SignIn" component={SignIn}  options={{ headerShown: false, }} />
          <Stack.Screen name="Home-G" component={TabNavigation}  options={{ headerShown: false, }} />
          <Stack.Screen name="DetailsResidences" component={DetailsView} options={{ tabBarVisible: false, headerShown: false,}} />
          <Stack.Screen name="Chambres" component={ChambreView} options={{ tabBarVisible: false}} />
          <Stack.Screen name="ModifImage" component={ImageModif}  options={{ headerShown: false }}/>
          <Stack.Screen name="ModifEquipement" component={EquipementModif}  options={{ headerShown: false }}/>
          <Stack.Screen name="ModifCalendrier" component={CalendrierModif}  options={{ headerShown: false }}/>
          <Stack.Screen name="Profil" component={MenuParametre}  options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

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
