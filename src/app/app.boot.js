export default function ($rootScope, $mdToast,$mdDialog) {
    /*$rootScope.students = [
        {
             name: 'vitor',
             age: 22,
             university: 'usp'
         },
        {
            name: 'mateus',
            age: 25,
            university: 'usp'
         },
        {
            name: 'carlo',
            age: 24,
            university: 'usp'
         }
]*/
    $rootScope.showMessage = function (msg) {
        $mdToast.show($mdToast.simple().textContent(msg))
    }

    $rootScope.showAlert = function (titulo,txt,ok) {
    return $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .title(titulo)
                .textContent(txt)
                .ok(ok)
        )
    }
    $rootScope.loading = false
    
}
