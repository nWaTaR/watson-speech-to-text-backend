export class SearchResult {
    _transcript: string;
    searchWord: string;
    position: number;
    exactWord: string;
    beforeAndAfter: any;


    // 引数には、regexpの検索結果オブジェクトを取る
    constructor(result: any) {
      this._transcript = result.input;
      this.searchWord = result[0];
      this.position = result.index;
      this.exactWord = this.searchWord;
      this.beforeAndAfter = this.getBeforeAndAfterStr();
    }
  
    // 検索結果位置から±5文字の位置を取得する
    _calcBeforeAndAfterPosition(): number[] {
      let beforePosition = this.position - 5;
      if (beforePosition < 0) {
        beforePosition = 0
      }
  
      let afterPosition = (this.position + this.searchWord.length) + 5;
      if (afterPosition > this._transcript.length) {
        afterPosition = this._transcript.length;
      }
      return [beforePosition, afterPosition]
    }
  
    // 検索結果位置から±5文字分の文字列を取得する
    getBeforeAndAfterStr(): string {
      const [before, after] = this._calcBeforeAndAfterPosition()
      return this._transcript.substring(before, after);
    }
  
    // レスポンスの形に整形する
    toString() {
      return {
        keyword: this.searchWord,
        position: this.position,
        characterString: this.beforeAndAfter
      }
    }
  
  }
  
  // トランスクリプトと、検索ワードを受け取って、検索結果の文字列配列を返す
  // 検索ワードは複数単語をサポートする
  export function doSearch(_transcript: string, searchText: string) {
    // 検索結果を格納する配列
    const searchResults = [];

    // スペース区切りの配列にする。
    const searchWords = searchText.split(' ')
  
    // const searchWord = _searchWords[0];
    const searchWordsStr = searchWords.join("|");
    const searchRegExp = new RegExp(searchWordsStr, "g");
  
    // トランスクリプトから空白を除去して文字列にする
    const transcript = _transcript.replace(/\s+/g, "");
  
    // 検索実行
    let result = null;
    while ((result = searchRegExp.exec(transcript)) != null) {
      const _searchResult = new SearchResult(result);
      searchResults.push(_searchResult.toString());
    }
  
    return searchResults;
  }