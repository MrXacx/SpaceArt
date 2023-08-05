-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 08-Jul-2023 às 20:46
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Banco de dados: spaceart
--
CREATE DATABASE spaceart;
USE spaceart;
-- --------------------------------------------------------

CREATE TABLE Users (
  id CHAR(36) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(11) NOT NULL,
  pwd VARCHAR(255) NOT NULL,
  document VARCHAR(11) NOT NULL,
  cep VARCHAR(8) NOT NULL,
  website VARCHAR(255) DEFAULT NULL,
  contracts JSON DEFAULT NULL,
  selections JSON DEFAULT NULL,

  PRIMARY KEY (id),
  UNIQUE KEY email_address (email),
  UNIQUE KEY document_code (document)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE Contracts (
  id CHAR(36) NOT NULL,
  hirer CHAR(36) NOT NULL,
  hired CHAR(36) NOT NULL,
  price MEDIUMINT(5) UNSIGNED NOT NULL,
  date_point DATE NOT NULL,
  inital_time TIME(0) NOT NULL,
  final_time  TIME(0) NOT NULL,
  art VARCHAR(255) NOT NULL,
  rate int(1) DEFAULT NULL,
  accepted BOOLEAN DEFAULT 0,
  locked BOOLEAN DEFAULT 0,
  contracts JSON DEFAULT NULL,
  selections JSON DEFAULT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (hirer) REFERENCES Users(id),
  FOREIGN KEY (hired) REFERENCES Users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE Selections (
  id CHAR(36) NOT NULL,
  owner_id CHAR(36) NOT NULL,
  price MEDIUMINT(5) UNSIGNED NOT NULL,
  inital_datetime DATETIME NOT NULL,
  final_datetime DATETIME NOT NULL,
  art VARCHAR(255) NOT NULL,
  locked BOOLEAN DEFAULT 0,

  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES Users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE Selection_Applications(
  id CHAR(36) NOT NULL,
  selection CHAR(36) NOT NULL,
  artist CHAR(36) NOT NULL,
  last_change TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (selection) REFERENCES Selections (id),
  FOREIGN KEY (artist) REFERENCES Users (id),
  PRIMARY KEY (selection, artist),
  UNIQUE KEY (id)
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO Users (id, full_name, email, pwd, phone, document, cep) VALUES
('1', 'usuário 1', 'email1@gmail.com', 'senha 1', '11111', '11111', '11111'),
('2', 'usuário 2', 'email2@gmail.com', 'senha 2', '22222', '22222', '22222'),
('3', 'usuário 3', 'email3@gmail.com', 'senha 3', '33333', '33333', '33333'),
('4', 'usuário 4', 'email4@gmail.com', 'senha 4', '44444', '44444', '44444'),
('5', 'usuário 5', 'email5@gmail.com', 'senha 5', '55555', '55555', '55555'),
('6', 'usuário 6', 'email6@gmail.com', 'senha 6', '66666', '66666', '66666'),
('7', 'usuário 7', 'email7@gmail.com', 'senha 7', '77777', '77777', '77777'),
('8', 'usuário 8', 'email8@gmail.com', 'senha 8', '88888', '88888', '88888');

INSERT INTO Contracts (id, hirer, hired, price, date_point, inital_time, final_time, art) VALUES
('1', '1', '2', 200, '2023-12-31', '00:00', '23:59', 'música'),
('2', '3', '4', 200, '2023-12-31', '00:00', '23:59', 'pintura'),
('3', '5', '6', 200, '2023-12-31', '00:00', '23:59', 'escultura'),
('4', '7', '8', 200, '2023-12-31', '00:00', '23:59', 'música');

INSERT INTO Selections (id, owner_id, price, art, inital_datetime, final_datetime) VALUES
('1', '1', 250, 'música', '2023-12-31 00:00', '2023-12-31 23:59'),
('2', '7', 300, 'pintura', '2023-12-31 00:00', '2023-12-31 23:59');

INSERT INTO Selection_Applications (id, selection, artist) VALUES 
('1', '1', '2'),
('2', '2', '4'),
('3', '1', '6'),
('4', '2', '8');
