require('dotenv').config();

const app = require('./index');

const PORT = parseInt(process.env.SERVER_PORT, 10) || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
