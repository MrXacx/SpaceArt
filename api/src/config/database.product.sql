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

CREATE TABLE user (
  id char(36) NOT NULL,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  CPF varchar(11) DEFAULT NULL,
  CNPJ varchar(14) DEFAULT NULL,
  phone varchar(11) NOT NULL,
  password varchar(255) NOT NULL,
  CEP varchar(8) NOT NULL,
  website varchar(255) DEFAULT NULL,
  type enum("artist", "enterprise") NOT NULL,

  PRIMARY KEY (id),
  UNIQUE KEY (email),
  UNIQUE KEY (CPF),
  UNIQUE KEY (CNPJ)
) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE agreement (
  id char(36) NOT NULL,
  hirer char(36) NOT NULL,
  hired char(36) NOT NULL,
  price mediumint(5) UNSIGNED NOT NULL,
  date date NOT NULL,
  inital_time TIME(0) NOT NULL,
  final_time  TIME(0) NOT NULL,
  art varchar(255) NOT NULL,
  rate int DEFAULT NULL,
  accepted boolean DEFAULT 0,
  locked boolean DEFAULT 0,

  PRIMARY KEY (id),
  FOREIGN KEY (hirer) REFERENCES user(id) ON UPdate CASCADE ON DELETE CASCADE,
  FOREIGN KEY (hired) REFERENCES user(id) ON UPdate CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE selection (
  id char(36) NOT NULL,
  owner char(36) NOT NULL,
  price mediumint(5) UNSIGNED NOT NULL,
  inital_datetime dateTIME NOT NULL,
  final_datetime dateTIME NOT NULL,
  art varchar(255) NOT NULL,
  locked boolean DEFAULT 0,

  PRIMARY KEY (id),
  CONSTRAINT owner_fk FOREIGN KEY (owner) REFERENCES user(id) ON UPdate CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE selection_application (
  selection char(36) NOT NULL,
  artist char(36) NOT NULL,
  last_change timestamp DEFAULT CURRENT_timestamp ON UPdate CURRENT_timestamp,
  
  PRIMARY KEY (selection, artist),
  CONSTRAINT selection_fk FOREIGN KEY (selection) REFERENCES selection (id) ON UPdate CASCADE ON DELETE CASCADE,
  CONSTRAINT artist_fk FOREIGN KEY (artist) REFERENCES user (id) ON UPdate CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE report (
  id char(36) NOT NULL,
  reporter char(36),
  reported char(36) NOT NULL,
  reason varchar(255) NOT NULL,
  accepted boolean DEFAULT NULL,
  
  PRIMARY KEY (id),
  CONSTRAINT reporter_fk FOREIGN KEY (reporter) REFERENCES user (id)  ON UPdate CASCADE ON DELETE SET NULL,
  CONSTRAINT reported_fk FOREIGN KEY (reported) REFERENCES user (id)  ON UPdate CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT charSET=utf8mb4 COLLATE=utf8mb4_general_ci;
