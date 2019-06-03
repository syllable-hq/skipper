import app from 'firebase/app';
import 'firebase/firestore';
import { USER_ID } from '../constants';

const config = {
    apiKey: "AIzaSyDw60r3dncxotf2MJ6Up90PBLqfVg9Q-Cs",
    authDomain: "syllable-skipper.firebaseapp.com",
    databaseURL: "https://syllable-skipper.firebaseio.com",
    projectId: "syllable-skipper",
    storageBucket: "syllable-skipper.appspot.com",
    messagingSenderId: "556168703471",
    appId: "1:556168703471:web:51b204416967219e"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.db = app.firestore();
  }

  createUserInfo = (userInfo) => {
    return this.db.collection('users').add(userInfo)
  }

  saveUserInfo = (userInfo) => {
    const userId = localStorage.getItem(USER_ID);
    return this.db.collection('users').doc(userId).set(userInfo);
  }

  getUserInfo = (userKey) => {
    return this.db.collection('users').doc(userKey).get();
  }

  getAllUsers = () => {
    return this.db.collection('users').get();
  }
}

export default Firebase;