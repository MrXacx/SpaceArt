INSERT INTO users (id, name, image, email, password, phone, CEP, federation, city) VALUES
('2', 'usuário 2', 'img.jpg', 'email2@gmail.com', 'senha 2', '22222', '22222', 'BA', "Salvador"),
('4', 'usuário 4', 'img.jpg', 'email4@gmail.com', 'senha 4', '44444', '44444', 'SP', "Osasco"),
('6', 'usuário 6', 'img.jpg', 'email6@gmail.com', 'senha 6', '66666', '66666', 'AM', "Manaus"),
('8', 'usuário 8', 'img.jpg', 'email8@gmail.com', 'senha 8', '88888', '88888', 'MT', "Nova Primavera"),
('1', 'usuário 1', 'img.jpg', 'email1@gmail.com', 'senha 1', '11111', '11111', 'RS', "Gramado"),
('3', 'usuário 3', 'img.jpg', 'email3@gmail.com', 'senha 3', '33333', '33333', 'SE', "Alagoas"),
('5', 'usuário 5', 'img.jpg', 'email5@gmail.com', 'senha 5', '55555', '55555', 'ES', "Vila Velha"),
('7', 'usuário 7', 'img.jpg', 'email7@gmail.com', 'senha 7', '77777', '77777', 'GO', "Goiânia");

INSERT INTO enterprise (id, CNPJ, district, address)
('1', '11111', 'BAIRRO 1', "Rua 1, nº 43"),
('3', '33333', 'BAIRRO 2', "Rua 2, nº 63 E"),
('5', '55555', 'BAIRRO 3', "Travessa 3, nº 37, segundo andar"),
('7', '77777', 'BAIRRO 4', "Rua 4, s/n");

INSERT INTO artist (id, CPF, wage_to_hourly, art)
('2', '22222', '204', 'dança'),
('4', '44444', '234', 'música'),
('6', '66666', '420', 'escultura'),
('8', '88888', '110', 'pintura');


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
