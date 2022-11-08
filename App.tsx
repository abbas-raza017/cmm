import 'react-native-gesture-handler';
import { AppNavigation } from './src/views/app-navigation/app-navigation.component';
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  );
};
