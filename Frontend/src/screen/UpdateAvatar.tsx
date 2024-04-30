import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  Avatar,
  AvatarImage,
  Box,
  Button,
  ButtonText,
  HStack,
  Image,
  Text,
  View,
} from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LayoutBg } from "../Layout/LayoutBg";
import { UseAvatar } from "../hooks/Avatar/UseAvatar";
import { hendelUseUser } from "../hooks/User/useUser";
import { AvatarData } from "../interfaces/Avatar";
import { RootState } from "../store/types/rootTypes";

export const UpdateAvatar = ({ navigation }: any) => {
  const { hendelGetAvatar, avatarFre, avatarDiamon } = UseAvatar();
  const [selectAvatar, setSelectAvatar] = React.useState(0);
  const [purchase, setPurchase] = React.useState(false);
  // console.log("tes", purchase);
  const user = useSelector((state: RootState) => state.user.data);

  // console.log("userTESS", user);
  const { UpdateAvatarImage } = UseAvatar();
  const { UpdateUser, UserLoginId } = hendelUseUser({ navigation });
  const dispatch = useDispatch();
  // console.log("tes", selectAvatar);

  useEffect(() => {
    hendelGetAvatar();
    UserLoginId(user.id!);
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
              {avatarFre.slice(0, 3).map((item: AvatarData, index: number) => (
                <>
                  <Box key={index}>
                    <HStack mt={10} space={"md"}>
                      <TouchableOpacity
                        onPress={() => setSelectAvatar(item.id!)}
                        onPressOut={() => setSelectAvatar(0)}
                      >
                        <Box
                          display="flex"
                          w={106}
                          minWidth={100}
                          height={150}
                          mx={"auto"}
                          overflow="hidden"
                          borderRadius={"$xl"}
                          borderWidth={2}
                          borderColor={"#333"}
                        >
                          <LinearGradient
                            colors={["#66D1FF", "#0C1620"]}
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
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
                            <Avatar
                              w={75}
                              h={75}
                              borderWidth={1}
                              borderColor={"#333"}
                              mt={10}
                            >
                              <AvatarImage
                                alt="Avatar"
                                source={item.avatarImage}
                              />
                            </Avatar>
                            <HStack>
                              <Text
                                color="white"
                                mt={6}
                                fontWeight="bold"
                                fontSize="$xl"
                              >
                                {item.price === 0 ? "Free" : item.price}
                              </Text>
                            </HStack>
                          </LinearGradient>
                        </Box>
                      </TouchableOpacity>
                    </HStack>
                  </Box>
                </>
              ))}
            </HStack>

            <HStack space={"sm"} mx={"auto"}>
              {avatarDiamon
                .slice(12, 15)
                .map((item: AvatarData, index: number) => (
                  <Box key={index}>
                    <HStack mt={10} space={"md"}>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectAvatar(item.id!);
                        }}
                        onPressOut={() => setSelectAvatar(0)}
                      >
                        <Box
                          display="flex"
                          w={106}
                          minWidth={100}
                          height={150}
                          mx={"auto"}
                          overflow="hidden"
                          borderRadius={"$xl"}
                          borderWidth={2}
                          borderColor={"#333"}
                        >
                          <LinearGradient
                            colors={["#66D1FF", "#0C1620"]}
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
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
                            <Avatar
                              w={75}
                              h={75}
                              borderWidth={1}
                              borderColor={"#333"}
                              mt={10}
                            >
                              <AvatarImage
                                alt="Avatar"
                                source={item.avatarImage}
                              />
                            </Avatar>
                            <HStack>
                              <Text
                                color="white"
                                mt={6}
                                fontWeight="bold"
                                fontSize="$xl"
                              >
                                {item.price === 0 ? "Free" : item.price}
                              </Text>
                              {item.purchase === false ? (
                                <Image
                                  alt="diamon"
                                  mt={9}
                                  width={25}
                                  height={25}
                                  ml={2}
                                  source={require("../../assets/Image/diamon.png")}
                                ></Image>
                              ) : (
                                ""
                              )}
                            </HStack>
                          </LinearGradient>
                        </Box>
                      </TouchableOpacity>
                    </HStack>
                  </Box>
                ))}
            </HStack>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mx={"auto"}
            // bg="red"
            w={"100%"}
            h={100}
          >
            <HStack space={"xl"}>
              <TouchableOpacity>
                <Button
                  width={120}
                  h={42}
                  // {...rest}
                  borderRadius={12}
                  borderWidth={2}
                  borderColor="#950707"
                  bg="#CF0A0A"
                  px={4}
                  onPress={() => {
                    setSelectAvatar(0);
                  }}
                >
                  <ButtonText fontSize={"$lg"}>cancel</ButtonText>
                </Button>
              </TouchableOpacity>

              <TouchableOpacity>
                <Button
                  width={120}
                  h={42}
                  borderRadius={12}
                  borderWidth={2}
                  // {...rest}
                  borderColor="#07955e"
                  bg="#0ACF83"
                  onPress={() => {
                    UpdateAvatarImage(selectAvatar, user.email!, user.name!);
                  }}
                  px={4}
                >
                  <ButtonText fontSize={"$lg"}>Save</ButtonText>
                </Button>
              </TouchableOpacity>
            </HStack>
          </Box>
        </ScrollView>
      </View>
    </LayoutBg>
  );
};
