// import React, { useEffect } from 'react';
// import { useUser } from "@clerk/clerk-expo";
// import { useNavigation, NavigationProp } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import { SET_EMAIL } from '../store/rootReducer';

// export const useLogin = () => {
//     const navigation = useNavigation<NavigationProp<Record<string, object>>>();
//     const { isLoaded, isSignedIn, user } = useUser();
//     const dispatch = useDispatch()


//     useEffect(() => {
//         if (isLoaded && isSignedIn) {
//             // Use map to get an array of email addresses
//             const emailAddresses = user.emailAddresses.map(emailAddress => emailAddress.emailAddress);

//             // Assuming you want to set the first email address, modify this part as needed
//             if (emailAddresses.length > 0) {
//                 // setEmail(emailAddresses[0]);
//                 dispatch(SET_EMAIL(emailAddresses[0]))
//             }
//         }
//     }, [isLoaded, isSignedIn, user!.emailAddresses]);

// };