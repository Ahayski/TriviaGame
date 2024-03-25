import { Text } from "@gluestack-ui/themed";
import { Avatar, AvatarImage, Box, HStack } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

import { Image } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SET_AVATAR, SET_MIN_DIAMOND } from "../store/slices/userSlices";
import { AvatarData } from "../interfaces/Avatar";

import { UseAvatar } from "../hooks/Avatar/UseAvatar";

export const CradAvatar = (props: AvatarData) => {
  // console.log(props)
  const dispatch = useDispatch();

  // console.log("tokenRidux", tokenRidux);

  // console.log("tokenStorage", token);

  return (
    <Box key={props.id}>
      <HStack mt={10} space={"md"}>
        <TouchableOpacity>
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
              <Avatar
                w={75}
                h={75}
                borderWidth={1}
                borderColor={"#333"}
                mt={10}
              >
                <AvatarImage alt="Avatar" source={props.avatarImage} />
              </Avatar>
              <HStack>
                <Text color="white" mt={6} fontWeight="bold" fontSize="$xl">
                  {props.price === 0 ? "Free" : props.price}
                </Text>
                {props.purchase === false ? (
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
  );
};
