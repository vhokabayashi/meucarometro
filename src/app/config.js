export default function ($stateProvider, $urlRouterProvider) {
    
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
        controller: 'createStudentController',
        controllerAs: 'vm'
    }
    let updateStudentState = {
        name: 'update',
        url: '/update/:studentId',
        template: require('./layout/updateStudent/updatestudent.template.html'),
        controller: 'updateStudentController',
        controllerAs: 'vm'
    }
    let loginState = {
        name: 'login',
        url: '/login',
        template: require('./layout/login/login.template.html'),
        controller: 'loginController',
        controllerAs: 'vm'
    }

    $stateProvider
    .state(studentsState)
    .state(createStudentState)
    .state(updateStudentState)
    .state(loginState)

    //$urlRouterProvider.otherwise('students') 
}