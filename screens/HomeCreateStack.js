import HomeScreen from "./HomeScreen";
import CreateScreen from "./CreateScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function HomeCreateStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Create" component={CreateScreen} />
    </Stack.Navigator>
  );
}
