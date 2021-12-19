import { doSearch } from "../utils/search";

export interface Text {
    alternative: Trans;
}

interface Trans {
  transcript: string;
  confidence: number;
}

const fs = require('fs');

const apikey = process.env.SPEECH_TO_TEXT_APIKEY
const serviceUrl = process.env.SPEECH_TO_TEXT_URL

// WatsonAPIのSDKモジュール backendに持っていく
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
  
/**
 * 文字列検索一覧取得サービス  
 */
export class TextService {
  public async run(req: any): Promise<any> {
    const toText = await this.watsonSpeechToText(req)
    const { keywords } = req.params;
    // TODO: position昇順
    const res = {
      speechToText: toText.alternative.transcript,
      search: doSearch(toText.alternative.transcript, keywords)
    }
    // console.log('res', res);
    return res;
  }
  watsonSpeechToText = async(req: any) => {
    const speechToText = new SpeechToTextV1({
      authenticator: new IamAuthenticator({
        apikey,
      }),
      serviceUrl,
    });
    const file = req.file;
  
    const recognizeParams = {
      // audio: fs.createReadStream(`./tmp/${req.file.filename}`),
      audio: file.buffer,
      contentType: 'audio/wav',
      // 日本語モデルを指定 UIから指定できるようにしてもよい。
      model: 'ja-JP_BroadbandModel',
    };
  
    // TODO: util
    let toText
    try {
      const watsonRes = await speechToText.recognize(recognizeParams);
      toText = { alternative: watsonRes.result.results[0].alternatives[0], };
    } catch (error) {
      console.error(error);
      toText = { alternative: '' }
    }
  
    // fs.unlink(`./tmp/${req.file.filename}`, (err: any) => {
    //   if (err) throw err;
    // });
    return toText
  }
}