import SimpleCrypto from "simple-crypto-js";
import { USER_KEY, CURRENT_USER_KEY } from "../constants";
import phonetic from 'phonetic';

function cypherObject(object) {
  const secret = localStorage.getItem(CURRENT_USER_KEY);
  var simpleCrypto = new SimpleCrypto(secret);
  const objectStringed = JSON.stringify(object);
  return simpleCrypto.encrypt(objectStringed);
}

export function getUserInfo() {
  const currentUserKey = localStorage.getItem(CURRENT_USER_KEY);
  const userInfo = localStorage.getItem(currentUserKey);
  return JSON.parse(userInfo);
}

export function getCredentials() {
  const userInfo = getUserInfo();
  const credentials = userInfo.credentials;
  
  var simpleCrypto = new SimpleCrypto(
    localStorage.getItem(CURRENT_USER_KEY)
  );
  return credentials.map(cred => {
    const decryptedCredential = simpleCrypto.decrypt(cred);
    return JSON.parse(decryptedCredential);
  });
}

export function addCredentialInfo(info) {
  const cypherCredential = cypherObject(info)
  const userInfo = getUserInfo();
  userInfo.credentials = [...userInfo.credentials, cypherCredential];
  const currentUserKey = localStorage.getItem(CURRENT_USER_KEY);
  localStorage.setItem(currentUserKey, JSON.stringify(userInfo))
}

export function createUserStorage(userKey) {
  const userName = generateUserNameFromHash(userKey);
  const userInfo = {
    userKey: userKey,
    credentials: [],
    userName: userName
  };
  
  localStorage.setItem(userKey, JSON.stringify(userInfo));
}

function generateUserNameFromHash() {
 return phonetic.generate({ seed: localStorage.getItem(USER_KEY) });
}