import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import { ChoseAvatar } from "./src/screen/ChoseAvatar";
import { Home } from "./src/screen/Home";
import { UpdateAvatar } from "./src/screen/UpdateAvatar";
import { Diamond } from "./src/screen/Diamond";
import { MatchPage } from "./src/screen/MatchPage";
import { GamePage } from "./src/screen/GamePage";
import { Payment } from "./src/screen/Payment";
import { Champion } from "./src/screen/Champion";

type Props = {};

const Root = (props: Props) => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ChoseAvatar"
          component={ChoseAvatar}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="UpdateAvatar"
          component={UpdateAvatar}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Diamond"
          component={Diamond}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MatchPage"
          component={MatchPage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="GamePage"
          component={GamePage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Champion"
          component={Champion}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
