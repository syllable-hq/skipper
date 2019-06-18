import app from 'firebase/app';
import 'firebase/firestore';
import { USER_ID } from '../constants';

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
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