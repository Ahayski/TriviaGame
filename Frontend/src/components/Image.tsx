import { Image } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import React from "react";
import { StyleProp } from "react-native";

interface ImageProps {
  size?: any;
  alt?: string;

  width?: number | undefined; // Change the type to accept only number or undefined
  height?: number | undefined; // Change the type to accept only number or undefined
}

export const ImageLogo = ({ size, ...props }: ImageProps) => {
  return (
    <Box>
      <Image
        source={require("../../assets/Image/logo.png")}
        alt="logo"
        {...props}
        size={size}
      />
    </Box>
  );
};
