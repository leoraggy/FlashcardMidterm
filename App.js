import TriviaScreen from "./screens/TriviaScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeCreateStack from "./screens/HomeCreateStack";
import CreateScreen from "./screens/CreateScreen";
import TriviaStack from "./screens/TriviaStackScreen";
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="HomeCreate"
          component={HomeCreateStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="TriviaStack"
          options={{ headerShown: false }}
          component={TriviaStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
