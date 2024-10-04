import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed";

import Config from "react-native-config";
import { config } from "@gluestack-ui/config";
import AppStack from "./src/stack/AppStack";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <StatusBar style="auto" />

        <AppStack />
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
