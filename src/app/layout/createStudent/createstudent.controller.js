export default class CreateStudentController {
    constructor ($rootScope, $state, firebaseService) {
        this.$rootScope = $rootScope
        this.firebaseService = firebaseService
        this.$state = $state
        /*this.student = {
            name: '',
            age: '',
            university: ''
        }*/
    }
    
    
    /*save() {
        this.$rootScope.loading = true 
        this.$rootScope.students.push(this.student)
        this.$rootScope.loading = false 
        this.$state.go('students')
        this.$rootScope.showMessage('Estudante adicionado')

    }*/


    save () {
        let studentObj = { 
            name: this.description,
            age: this.age,
            university: this.university
        }
        this.firebaseService.createStudent(studentObj).then(
            _ => {
                this.$state.go('students')
                this.$rootScope.showMessage('Estudante Criado')
            },
            err => {
                this.$rootScope.showAlert('Falha na criação de estudante','Tente Novamente', 'Ok')
                console.log('ERROR: ', err)
            })
    }
}