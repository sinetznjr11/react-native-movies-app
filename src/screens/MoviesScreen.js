import { Box, Text } from "@gluestack-ui/themed";
import MoviesContainer from "../components/containers/MoviesContainer";

const MoviesScreen = ({ navigation, route }) => (
  <MoviesContainer navigation={navigation} route={route} />
);

export default MoviesScreen;
