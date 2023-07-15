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


/*!40101 SET @OLD_charACTER_SET_CLIENT=@@charACTER_SET_CLIENT */;
/*!40101 SET @OLD_charACTER_SET_RESULTS=@@charACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: spaceart
--
CREATE DATABASE spaceart;
USE spaceart;
-- --------------------------------------------------------

CREATE TABLE Users (
  id char(36) NOT NULL,
  full_name varchar(30) NOT NULL,
  email varchar(30) NOT NULL,
  pwd varchar(60) NOT NULL,
  document varchar(11) NOT NULL,
  cep varchar(8) NOT NULL,

  UNIQUE KEY uuid (id),
  UNIQUE KEY email_address (email),
  UNIQUE KEY document_code (document)

) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE Contracts (
  id char(36) NOT NULL,
  hirer char(36) NOT NULL,
  hired char(36) NOT NULL,
  price decimal(5,2) NOT NULL,
  date_point date NOT NULL,
  inital_time time(0) NOT NULL,
  final_time time(0) NOT NULL,
  art varchar(10) NOT NULL,
  contract_description varchar(256) NOT NULL,

  UNIQUE KEY uuid (id)
) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE Selections (
  id char(36) NOT NULL,
  owner_id char(36) NOT NULL,
  price decimal(5,2) NOT NULL,
  inital_date date NOT NULL,
  final_date date NOT NULL,
  inital_time time(0) NOT NULL,
  final_time time(0) NOT NULL,
  art varchar(10) NOT NULL,
  selection_description varchar(256) NOT NULL,

  UNIQUE KEY uuid (id)
) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;