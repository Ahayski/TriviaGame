import {
  Avatar,
  AvatarImage,
  Box,
  HStack,
  Text,
  View,
} from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { SET_AVATAR } from "../store/slices/userSlices";
import { useDispatch } from "react-redux";
import { AvatarDiamon, avatarReguler } from "../json/Avatar";
import { LayoutBg } from "../Layout/LayoutBg";
import { CradAvatar } from "../components/CradAvatar";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, ScrollViewBase, TouchableOpacity } from "react-native";
import { ButtonComponen } from "../components/ButtonComponen";
import { ApiRockGo } from "../utils/axios";
import { AvatarData } from "../interfaces/Avatar";
import { UseAvatar } from "../hooks/Avatar/UseAvatar";

export const UpdateAvatar = ({ navigation }: any) => {
  const { hendelGetAvatar, avatarFre, avatarDiamon, UpdateAvatar } =
    UseAvatar();
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [selectedAvatarId, setSelectedAvatarId] = useState<any>(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    hendelGetAvatar();
  }, []);
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
              {avatarFre.slice(0, 3).map((item: AvatarData) => (
                <>
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      // UpdateAvatar(item.id);
                      setSelectedAvatarId(item.id);
                      dispatch(SET_AVATAR(item.avatarImage));
                    }}
                  >
                    <CradAvatar
                      id={item.id}
                      key={item.id}
                      avatarImage={item.avatarImage}
                      price={item.price}
                    />
                  </TouchableOpacity>
                </>
              ))}
            </HStack>

            <HStack space={"sm"} mx={"auto"}>
              {avatarDiamon.slice(12, 15).map((item: AvatarData) => (
                <CradAvatar
                  key={item.id}
                  avatarImage={item.avatarImage}
                  purchase={item.purchase}
                  price={item.price}
                />
              ))}
            </HStack>
          </Box>
          <ButtonComponen
            nameOne="Cancel"
            nameTwo="Save"
            onPressSave={() => {}}
            onPressCancel={() => navigation.navigate("Home")}
          />
        </ScrollView>
      </View>
    </LayoutBg>
  );
};
