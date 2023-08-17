import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';


//screen imports 
import LoginScreen from './screens/LoginScreen';
import LandingScreen from './screens/LandingScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingScreen from './screens/SettingScreen';
import RegisterScreen from './screens/RegisterScreen';
import CategoryScreen from './screens/Category';
import ViewScreen from './screens/View';
import ForgotScreen from './screens/ForgotPassword';
import MyCart from './screens/cartScreen';
import SearchResultsScreen from './screens/SearchScreen';
import BrandView from './screens/brandView';
import BrandScreen from './screens/BrandScreen';
import ManufactureView from './screens/ManufactureView';



import CartScreen from './screens/Cart';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();




const MainApp = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginScreen} options={{headerShown:false}}/>
          <Stack.Screen name='Register' component = {RegisterScreen} options={{headerShown:false}}/>
          <Stack.Screen name='Landing' component = {BottomTabs} options={{headerShown:false}}/>
          <Stack.Screen name='Category' component = {CategoryScreen} options={{headerShown:false}}/>
          <Stack.Screen name='View' component = {ViewScreen} options={{headerShown:false}}/>
          <Stack.Screen name='Forgot' component = {ForgotScreen} options={{headerShown:false}}/>
          <Stack.Screen name='Cart' component = {MyCart} options={{headerShown:true}}/>
          <Stack.Screen name='BrandView' component = {BrandView} options={{headerShown:false}}/>
          <Stack.Screen name='Brands' component = {BrandScreen} options={{headerShown:false}}/>
          <Stack.Screen name='searchResults' component = {SearchResultsScreen} options={{headerShown:true}}/>
          <Stack.Screen name='manufacturers' component = {ManufactureView} options={{headerShown:true}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
const BottomTabs = ({ route }) => {
  const { email, role } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          }
          
          else if (route.name === 'Categories') {
            iconName = 'cart';
          }
          
          else if (route.name === 'Profile') {
            iconName = 'account';
          }

          else if (route.name === 'Settings') {
            iconName = 'cog';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'orange', // Change the active tab color to your desired color
        inactiveTintColor: 'gray', // Change the inactive tab color to your desired color
      }}
    >

      <Tab.Screen name="Home" component={LandingScreen} initialParams={{ email, role }} options={{headerShown:false}} />
      
      <Tab.Screen name="Categories" component={CartScreen} initialParams={{ email, role }} options={{headerShown:true}}/>
      
      <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ email, role }} options={{headerShown:false}}/>

      <Tab.Screen name="Settings" component={SettingScreen} initialParams={{ email, role }} options={{headerShown:false}}/>
      
      
    </Tab.Navigator>
  );
};

export default MainApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
