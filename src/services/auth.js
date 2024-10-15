import axios from 'axios'

export function loginUser(payload) {
    return axios.post(import.meta.env.VITE_BASEURL + '/auth/login', { ...payload })
}

export function registerUser(payload) {
    return axios.post(import.meta.env.VITE_BASEURL + '/auth/register', { ...payload })
}


// import { auth } from "./firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";

// export const doCreateUserWithEmailAndPassword = async (email, password) => {
//     try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         return userCredential;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };

// export const loginUser = async (payload) => {
//     try {
//         const response = await auth.signInWithEmailAndPassword(payload.email, payload.password);
//         return response;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };

// export const logout = async () => {
//     try {
//         const response = await auth.signOut();
//         return response;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };

// export const changePassword = async (payload) => {
//     try {
//         const response = await auth.currentUser.updatePassword(payload.password);
//         return response;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };

// export const resetPassword = async (payload) => {
//     try {
//         const response = await auth.sendPasswordResetEmail(payload.email);
//         return response;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };

// export const sendEmailVerification = async () => {
//     try {
//         const response = await auth.currentUser.sendEmailVerification();
//         window.location.href = "/";
//         return response;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };

// export const registerUser = async (payload) => {
//     try {
//         const response = await auth.createUserWithEmailAndPassword(payload.email, payload.password);
//         return response;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };
