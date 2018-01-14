import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyDoa8k-1dOARJxpYWu8icvUlqd4MbSoO1s",
    authDomain: "privileged-f5911.firebaseapp.com",
    databaseURL: "https://privileged-f5911.firebaseio.com",
    projectId: "privileged-f5911",
    storageBucket: "privileged-f5911.appspot.com",
    messagingSenderId: "934024953094"
};
var fire = firebase.initializeApp(config);
export default fire;