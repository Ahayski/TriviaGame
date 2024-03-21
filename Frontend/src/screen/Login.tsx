import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
  Image,
  ImageBackground,
  Text,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { LayoutBg } from "../Layout/LayoutBg";
import { ImageLogo } from "../components/Image";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useLogin } from "../hooks/useLogin";
import { useUser } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export const Login = () => {
  const loginButton = useLogin();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
        signIn
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  useWarmUpBrowser();

  return (
    <LayoutBg>
      <View style={{ width: "100%", height: "100%", minHeight: "100%" }}>
        <Box flex={1} justifyContent="center" alignItems="center">
          <ImageLogo
            size={"lg"}
            width={250}
            height={250}
            alt="logo"
          ></ImageLogo>

          {isLoading ? (
            <ButtonSpinner color="#66D1FF" size={"small"} />
          ) : (
            <Box
              mx={"auto"}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                minWidth={"55%"}
                rounded="$full"
                bg="white"
                mt={10}
                py={5}
                mx={"auto"}
                onPress={onPress}
              >
                <Box mr={"auto"}>
                  <Image
                    source={require("../../assets/Image/iconGoogle.png")}
                    w={23}
                    h={23}
                    alt="iconGoogle"
                    mr={10}
                  ></Image>
                </Box>
                <ButtonText color="black" mx={"auto"}>
                  Continue with Google
                </ButtonText>
              </Button>
              <Text color="white" mt={30} fontSize={12}>
                by continue, you agree to the Terms and Privacy
              </Text>
            </Box>
          )}
        </Box>
      </View>
    </LayoutBg>
  );
};
