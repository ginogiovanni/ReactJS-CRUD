# ReactJS-CRUD

Este ejemplo de crud utiliza MySQL conectada a una api en Express.JS funcionando en localhost.

SCRIPTS MySQL

CREATE DATABASE userscrud;

USE userscrud;

CREATE TABLE users (
    id int AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(200),
    password VARCHAR(25)
);

clonar repositorio y usar:

yarn install
yarn start

Crear api(Pronto url del proyecto) y reemplazar url's en los metodos correspondientes dentro de src/components/Users.js
