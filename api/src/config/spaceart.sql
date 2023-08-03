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
  id char(36) NOT NULL,
  full_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  telphone varchar(11) NOT NULL,
  pwd varchar(255) NOT NULL,
  document varchar(11) NOT NULL,
  cep varchar(8) NOT NULL,
  website varchar(255) DEFAULT NULL,

  UNIQUE KEY uuid (id),
  UNIQUE KEY telphone_number (telphone),
  UNIQUE KEY email_address (email),
  UNIQUE KEY document_code (document)

) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE Contracts (
  id char(36) NOT NULL,
  hirer char(36) NOT NULL,
  hired char(36) NOT NULL,
  price integer(5) NOT NULL,
  date_point date NOT NULL,
  inital_time time(0) NOT NULL,
  final_time time(0) NOT NULL,
  art varchar(255) NOT NULL,
  rate int(1) DEFAULT NULL,
  accepted boolean DEFAULT 0,
  locked boolean DEFAULT 0

  UNIQUE KEY uuid (id)
) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE Selections (
  id char(36) NOT NULL,
  owner_id char(36) NOT NULL,
  price integer(5) NOT NULL,
  inital_datetime datetime NOT NULL,
  final_datetime datetime NOT NULL,
  art varchar(255) NOT NULL,

  UNIQUE KEY uuid (id)
) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;