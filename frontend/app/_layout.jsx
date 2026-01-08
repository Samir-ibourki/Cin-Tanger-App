import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";

// Keep native splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => { });

const queryClient = new QueryClient();
const { width, height } = Dimensions.get("window");

export default function Layout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for at least 2.5 seconds for branding
        await new Promise(resolve => setTimeout(resolve, 3500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        // Hide native splash screen
        await SplashScreen.hideAsync().catch(() => { });
      }
    }

    prepare();
  }, []);

  // Custom Splash Screen to show while the app is initializing
  if (!appIsReady) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar style="light" />
        <Image
          source={require("../assets/splash.png")}
          style={styles.splashImage}
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="reservation/confirmation" />
        <Stack.Screen name="reservation/seats" />
        <Stack.Screen name="film/[id]" />
      </Stack>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height,
  },
  splashImage: {
    width: width * 0.8,
    height: height * 0.8,
  },
});
