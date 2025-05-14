import Options from "./OptionsScreen";
import TriviaScreen from "./TriviaScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function TriviaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Options" component={Options} />
      <Stack.Screen name="TriviaScreen" component={TriviaScreen} />
    </Stack.Navigator>
  );
}
