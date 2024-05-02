import {
  Box,
  Button,
  ButtonText,
  HStack,
  Text,
  View,
} from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";

import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image } from "@gluestack-ui/themed";
import { ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LayoutBg } from "../Layout/LayoutBg";
import { RootState } from "../store/types/rootTypes";
import { ApiRockGo } from "../utils/axios";
import * as WebBrowser from "expo-web-browser";
import { SAVE_SNAP } from "../store/slices/snapMidtransSlice";
import { hendelUseUser } from "../hooks/User/useUser";
export const Diamond = ({ navigation }: any) => {
  const [dataDiamon, setDataDiamon] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  console.log("userDiamon", user);

  const { UserLoginId } = hendelUseUser({ navigation });
  const [selectDiamon, setSelectDiamon] = useState<number>(0);
  const [selectAmout, setSelectAmout] = useState<number>(0);

  const heldelGetDiamon = async () => {
    try {
      const response = await ApiRockGo.get("/api/diamonds");
      // console.log(response.data.data);
      setDataDiamon(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const BuyDiamon = async (amount: number, itemid: number) => {
    const stringId = itemid.toString();
    try {
      const response = await ApiRockGo.post("/api/buyDiamond", {
        amount,
        itemid: stringId,
        email: user.email,
      });
      dispatch(SAVE_SNAP(response.data.data.url));
      WebBrowser.openBrowserAsync(response.data.data.url);
      if (response.data.code === 200) {
        console.log("masuk pak eko");
      }
      navigation.reset({
        index: 0,
        routes: [{ name: "Diamond" }],
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    heldelGetDiamon();

    // pop up snap
  }, [user.diamond]);
  return (
    <LayoutBg>
      <View
        width={"100%"}
        height={"100%"}
        minHeight={"$full"}
        key={reloadKey}
        position="relative"
      >
        <ScrollView>
          <Box position="absolute" top={5} left={5}>
            <TouchableOpacity
              style={{ position: "absolute", top: 50, left: 10 }}
              onPress={() => {
                navigation.navigate("Home");
                setReloadKey((prevKey) => prevKey + 1);
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
                {dataDiamon.map((item: any) => (
                  <Box key={item.id}>
                    <HStack mt={10}>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectDiamon(item.id);
                          setSelectAmout(item.price);
                        }}
                        onPressOut={() => setSelectDiamon(0)}
                      >
                        {selectDiamon === item.id && (
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
                        <Box
                          display="flex"
                          w={119}
                          minWidth={100}
                          position="relative"
                          height={150}
                          mx={"auto"}
                          borderRadius={"$xl"}
                          borderWidth={2}
                          borderColor={"#333"}
                          overflow="hidden"
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
                            <Text
                              textAlign="center"
                              mt={5}
                              fontWeight="bold"
                              color="#24FF00"
                              fontSize="$lg"
                            >
                              {item.amount}
                            </Text>

                            <Box w={90} h={80}>
                              {item.image && (
                                <Image
                                  source={item.image}
                                  alt="diamon"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    resizeMode: "center",
                                  }}
                                />
                              )}
                            </Box>
                            <HStack>
                              <Text
                                color="#F36C21"
                                fontWeight="bold"
                                fontSize="$md"
                                mt={2}
                              >
                                Rp.{item.price}
                              </Text>
                            </HStack>
                          </LinearGradient>
                        </Box>
                      </TouchableOpacity>
                    </HStack>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
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
                        setSelectDiamon(0);
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
                        BuyDiamon(selectAmout, selectDiamon);
                      }}
                      px={4}
                    >
                      <ButtonText fontSize={"$lg"}>Save</ButtonText>
                    </Button>
                  </TouchableOpacity>
                </HStack>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </View>
    </LayoutBg>
  );
};
