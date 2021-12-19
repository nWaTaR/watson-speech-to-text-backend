import { doSearch } from "../../../app/utils/search";

describe("Utils", () => {  
    it("search関数正常系テスト", async () => {
        const transcript = 'おはよう おやすみ こんばんは';
        const searchText = 'おはよう こんにちは こんばんは';
        
        const res = doSearch(transcript, searchText);
  
        expect(res).toEqual([
            {
              "keyword": "おはよう",
              "position": 1,
              "characterString": "おはようおやすみこ"
            },
            {
              "keyword": "こんばんは",
              "position": 9,
              "characterString": "うおやすみこんばんは"
            }
          ]);
      });
});