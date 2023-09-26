const mysql = require('mysql2');
const inquirer = require('inquirer');

//create a connection the the sql database
const db = mysql.createConnection({
    host: 'localhost',
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
                    break;
                case 'View all departments':
                    break;
                case 'View all roles':
                    break;
                case    'Add a department':
                    break;
                case    'Add a role':
                    break;
                case    'Add an employee':
                    break;
                case    'Update an employee role':
                    break;
                case    'Exit':
                    db.end();
                    console.log('Goodbye!');
                    break;
            }
        });
}