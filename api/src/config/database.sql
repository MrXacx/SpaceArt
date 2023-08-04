
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
