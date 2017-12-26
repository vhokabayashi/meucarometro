import angular from 'angular'
import uiRouter from '../../node_modules/@uirouter/angularjs/release/angular-ui-router.min.js'
import firebaseService from './services/firebase.services.js'


import '../../node_modules/angular-material/angular-material.css' 
import '../../node_modules/angular-material/angular-material.min.js'
import '../../node_modules/angular-animate/angular-animate.min.js'
import '../../node_modules/angular-aria/angular-aria.min.js'
import '../../node_modules/angular-messages/angular-messages.min.js'
import '../../node_modules/angular-material-data-table/dist/md-data-table.min.css'
import '../../node_modules/angular-material-data-table/dist/md-data-table.min.js'

import AppBoot from './app.boot.js'
import Config from './config.js'

import AppDirective from './app.directive.js'
import StudentController from './layout/students/students.controller.js'
import CreateStudentController from './layout/createStudent/createstudent.controller.js'
import UpdateStudentController from './layout/updateStudent/updatestudent.controller.js'
import LoginController from './layout/login/login.controller.js'


angular
.module('app',[uiRouter, 'ngMaterial','md.data.table'])
.factory('firebaseService',['$q','$http', firebaseService])
.config(['$stateProvider', '$urlRouterProvider', Config]) 
.directive('app', AppDirective)
.run(['$rootScope', '$mdToast','$mdDialog', AppBoot])
.controller('studentController', ['$q', '$rootScope', '$state', 'firebaseService', StudentController])
.controller('createStudentController', ['$rootScope','$state', 'firebaseService', CreateStudentController])
.controller('updateStudentController', ['$rootScope', '$stateParams','$state','firebaseService', UpdateStudentController])
.controller('loginController', ['$rootScope','$state','firebaseService', LoginController])

