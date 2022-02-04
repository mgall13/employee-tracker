// importing required dependencies
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require("./db/connection");

const userQuestions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message:
          "Welcome to the Employee Database Tracker! What would you like do?",
        choices: [
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "Add Employee",
            value: "ADD_EMPLOYEE",
          },
          {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE",
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES",
          },
          {
            name: "Add Role",
            value: "ADD_ROLE",
          },
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS",
          },
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT",
          },
          {
            name: "Quit",
            value: "QUIT",
          },
        ],
      },
    ])
    .then((userAnswers) => {
      const { choices } = userAnswers;

      if (choices === "VIEW_EMPLOYEES") {
        viewAllEmployees();
      }

      if (choices === "ADD_EMPLOYEE") {
        addEmployee();
      }

      if (choices === 'Add Employee') {
          // insert code that solves this
      }

      if (choices === 'Update Employee Role') {
          // insert code that solves this
      }

      if (choices === 'View All Roles') {
          // insert code that solves this
      }

      if (choices === 'Add Role') {
          // insert code that solves this
      }

      if (choices === 'View All Departments') {
          // insert code that solves this
      }

      if (choices === 'Add Department') {
          // insert code that solves this
      }

      if (choices === 'Quit') {
          // insert code that solves this
      }

      if (choices === 'View All Employees') {
          // insert code that solves this
      }
    });
};

viewAllEmployees = () => {
  const sql = `SELECT employee.id, 
                employee.first_name, 
                employee.last_name, 
                role.title, 
                department.name AS department,
                role.salary, 
                CONCAT (manager.first_name, " ", manager.last_name) AS manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    userQuestions();
  });
};

addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeFirstName',
                message: "What is the employee's first name?"
            },
            {
                type: 'input',
                name: 'employeeLastName',
                message: "What is the employee's last name?"
            },
            {
                type: 'list', 
                name: 'employeeRole',
                message: "What is the employee's role?",
                choices: [
                    {
                        name: 'Sales Lead',
                        value: 'SALES_LEAD'
                    },
                    {
                        name: 'Saleperson',
                        value: 'SALES_PERSON'
                    },
                    {
                        name: 'Lead Engineer', 
                        value: 'LEAD_ENGINEER'
                    }, 
                    {
                        name: 'Software Enginerer', 
                        value: 'SOFTWARE_ENGINEER'
                    },
                    {
                        name: 'Account Manager',
                        value: 'ACCOUNT_MANAGER'
                    },
                    {
                        name: 'Accountant',
                        value: 'ACCOUNTANT'
                    },
                    {
                        name: 'Legal Team Lead',
                        value: 'LEGAL_TEAM_LEAD'
                    },
                    {
                        name: 'Lawyer',
                        value: 'LAWYER'
                    }
                ]
            },
            {
                type: 'list', 
                name: 'employeeManager',
                message: "Who is the employee's manager?",
                choices: [
                    {
                        name: 'Kit Haringron'
                    },
                    {
                        name: 'Peter Dinklage'
                    }, 
                    {
                        name: 'Isaac Wright'
                    },
                    {
                        name: 'Maisie Williams'
                    }
                ]
            }
        ])
        .then()

    // const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    //             VALUES (?, ?, ?, ?)`

    // connection.query(sql, (err, res) => {
    //     if (err) {
    //         throw (err)
    //         return;
    //     }
    // })

}
userQuestions();
