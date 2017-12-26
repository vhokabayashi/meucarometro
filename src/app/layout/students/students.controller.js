export default class StudentController {
    constructor ($q, $rootScope, $state, firebaseService) {
        this.$state = $state
        //this.students = {}
        this.firebaseService = firebaseService
        this.students = {}
        let promises = []
        if (firebaseService.isLoggedIn()){
            $rootScope.loading = true
            firebaseService.getUserStudents(firebaseService.getUserId()).then(students => {
                this.students = students
                $rootScope.loading = false 
            })
        } else {
            $state.go('login')            
        }
        //firebaseService.getStudent().then(students => {this.students = students})             
        //this.students = $rootScope.students
        /*
        if (firebaseService.isLoggedIn()) {
            let uid = firebaseService.getUserId()
            firebaseService.getUserData(uid).then(userData => {
                for (let studentId of userData.students) {
                promises.push(firebaseService.getStudentById(studentId))
                console.log('lista de promisses: ', promises)
            }
            $q.all(promises).then(students => {
                students.map(studentResp => {
                    console.log('studentResp: ', studentResp)
                    this.students[studentResp.$key] =  studentResp
                    console.log('students',this.students)
                })
            })
            .catch(err => console.log('82778943ERROR:', err))
            })
        } else {
            $state.go('login')
        }
        */
    }
    
    /*deleteStudent(studentId) {
        this.students.splice(studentId, 1)
    }*/

    deleteStudent(studentId) {
        //console.log('----->', this.students)
        // console.log('id: ', studentId)
        this.firebaseService.deleteStudent(studentId)
    }
    
    updateStudent(studentId) {
        //console.log('-->', studentId)
        this.$state.go('update', {studentId})

    }
    
    getOut() {
        this.firebaseService.signOut() 
        this.$state.go('login')
    }
        
}
