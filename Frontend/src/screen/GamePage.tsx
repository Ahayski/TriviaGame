import { Center, Text } from "@gluestack-ui/themed";
import { Box, AvatarImage } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LayoutBg } from "../Layout/LayoutBg";
import { HStack } from "@gluestack-ui/themed";
import { QuisJson } from "../json/Quis";
import { Progress } from "@gluestack-ui/themed";
import { ProgressFilledTrack } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../store/types/rootTypes";

export const GamePage = ({ navigation }: any) => {
    const user = useSelector((state: RootState) => state.user.data)
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null); // Menambahkan state untuk menyimpan jawaban yang dipilih
    const Questions = QuisJson[questionIndex];
    const QuestLength = QuisJson.length;
    const [questionLength, setQuestionLength] = useState<number>(1)

    const hendelAnswer = (question: string, index: any) => {
        setSelectedOption(index); // Menyimpan jawaban yang dipilih
        if (question === Questions.answer) {
            setAnswered(true);
            console.log("hallo", question);
        } else {
            setAnswered(false);
        }
    };

    const handleNextQuestion = () => {
        setSelectedOption(null); // Reset pilihan jawaban
        setAnswered(false);
        setQuestionLength(prevLength => prevLength + 1);
        if (questionLength == QuestLength) {
            navigation.navigate("Champion");
        } else {
            setQuestionIndex((prevIndex) => prevIndex + 1);
        }
    };

    return (
        <View style={{ width: "100%", height: "100%", minHeight: "100%" }}>
            <LayoutBg>
                <Box
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                    position="relative"
                >
                    <Box
                        w={"90%"}
                        mt={10}
                        h={"90%"}
                        bg="rgba(0, 0, 0, 0.5)"
                        borderRadius={20}
                        position="relative"
                        overflow="hidden"
                    >
                        <Box marginLeft={"auto"} mt={18} pr={20}>
                            <HStack>
                                <FontAwesome name="trophy" size={24} color="#FFC700" />
                                <Text color="white" ml={5}>
                                    12300
                                </Text>
                            </HStack>
                        </Box>

                        <Box my={20}>
                            <Text
                                color="#0ACF83"
                                textAlign="center"
                                fontSize={"$3xl"}
                                fontWeight="bold"
                            >
                                00:30
                            </Text>
                        </Box>

                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            w={"100%"}
                        >
                            <Box
                                w={"85%"}
                                h={"auto"}
                                p={10}
                                borderWidth={2}
                                borderColor="rgba(0,0,0, 0.3)"
                                borderRadius={15}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Text textAlign="center" color="white">
                                    {Questions.questionTitle}
                                </Text>
                            </Box>
                            {Questions.question.map((question: any, index: number) => (
                                <TouchableOpacity
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                    key={index}
                                    onPress={() => hendelAnswer(question, index)}
                                    disabled={answered}
                                >
                                    <Box
                                        mt={30}
                                        w={"85%"}
                                        h={40}

                                        px={14}
                                        justifyContent="center"
                                        borderRadius={10}
                                        // bg="#fff"
                                        bg={
                                            selectedOption === index
                                                ? Questions.answer === question
                                                    ? "#fff"
                                                    : "#fff"
                                                : "#fff"
                                        }
                                    >
                                        <Text
                                            width={"100%"}
                                            color={selectedOption === index ? "black" : "black"}
                                            fontSize={"$md"}
                                            fontWeight="bold"
                                            textAlign="left"
                                        >
                                            {question}
                                        </Text>

                                        {selectedOption === index && (
                                            <Box width={"60%"} height={30} display="flex" gap={35} flexDirection="row" position="absolute" justifyContent="flex-end" right={10}>
                                                <Box>
                                                    <AvatarImage
                                                        alt="avatar"
                                                        width={30}
                                                        height={30}
                                                        source={require("../../assets/avatar/avatar4.jpg")}
                                                    />

                                                </Box>
                                                <Box >
                                                    <AvatarImage
                                                        alt="avatar"
                                                        width={30}
                                                        height={30}
                                                        source={require("../../assets/avatar/avatar4.jpg")}
                                                    />

                                                </Box>
                                                <Box mr={20}>
                                                    <AvatarImage
                                                        alt="avatar"
                                                        width={30}
                                                        height={30}
                                                        source={require("../../assets/avatar/avatar4.jpg")}
                                                    />

                                                </Box>

                                            </Box>

                                        )}
                                    </Box>
                                </TouchableOpacity>
                            ))}

                            {answered && (
                                <TouchableOpacity onPress={handleNextQuestion}>
                                    <Text color="white" mt={20}>
                                        Next Question
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </Box>
                        <Box w={"100%"} h={20} position="absolute" bottom={0} ml={10}>
                            <Progress value={40} bgColor="white" w={"95%"} size="lg">
                                <ProgressFilledTrack />
                            </Progress>
                        </Box>
                    </Box>
                </Box>
            </LayoutBg>
        </View >
    );
};