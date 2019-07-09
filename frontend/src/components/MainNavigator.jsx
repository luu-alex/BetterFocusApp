import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './HomeScreen/HomeScreen';
import Profile from './ProfileScreen/Profile';


const mainNavigator = createStackNavigator({
    Home: {screen: HomeScreen},
    Profile: {screen: ProfileScreen},
});


const MainNavigator = createAppContainer(mainNavigator);

export default MainNavigator;
