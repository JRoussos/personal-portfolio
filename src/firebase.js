import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBN_beLwNalyMa-1F5YEekzMW-lI4JLpoo",
    authDomain: "portfolio-becfe.firebaseapp.com",
    databaseURL: "https://portfolio-becfe.firebaseio.com",
    projectId: "portfolio-becfe",
    storageBucket: "portfolio-becfe.appspot.com",
    messagingSenderId: "364731917070",
    appId: "1:364731917070:web:c208c6c19cae212120ed5f",
    measurementId: "G-N9BGPQCZ1B"
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;