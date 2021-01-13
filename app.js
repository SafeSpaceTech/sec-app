require('dotenv').config()
const firebase = require('firebase/app')
require('firebase/firestore')
require('firebase/auth')

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
}

console.warn(firebaseConfig)

firebase.initializeApp(firebaseConfig)

const Database = firebase.firestore()
const Auth = firebase.auth()

const mainCollection = 'users'

async function fetchAll() {
  const collection = Database.collection(mainCollection)

  const query = await collection.get()
    .then(({ docs }) => docs)
    .catch(({ code }) => {
      console.debug(code)
      return code
    })

  return query
}

async function insert(email) {
  const collection = Database.collection(mainCollection)
  const document = await collection
    .add({ email })
    .then((snapshot) => snapshot.data())
    .catch(({ code }) => {
      console.debug(code)
      return code
    })

  return document
}

async function findBy(email) {
  const collection = Database.collection(mainCollection)

  const query = await collection
    .where('email', '==', email)
    .get()
    .then(({ docs }) => docs)
    .catch(({ code }) => {
      console.debug(code)
      return code
    })

  return query
}

async function createUser(email, password) {
  const user = await Auth.createUserWithEmailAndPassword(email, password)
    .then((response) => response)
    .catch((error) => {
      console.debug(error.message)
      return error.code
    })

  return user
}

module.exports = {
  fetchAll,
  insert,
  findBy,
  createUser
}