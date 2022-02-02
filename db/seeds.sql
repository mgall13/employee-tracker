INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('Sales Lead','100000', 1),
    ('Salesperson', '80000', 1),
    ('Lead Engineer', '150000', 2),
    ('Software Engineer', '120000', 2),
    ('Account Manager', '160000', 3),
    ('Accountant', '125000', 3),
    ('Legal Team Lead', '250000', 4),
    ('Lawyer', '190000', 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Kit', 'Haringron', 1, NULL),
    ('Emilia', 'Clarke', 2, 1),
    ('Peter', 'Dinklage', 3, NULL),
    ('Alfie', 'Allen', 4, 3),
    ('Isaac', 'Wright', 5, NULL),
    ('Sophie', 'Turner', 6, 5),
    ('Maisie', 'Williams', 7, NULL),
    ('Jason', 'Momoa', 8, 7);
    