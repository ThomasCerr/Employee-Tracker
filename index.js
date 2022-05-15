const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const console_table = require('console.table');
const db = require('./db/connection');


inquirer
  .prompt([

  {
    type: 'checkbox',
    name: 'admin_options',
    message: 'What would you like to do?',
    choices: ['View All Employees', 'Add Employee', "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"]
},
])
        .then((answers) => {
           
            teamArray.push(manager)
            if (answers.admin_options == "View All Employees"){
                viewAllEmployees()
            }
                else if (answers.admin_options == "Add Employee"){
                    addEmployee()
                }
                    else if (answers.admin_options == "Update Employee Role"){
                        updateEmployeeRole()
                    }
                        else if (answers.admin_options == "View All Roles"){
                            viewAllRoles()
                        }
                            else if (answers.admin_options == "Add Role"){
                                addRole()
                            }
                                else if (answers.admin_options == "View All Departments"){
                                    viewAllDepartments()
                                }
                                    else {
                                        addDepartment()
        }
})

const viewAllEmployees = ()=> {}
const addEmployee = ()=> {}
const updateEmployeeRole = ()=> {}
const viewAllRoles = ()=> {}
const addRole= ()=> {}
const viewAllDepartments = ()=> {}
const addDepartment = ()=> {}

