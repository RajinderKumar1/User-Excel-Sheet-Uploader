// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDyos1_k8Gt4BJSDLxCcz0X3MYbLusXQ0Y",
    authDomain: "designwebs-11ba9.firebaseapp.com",
    projectId: "designwebs-11ba9",
    storageBucket: "designwebs-11ba9.appspot.com",
    messagingSenderId: "27494218487",
    appId: "1:27494218487:web:b88afc5618fdae0b4371f2",
    measurementId: "G-S50LRDF87Z"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage();
const db = getFirestore(app);

export { storage, db }