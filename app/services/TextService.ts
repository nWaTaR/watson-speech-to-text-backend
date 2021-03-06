import { doSearch } from "../utils/search";
import { WatsonUtils } from "../utils/utils";
import { RecognizeParams, Response } from "../interface";

export interface TextRes {
    alternative: Trans;
}

interface Trans {
  transcript: string;
  confidence: number;
}

/**
 * 文字列検索一覧取得サービス  
 */
export class TextService {
  public async run(req: any, apikey: any, serviceUrl: any): Promise<Response> {
    const toText = await this.watsonSpeechToText(req, apikey, serviceUrl);
    const { keywords } = req.params;
  
    const res = {
      speechToText: toText.alternative.transcript,
      search: doSearch(toText.alternative.transcript, keywords)
    }
    return res;
  }

  /**
   * Watson Speech To Text APIリクエスト関数
   * @param req 
   * @returns 
   */
  watsonSpeechToText = async(req: any, apikey: any, serviceUrl: any): Promise<TextRes> => {
    // WatsonAPIのSDKモジュール backendに持っていく
    const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');
    const speechToText = new SpeechToTextV1({
      authenticator: new IamAuthenticator({
        apikey,
      }),
      serviceUrl,
    });
    const file = req.file;
  
    const recognizeParams: RecognizeParams = {
      // audio: fs.createReadStream(`./tmp/${req.file.filename}`),
      audio: file.buffer,
      contentType: 'audio/wav',
      model: 'ja-JP_BroadbandModel',
    };
  
    // fs.unlink(`./tmp/${req.file.filename}`, (err: any) => {
    //   if (err) throw err;
    // });
    return new WatsonUtils().toTextUtil(speechToText, recognizeParams);
  }
}