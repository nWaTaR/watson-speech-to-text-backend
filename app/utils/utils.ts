import { RecognizeParams } from "../interface";
import { TextRes } from "../services/TextService"

/**
 * Watson共通Utilクラス
 */
export class WatsonUtils {
    /**
     * テキスト詰め関数
     * watson apiから返却された値を適切な形に詰める
     * @param speechToText 
     * @param recognizeParams 
     * @returns 
     */
    toTextUtil = async (speechToText: any, recognizeParams: RecognizeParams): Promise<TextRes> => {
        let toText
        try {
          const watsonRes = await speechToText.recognize(recognizeParams);
          toText = { alternative: watsonRes.result.results[0].alternatives[0], };
        } catch (error) {
          console.error(error);
          toText = { alternative: '' }
        }
        return toText
      }
} 