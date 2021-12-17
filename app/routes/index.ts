import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { DetectionService } from '../services/DetectionService';
import { TextService } from '../services/TextService';
const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
// ルーティングする
const router = express.Router();

import { upload } from "../middlewares/multer"

// const fs = require('fs');

// const apikey = process.env.SPEECH_TO_TEXT_APIKEY || '<iam_apikey>'
// const serviceUrl = process.env.SPEECH_TO_TEXT_URL

// // WatsonAPIのSDKモジュール backendに持っていく
// const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
// const { IamAuthenticator } = require('ibm-watson/auth');

// routerにルーティングの動作を記述する
router.get('/helloWorld', (req, res) => {
    res.status(200).send({ message: 'Hello, world' });
});

router.get('/videos/toText/:words/detection', (req, res, next) => {
    const { words } = req.params;
    const service = new DetectionService();
    service
      .Detection(words)
      .then(result => res.status(200).send(result))
      .catch(next);
});

router.post('/watson-speech-to-text/detection/:keywords', upload.single("audio"), async (req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

  const service = new TextService();
  service
    .run(req)
    .then(result => res.status(200).send(result))
    .catch(next);
})

// waston-speech-to-textのサンプルコード
// https://cloud.ibm.com/apidocs/speech-to-text?code=node#recognize-request
// router.post('/watson-speech-to-text', upload.single("audio"), async (req: any, res: any, next: any) => {

//   const service = new TextService();
//   service
//     .run(req)
//     .then(result => res.status(200).send(result))
//     .catch(next);
// })

// -------------------------------------------------
//  以下、何のルーティングにもマッチしないorエラー
// -------------------------------------------------

// いずれのルーティングにもマッチしない(==NOT FOUND)
app.use((req, res) => {
    res.status(404);
    res.render('error', {
      param: {
        status: 404,
        message: 'not found'
      },
    });
  });

//routerをモジュールとして扱う準備
module.exports = router;