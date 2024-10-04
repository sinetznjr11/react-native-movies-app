import { NavigationContainer } from "@react-navigation/native";

import DetailsScreen from "../screens/DetailsScreen";
import TabStack from "./TabStack";
import MoviesScreen from "../screens/MoviesScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#164e63",
            text: "white",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      >
        <Stack.Screen name="Movies App" component={TabStack} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({ route }) => ({
            title: route.params?.title || "Details",
            headerBackTitle: "Back",
            headerStyle: {
              backgroundColor: "white",
            },
            headerTitleStyle: {
              color: "black",
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
