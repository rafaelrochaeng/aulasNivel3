import express from 'express';
// src/server.ts
import routes from './routes/index';

const app = express();
app.use(routes);

// app.get('/', (request, response) => response.json({ message: 'Hello GoStack' }));

app.listen(3333, () => {
  console.log('Server started on port 3333...');
});
