import { Box, Text, VStack } from "@gluestack-ui/themed";
import { ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <VStack alignItems="center" space="md" py="$8">
      <ActivityIndicator />
      <Text>Loading...</Text>
    </VStack>
  );
};

export default Loading;
