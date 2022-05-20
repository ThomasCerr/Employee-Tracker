const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const console_table = require('console.table');
const db = require('./db/connection');
require('events').EventEmitter.defaultMaxListeners = 30;
var departmentList = [];
var managerList = [];
var roleList = [];
var updateRoleList = [];
var employeeList = [];


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
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee 
    LEFT JOIN roles on employee.roles_id = roles.id 
    LEFT JOIN department on roles.department_id = department.id 
    LEFT JOIN employee manager on manager.id = employee.manager_id;`

    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
        } 
        console.table(res);
          initialize_prompt(); 
        })
}


const addEmployee = ()=> {
    var pullRolesSQL = `SELECT DISTINCT title FROM roles;`;
    
    db.query(pullRolesSQL, (err, res) => {
        if (err) {console.log(err);
        }
        
        for(var i = 0; i <res.length; i++){
            roleList.push({name:res[i].title,value:i+1});
        }
        })
    
        var pullManagerSQL = `SELECT DISTINCT manager_id FROM employee;`;
    
        db.query(pullManagerSQL, (err, res) => {
            if (err) {console.log(err);}
            for(var i = 0; i <res.length; i++){
                if (res[i].manager_id !== null){
                managerList.push({name:res[i].manager_id})
                }
             }
            managerList.push({name:"Manager"})
            
        })
            
           
    inquirer.prompt([
    {
        type: 'input',
        name: 'add_employee_firstname',
        message: 'What is the first name of the Employee?',
        
      },
      {
        type: 'input',
        name: 'add_employee_lastname',
        message: 'What is the last name of the Employee?',
        
    },
    {
        type: 'list',
        name: 'add_employee_role',
        message: 'What is the role of the Employee?',
        choices: roleList

    },
    {
        type: 'list',
        name: 'add_employee_managerID',
        message: 'What is the managers ID of the Employee, if they are a manager select "Manager"?',
        choices: managerList
    },
      ])
              .then((answers) =>{
                  if(answers.add_employee_managerID == 'Manager'){
                    answers.add_employee_managerID = null
                  }
                const addEmployeeSql = `INSERT INTO employee(first_name,last_name,roles_id,manager_id)
                VALUES ("${answers.add_employee_firstname}","${answers.add_employee_lastname}","${answers.add_employee_role}",${answers.add_employee_managerID});`
                db.query(addEmployeeSql, (err, res) => {
                if (err) {console.log(err);}
                
                    })
                    initialize_prompt();
              })

}
const updateEmployeeRole  = async ()=> {
    
    var pullEmployeeSQL = `SELECT DISTINCT ID, CONCAT (employee.first_name, ' ' ,employee.last_name) AS Employee FROM employee;`;


  db.query(pullEmployeeSQL, (err, res) => {
        if (err) {console.log(err);}
        for(var i = 0; i <res.length; i++){ 
        
            employeeList.push({name:res[i].Employee, value:res[i].ID })   
    
        } 
    })
  

    var roleSQL = `SELECT DISTINCT ID, roles.title AS Roles FROM Roles`;
    db.query(roleSQL, (err, res) => {
        if (err) {console.log(err);}
        for(var i = 0; i <res.length; i++){
            updateRoleList.push({name:res[i].Roles, value: res[i].ID})   
         }
    })
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'confirm',
                    message: 'Do you want to change an employees role?',
            
                  },
            {
                type: 'list',
                name: 'employee_name',
                message: 'What is the first name of the Employee?',
                choices:employeeList
                
              },
              {
                type: 'list',
                name: 'role_change_id',
                message: 'What role do you want to assign to the Employee?',
                choices: updateRoleList
                
              },
            ])
              .then((answers) =>{
    

                const updateEmployeeRole = `UPDATE employee
                SET roles_id= ${answers.role_change_id}
                WHERE employee.id = ${answers.employee_name};`
                db.query(updateEmployeeRole, (err, res) => {
                if (err) {console.log(err);}
                    })
                    initialize_prompt();
                    console.log("Employee Role has been Updated")          
            })
        }


const viewAllRoles = ()=> {
    const sql = `SELECT DISTINCT roles.title AS Roles FROM Roles`;
    db.query(sql, (err, res) => {
         if (err) {console.log(err);}
          console.table(res);
          initialize_prompt(); 
        })

}
const addRole= ()=> {
    var pullDepartmentSQL = `SELECT name FROM department;`;
    
    db.query(pullDepartmentSQL, (err, res) => {
        if (err) {console.log(err);}
        for(var i = 0; i <res.length; i++){
            departmentList.push({name:res[i].name, value:i+1}) 
           
        }
        })
       
    inquirer.prompt([
        {
        type: 'input',
        name: 'add_role_title',
        message: 'What is the title of the Role?'
      },
        {
        type: 'input',
        name: 'add_role_salary',
        message: 'What is the salary of the Role?'
        },
        {
        type: 'list',
        name: 'add_role_department',
        message: 'What is the department of this Role?',
        choices: departmentList
    },
      ])
              .then((answers) =>{
            
                const addRoleSql = `INSERT INTO roles(title,salary,department_ID)
                VALUES ("${answers.add_role_title}","${answers.add_role_salary}", "${answers.add_role_department}");`;

                    db.query(addRoleSql, (err, res) => {
                    if (err) {console.log(err);}
                        
                        })
                        initialize_prompt();
                        console.log("Employee Role has been Added")
                })


}
const viewAllDepartments = ()=> {
    const sql = `SELECT DISTINCT department.id, department.name AS Department FROM department`;

    db.query(sql, (err, res) => {
        if (err) {console.log(err);}
          console.table(res);
          initialize_prompt(); 
        })

}
const addDepartment = ()=> {

    inquirer.prompt([
        {
          type: 'input',
          name: 'add_department',
          message: 'What is the name of the Department?'
      },
      ])
              .then((answers) =>{
            
                const addDepSql = `INSERT INTO department(name)
                            VALUES ("${answers.add_department}");`;
                db.query(addDepSql, (err, res) => {
                if (err) {console.log(err);}
                    
                    initialize_prompt(); 
                    console.log("Department Added")
                    })

              })

}



initialize_prompt();

