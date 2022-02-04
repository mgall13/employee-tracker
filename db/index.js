const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    //method
    findAllEmployees() {
        return this.connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.tile, role.salary, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id')
    }
}



module.exports = new DB(connection);