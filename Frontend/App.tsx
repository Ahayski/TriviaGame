import { StyleSheet, View, Button } from "react-native";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import * as SecureStore from "expo-secure-store";
import { config } from "@gluestack-ui/config";
import Root from "./Root";
import { RootLogin } from "./RootLogin";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { Provider } from "react-redux";
import rootReducer from "./src/store/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import React, { useEffect } from "react";
import socket from "./src/utils/socket";

const store = configureStore({
  reducer: rootReducer,
});

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default function App() {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    socket.on("connect", () => {});
  }, []);

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={Constants?.expoConfig?.extra?.clerkPublishableKey}
    >
      <GluestackUIProvider config={config}>
        <Provider store={store}>
          <SignedIn>
            <Root />
            <SignOut />
          </SignedIn>
          <SignedOut>
            <RootLogin />
          </SignedOut>
        </Provider>
      </GluestackUIProvider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
