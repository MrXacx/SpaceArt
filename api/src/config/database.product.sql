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

CREATE DATABASE spaceart;
USE spaceart;


CREATE TABLE users(

  id varchar(36) PRIMARY KEY,
  name varchar(191) NOT NULL,
  email varchar(191) UNIQUE KEY NOT NULL,
  phone varchar(11) NOT NULL,
  password varchar(191) NOT NULL,
  CEP varchar(8) NOT NULL,
  federation varchar(2) NOT NULL,
  city varchar(50) NOT NULL,
  imageURL varchar(191),
  website varchar(191),
  rate float DEFAULT 0

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE artist(

  id varchar(36) PRIMARY KEY,
  CPF varchar(11) UNIQUE KEY NOT NULL,
  art enum("escultura", "pintura", "dança", "música") NOT NULL,
  wage float NOT NULL,

  FOREIGN KEY (id) REFERENCES users(id)  ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE enterprise(

  id varchar(36) PRIMARY KEY,
  CNPJ varchar(14) UNIQUE KEY NOT NULL,
  district varchar(191) NOT NULL,
  address varchar(191) NOT NULL,

  FOREIGN KEY (id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE agreement(

  id varchar(36) PRIMARY KEY,
  hirer varchar(36) NOT NULL,
  hired varchar(36) NOT NULL,
  price float unsigned NOT NULL,
  date date NOT NULL,
  inital_time time NOT NULL,
  final_time  time NOT NULL,
  art varchar(191) NOT NULL,
  status enum("send", "accepted", "recused", "canceled")  DEFAULT "send",

  FOREIGN KEY (hirer) REFERENCES enterprise(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (hired) REFERENCES artist(id) ON UPDATE CASCADE ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE selection(

  id varchar(36) PRIMARY KEY,
  owner varchar(36) NOT NULL,
  price float unsigned NOT NULL,
  inital_datetime datetime NOT NULL,
  final_datetime datetime NOT NULL,
  art varchar(191) NOT NULL,
  locked boolean DEFAULT 0,

  FOREIGN KEY (owner) REFERENCES enterprise(id) ON UPDATE CASCADE ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE selection_application(

  selection varchar(36) NOT NULL,
  artist varchar(36) NOT NULL,
  last_change timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (selection, artist),
  FOREIGN KEY (selection) REFERENCES selection (id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (artist) REFERENCES artist (id) ON UPDATE CASCADE ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE report(

  id varchar(36) PRIMARY KEY,
  reporter varchar(36),
  reported varchar(36) NOT NULL,
  reason varchar(191) NOT NULL,
  accepted boolean,

  FOREIGN KEY (reporter) REFERENCES users (id) ON UPDATE CASCADE ON DELETE SET NULL,
  FOREIGN KEY (reported) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE chat(
  id varchar(36) PRIMARY KEY,
  artist varchar(36),
  enterprise varchar(36),

  FOREIGN KEY (artist) REFERENCES artist (id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (enterprise) REFERENCES enterprise (id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE message(
    chat varchar(36),
    sender varchar(36),
    content varchar(191) NOT NULL,
    shipping_datetime timestamp DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (chat, sender, shipping_datetime),
    FOREIGN KEY (chat) REFERENCES chat (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (sender) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE rate(

    author varchar(36),
    agreement varchar(36),
    rate float NOT NULL,
    description varchar(191),

    PRIMARY KEY(author, agreement),
    CONSTRAINT author_fk FOREIGN KEY (author) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT agreement_fk FOREIGN KEY (agreement) REFERENCES agreement (id) ON UPDATE CASCADE ON DELETE CASCADE
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
