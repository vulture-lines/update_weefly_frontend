// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  GoogleAuthProvider,
  PhoneAuthProvider,
  RecaptchaVerifier,
  sendPasswordResetEmail,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyC9P8uYHfOT8F2fTw4ad7WYTHMtv65lCf8",
  // authDomain: "weefly-auth.firebaseapp.com",
  // projectId: "weefly-auth",
  // storageBucket: "weefly-auth.firebasestorage.app",
  // messagingSenderId: "309755458136",
  // appId: "1:309755458136:web:f5b55ba6d5adb9f4ef102d",
  // measurementId: "G-L0XHNZMQPX",
  apiKey: "AIzaSyBvbsYRFFW_cllyCnDp9hw55KW8BLXxxRg",
  authDomain: "weefly-b03d0.firebaseapp.com",
  projectId: "weefly-b03d0",
  storageBucket: "weefly-b03d0.firebasestorage.app",
  messagingSenderId: "552620785662",
  appId: "1:552620785662:web:c3e4f650eb8c1819160aaf",
};

// Initialize Firebase
const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
auth.useDeviceLanguage();

auth.languageCode = "eng";
export { auth, provider, signInWithPopup, signOut };

/////////////////////////
//
// google login
//
////////////////////////
export const HandleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const UserDetails = result.user;
    console.log("UserDetails:", UserDetails);

    if (UserDetails) {
      const Payloads = {
        uid: UserDetails.uid,
        email: UserDetails.email,
        name: UserDetails.displayName,
        photoURL: UserDetails.photoURL,
        phoneNumber: UserDetails.phoneNumber,
      };
      return Payloads;
      
    }

    // if (!UserDetails.phoneNumber && phoneNumberInput && otpInput) {
    //   if (!window.recaptchaVerifier) {
    //     window.recaptchaVerifier = new RecaptchaVerifier(
    //       "recaptcha-container",
    //       {
    //         size: "invisible",
    //         callback: (response) => {
    //           console.log("Recaptcha resolved", response);
    //         },
    //       },
    //       auth
    //     );
    //   }

    //   const phoneProvider = new PhoneAuthProvider(auth);
    //   const verificationId = await phoneProvider.verifyPhoneNumber(
    //     phoneNumberInput,
    //     window.recaptchaVerifier
    //   );

    //   const credential = PhoneAuthProvider.credential(verificationId, otpInput);
    //   await UserDetails.linkWithCredential(credential);

    //   console.log("✅ Phone number linked successfully.");
    // }

    return result;
  } catch (err) {
    console.error("Login Error:", err);
    alert(err.message);
  }
};

/////////////////////////
//
// google logout
//
////////////////////////
export const HandleGoogleLogout = async () => {
  try {
    const result = await signOut(auth);
    console.log("User Info:", result.user);
    return result;
  } catch (err) {
    console.error("Login Error:", err);
  }
};

/////////////////////////
//
// Get current user
//
////////////////////////

export const GetCurrentUser = () => {
  const user = auth.currentUser;
  if (user) {
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
    };
  } else {
    console.log("No user is signed in.");
    return null;
  }
};

////////////////////////
//
// Google Forgot Password
//
////////////////////////
export const HandleGoogleForgotPassword = async ({ email }) => {
  try {
    const result = await sendPasswordResetEmail(auth, email);
    const Message = "Password reset email sent. Check your inbox.";
    console.log(result);
    return Message;
  } catch (err) {
    console.error("Login Error:", err);
  }
};

/////////////////////////
//
// SendOTP
//
////////////////////////

export const SendOTP = async (phoneNumber) => {
  try {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
          console.log(response);
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
        defaultCountry: "IN",
      }
    );
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    )
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        return confirmationResult;

        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.error(error);
      });

    window.confirmationResult = confirmationResult;
    console.log("OTP sent:", confirmationResult);

    return "OTP Sent";
  } catch (err) {
    console.error("SMS not sent:", err.message);
    return `Error sending OTP: ${err.message}`;
  }
};

/////////////////////////
//
// VerifyOTP
//
////////////////////////

export const VerifyOTP = async (otpCode) => {
  try {
    const confirmationResult = window.confirmationResult;
    const result = await confirmationResult.confirm(otpCode);
    console.log("User signed in with phone:", result.user);
    return result.user;
  } catch (err) {
    console.error("OTP verification failed", err);
    return null;
  }
};
