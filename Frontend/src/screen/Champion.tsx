import {
    Avatar,
    AvatarGroup,
    AvatarImage,
    HStack,
    Image,
    Text,
} from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import React from "react";
import { View } from "react-native";
import { LayoutBg } from "../Layout/LayoutBg";
import { ImageLogo } from "../components/Image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AvatarFallbackText } from "@gluestack-ui/themed";
import { CradAvatar } from "../components/CradAvatar";
import { CradUser } from "../components/CradUser";
import { UserGamee } from "../json/User";
import { ButtonComponen } from "../components/ButtonComponen";

export const Champion = () => {
    return (
        <LayoutBg>
            <View style={{ width: "100%", height: "100%", minHeight: "100%" }}>
                <Box
                    display="flex"
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        mb={30}
                    >
                        <Text color="white" fontWeight="bold" fontSize="$2xl">
                            Congrats
                        </Text>
                        <HStack>
                            <Text color="white">Congrats, you got</Text>
                            <Text color="#FFC700" ml={3}>
                                1 diamond
                            </Text>
                        </HStack>
                    </Box>
                    <Box width={"100%"} height={400} mb={30}>
                        <Box flexDirection="row" justifyContent="space-evenly" h={0}>
                            <Avatar bg="$rose100" mt={70} position="relative" left={10}>
                                <AvatarImage
                                    alt="Avatar"
                                    source={require("../../assets/avatar/avatar1.jpg")}
                                />
                                <Box
                                    h={50}
                                    width={100}
                                    justifyContent="center"
                                    alignItems="center"
                                    mt={100}
                                >
                                    <Text color="white" fontSize={"$lg"} fontWeight="bold">
                                        MasBro
                                    </Text>
                                    <Text color="#FFC700" fontSize={"$sm"}>
                                        4000
                                    </Text>
                                </Box>
                            </Avatar>

                            <Avatar mt={10} position="relative">
                                <Box w={40} h={40} position="absolute" bottom={35} zIndex={4}>
                                    <MaterialCommunityIcons
                                        name="crown"
                                        size={40}
                                        color="#FFC700"
                                    />
                                </Box>
                                <AvatarImage
                                    alt="Avatar"
                                    source={require("../../assets/avatar/avatar2.jpg")}
                                />
                                <Box
                                    h={50}
                                    width={100}
                                    justifyContent="center"
                                    alignItems="center"
                                    mt={100}
                                >
                                    <Text color="white" fontSize={"$lg"} fontWeight="bold">
                                        Santi
                                    </Text>
                                    <Text color="#FFC700" fontSize={"$sm"}>
                                        8000
                                    </Text>
                                </Box>
                            </Avatar>

                            <Avatar mt={100} position="relative">
                                <AvatarImage
                                    alt="Avatar"
                                    source={require("../../assets/avatar/avatar3.jpg")}
                                />
                                <Box
                                    h={50}
                                    width={100}
                                    justifyContent="center"
                                    alignItems="center"
                                    mt={100}
                                >
                                    <Text color="white" fontSize={"$lg"} fontWeight="bold">
                                        Yanti
                                    </Text>
                                    <Text color="#FFC700" fontSize={"$sm"}>
                                        4000
                                    </Text>
                                </Box>
                            </Avatar>
                        </Box>
                        <Image
                            alt="podium"
                            marginLeft={10}
                            w={"100%"}
                            h={"100%"}
                            style={{
                                resizeMode: "contain",
                            }}
                            source={require("../../assets/Image/podiumtes.png")}
                        />

                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            w={"100%"}
                            h={"auto"}
                            mt={-90}
                        >
                            {/* crad user juara */}
                            <Box w={"90%"} h={200} bg="#EFEEFC" borderRadius={20}>
                                {UserGamee.slice(0, 2).map((item) => (
                                    <CradUser
                                        key={item.id}
                                        name={item.name}
                                        avatar={item.avatar}
                                        score={item.score}
                                        id={item.id}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box mb={30}>
                    <ButtonComponen nameOne="Return to Home" nameTwo="Play Again" />
                </Box>
            </View>
        </LayoutBg>
    );
};