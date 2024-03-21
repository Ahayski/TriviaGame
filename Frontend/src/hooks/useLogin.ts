import React from 'react';
import { useOAuth, useUser } from "@clerk/clerk-expo";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useState, useEffect } from "react";


export const useLogin = () => {
    const navigation = useNavigation<NavigationProp<Record<string, object>>>();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const { isLoaded, isSignedIn, user } = useUser();

    const loginButton = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

            if (createdSessionId) {
                setActive ?? ({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, [startOAuthFlow]);

    return loginButton;
};
