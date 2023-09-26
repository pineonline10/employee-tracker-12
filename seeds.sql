INSERT INTO department(name) VALUES
('Game Development'),
('Game Design'),
('Art & Graphics'),
('Quality Assurance'),
('Project Management'),
('Audio Engineering');

INSERT INTO role (title, salary, dept_id) VALUES
('Game Developer', 90000.00, 1),
('Game Designer', 82500.00, 2),
('Graphic Artist', 65000.00, 3),
('QA Tester', 55000.00, 4),
('Project Manager', 95000.00, 5),
('Sound Engineer', 70000.00, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Billy Bob', 'Thornton', 3, 1),
('Alice', 'Brown', 4, 2),
('Charles', 'Bukowski', 5, 3),
('Margaret', 'Thatcher', 6, 4);