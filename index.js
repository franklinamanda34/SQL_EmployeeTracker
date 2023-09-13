const inquirer = require('inquirer');
const mysql = require('mysql2');
//Connect SQL database to index.js
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '~e!R844V',
  database: 'employee_tracker'
 
})

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');
    startApp();
  });

function startApp() {
  inquirer
  .prompt({
    name: 'action',
    type: 'list',
    message: 'Please make a selection:',
    choices: [
      'All departments',
      'All roles',
      'All employees',
      'Add department',
      'Add role',
      'Add employee',
      'Update role',
      'CANCEL',
    ],

  })
  .then((answer) => {
    switch (answer.action) {
      case 'All departments':
        viewDepartment();
        break;
      case 'All roles':
        viewRoles();
        break;
      case 'All employees':
        viewEmployees();
        break;
      case 'Add department':
        addDepartment();
        break;
      case 'Add role':
        addRole();
        break;
      case 'Add employee':
        addEmployee();
        break;
      case 'Update role':
        updateEmployeeRole();
        break;
      case 'CANCEL':
        connection.end();
        console.log('Disconnected from the database');
        break;
    }
  });
}
// give user option to select from directory
function viewDepartment() {
  const query = 'SELECT * FROM department';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}
function viewRoles() {
  const query = 'SELECT * FROM role';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}
function viewEmployees() {
  const query = 'SELECT * FROM Employee';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}
// Let user input department, role, employee
function addDepartment() {
  inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'Enter the name of the department:',
    })
    .then((answer) => {
      
      const query = 'INSERT INTO department SET ?';
      connection.query(query, { name: answer.name }, (err, res) => {
        if (err) throw err;
        console.log(`Department '${answer.name}' added to the database.`);
        startApp();
      });
    });
}
function addRole() {
  inquirer
    .prompt([
      {
      name: 'name',
      type: 'input',
      message: 'Enter the name of the Role:',
      },
      {name: 'salary',
    type: 'input',
  message: 'Enter Salary:',
validate: function (value) {
  const valid= !isNaN(parseFloat(value));
  return valid || 'please enter valid number';
},
},
{
  name: 'department_id',
  type: 'input',
  message: 'Enter the department ID for the role:',
  validate: function (value) {
    // Validate that the input is a valid number
    const valid = !isNaN(parseInt(value));
    return valid || 'Please enter a valid number for the department ID.';
  },
},
    ])
    .then((answer) => {
      
      const query = 'INSERT INTO Role SET ?';
      connection.query(query, { name: answer.name }, (err, res) => {
        if (err) throw err;
        console.log(`Role '${answer.name}' added to the database.`);
        startApp();
      });
    });
}
function addEmployee() {
  let roleID, managerID;
  inquirer
    .prompt([
      {
      name: 'first_name',
      type: 'input',
      message: 'Enter the name of the Employee:',
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'Enter the employee\'s last name:',
      },
      {
        name: 'role_id',
        type: 'input',
        message: 'Enter the employee role:',
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'Enter the employee supervisor (optional, press Enter if none):',
      },
    ])
    .then((answers) => {
      const roleID = answers.role_id;
      const managerID = answers.manager_id === '' ? null : answers.manager_id;

      
     

      // Define the SQL query with placeholders
      const query = 'INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      
      const values = [answers.first_name, answers.last_name, roleID, managerID];

      connection.query(query, values, (err, res) => {
        if (err) {
          console.error('Error adding employee:', err);
        } else {
          console.log(`Employee '${answers.first_name} ${answers.last_name}' added to the database.`);
        }
        startApp();
      });
    });
}

