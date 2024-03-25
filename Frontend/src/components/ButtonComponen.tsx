import { Button, ButtonText, HStack } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";
interface ButtonProps {
  nameOne: string;
  nameTwo: string;
  onPressSave?: () => void;
  onPressCancel?: () => void;
}
export const ButtonComponen = ({
  nameOne,
  nameTwo,
  onPressSave,
  onPressCancel,
}: ButtonProps) => {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mx={"auto"}
        // bg="red"
        w={"100%"}
        h={100}
      >
        <HStack space={"xl"}>
          <TouchableOpacity onPress={onPressCancel}>
            <Button
              width={120}
              h={42}
              borderRadius={12}
              borderWidth={2}
              borderColor="#950707"
              bg="#CF0A0A"
              px={4}
            >
              <ButtonText fontSize={"$lg"}>{nameOne}</ButtonText>
            </Button>
          </TouchableOpacity>

          <TouchableOpacity onPress={onPressSave}>
            <Button
              width={120}
              h={42}
              borderRadius={12}
              borderWidth={2}
              borderColor="#07955e"
              bg="#0ACF83"
              px={4}
            >
              <ButtonText fontSize={"$lg"}>{nameTwo}</ButtonText>
            </Button>
          </TouchableOpacity>
        </HStack>
      </Box>
    </Box>
  );
};
