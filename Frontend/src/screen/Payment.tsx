import { Box, ImageBackground, Text } from "@gluestack-ui/themed";
import { LayoutBg } from "../Layout/LayoutBg";

import { View } from 'react-native'
import React, { Component } from 'react'

export const Payment = ({ navigation }: any) => {

    return (
        <View style={{ width: "100%", height: "100%", minHeight: "100%" }}>
            <LayoutBg>
                <Text>Payment</Text>
            </LayoutBg>
        </View>
    )

}