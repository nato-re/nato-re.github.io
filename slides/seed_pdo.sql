-- Script de Seed para o Banco de Dados: league_db
-- Tema: League of Legends (Campeões e Regiões de Runeterra)

CREATE DATABASE IF NOT EXISTS league_db 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

USE league_db;

-- 2. Tabela da Aula: Campeões
CREATE TABLE IF NOT EXISTS campeoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    maestria INT DEFAULT 1,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserindo dados de teste da aula (O Teemo será inserido via código no slide, mas deixamos outros para a listagem inicial do SELECT)
INSERT INTO campeoes (nome, maestria) VALUES 
('Yasuo', 7),
('Ahri', 6),
('Jinx', 5),
('Lee Sin', 7);

-- 3. Tabela do Hands-on: Regiões (Runeterra)
CREATE TABLE IF NOT EXISTS regioes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserindo as regiões iniciais principais da Lore para o SELECT do CRUD
INSERT INTO regioes (nome, descricao) VALUES 
('Demacia', 'Um reino forte, de tradição militar e orgulhoso, com aversão fervorosa à magia.'),
('Noxus', 'Um império poderoso e expansionista onde a força e o poder são valorizados acima de tudo.'),
('Ionia', 'Uma terra dotada de magia primeva natural, que abriga estudiosos focados na iluminação e no equilíbrio.');
