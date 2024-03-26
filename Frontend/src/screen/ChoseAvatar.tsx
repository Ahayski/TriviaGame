import React, { useState, useEffect } from "react";
import {
  Avatar,
  AvatarImage,
  Box,
  Button,
  FormControl,
  Image,
  ImageBackground,
  Text,
} from "@gluestack-ui/themed";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { avatarReguler } from "../json/Avatar";
import { Input } from "@gluestack-ui/themed";
import { InputSlot } from "@gluestack-ui/themed";
import { InputIcon } from "@gluestack-ui/themed";
import { SearchIcon } from "@gluestack-ui/themed";
import { InputField } from "@gluestack-ui/themed";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { ButtonText } from "@gluestack-ui/themed";
import { Link } from "@gluestack-ui/themed";
import { LayoutBg } from "../Layout/LayoutBg";
import { ImageLogo } from "../components/Image";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-expo";
import {
  SET_EMAIL,
  SET_AVATAR,
  SET_USERNAME,
  SET_ALL,
} from "../store/slices/userSlices";

import { ApiRockGo } from "../utils/axios";
import { RootState } from "../store/types/rootTypes";
import { UseAvatar } from "../hooks/Avatar/UseAvatar";
import { SET_TOKEN } from "../store/slices/tokenUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hendelUseUser } from "../hooks/User/useUser";

export const ChoseAvatar = ({ navigation }: any) => {
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const dispatch = useDispatch();

  const { isLoaded, isSignedIn, user } = useUser();
  const { GetAvatarFre, avatarGETFre, selectAvatar, setSelectAvatar } =
    UseAvatar();
  const { setName, handleRegister } = hendelUseUser({ navigation });
  useEffect(() => {
    // GetAvatarFre();

    GetAvatarFre();
    console.log("Komponen App dimuat");
    if (isLoaded && isSignedIn) {
      const email = user.emailAddresses[0].emailAddress;
      dispatch(SET_EMAIL(email));
    }
  }, [isLoaded, isSignedIn]);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <LayoutBg>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Box flex={1} justifyContent="center" alignItems="center">
              <Box justifyContent="center" alignItems="center">
                <ImageLogo alt="logo" width={250} height={250}></ImageLogo>
              </Box>
              <Text color="white" fontWeight="bold" fontSize="$lg" mb={20}>
                Choose Your Avatar
              </Text>

              <Box>
                <FormControl>
                  <Box
                    display="flex"
                    p={2}
                    flexDirection="row"
                    flexWrap="wrap"
                    width={300}
                    justifyContent="center"
                    gap={10}
                  >
                    {avatarGETFre?.map((item: any) => (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectAvatar(item.id);
                          dispatch(SET_AVATAR(item.avatarImage));
                        }}
                        key={item.id}
                        onPressIn={() => setHoveredItemId(item.id)}
                        onPressOut={() => {
                          setHoveredItemId(null);
                          setSelectAvatar(0);
                        }}
                      >
                        {selectAvatar === item.id && (
                          <Box
                            position="absolute"
                            bottom={0}
                            right={0}
                            zIndex={1}
                          >
                            <AntDesign
                              name="checkcircle"
                              size={24}
                              color="#59B4DD"
                            />
                          </Box>
                        )}
                        <Avatar size="lg" borderRadius="$full">
                          <AvatarImage
                            alt="avatar"
                            style={{
                              transform: [
                                { scale: hoveredItemId === item.id ? 1.4 : 1 },
                              ],
                            }}
                            source={item.avatarImage}
                          />
                        </Avatar>
                      </TouchableOpacity>
                    ))}
                    <Input
                      size="md"
                      width={"90%"}
                      variant="outline"
                      bg="white"
                      mt={15}
                      borderRadius={"$xl"}
                    >
                      <InputSlot pl="$3">
                        <FontAwesome
                          name={"pencil-square-o"}
                          size={24}
                          color="black"
                        ></FontAwesome>
                      </InputSlot>
                      <InputField
                        color="black"
                        type="text"
                        placeholder="your name..."
                        onChangeText={(text) => setName(text)}
                      />
                    </Input>
                    <Button
                      onPress={handleRegister}
                      disabled={!selectAvatar || !setName}
                      bg="#59B4DD"
                      borderRadius="$xl"
                      width={"90%"}
                    >
                      <ButtonText>Submit</ButtonText>
                    </Button>
                  </Box>
                </FormControl>
              </Box>
            </Box>
          </ScrollView>
        </KeyboardAvoidingView>
      </LayoutBg>
    </View>
  );
};
