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
-- --------------------------------------------------------

CREATE TABLE users(
  id char(36) NOT NULL,
  name varchar(191) NOT NULL,
  email varchar(191) NOT NULL,
  phone char(11) NOT NULL,
  password varchar(191) NOT NULL,
  CEP varchar(8) NOT NULL,
  federation char(2) NOT NULL,
  city varchar(50) NOT NULL,
  image varchar(191),
  website varchar(191),

  PRIMARY KEY (id),
  UNIQUE KEY (email)
) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE artist(
  id char(36) NOT NULL,
  CPF char(11) NOT NULL,
  art enum("escultura", "pintura", "dança", "música") NOT NULL,
  wage_to_hourly float NOT NULL,

  FOREIGN KEY (id) REFERENCES users(id)  ON UPDATE CASCADE ON DELETE CASCADE,
  UNIQUE KEY (CPF)
) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE enterprise(
  id char(36) NOT NULL,
  CNPJ char(14) NOT NULL,
  district varchar(191) NOT NULL,
  address varchar(191) NOT NULL,

  FOREIGN KEY (id) REFERENCES users(id)  ON UPDATE CASCADE ON DELETE CASCADE,
  UNIQUE KEY (CNPJ)
) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE agreement(
  id char(36) NOT NULL,
  hirer char(36) NOT NULL,
  hired char(36) NOT NULL,
  price mediumint(5) UNSIGNED NOT NULL,
  date date NOT NULL,
  inital_time time NOT NULL,
  final_time  time NOT NULL,
  art varchar(191) NOT NULL,
  rate int,
  status enum("send", "accepted", "recused", "canceled")  DEFAULT "send",

  PRIMARY KEY (id),
  FOREIGN KEY (hirer) REFERENCES enterprise(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (hired) REFERENCES artist(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE selection(
  id char(36) NOT NULL,
  owner char(36) NOT NULL,
  price mediumint(5) UNSIGNED NOT NULL,
  inital_datetime datetime NOT NULL,
  final_datetime datetime NOT NULL,
  art varchar(191) NOT NULL,
  locked boolean DEFAULT 0,

  PRIMARY KEY (id),
  FOREIGN KEY (owner) REFERENCES enterprise(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE selection_application(
  selection char(36) NOT NULL,
  artist char(36) NOT NULL,
  last_change timestamp DEFAULT CURRENT_timestamp ON UPDATE CURRENT_timestamp,
  
  PRIMARY KEY (selection, artist),
  FOREIGN KEY (selection) REFERENCES selection (id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (artist) REFERENCES artist (id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE report(
  id char(36) NOT NULL,
  reporter char(36),
  reported char(36) NOT NULL,
  reason varchar(191) NOT NULL,
  accepted boolean,
  
  PRIMARY KEY (id),
  FOREIGN KEY (reporter) REFERENCES users (id)  ON UPDATE CASCADE ON DELETE SET NULL,
  FOREIGN KEY (reported) REFERENCES users (id)  ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;
