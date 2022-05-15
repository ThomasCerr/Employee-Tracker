INSERT INTO department
(name)
VALUES
    ('Accounting'),
    ('Finance'),
    ('Sales');

INSERT INTO roles
(title, salary, department_id)
VALUES
    ('Head of Accounting', 100000, 1),
    ('Chief Financial Officer', 120000, 2),
    ('Financial Planner', 60000, 2),
    ('Head of Sales', 75000, 3),
    ('Account Executive', 65000, 3),
    ('Accountant', 60000, 1);



INSERT INTO employee
(first_name, last_name, roles_id, manager_id)
VALUES
    ('Charissa', 'Archaelaos',1,NULL),
    ('Farrux', 'Zenia',2,NULL),
    ('Gabrielle', 'Metrodora',3,2),
    ('Adele', 'Maiwenn',4,NULL),
    ('Nicolas', 'Nadia',5, 4),
    ('Ardgal', 'Akhenaton',6,1),
    ('Zivka', 'Edwena',3,2),
    ('Berhane', 'Amor',6,1),
    ('Urien', 'Ventsislav',5,4),
    ('Johan', 'Ester',5,4);