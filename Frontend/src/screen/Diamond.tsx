import {
  Avatar,
  AvatarImage,
  Box,
  Button,
  ButtonText,
  HStack,
  Text,
  View,
} from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

import { AvatarDiamon, avatarReguler } from "../json/Avatar";
import { LayoutBg } from "../Layout/LayoutBg";
import { CradAvatar } from "../components/CradAvatar";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, ScrollViewBase, TouchableOpacity } from "react-native";
import { CradDiamond } from "../components/CradDiamond";
import { DiamonData, DiamondJson } from "../json/Diamon";
import { Image } from "@gluestack-ui/themed";
import { ButtonComponen } from "../components/ButtonComponen";

export const Diamond = ({ navigation }: any) => {
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
            flex={1}
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            mt={"$1/3"}
          >
            <Box
              display="flex"
              width={"100%"}
              height={400}
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              flexWrap="wrap"
            >
              <Box
                width={"100%"}
                display="flex"
                flexWrap="wrap"
                flexDirection="row"
                gap={8}
                justifyContent="center"
                alignItems="center"
              >
                {DiamondJson.map((item) => (
                  <CradDiamond
                    key={item.id}
                    id={item.id}
                    pcs={item.pcs}
                    img={item.img}
                    price={item.price}
                  />
                ))}
              </Box>
            </Box>
            <ButtonComponen
              nameOne="Cancel"
              nameTwo="Purchase"
            ></ButtonComponen>
          </Box>
        </ScrollView>
      </View>
    </LayoutBg>
  );
};