/* Importa as dependências */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const port = 5000;

/* Cria o servidor WEB */
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(cors());

/* Cria conexão com banco de dados */
const con = mysql.createConnection({
    connectionLimit: 10,
    host: 'sql10.freesqldatabase.com',      // O host do banco. Ex: localhost
    user: 'sql10746501',           // Um usuário do banco. Ex: user 
    password: 'FTP4ByS4pb',       // A senha do usuário. Ex: user123
    database: 'sql10746501', // Nome do banco de dados
    port: 3306,
});

con.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida!');
});

/* Endpoint de registro */
app.post('/api/register', (req, res) => {
    const { nome, email, senha, senhaConfirm } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !senha || !senhaConfirm) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    // Verifica se as senhas coincidem
    if (senha !== senhaConfirm) {
        return res.status(400).json({ message: 'As senhas não coincidem!' });
    }

    con.query('SELECT * FROM register WHERE email = ?', [email], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro no servidor' });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: 'Email já registrado!' });
        }
        con.query('INSERT INTO register(nome, email, senha, senhaConfirm) VALUES (?, ?, ?,?)', [nome, email, senha, senhaConfirm], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao registrar usuário' });
            }

            return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
        });
    });
});

/** Cria uma função do tipo POST para a rota '/api/login' */
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    console.log('Requisição de login recebida:', email, senha); // Log para verificar o email e a senha recebidos

    // Corrigido o nome da tabela para 'usuarios' e a condição `rows.length`
    con.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, rows) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            res.status(500).send('Erro ao consultar o banco de dados');
            return;
        }

        console.log('Resultado da consulta ao banco de dados:', rows);


        if (rows.length > 0 && senha === rows[0].senha) {
            console.log('Usuário autenticado com sucesso');
            res.status(200).send('Autenticado');
            return;
        }

        console.log('Falha na autenticação');
        res.status(401).send('Usuário ou senha inválido');
    });
});

app.listen(5000, () => {
    console.log('Servidor em execução na porta 5000!');
});

