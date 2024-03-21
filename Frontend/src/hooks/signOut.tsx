import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth, useOAuth } from "@clerk/clerk-expo";
import { Button } from "@gluestack-ui/themed";

const SignOut = () => {
    const { isLoaded, signOut } = useAuth();
    if (!isLoaded) {
        return null;
    }
    return (
        <View>
            <Button onPress={() => signOut()}></Button>
        </View>
    );
};

export default SignOut;

const styles = StyleSheet.create({});