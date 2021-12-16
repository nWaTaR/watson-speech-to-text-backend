export interface Detection {
    position: number;
    text: string;
}
  
// TODO: 文字列検索一覧取得サービス  
export class DetectionService {
    public async Detection(words: string): Promise<Detection[]> {


        const toText = {
            "alternative": {
              "transcript": "D_ウーン そう 最近 増え ました かね レーベル 作って 百 百 烈 埋没 米 とか ビブリオ 羽織 を 映像 で セッション 保つ ん です ！ シルバー 運用 ユーザー できる 書面 ちゃう 人生 変わる わけ でも あり 愛 別姓 D_ア ＦＦＶ ジャパン ｉｎ あげて ション 違う 人生 ずっと 家 屏風山 ミシン D_マアネ ツアー を 見て 町 歩いて も ある とはいえ 前提 られて 中国 飲泉 泣いて いる 分の プロレス と 言って くれて ｐ 中 延 年 長期 に 侵入 町 の 人間 で ある で あり 以前 は 便器 恋 する ん です よ ハンソン で 検知 編入 を 目指す ビア も 圧延 円 アップル 猫 対 バルサ ション タオ ちゃん です いや それ を する プロヴァンス わいせつ 呆れ ちゃう 人 には もの を 番組 が でしょう ストーブ ブーム 弁 ちょっと ポイント って ＩＤ 説明 しにくい 先 が 思い アンルイス 電話 路面 スポーン 付いて いる ",
              "confidence": 0.53
            }
          }

        return [
          {
              position: 3,
              text: words
          },
          {
              position: 17,
              text: "あああああ文字列あああああ"
          },
          {
              position: 30,
              text: "いいいいい文字列いいいいい"
          },
        ]  
    }
}