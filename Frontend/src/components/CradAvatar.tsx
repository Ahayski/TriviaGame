import { Text } from "@gluestack-ui/themed";
import { Avatar, AvatarImage, Box, HStack } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { AvatarData } from "../json/Avatar";
import { Image } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { SET_AVATAR, SET_MIN_DIAMOND } from "../store/slices/userSlices";

export const CradAvatar = (props: AvatarData) => {
  // console.log(props)
  const dispatch = useDispatch()

  async function changeAvatar() {
    try {
      if (props.harga) {
        dispatch(SET_AVATAR(props.avatar))
        dispatch(SET_MIN_DIAMOND(props.harga))
      } else {
        dispatch(SET_AVATAR(props.avatar))
      }
    } catch (error) {
      alert("Network Error")
    }
  }

  return (
    <Box key={props.id}>
      <HStack mt={10} space={"md"}>
        <TouchableOpacity onPress={changeAvatar}>
          <Box
            display="flex"
            w={114}
            minWidth={100}
            height={160}
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
              <Avatar size="xl" borderWidth={1} borderColor={"#333"} mt={10}>
                <AvatarImage alt="Avatar" source={props.avatar} />
              </Avatar>
              <HStack>
                <Text color="white" mt={6} fontWeight="bold" fontSize="$xl">
                  {props.type}{" "}
                </Text>
                {props.Diamon && (
                  <Image
                    alt="diamon"
                    mt={9}
                    width={25}
                    height={25}
                    source={props.Diamon}
                  ></Image>
                )}
              </HStack>
            </LinearGradient>
          </Box>
        </TouchableOpacity>
      </HStack>
    </Box>
  );
};
