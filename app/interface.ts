export interface Search {
  keyword: string;
  position: number;
  characterString: string;
}

/**
 * レスポンスインターフェース
 * speechToText 文字起こし結果
 * search 文字列検索
 */
export interface Response {
  speechToText: string;
  search: Search[];
}

/**
 * 音声ファイルインターフェース
 * audio 音声ファイルのバイナリファイル
 * contentType ファイルタイプ
 * model 言語モデル
 * 今回は日本語モデルで固定 UIから指定できるようにしてもよい。
 */
export interface RecognizeParams {
  audio: string;
  contentType: string;
  model: string;
}