FROM node:14-alpine
LABEL maintainer="wataru.nishiki1 <Wataru.Nishiki1@ibm.com>"
SHELL [ "/bin/ash", "-eoux", "pipefail", "-c" ]

# 
# ENV PORT=$port
# ENV SPEECH_TO_TEXT_AUTH_TYPE=iam
# ENV SPEECH_TO_TEXT_APIKEY=$apikey
# ENV SPEECH_TO_TEXT_URL=$url

# アプリケーションディレクトリを作成する
WORKDIR /usr/local/app

# アプリケーションの依存関係をインストールする
# ワイルドカードを使用して、package.json と package-lock.json の両方が確実にコピーされるようにします。
COPY ./package*.json .

# RUN npm i --production && \
RUN npm i && \
  adduser -S -g root app && \
  chmod -R 755 ./ && \
  chown -R app:root ./

COPY --chown=app:root . .

# アプリケーションのソースをバンドルする
EXPOSE 8000

CMD [ "npm", "run", "start" ]