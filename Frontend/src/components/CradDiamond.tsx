import { Text } from "@gluestack-ui/themed";
import { Avatar, AvatarImage, Box, HStack } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { AvatarData } from "../json/Avatar";
import { Image } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { DiamonData } from "../json/Diamon";
import { useDispatch } from "react-redux";
import { SET_ADD_DIAMOND } from "../store/slices/userSlices";

export const CradDiamond = (props: DiamonData) => {
  const dispatch = useDispatch();
  return (
    <Box key={props.id}>
      <HStack mt={10}>
        <TouchableOpacity
          onPress={() => dispatch(SET_ADD_DIAMOND(props.amount))}
        >
          <Box
            display="flex"
            w={119}
            minWidth={100}
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
                {props.amount}
              </Text>

              <Box w={90} h={80}>
                <Image
                  source={props.img}
                  alt="diamon"
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "center",
                  }}
                ></Image>
              </Box>
              <HStack>
                <Text color="#F36C21" fontWeight="bold" fontSize="$md" mt={2}>
                  Rp.{props.price}
                </Text>
              </HStack>
            </LinearGradient>
          </Box>
        </TouchableOpacity>
      </HStack>
      <Box></Box>
    </Box>
  );
};
