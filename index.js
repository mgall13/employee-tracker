// importing required dependencies
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require("./db/connection");

// using inquirer to create our initial questions
const userQuestions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "Welcome to the Employee Database Tracker! What would you like do?",
        choices: [
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES"
          },
          {
            name: "Add Employee",
            value: "ADD_EMPLOYEE"
          },
          {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE"
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES"
          },
          {
            name: "Add Role",
            value: "ADD_ROLE"
          },
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS"
          },
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT"
          },
          {
            name: "Quit",
            value: "QUIT"
          }
        ]
      }
    ])
    .then((userAnswers) => {
      const { choices } = userAnswers;

      if (choices === "VIEW_EMPLOYEES") {
        viewAllEmployees();
      }

      if (choices === "ADD_EMPLOYEE") {
        addEmployee();
      }

      if (choices === "UPDATE_EMPLOYEE") {
        updateEmployee();
      }

      if (choices === "VIEW_ROLES") {
        viewAllRoles();
      }

      if (choices === "ADD_ROLE") {
        addRole();
      }

      if (choices === "VIEW_DEPARTMENTS") {
        viewAllDepartments();
      }

      if (choices === "ADD_DEPARTMENT") {
        addDepartment();
      }

      if (choices === "QUIT") {
      viewAllEmployees();
      }
    });
};



addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?'
      }
    ])
    .then(answer => {
      const sql = `INSERT INTO department (name)
                  VALUES (?)`;

      connection.query(sql, answer.departmentName, (err, res) => {
        if (err) throw err; 
        console.log('New Department Added: ', res); 
        viewAllDepartments();
      });
  });
};

addRole = () => {
  const departments = [];
  connection.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    res.forEach(dept => {
      let newDept = {
        name: dept.name,
        value: dept.id
      }
      departments.push(newDept);
    });
    
    inquirer
      .prompt([
        {
          type: 'input', 
          name: 'title',
          message: 'What is the title of the new role?'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary of the new role?'
        },
        {
          type: 'list',
          name: 'department',
          choices: departments,
          message: 'Which department does this role belong to?'
        }
      ])
      .then(answer => {
        const sql = `INSERT INTO role (title, salary, department_id) 
                    VALUES (?)`;

        connection.query(sql, [[answer.title, answer.salary, answer.department]], (err, res) => {
          if (err) throw err;
          console.log(`New Department Added: ${answer.title}`)
          userQuestions();
        });
    });
  });
};

const addEmployee = () => {
  // pulling all current employees
  connection.query("SELECT * FROM EMPLOYEE", (err, res) => {
    if (err) throw err;
    // possibility of employee not have a manager
    const newEmployee = [
      {
        name: 'None',
        value: 0
      }
    ]; 
    res.forEach(({ first_name, last_name, id }) => {
      newEmployee.push({
        name: first_name + " " + last_name,
        value: id
      });
    });
    
    // pulling current roles
    connection.query("SELECT * FROM ROLE", (err, res) => {
      if (err) throw err;
      const roleChoice = [];
      res.forEach(({ title, id }) => {
        roleChoice.push({
          name: title,
          value: id
        });
      });

      inquirer
        .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?"
        },
        {
          type: "list",
          name: "role_id",
          choices: roleChoice,
          message: "What is the employee's role?"
        },
        {
          type: "list",
          name: "manager_id",
          choices: newEmployee,
          message: "Who is the employee's manager?"
        }
      ])
      .then(response => {
        const query = `INSERT INTO EMPLOYEE (first_name, last_name, role_id, manager_id) 
                      VALUES (?)`;
        let manager_id = response.manager_id !== 0? response.manager_id: null;
        connection.query(query, [[response.first_name, response.last_name, response.role_id, manager_id]], (err, res) => {
          if (err) throw err;
          console.log('New Employee created!');
          userQuestions();
        });
      });
    });
  });
};

updateEmployee = () => {
  // grabbing current employees
  const allEmployees = `SELECT * FROM employee`;

  connection.query(allEmployees, (err, res) => {
    if (err) throw err;
    const employeeList = res.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id}));

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'slctEmp',
          message: "Which employee's role do you want to update?",
          choices: employeeList
        }
    ])
    .then(updatedEmployee => {
      const employee = updatedEmployee;
      const params = [];
      params.push(employee);
    })
  })

  const allRoles = `SELECT role.id, role.title FROM role`;

  connection.query(allRoles, (err, res) => {
    if (err) throw err;
    const roleList = res.map(({ id, title }) => ({ name: title, value: id}));

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'slctRole',
          message: "Which role do you want to assign the selected employee?",
          choices: roleList
        }
      ])
      .then(updatedRole => {
        const role = updatedRole;
        const params = [];
        params.push(role);
      });
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
    console.table('List of current Employees: ', rows);
    userQuestions();
  });
};

viewAllRoles = () => {
  const sql = `SELECT * FROM role`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table('List of all current roles: ', res);
    userQuestions();
  });
};

viewAllDepartments = () => {
  const sql = `SELECT department.id 
              AS id, department.name 
              AS department 
              FROM department`;
  connection.query(sql, (err, res) => {
    if (err) throw err; 
    console.table('All Departments:', res);
    userQuestions();
  });
};

userQuestions();