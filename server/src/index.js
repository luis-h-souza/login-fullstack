require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

// configuração de CORS
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : [];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Não permitido pelo CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())

// Necessario para confirar em proxies (ngnix, load balancer, etc...), confia apenas no primeiro proxy
app.set('trust proxy', 1)



module.exports = app
