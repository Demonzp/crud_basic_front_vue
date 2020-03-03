const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql2/promise');
const Sequelize = require('sequelize');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    next();
});

// Создаём БД в MySQL.
const dbName = process.env.DB_SCHEMAS || 'crud';

mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || '3306',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
}).then((connection) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then(() => {
        console.log('Database successfully created or already exist.');
    });
});

// Определяем объект sequelize.
const sequelize = new Sequelize('crud', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    define: {
        timestamps: false,
    },
});

// Cинхронизация с БД, при успешной синхронизации запускаем сервер.
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Сервер ожидает подключения...');
    });
}).catch((err) => console.log(err));

// Создаём модель для БД.
const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
    },
});


// ПОЛУЧЕНИЕ списка продуктов по запросу.
app.get('/products', (req, res) => {
    Product.findAll()
        .then((result) =>res.json(result));
});

// ДОБАВЛЕНИЕ в список новых продуктов.
app.post('/products/update', (req, res) => {
    Product.create({ name: req.body.name, price: req.body.price })
        .then((result) => res.json(result));
});

// РЕДАКТИРОВАНИЕ информации в массиве по ID.
app.put('/products/edit/:id', (req, res) => {
    Product.update({ name: req.body.name, price: req.body.price }, { where: { id: req.params.id } })
        .then(() => res.json('Обновление выполнено.'));
});

// УДАЛЕНИЕ информации в массиве по ID.
app.delete('/products/delete/:id', (req, res) => {
    Product.destroy({ where: { id: req.params.id } })
        .then(() =>res.json('Удаление выполнено.'));
});


// SEEDS
Product.create({ name: 'Intel Core i5-2500K', price: '1000' });
Product.create({ name: 'AMD Ryzen 3 3600', price: '5600' });
Product.create({ name: 'NVIDIA GeForce GTX 1050Ti', price: '4000' });