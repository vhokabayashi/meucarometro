import angular from 'angular'
import { firebase } from '@firebase/app';

export default class LoginController {
    constructor($rootScope, $state, firebaseService) {
        this.$rootScope = $rootScope
        this.$state = $state
        this.firebaseService = firebaseService

    }
    
    enter(email,password) {
        this.firebaseService.signIn(email,password).then(
            _ => {
                this.$state.go('students')
            }, err => {
                console.log('ERROR:', err)
                this.$rootScope.showAlert('OPA', 'ocorreu algum erro', 'ok')
            }
        )    
    }

}    
