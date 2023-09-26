const mysql = require('mysql2');
const inquirer = require('inquirer');

//create a connection the the sql database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'employee_tracker'
});

//connect to the database
db.connect((err) => {
    if (err){
        console.error('Error connecting to the database: ' + err.message);
        return;
    }
    console.log('Connected to the database.');
})

//call function to start app
startApp();

//function for starting app
function startApp(){
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
    })
        .then((answer) => {
            //handle user's choice based on answer
            switch (answer.action) {
                case 'View all departments':
                    viewAllDepts();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case    'Add a department':
                    addDept();
                    break;
                case    'Add a role':
                    addRole();
                    break;
                case    'Add an employee':
                    addEmployee();
                    break;
                case    'Update an employee role':
                    updateEmployeeRole();
                    break;
                case    'Exit':
                    db.end();
                    console.log('Goodbye!');
                    break;
            }
        });
}

function viewAllDepts() {
    //ask the db to fetch all depts.
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.error('Error fetching departments: ' + err.message);
            startApp();
            return;
        }
        console.log('All Departments: ');
        console.table(results);
        startApp();
    });
}
function viewAllRoles() {
    //ask the db to fetch all depts.
    db.query('SELECT * FROM role', (err, results) => {
        if (err) {
            console.error('Error fetching roles: ' + err.message);
            startApp();
            return;
        }
        console.log('All Roles: ');
        console.table(results);
        startApp();
    });
function viewAllEmployees() {
        // Ask the database to fetch all employees.
        db.query('SELECT * FROM employee', (err, results) => {
            if (err) {
                console.error('Error fetching employees: ' + err.message);
                startApp();
                return;
            }
            console.log('All Employees: ');
            console.table(results);
            startApp();
        });
    }
}
function addDept() {
    inquirer
        .prompt({
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department: ',
        })
        .then((answer) => {
            //insert new dept into db.
            db.query('INSERT INTO department SET ?', answer, (err, result) =>{
                if (err) {
                    console.error('Error adding department ' + err.message);
                } else {
                    console.log(`Added department: ${answer.name}`);
                }
                startApp();
            });
        });
}
function addRole() {
    db.query('SELECT * FROM department', (err, departments) => {
        if (err) {
            console.error('Error fetching departments: ' + err.message);
            return;
        }
        // Prepare choices for inquirer based on department names
        const departmentChoices = departments.map((department) => ({
            name: department.name,
            value: department.id,
        }));

        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the title of the role:',
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'Enter the salary for the role:',
                },
                {
                    type: 'list',
                    name: 'dept_id',
                    message: 'Select the department for the role:',
                    choices: departmentChoices,
                },
            ])
            .then((answer) => {
                // Insert the new role into the database
                db.query('INSERT INTO role SET ?', answer, (err, result) => {
                    if (err) {
                        console.error('Error adding role: ' + err.message);
                    } else {
                        console.log(`Added role: ${answer.title}`);
                    }
                    startApp();
                });
            });
    });
}
function addEmployee() {
    //ask the database to fetch role titles to be selected
    db.query('SELECT * FROM role', (err, roles) => {
        if (err) {
            console.error('Error fetching roles: ' + err.message);
            return;
        }
        // Prepare choices for inquirer based on role titles
        const roleChoices = roles.map((role) => ({
            name: role.title,
            value: role.id,
        }));

        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter the first name of the employee:',
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter the last name of the employee:',
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Select the role for the employee:',
                    choices: roleChoices,
                },
                {
                    type: 'number',
                    name: 'manager_id',
                    message: 'Enter the manager ID for the employee (leave empty if none):',
                },
            ])
            .then((answer) => {
                // Insert the new employee into the database
                db.query('INSERT INTO employee SET ?', answer, (err, result) => {
                    if (err) {
                        console.error('Error adding employee: ' + err.message);
                    } else {
                        console.log(`Added employee: ${answer.first_name} ${answer.last_name}`);
                    }
                    startApp();
                });
            });
    });
}
function updateEmployeeRole() {
    db.query('SELECT * FROM employee', (err, employees) => {
        if (err) {
            console.error('Error fetching employees: ' + err.message);
            return;
        }
        const employeeChoices = employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
        }));

        inquirer
            .prompt([
                {
                    type:'list',
                    name: 'employee_id',
                    message: 'Select the employee to update:',
                    choices: employeeChoices,
                },
                {
                    type: 'number',
                    name: 'new_role_id',
                    message: 'Enter the new role ID for the employee:',
                },
            ])
            .then((answer) => {
                db.query(
                    'UPDATE employee SET role_id = ? WHERE id = ?',
                    [answer.new_role_id, answer.employee_id],
                    (err, result) => {
                        if (err) {
                            console.error('Error updating employee role: ' + err.message);
                        } else {
                            console.log('Employee role updated successfully.');
                        }
                        startApp();
                    }
                );
            });
    });
}