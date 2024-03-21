import {
  Avatar,
  AvatarImage,
  Box,
  HStack,
  Text,
  View,
} from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { SET_AVATAR } from "../store/slices/userSlices";
import { useDispatch } from 'react-redux';
import { AvatarDiamon, avatarReguler } from "../json/Avatar";
import { LayoutBg } from "../Layout/LayoutBg";
import { CradAvatar } from "../components/CradAvatar";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, ScrollViewBase, TouchableOpacity } from "react-native";
import { ButtonComponen } from "../components/ButtonComponen";

export const UpdateAvatar = ({ navigation }: any) => {
  const dispatch = useDispatch();

  return (
    <LayoutBg>
      <View
        width={"100%"}
        height={"100%"}
        minHeight={"$full"}
        position="relative"
      >
        <ScrollView>
          <Box position="absolute" top={5} left={5}>
            <TouchableOpacity
              style={{ position: "absolute", top: 50, left: 10 }}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <HStack>
                <Ionicons name="arrow-back-sharp" size={30} color="black" />
                <Text fontWeight="bold" color="black" fontSize="$lg" mt={2}>
                  Back
                </Text>
              </HStack>
            </TouchableOpacity>
          </Box>

          <Box
            display="flex"
            mt={"$1/2"}
            flexWrap="wrap"
            width={"100%"}
            height={"auto"}
            justifyContent="center"
            alignItems="center"
            alignContent="center"
          >
            <HStack space={"sm"} mx={"auto"}>
              {avatarReguler.slice(0, 3).map((item) => (
                <CradAvatar
                  id={item.id}
                  key={item.id}
                  avatar={item.avatar}
                  type={item.type}
                />
              ))}
            </HStack>

            <HStack space={"sm"} mx={"auto"}>
              {AvatarDiamon.slice(0, 3).map((item) => (
                <CradAvatar
                  key={item.id}
                  avatar={item.avatar}
                  type={item.type}
                  harga={item.harga}
                  Diamon={item.Diamon}
                />
              ))}
            </HStack>
          </Box>
          <ButtonComponen nameOne="Cancel" nameTwo="Save" />
        </ScrollView>
      </View>
    </LayoutBg>
  );
};
