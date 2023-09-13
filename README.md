# SQL_EmployeeTracker
SQL Employee Tracker

SQL Employee tracker is an application that is run from the command line. This app will allow any business to manage departments and employees.
You can view how your business stands currently, edit roles as well as add new employees.

INSTALL
To install this app you will want to start by cloning the git hub repo containing the application code. Here is the URL:
https://github.com/franklinamanda34/SQL_EmployeeTracker

next you will want to install the needed node.js packages by entering the following into the command line:
npm install

Make sute to connecct the SQL using this password: ~e!R844V

finally, to run the application please enter the following into the command line:
Node index.js

As soon as you get the application running you will see a menu that contains the functions available...
ALl departments
All roles
Add new department
Add new role
add new employee
update a role
cancel/exit the app


Feel free to contact me with questions /imporvements/comments using this email:
Franklinamanda34@outlook.com







THe following code was sourced from ChatGPT to help guide me (found in the index.js file)

.then((answers) => {
      // Convert the role_id and manager_id to integers (assuming they are numeric in your database)
      const roleID = parseInt(answers.role_id);
      const managerID = answers.manager_id === '' ? null : parseInt(answers.manager_id);

      // Check if roleID is a valid number, otherwise, return an error
      if (isNaN(roleID)) {
        console.error('Invalid role ID. Please enter a valid numeric role ID.');
        startApp();
        return;
      }

      // Define the SQL query with placeholders
      const query = 'INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      // Define the values array with user input
      const values = [answers.first_name, answers.last_name, roleID, managerID];

{



