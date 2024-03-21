import { ImageBackground } from "@gluestack-ui/themed";
import React from "react";
interface LayoutProps {
  children: React.ReactNode;
}
export const LayoutBg = ({ children }: LayoutProps) => {
  return (
    <ImageBackground
      source={require("../../assets/Image/bg.png")}
      alt="bg"
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </ImageBackground>
  );
};
