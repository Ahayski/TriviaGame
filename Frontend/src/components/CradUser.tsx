import { Avatar } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { AvatarImage } from "@gluestack-ui/themed";
import { Box, HStack } from "@gluestack-ui/themed";
import React from "react";
import { UserGame } from "../json/User";
import { ScrollView } from "react-native";

export const CradUser = (props: UserGame) => {
    return (
        <Box mt={10}>
            <ScrollView>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Box
                        width={"80%"}
                        h={75}
                        minHeight={70}
                        bg="rgba(0, 0, 0, 0.5)"
                        borderRadius={10}
                        borderColor="#fff"
                        justifyContent="center"
                        borderWidth={3}
                    >
                        <HStack paddingLeft={8} alignItems="center">
                            <Avatar>
                                <AvatarImage alt="Avatar" source={props.avatar} />
                            </Avatar>
                            <Text fontWeight="bold" ml={10} my={"auto"} color="white">
                                {props.name}
                            </Text>
                        </HStack>
                    </Box>
                </Box>
            </ScrollView>
        </Box>
    );
};