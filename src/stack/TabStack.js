import MoviesScreen from "../screens/MoviesScreen";
import SearchScreen from "../screens/SearchScreen";
import TVShowsScreen from "../screens/TVShowsScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "#164e63", height: 3 },
      }}
    >
      <Tab.Screen name="Movies" component={MoviesScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="TVShows" component={TVShowsScreen} />
    </Tab.Navigator>
  );
};

export default TabStack;
