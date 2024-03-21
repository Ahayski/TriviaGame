import {
  Avatar,
  AvatarImage,
  Box,
  HStack,
  Heading,
  Image,
} from "@gluestack-ui/themed";
import React, { useState, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { LayoutBg } from "../Layout/LayoutBg";
import { Text } from "@gluestack-ui/themed";
import { ImageLogo } from "../components/Image";
import { AntDesign } from "@expo/vector-icons";
import { CradUser } from "../components/CradUser";
import { UserGamee } from "../json/User";
import socket from "../utils/socket";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../store/types/rootTypes";
import { SET_SIZE } from "../store/slices/sizeRoomSlices";
import { SET_USERS_ROOM } from "../store/slices/usersInRoomSlices";


export const MatchPage = ({ navigation }: any) => {
  const [usersInRoom, setUsersInRoom] = useState<any[]>([])
  const dispatch = useDispatch();
  const roomSize = useSelector((state: RootState) => state.sizeRoom.size)
  const user = useSelector((state: RootState) => state.user.data)
  // const usersInRoom = useSelector((state: RootState) => state.usersInRoom.data)
  const [time, setTime] = useState<any>()

  async function handleBack() {
    try {
      socket.emit('logout')
      navigation.navigate("Home")
    } catch (error) {
      console.log("Error bang")
    }
  }

  useEffect(() => {
    socket.emit('joinRoom', {
      username: user.username,
      avatar: user.avatar
    });
    socket.on('countdown', (data) => {
      setTime(data)
    })
  }, []);

  useEffect(() => {
    socket.on('usersCount', (data) => {
      dispatch(SET_SIZE(data))
    })
    socket.on('usersInWaitingRoom', (data) => {
      setUsersInRoom(data)
    })
  }, [roomSize, usersInRoom]);

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

          <Box>
            <TouchableOpacity
              style={{ paddingRight: 20 }}
              onPress={handleBack}
            >
              <AntDesign name="closecircle" size={24} color="black" />
            </TouchableOpacity>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={20}
          w={"100%"}
          mb={20}
        >
          <Text fontWeight="bold" color="#FFC700" fontSize={"$5xl"}>
            00:{time}
          </Text>
          <Text color="white" mt={-5}>
            Finding Opponent
          </Text>
          <Text color="white" mt={1}>
            <Text color="#18D742">{roomSize}</Text> /5
          </Text>
        </Box>
        <TouchableOpacity onPress={() => navigation.navigate("GamePage")}>
          {usersInRoom.map((item: any) => (
            <CradUser
              key={item.id}
              id={item.id}
              name={item.username}
              avatar={item.avatar}
            />
          ))}
        </TouchableOpacity>
      </LayoutBg>
    </View>
  );
};