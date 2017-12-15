export default class StudentController {
    constructor () {
        this.students = [
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
        ]
    }

    deleteStudent (studentPos) {
        this.students.splice(studentPos, 1)
    }
}