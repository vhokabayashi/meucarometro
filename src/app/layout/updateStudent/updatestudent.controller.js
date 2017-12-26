import angular from 'angular'
import { firebase } from '@firebase/app';
export default class UpdateStudentController {
    constructor ($rootScope, $stateParams, $state, firebaseService) {
        this.$rootScope = $rootScope
        this.$state = $state
        this.studentId = $stateParams.studentId
        this.firebaseService = firebaseService
        this.student = {}
        /*this.data = {}
        angular.copy($rootScope.students[this.studentPos], this.data)    */
        
        firebaseService.getStudentById(this.studentId).then(studentObj => (this.student = studentObj))
    }
    cancel() {
        this.$rootScope.showAlert('Aviso','Você sairá dessa página.','Ok')
        .then(_ => this.$state.go('students'))   
        
    }
    
    submit() {
        this.firebaseService.updateStudent(this.studentId, this.student).then(
            httpResp => {
                this.$state.go('students')
                this.$rootScope.showMessage('Atualizado com sucesso')
            })
    }

    
}

/* 
    submit() {
        this.$rootScope.students[this.studentPos] = this.data
        this.$state.go('students')
        this.$rootScope.showMessage('Estudante Atualizado')
    }*/
