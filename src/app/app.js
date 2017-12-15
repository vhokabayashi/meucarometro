import angular from 'angular'
import uiRouter from '../../node_modules/@uirouter/angularjs/release/angular-ui-router.min.js'

import AppDirective from './app.directive.js'
import StudentController from './layout/students/students.controller.js'
import CreateStudentController from './layout/createStudent/createstudent.controller.js'

const MODULE_NAME = 'app'

angular.module(MODULE_NAME, [uiRouter])
.config(function ($stateProvider, $urlRouterProvider) {
    let studentsState = {
        name: 'students',
        url: '/students',
        template: require('./layout/students/students.template.html'),
        controller: 'studentController',
        controllerAs: 'vm'
    }

    let createStudentState = {
        name: 'students.create',
        url: '/create', 
        template: require('./layout/createStudent/createstudent.template.html'),
        controller: CreateStudentController,
        controllerAs: 'vm'
    }

    console.log(createStudentState)
    $stateProvider
    .state(studentsState)
    .state(createStudentState)

    $urlRouterProvider.otherwise('students')
})
.directive('app', AppDirective)
.controller('studentController', StudentController)
.controller('createStudentController', CreateStudentController)

export default MODULE_NAME