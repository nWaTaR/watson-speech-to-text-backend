import { TextService } from "../../../app/services";
const fs = require('fs');

describe("Text Service", () => {

  const apikey = process.env.SPEECH_TO_TEXT_APIKEY
  const serviceUrl = process.env.SPEECH_TO_TEXT_URL
  const service = new TextService();
  it("正常系テスト", async () => {
      let req = {
        params: {
          keywords: 'でしょう'
        },
        file: {
          buffer: fs.createReadStream(`./tmp/public_audio_ja-JP_Broadband-sample.wav`),
          filename: 'public_audio_ja-JP_Broadband-sample.wav'
        }
      };
      
      const res = await service.run(req, apikey, serviceUrl);

      expect(res).toEqual({
        speechToText: "音声 認識 の 現状 に ついて 教えて いただけ ない でしょう か はい 最近 では 音声 認識 でも ディープ ラーニング が よく つく 使われて ます ねえ それ は どう いった もの なの でしょう か 簡単 に 言えば 脳 の 仕組み を モデル に した 技術 です それ は 難しそう ですね 一部 では 人間 の 能力 を 超える まで に なって います ",
        search: [
          {
            "keyword": "でしょう",
            "position": 21,
            "characterString": "ただけないでしょうかはい最近"
          },
          {
            "keyword": "でしょう",
            "position": 72,
            "characterString": "たものなのでしょうか簡単に言"
          }
        ]
      });
    });
    it("検索0件", async () => {
      let req = {
        params: {
          keywords: '音声ファイル'
        },
        file: {
          buffer: fs.createReadStream(`./tmp/public_audio_ja-JP_Broadband-sample.wav`),
          filename: 'public_audio_ja-JP_Broadband-sample.wav'
        }
      };
      
      const res = await service.run(req, apikey, serviceUrl);

      expect(res).toEqual({
        speechToText: "音声 認識 の 現状 に ついて 教えて いただけ ない でしょう か はい 最近 では 音声 認識 でも ディープ ラーニング が よく つく 使われて ます ねえ それ は どう いった もの なの でしょう か 簡単 に 言えば 脳 の 仕組み を モデル に した 技術 です それ は 難しそう ですね 一部 では 人間 の 能力 を 超える まで に なって います ",
        search: []
      });
    });
});