// ライブラリ読み込み
import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
const app = express();
app.use(helmet());
app.use(cors({ 
  origin: 'https://frontend-nishiki-watson-speech-to-text-frontend.itzroks-120000mck6-ufxk6m-6ccd7f378ae819553d37d5f2ee142bd6-0000.us-south.containers.appdomain.cloud/',
  credentials: true,
  optionsSuccessStatus: 200
}));
const bodyParser = require('body-parser');

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8000; // port番号を指定

// ------ ルーティング ------ //
const router = require('./routes/');
app.use('/', router);

//サーバ起動
const app_server = app.listen(port);
app_server.timeout = 1000 * 60 * 3;   //. ３分
console.log('listen on port ' + port);

module.exports = app;