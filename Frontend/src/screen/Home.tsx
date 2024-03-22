import {
  Avatar,
  AvatarImage,
  Button,
  ButtonText,
  Center,
  Icon,
  Image,
  Input,
  Link,
  Pressable,
} from "@gluestack-ui/themed";
import { Box, Text } from "@gluestack-ui/themed";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ImageLogo } from "../components/Image";
import { LayoutBg } from "../Layout/LayoutBg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/types/rootTypes";
import { ToastAndroid } from "react-native";
import { SET_SIZE } from "../store/slices/sizeRoomSlices";
import { SET_USERS_ROOM } from "../store/slices/usersInRoomSlices";
import socket from "../utils/socket";

export const Home = ({ navigation }: any) => {
  const user = useSelector((state: RootState) => state.user.data);
  const roomSize = useSelector((state: RootState) => state.sizeRoom.size);
  const usersInRoom = useSelector((state: RootState) => state.usersInRoom.data);
  const dispatch = useDispatch();
  console.log("roomSize", roomSize);

  async function startGame() {
    try {

      socket.emit('joinRoom', {
        username: user.username,
        avatar: user.avatar
      });
      socket.on('matching', (data) => { })
      navigation.navigate("MatchPage")
    } catch (error) {
      alert("Network error");
    }
  }

  return (
    <View style={{ width: "100%", height: "100%", minHeight: "100%" }}>
      <LayoutBg>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          w={"100%"}
          h={"5%"}
          mt={45}
          px={10}
        >
          <ImageLogo alt="logo" size={"lg"}></ImageLogo>

          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            bg="#2a5668"
            borderRadius={"$full"}
            h={25}
            w={100}
          >
            <Image
              source={require("../../assets/Image/diamon.png")}
              alt="diamon"
              width={40}
              ml={-10}
              height={40}
            />
            <Text textAlign="center" color="white">
              {user.diamond ? user.diamond : 0}
            </Text>
            <Box ml={"auto"} borderRadius={4} bg="#00ff47">
              <TouchableOpacity onPress={() => navigation.navigate("Diamond")}>
                <AntDesign name="plussquareo" size={24} color="black" />
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>

        <Box
          w={"100%"}
          mx={"auto"}
          mt={"$16"}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          position="relative"
          zIndex={2}
        >
          <Avatar
            size="xl"
            borderRadius={"$full"}
            bg="#fff"
            p={1}
            borderWidth={2}
            borderColor="#000"
          >
            <AvatarImage
              alt="avatar"
              source={
                user.avatar
                  ? user.avatar
                  : require("../../assets/avatar/avatar3.jpg")
              }
            />
          </Avatar>

          <Pressable onPress={() => navigation.navigate("UpdateAvatar")}>
            <Box
              position="absolute"
              w={30}
              h={30}
              bg="#fff"
              bottom={-4}
              left={10}
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderWidth={2}
              borderColor="#000"
              borderRadius={"$full"}
            >
              <FontAwesome5 name="pen" size={14} color="black" />
            </Box>
          </Pressable>

          <Text color="white" mt={20}>
            {user.username ? user.username : "Molusca_Bertulang"}
          </Text>
        </Box>

        <Center w={"100%"} h={"27%"} mt={50}>
          <Image
            source={require("../../assets/Image/icon.png")}
            w={250}
            alt="icon"
            h={250}
          ></Image>
          <Button bg="#59B4DD" w={"40%"} borderRadius={"$xl"} mt={-20}>
            <TouchableOpacity onPress={startGame}>
              <ButtonText>Start Game</ButtonText>
            </TouchableOpacity>
          </Button>
        </Center>
      </LayoutBg>
    </View>
  );
};

// Daftar perubahan :
// 1. Di folder components aku tambahin file "TimerWaitingRoom.tsx"
// 2. DI store aku tambahin redux terbaru (timerSlices dll)
// 3. Di matchpage bagian hooksnya (di dalam )