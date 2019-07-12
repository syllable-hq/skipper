import app from 'firebase/app';
import 'firebase/firestore';
import { USER_ID } from '../constants';

const config = {
  apiKey: process.env.RAZZLE_API_KEY,
  authDomain: process.env.RAZZLE_AUTH_DOMAIN,
  databaseURL: process.env.RAZZLE_DATABASE_URL,
  projectId: process.env.RAZZLE_PROJECT_ID,
  storageBucket: process.env.RAZZLE_STORAGE_BUCKET,
  messagingSenderId: process.env.RAZZLE_MESSAGING_SENDER_ID,
  appId: process.env.RAZZLE_APP_IDD
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