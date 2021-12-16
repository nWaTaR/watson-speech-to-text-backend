// ライブラリ読み込み
import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
const app = express();
app.use(helmet());
app.use(cors());
const bodyParser = require('body-parser');

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000; // port番号を指定

// ------ ルーティング ------ //
const router = require('./routes/');
app.use('/', router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);

module.exports = app;