const multer = require('multer'); // multipart-formdataを処理するライブラリ
const maxSize = 10 * Math.pow(1024, 2) // 10MB

// アップロードされたファイルはディスクには書き込まず、メモリ上で一時的に保持する
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSize }
}) 