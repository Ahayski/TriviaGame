import React, { useState, useEffect } from 'react';
import { Text } from "@gluestack-ui/themed";
import socket from '../utils/socket';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { SET_WAITING_TIMER, SET_INGAME_TIMER } from '../store/slices/timerSlices';
import { RootState } from '../store/types/rootTypes';

export function TimerWaitingRoom({ navigation }: any) {
    const dispatch = useDispatch()
    const timer = useSelector((state: RootState) => state.timerReducer.timerWaiting)

    socket.on('matching', (data) => {
        dispatch(SET_WAITING_TIMER(data))
    })

    return (
        <Text fontWeight="bold" color="#FFC700" fontSize={"$5xl"}>
            00:{timer}
        </Text>
    )
}

export function TimerIngameRoom({ navigation }: any) {
    const dispatch = useDispatch()
    const timer = useSelector((state: RootState) => state.timerReducer.timerGame)

    socket.on('timer', (data) => {
        dispatch(SET_INGAME_TIMER(data))
    })

    return (
        <Text
            color="#0ACF83"
            textAlign="center"
            fontSize={"$3xl"}
            fontWeight="bold"
        >
            00:{timer}
        </Text>
    )
}