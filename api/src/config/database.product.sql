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
DROP DATABASE spaceart;
CREATE DATABASE spaceart;
USE spaceart;


CREATE TABLE users(

  id char(36) PRIMARY KEY,
  name varchar(191) NOT NULL,
  email varchar(191) UNIQUE KEY NOT NULL,
  phone char(11) NOT NULL,
  password varchar(191) NOT NULL,
  CEP varchar(8) NOT NULL,
  federation char(2) NOT NULL,
  city varchar(50) NOT NULL,
  image varchar(191),
  website varchar(191),
  rate float DEFAULT 0

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE artist(

  id char(36) PRIMARY KEY,
  CPF char(11) UNIQUE KEY NOT NULL,
  art enum("escultura", "pintura", "dança", "música") NOT NULL,
  wage_to_hourly float NOT NULL,

  FOREIGN KEY (id) REFERENCES users(id)  ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE enterprise(

  id char(36) PRIMARY KEY,
  CNPJ char(14) UNIQUE KEY NOT NULL,
  district varchar(191) NOT NULL,
  address varchar(191) NOT NULL,

  FOREIGN KEY (id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE agreement(

  id char(36) PRIMARY KEY,
  hirer char(36) NOT NULL,
  hired char(36) NOT NULL,
  price mediumint(5) unsigned NOT NULL,
  date date NOT NULL,
  inital_time time NOT NULL,
  final_time  time NOT NULL,
  art varchar(191) NOT NULL,
  status enum("send", "accepted", "recused", "canceled")  DEFAULT "send",
  rate int,

  FOREIGN KEY (hirer) REFERENCES enterprise(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (hired) REFERENCES artist(id) ON UPDATE CASCADE ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE selection(

  id char(36) PRIMARY KEY,
  owner char(36) NOT NULL,
  price mediumint(5) unsigned NOT NULL,
  inital_datetime datetime NOT NULL,
  final_datetime datetime NOT NULL,
  art varchar(191) NOT NULL,
  locked boolean DEFAULT 0,

  FOREIGN KEY (owner) REFERENCES enterprise(id) ON UPDATE CASCADE ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE selection_application(

  selection char(36) NOT NULL,
  artist char(36) NOT NULL,
  last_change timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (selection, artist),
  FOREIGN KEY (selection) REFERENCES selection (id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (artist) REFERENCES artist (id) ON UPDATE CASCADE ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE report(

  id char(36) PRIMARY KEY,
  reporter char(36),
  reported char(36) NOT NULL,
  reason varchar(191) NOT NULL,
  accepted boolean,

  FOREIGN KEY (reporter) REFERENCES users (id) ON UPDATE CASCADE ON DELETE SET NULL,
  FOREIGN KEY (reported) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE chat(
  id char(36) PRIMARY KEY,
  artist char(36),
  enterprise char(36),

  FOREIGN KEY (artist) REFERENCES artist (id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (enterprise) REFERENCES enterprise (id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE message(
    chat char(36),
    sender char(36),
    content varchar(191) NOT NULL,
    shipping_datetime timestamp DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (chat, sender, shipping_datetime)
    FOREIGN KEY (chat) REFERENCES chat (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (sender) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE rate(

    author char(36),
    agreement char(36),
    rate float NOT NULL,
	description varchar(191),

    PRIMARY KEY(author, agreement),
    CONSTRAINT author_fk FOREIGN KEY (author) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT agreement_fk FOREIGN KEY (agreement) REFERENCES agreement (id) ON UPDATE CASCADE ON DELETE CASCADE
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
