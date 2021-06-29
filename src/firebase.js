import  firebase from 'firebase'

 var firebaseConfig = {
    apiKey: "AIzaSyAkKik8bjU8eeqNH565CG0Vsk1C-mClxtc",
    authDomain: "cafe-9d2e6.firebaseapp.com",
    projectId: "cafe-9d2e6",
    storageBucket: "cafe-9d2e6.appspot.com",
    messagingSenderId: "208393462885",
    appId: "1:208393462885:web:8421682ca0550368d2528c",
    measurementId: "G-H2YRCXEZ80"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const GoogleProvider =new firebase.auth.GoogleAuthProvider();