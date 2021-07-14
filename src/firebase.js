import  firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAXbijz3zJytmPEaVwSN8H_rR_cF4MFX8Q",
  authDomain: "kgl-traders.firebaseapp.com",
  projectId: "kgl-traders",
  storageBucket: "kgl-traders.appspot.com",
  messagingSenderId: "179572312786",
  appId: "1:179572312786:web:8ed911c5ecb004f0737b0b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const GoogleAuthProvider =new firebase.auth.GoogleAuthProvider();