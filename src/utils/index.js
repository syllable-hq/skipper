import SimpleCrypto from "simple-crypto-js";
import phonetic from 'phonetic';
import Cookies from 'universal-cookie';
import bcrypt from 'bcryptjs';

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

export function getCredentialAt(index) {
  const userInfo = getUserInfo();
  const credential = userInfo.credentials[index];
  const masterPass = getMasterPassword();
  var simpleCrypto = new SimpleCrypto(masterPass);
  const decryptedCredential = simpleCrypto.decrypt(credential);
  return JSON.parse(decryptedCredential);
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
  return userInfo;
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
  localStorage.setItem(CURRENT_USER_KEY, userKey);
  return userInfo;
}

function generateUserNameFromHash() {
 return phonetic.generate({ seed: localStorage.getItem(USER_KEY) });
}

export function logout() {
  // localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.clear();
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

export function filterList(q, list) {
  function escapeRegExp(s) {
    return s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  const words = q
    .split(/\s+/g)
    .map(s => s.trim())
    .filter(s => !!s);
  const hasTrailingSpace = q.endsWith(" ");
  const searchRegex = new RegExp(
    words
      .map((word, i) => {
        if (i + 1 === words.length && !hasTrailingSpace) {
          // The last word - ok with the word being "startswith"-like
          return `(?=.*\\b${escapeRegExp(word)})`;
        } else {
          // Not the last word - expect the whole word exactly
          return `(?=.*\\b${escapeRegExp(word)}\\b)`;
        }
      })
      .join("") + ".+",
    "gi"
  );
  return list.filter(item => {
    return searchRegex.test(item.website);
  });
}

export function cypherMasterPassword(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function (err, salt) {
      if(err){
        return reject(err);
      }
      bcrypt.hash(password, salt, function(err, hash) {
        if(err) {
          return reject(err);
        }
        resolve(hash);
      });
    });
  })
}

export function findUserMatch(password, users) {
  return users.find(user => {
    return bcrypt.compareSync(password, user.userKey)
  });
}

export function buildURLParam(obj, prefix) {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}