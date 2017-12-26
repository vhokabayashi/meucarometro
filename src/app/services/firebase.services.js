import * as firebase from 'firebase'
import { error } from '@firebase/database/dist/esm/src/core/util/util';
export default function($q,$http) {

    let userToken = null
    let userId = null

    let config = {
        apiKey: "AIzaSyC3ilxi01TZbxS-vUZS9gBj8Y-Cxnz4_tc",
        authDomain: "carometro-3d916.firebaseapp.com",
        databaseURL: "https://carometro-3d916.firebaseio.com",
        projectId: "carometro-3d916",
        storageBucket: "carometro-3d916.appspot.com",
        messagingSenderId: "557265097580"
    }
    firebase.initializeApp(config);

    const AUTH_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + config.apiKey
    
    return {
        getStudent: getStudent,
        deleteStudent: deleteStudent,
        createStudent: createStudent,
        updateStudent: updateStudent,
        getStudentById: getStudentById,
        signIn: signIn,
        isLoggedIn: isLoggedIn,
        getUserData: getUserData,
        signOut: signOut,
        getUserToken: getUserToken,
        getUserId: getUserId,
        getUserStudents: getUserStudents
    }


    function getStudent () {
        return $q(resolveCallback => {
            $http.get(config.databaseURL + `/students.json?auth=${userToken}`).then(
                httpResp  => {
                    console.log('usertoken: ', userToken)
                    resolveCallback(httpResp.data)
                }, err => 
                    console.log('ERROR: ', err)
            )
        })
    }


    function deleteStudent (studentId) {
        return $q(resolveCallback => {
            $http.delete(config.databaseURL + `/students/${studentId}.json?auth=${userToken}`).then(
                httpResp => resolveCallback(httpResp),
                err => console.log('ERROR: ', err)
            )
        })
    } 
    
    /*function createStudent (studentObj) {
        return $q((resolve, reject) => {
            console.log('url', config.databaseURL, studentObj)
            $http.post(config.databaseURL + `/students.json?auth=${userToken}` ,studentObj).then(
                httpResp => {
                    console.log('usertoken: ', userToken)
                    resolve()
            }).catch(reject)       
        }
    )}*/

    function createStudent (studentObj) {
        return $q((resolve, reject) => {
            $http.post(config.databaseURL + `/students.json?auth=${userToken}` ,studentObj).then(
                httpResp => {
                    let pushId = httpResp.data.name
                    getUserData(userId).then(userData =>{
                        if(userData.students === undefined || userData.students.length === 0) {
                            $http.put(config.databaseURL + `/user/${userId}/students.json?auth=${userToken}`, [pushId]).then (
                                _ => resolve()
                            )
                        } else {
                            userData.students.push(pushId)
                            $http.patch(config.databaseURL + `/user/${userId}/.json?auth=${userToken}`, {students: userData.students}).then(
                                _ => resolve()
                            )
                        }
                    }).catch(reject)
            }).catch(reject)       
        })
    }


    function updateStudent (studentId, studentObj) {
        return $q(resolve => {
            $http.patch(config.databaseURL + `/students/${studentId}.json?auth=${userToken}`, studentObj).then(
                httpResp => resolve(httpResp),
                err => console.log('ERROR: ', err)
            )
        } 
    )}

    function getStudentById (studentId) {
        return $q((resolve, reject) => {
            $http.get(config.databaseURL + `/students/${studentId}.json?auth=${userToken}`).then(
                httpResp => 
                    resolve(httpResp.data)           
            ).catch(reject)
        })
    }

    function getUserStudents (uid) {
        let out = {}
        console.log('---->', uid)
        return $q((resolve, reject) => {
            getUserData(uid).then(userData => {
                let promises = []
                console.log('userdata', userData) // XXX
                userData.students.map(studentId => {
                    let promise = $q((resolve, reject) => {
                        getStudentById(studentId).then(studentObj => {
                            resolve({studentId, studentObj})
                        })
                    })
                    promises.push(promise)
                })
                $q.all(promises).then(studentsResp => {
                    studentsResp.map(studentResp => {
                        out[studentResp.studentId] = studentResp.studentObj
                    })
                    resolve(out)
                })
            })
        })
    }

    function signIn (email, password) {
        return $q((resolve, reject) => {
            $http.post(AUTH_URL, {email, password, returnSecureToken: true}).then(httpResp => {
                userToken = httpResp.data.idToken
                userId = httpResp.data.localId
                //console.log('token', userToken)
                resolve()
            }).catch(reject)
        })
    }

    function isLoggedIn () {
        return !(userId === null || userToken === null)
    }

    function getUserData (uid) {
        return $q((resolve, reject) => {
            $http.get(config.databaseURL + `/user/${uid}.json?auth=${userToken}`).then(
                httpResp => resolve(httpResp.data)
            ).catch(reject)
        })
    }

    function signOut () {
        userToken = null
        userId = null
        console.log('userToken', userToken)
    }
   

    function getUserToken () {
        return userToken
    }

    function getUserId () {
        return userId
    }


}


   