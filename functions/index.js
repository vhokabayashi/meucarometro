const functions = require('firebase-functions');
const functions = require('firebase-functions')
const admin = require('firebase-admin')

const serviceAccount = require('./meucarometro.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://carometro-3d916.firebaseio.com"
 })
 
 exports.cleanUserStudent = functions.database.ref('/student/{studenId}').onDelete(ev => {
   let promises = []
   let studentId = ev.params.studentId
   let usersRef = admin.database().ref('/users')
   usersRef.once('value').then(snapshot => {
     let users = snapshot.val()
     Object.keys(users)
     .filter(uid => users[uid].students.indexOf(studentId) > -1)
     .map(uid => {
       let students = users[uid].students
       students.splice(students.indexOf(studentId), 1)
       promises.push(usersRef.child(`/${uid}/students`).set(students, _ => console.log(`Tarefas do usuário ${uid} limpas`)))
     })
   })
   return Promise.all(promises)
 })
 
 exports.cleanUserData = functions.auth.user().onDelete(ev => {
   let promises = []
   let uid = ev.data.uid
   let userRef = admin.database().ref(`/users/${uid}`)
   userRef.once('value').then(snapshot => {
     let students = snapshot.val().students
     promises.push(userRef.set(null, _ => console.log(`Dados do usuário ${uid} apagados`)))
     tasks.map(studentId => promises.push(admin.database().ref(`/tasks/${taskId}`).set(null, _ => console.log(`Tarefa ${taskId} apagada`))))
   })
   return Promise.all(promises)
 })
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  
                                                                                                                                                                                                                                          
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
