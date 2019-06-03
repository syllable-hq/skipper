import app from 'firebase/app';
import 'firebase/firestore';
import { USER_ID } from '../constants';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID
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