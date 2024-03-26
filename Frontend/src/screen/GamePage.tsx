import { Text } from "@gluestack-ui/themed";
import { Box, AvatarImage } from "@gluestack-ui/themed";
import React, { useState, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LayoutBg } from "../Layout/LayoutBg";
import { HStack } from "@gluestack-ui/themed";
import { Progress } from "@gluestack-ui/themed";
import { ProgressFilledTrack } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../store/types/rootTypes";
import socket from "../utils/socket";
import { SET_QUESTION } from "../store/slices/questionSlices";
import { TimerIngameRoom } from "../components/TimerWaitingRoom";
import { SET_SCORE } from "../store/slices/scoreSlices";
import { SET_INGAME_TIMER } from "../store/slices/timerSlices";

export const GamePage = ({ navigation }: any) => {
    const user = useSelector((state: RootState) => state.user.data)
    const timer = useSelector((state: RootState) => state.timerReducer.timerGame)
    const [answered, setAnswered] = useState(false);
    const [selectedOption, setSelectedOption] = useState(7);
    const [counter, setCounter] = useState<number>()
    const dispatch = useDispatch()
    const question = useSelector((state: RootState) => state.question)
    const [questionLength, setQuestionLength] = useState<number>(5)
    const [bgRight, setBgRight] = useState("#fff");
    const [bgFalse, setBgFalse] = useState("#fff");
    const score = useSelector((state: RootState) => state.score.score)
    const [answerStatus, setAnswerStatus] = useState(false)
    const [waitingTime, setWaitingTime] = useState()

    const hendelAnswer = (option: string, index: number) => {
        setSelectedOption(index); // Menyimpan jawaban yang dipilih
        socket.emit("selectedOption",)
        if (option === question.answer) {
            setAnswerStatus(true)
        } else {
            setAnswerStatus(false)
        }
    };

    const handleNextQuestion = () => {
        if (counter!! < questionLength) {
            setSelectedOption(7) // Reset pilihan jawaban
            setAnswered(false)
            setAnswerStatus(false)
            dispatch(SET_INGAME_TIMER(15))
        } else if (counter!! == questionLength) {
            navigation.navigate("Champion");
        } else {

        }
    };

    socket.on("counter", (data) => {
        setCounter(data)
    })
    socket.on("question", (data) => {
        dispatch(SET_QUESTION(data))
    })
    socket.on("validateAnswerTime", (data) => {
        setWaitingTime(data)
    })

    useEffect(() => {
        if (timer === 0) {
            setBgRight("#52A6CD")
            setBgFalse("red")
            setAnswered(true)
            if (answerStatus) {
                dispatch(SET_SCORE(100))
                let scoreUser = {
                    username: user.name,
                    avatar: user.avatar,
                    score: score
                }
                socket.emit("score", scoreUser)
            }
            setTimeout(() => {
                console.log(score)
                handleNextQuestion()
            }, 3600);
        }
    }, [timer]);

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
                                    {score}
                                </Text>
                            </HStack>
                        </Box>

                        <Box my={20}>
                            <TimerIngameRoom />
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
                                    {question.question}
                                </Text>
                            </Box>
                            {question.options.map((option: string, index: number) => (
                                <TouchableOpacity
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                    key={index}
                                    onPress={() => hendelAnswer(option, index)}
                                    disabled={answered}
                                >
                                    <Box
                                        mt={30}
                                        w={"85%"}
                                        h={40}
                                        px={14}
                                        justifyContent="center"
                                        borderRadius={10}
                                        bg={
                                            timer === 0 && selectedOption === index
                                                ? question.answer === option
                                                    ? bgRight
                                                    : bgFalse
                                                : timer === 0 && question.answer === option
                                                    ? bgRight
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
                                            {option}
                                        </Text>

                                        {selectedOption === index && (
                                            <Box width={"60%"} height={30} display="flex" gap={35} flexDirection="row" position="absolute" justifyContent="flex-end" right={30}>
                                                <Box>
                                                    <AvatarImage
                                                        alt="avatar"
                                                        width={30}
                                                        height={30}
                                                        source={user.avatar}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                </TouchableOpacity>
                            ))}
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
}