import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { TextService } from '../services/TextService';
const app = express();
app.use(helmet());
app.use(cors({ 
  origin: 'https://frontend-nishiki-watson-speech-to-text-frontend.itzroks-120000mck6-ufxk6m-6ccd7f378ae819553d37d5f2ee142bd6-0000.us-south.containers.appdomain.cloud',
  // credentials: true,
  optionsSuccessStatus: 200
}));
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
    res.status(200).send({ message: 'Hello, world!' });
});

// router.get('/videos/toText/:words/detection', (req, res, next) => {
//     const { words } = req.params;
//     const service = new DetectionService();
//     service
//       .Detection(words)
//       .then(result => res.status(200).send(result))
//       .catch(next);
// });

router.post('/watson-speech-to-text/detection/:keywords', upload.single("audio"), async (req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', 'https://frontend-nishiki-watson-speech-to-text-frontend.itzroks-120000mck6-ufxk6m-6ccd7f378ae819553d37d5f2ee142bd6-0000.us-south.containers.appdomain.cloud');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');

  const apikey = process.env.SPEECH_TO_TEXT_APIKEY
  const serviceUrl = process.env.SPEECH_TO_TEXT_URL

  const service = new TextService();
  service
    .run(req, apikey, serviceUrl)
    .then(result => res.status(200).send(result))
    .catch(reason => {console.log('reason: ', reason); next()});

  // const service = new TextService();
  // const result = await service.run(req);
  // console.log('result: ', result);

  // res.status(200).send(result);
})

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