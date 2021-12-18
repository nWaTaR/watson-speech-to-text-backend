import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { DetectionService } from '../services/DetectionService';
// import { TextService } from '../services/TextService';
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

router.get('/videos/toText/:words/detection', (req, res, next) => {
    const { words } = req.params;
    const service = new DetectionService();
    service
      .Detection(words)
      .then(result => res.status(200).send(result))
      .catch(next);
});

router.post('/watson-speech-to-text/detection/:keywords', upload.single("audio"), async (req: any, res: any, next: any) => {
  console.log('backend post log', req.params.keywords);

  res.header('Access-Control-Allow-Origin', 'https://frontend-nishiki-watson-speech-to-text-frontend.itzroks-120000mck6-ufxk6m-6ccd7f378ae819553d37d5f2ee142bd6-0000.us-south.containers.appdomain.cloud');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');

  const dummy = {
    speechToText: 'D_ウーン そう 最近 増え ました かね レーベル 作って 百 百 烈 埋没 米 とか ビブリオ 羽織 を 映像 で セッション 保つ ん です ！ シルバー 運用 ユーザー できる 書面 ちゃう 人生 変わる わけ でも あり 愛 別姓 D_ア ＦＦＶ ジャパン ｉｎ あげて ション 違う 人生 ずっと 家 屏風山 ミシン D_マアネ ツアー を 見て 町 歩いて も ある とはいえ 前提 られて 中国 飲泉 泣いて いる 分の プロレス と 言って くれて ｐ 中 延 年 長期 に 侵入 町 の 人間 で ある で あり 以前 は 便器 恋 する ん です よ ハンソン で 検知 編入 を 目指す ビア も 圧延 円 アップル 猫 対 バルサ ション タオ ちゃん です いや それ を する プロヴァンス わいせつ 呆れ ちゃう 人 には もの を 番組 が でしょう ストーブ ブーム 弁 ちょっと ポイント って ＩＤ 説明 しにくい 先 が 思い アンルイス 電話 路面 スポーン 付いて いる ',
    search: [
      { keyword: 'する', position: 190, characterString: '前は便器恋するんですよハ' },
      { keyword: 'する', position: 239, characterString: 'いやそれをするプロヴァン' }
    ]
  }

  setTimeout(() => { console.log('hoge') }, 5000);

  res.status(200).send(dummy);

  // const service = new TextService();
  // service
  //   .run(req)
  //   // .then(result => res.status(200).send(result))
  //   .then(result => res.status(200).send(dummy))
  //   .catch(reason => {console.log('reason: ', reason); next()});

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