import { Button, ButtonText, HStack } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import React from "react";
interface ButtonProps {
  nameOne: string;
  nameTwo: string;
}
export const ButtonComponen = ({ nameOne, nameTwo }: ButtonProps) => {
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
        </HStack>
      </Box>
    </Box>
  );
};
