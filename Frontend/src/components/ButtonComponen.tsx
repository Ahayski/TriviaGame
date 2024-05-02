import { Button, ButtonText, HStack } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import React, { ButtonHTMLAttributes, ClassAttributes } from "react";
import { TouchableOpacity } from "react-native";
interface ButtonProps {
  nameOne: string;
  nameTwo: string;
  // onPressSave?: ClassAttributes<HTMLButtonElement> &
  //   ButtonHTMLAttributes<HTMLButtonElement>;
  // onPressCancel?: ClassAttributes<HTMLButtonElement> &
  //   ButtonHTMLAttributes<HTMLButtonElement>;
  onPressSave?: any;
  onPressCancel?: any;
  rest?: React.ComponentProps<"button">;
}

export const ButtonComponen = ({
  nameOne,
  nameTwo,
  onPressSave,
  onPressCancel,
  ...rest
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
          <TouchableOpacity>
            <Button
              width={120}
              h={42}
              {...rest}
              borderRadius={12}
              borderWidth={2}
              borderColor="#950707"
              bg="#CF0A0A"
              onPress={() => {
                console.log("cancel");
                onPressCancel(); // Invoke onPressCancel if it exists
              }}
              px={4}
            >
              <ButtonText fontSize={"$lg"}>{nameOne}</ButtonText>
            </Button>
          </TouchableOpacity>

          <TouchableOpacity>
            <Button
              width={120}
              h={42}
              borderRadius={12}
              borderWidth={2}
              {...rest}
              borderColor="#07955e"
              bg="#0ACF83"
              onPress={() => {
                console.log("onsave");
                onPressSave && onPressSave();
              }}
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
