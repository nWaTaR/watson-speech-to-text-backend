const router = require('./app/routes/index');

const app_server = app.listen(8081, () => {
  console.log('listening on port 8081!')
});
app_server.timeout = 1000 * 60 * 3;   //. ３分