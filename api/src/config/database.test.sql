INSERT INTO users (id, name, email, password, phone, CPF, CEP, type) VALUES
('2', 'usuário 2', 'email2@gmail.com', 'senha 2', '22222', '22222', '22222', "artist"),
('4', 'usuário 4', 'email4@gmail.com', 'senha 4', '44444', '44444', '44444', "artist"),
('6', 'usuário 6', 'email6@gmail.com', 'senha 6', '66666', '66666', '66666', "artist"),
('8', 'usuário 8', 'email8@gmail.com', 'senha 8', '88888', '88888', '88888', "artist");

INSERT INTO users (id, name, email, password, phone, CNPJ, CEP, type) VALUES
('1', 'usuário 1', 'email1@gmail.com', 'senha 1', '11111', '11111', '11111', "enterprise"),
('3', 'usuário 3', 'email3@gmail.com', 'senha 3', '33333', '33333', '33333', "enterprise"),
('5', 'usuário 5', 'email5@gmail.com', 'senha 5', '55555', '55555', '55555', "enterprise"),
('7', 'usuário 7', 'email7@gmail.com', 'senha 7', '77777', '77777', '77777', "enterprise");

INSERT INTO agreement (id, hirer, hired, price, date inital_time, final_time, art) VALUES
('1', '1', '2', 200, '2023-12-31', '00:00', '23:59', 'música'),
('2', '3', '4', 200, '2023-12-31', '00:00', '23:59', 'pintura'),
('3', '5', '6', 200, '2023-12-31', '00:00', '23:59', 'escultura'),
('4', '7', '8', 200, '2023-12-31', '00:00', '23:59', 'música');

INSERT INTO selection (id, owner, price, art, inital_datetime, final_datetime) VALUES
('1', '1', 250, 'música', '2023-12-31 00:00', '2023-12-31 23:59'),
('2', '7', 300, 'pintura', '2023-12-31 00:00', '2023-12-31 23:59');

INSERT INTO selection_application (selection, artist) VALUES 
('1', '2'),
('2', '4'),
('1', '6'),
('2', '8');
