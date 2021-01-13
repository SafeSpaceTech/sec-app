// https://firebase.google.com/docs/admin/setup#initialize-sdk
const admin = require('firebase-admin')

// Initialize the default app
// const project = admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: process.env.FIREBASE_DB_URL
// })
const project = admin.initializeApp()
const DB = project.firestore()
const Auth = project.auth()

async function main(){
  await Auth.createUser({ email: 'sec@sec.sec', password: 'secret' })
  .then((response) => response)
  .catch((error) => {
    console.debug(error.message)
    return error.code
  })
}

main()