import SimpleCrypto from "simple-crypto-js";
import phonetic from 'phonetic';
import Cookies from 'universal-cookie';
import {
  USER_KEY,
  COOKIE_MASTER_PASSWORD,
  MASTER_PASS_SECRET,
  CURRENT_USER_KEY,
} from "../constants";

export function saveMasterPassword(masterPassword) {
  const simpleCrypto = new SimpleCrypto(MASTER_PASS_SECRET);
  const cookies = new Cookies();
  const masterPass = simpleCrypto.encrypt(masterPassword);
  cookies.set(COOKIE_MASTER_PASSWORD, masterPass, { path: '/' });
}

function getMasterPassword() {
  const cookies = new Cookies();
  const encryptedMasterPass = cookies.get(COOKIE_MASTER_PASSWORD);
  const simpleCrypto = new SimpleCrypto(MASTER_PASS_SECRET);
  return simpleCrypto.decrypt(encryptedMasterPass);
}

function cypherObject(object) {
  const cookies = new Cookies();
  const masterPass = getMasterPassword();
  var simpleCrypto = new SimpleCrypto(masterPass);
  if (typeof object === 'object') {
    const object = JSON.stringify(object);  
  }
  return simpleCrypto.encrypt(object);
}

export function getUserInfo() {
  const currentUserKey = localStorage.getItem(CURRENT_USER_KEY);
  const userInfo = localStorage.getItem(currentUserKey);
  return JSON.parse(userInfo);
}

export function getUserName() {
  let userInfo = getUserInfo();
  const simpleCrypto = new SimpleCrypto(MASTER_PASS_SECRET);
  return simpleCrypto.decrypt(userInfo.userName);
}

export function getCredentials() {
  const userInfo = getUserInfo();
  const credentials = userInfo.credentials;
  const cookies = new Cookies();
  const masterPass = getMasterPassword();
  var simpleCrypto = new SimpleCrypto(masterPass);
  return credentials.map(cred => {
    const decryptedCredential = simpleCrypto.decrypt(cred);
    return JSON.parse(decryptedCredential);
  });
}

export function addCredentialInfo(info) {
  const cypherCredential = cypherObject(info)
  const userInfo = getUserInfo();
  userInfo.credentials = [...userInfo.credentials, cypherCredential];
  saveUserInfo(userInfo);
}

export function createUserStorage(userKey) {
  const userName = generateUserNameFromHash(userKey);
  const simpleCrypto = new SimpleCrypto(MASTER_PASS_SECRET);

  const userInfo = {
    userKey: userKey,
    credentials: [],
    userName: simpleCrypto.encrypt(userName),
  };
  
  localStorage.setItem(userKey, JSON.stringify(userInfo));
}

function generateUserNameFromHash() {
 return phonetic.generate({ seed: localStorage.getItem(USER_KEY) });
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
  const cookies = new Cookies();
  cookies.remove(COOKIE_MASTER_PASSWORD);
}

export function userLogged() {
  return !!localStorage.getItem(CURRENT_USER_KEY);
}

export function updateUserName(userName) {
  const userInfo = getUserInfo();
  const simpleCrypto = new SimpleCrypto(MASTER_PASS_SECRET);
  userInfo.userName = simpleCrypto.encrypt(userName);
  saveUserInfo(userInfo);
}

function saveUserInfo(userInfo) {
  const currentUserKey = localStorage.getItem(CURRENT_USER_KEY);
  localStorage.setItem(currentUserKey, JSON.stringify(userInfo))
}