const http = require('http');
const url = require('url');

const html = (imc = null, clasificacion = '', peso = '', estatura = '') => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Calculadora IMC - Christian Márquez- Alisson Viteri</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #111;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
    }
    h1 {
      color: #00ffff;
    }
    form {
      margin: 20px 0;
    }
    input[type="number"] {
      padding: 8px;
      margin: 5px;
      border-radius: 5px;
      border: none;
      width: 100px;
    }
    button {
      padding: 8px 20px;
      border: none;
      border-radius: 5px;
      background-color: #00ffff;
      color: black;
      font-weight: bold;
      cursor: pointer;
    }
    .resultado {
      margin-top: 20px;
      font-size: 1.2em;
    }
    table {
      margin-top: 30px;
      border-collapse: collapse;
    }
    td, th {
      padding: 12px 20px;
      text-align: center;
    }
    .bajo { background-color: #4fc3f7; }
    .normal { background-color: #81c784; }
    .sobrepeso { background-color: #ffb74d; }
    .obesidad { background-color: #e57373; }
  </style>
</head>
<body>
  <h1>Calculadora de IMC - Christian Márquez- Alisson Viteri</h1>
  <p>Materia: Aplicaciones Distribuidas</p>
  <form method="GET">
    <input type="number" name="peso" step="0.1" placeholder="Peso (kg)" value="${peso}" required>
    <input type="number" name="estatura" step="0.01" placeholder="Estatura (m)" value="${estatura}" required>
    <button type="submit">Calcular IMC</button>
  </form>
  ${imc !== null ? `
    <div class="resultado">
      Tu IMC es <strong>${imc.toFixed(2)}</strong><br>
      Clasificación: <strong>${clasificacion}</strong>
    </div>
  ` : ''}

  <table border="1">
    <tr>
      <th>Rango IMC</th>
      <th>Clasificación</th>
    </tr>
    <tr class="bajo"><td>&lt; 18.5</td><td>Bajo peso</td></tr>
    <tr class="normal"><td>18.5 - 24.9</td><td>Peso normal</td></tr>
    <tr class="sobrepeso"><td>25 - 29.9</td><td>Sobrepeso</td></tr>
    <tr class="obesidad"><td>&ge; 30</td><td>Obesidad</td></tr>
  </table>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  const { query } = url.parse(req.url, true);
  const peso = parseFloat(query.peso);
  const estatura = parseFloat(query.estatura);

  let imc = null;
  let clasificacion = '';

  if (!isNaN(peso) && !isNaN(estatura) && peso > 0 && estatura > 0) {
    imc = peso / (estatura * estatura);
    if (imc < 18.5) clasificacion = 'Bajo peso';
    else if (imc < 25) clasificacion = 'Peso normal';
    else if (imc < 30) clasificacion = 'Sobrepeso';
    else clasificacion = 'Obesidad';
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html(imc, clasificacion, query.peso || '', query.estatura || ''));
});

server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
