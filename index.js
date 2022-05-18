const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const console_table = require('console.table');
const db = require('./db/connection');
require('events').EventEmitter.defaultMaxListeners = 30;

var initialize_prompt  = ()=> {

inquirer.prompt([
  {
    type: 'list',
    name: 'admin_options',
    message: 'What would you like to do?',
    choices: ["View All Employees", "View All Roles", "View All Departments", "Add Employee", "Add Role", "Add Department", "Update Employee Role"]
},
])
        .then((answers) => {
           switch (answers.admin_options){
            case "View All Employees":
                viewAllEmployees(); break;
            
                case "Add Employee":
                    addEmployee(); break;
                
                    case "Update Employee Role":
                        updateEmployeeRole(); break;
                    
                        case "View All Roles":
                            viewAllRoles(); break;
                        
                            case "Add Role":
                                addRole(); break;

                                case "View All Departments":
                                    viewAllDepartments(); break;
                                
                                   case "Add Department":
                                        addDepartment(); break;
                                        
        }
})};



// all possible options functions

const viewAllEmployees = ()=> {
    //Join role, employee, department, import manager as name not id
    const sql = `SELECT employee.first_name, employee.last_name, department.name AS department, roles.title, salary FROM employee 
    JOIN roles ON employee.roles_id = roles.id 
    JOIN department ON roles.department_id = department.id`;

    db.query(sql, (err, res) => {
        if (err) {console.log(err);}
          console.table(res);
          initialize_prompt(); 
        })
}


const addEmployee = ()=> {


    initialize_prompt();
}
const updateEmployeeRole = ()=> {


    initialize_prompt();
}
const viewAllRoles = ()=> {
    const sql = `SELECT DISTINCT roles.title AS Roles FROM Roles`;

    db.query(sql, (err, res) => {
        if (err) {console.log(err);}
        
          console.table(res);
          initialize_prompt(); 
        })

    initialize_prompt();


    initialize_prompt();
}
const addRole= ()=> {


    initialize_prompt();
}
const viewAllDepartments = ()=> {
    const sql = `SELECT DISTINCT department.name AS Department FROM department`;

    db.query(sql, (err, res) => {
        if (err) {console.log(err);}
        
          console.table(res);
          initialize_prompt(); 
        })

    initialize_prompt();
}
const addDepartment = ()=> {

    initialize_prompt();
}



initialize_prompt();

