import firebase from 'firebase/app';    //firebase
import 'firebase/database';             //firebase database

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCvQZTPOKGyCD5KyV5EsX8xpXBkshrmhXI",
        authDomain: "the-shoppies-6b8ee.firebaseapp.com",
        projectId: "the-shoppies-6b8ee",
        storageBucket: "the-shoppies-6b8ee.appspot.com",
        messagingSenderId: "881448932273",
        appId: "1:881448932273:web:8f19ae0c0c5da32f01a390"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    export default firebase;
