# Watson Speech To Text Backend

## Openshift Deploy

# Tauras Backend

### How to setup on local

```sh
docker build --no-cache \
    --tag quay.io/wataru_nishiki_ibm1/watson-speech-to-text-backend:<VERSION> .

docker login quay.io
username:
password:

docker run --name watson-speech-to-text-backend --rm \
    --publish 8000:8000 \
    quay.io/wataru_nishiki_ibm1/watson-speech-to-text-backend:<VERSION>

# 環境変数読み込んでdocker run
docker run --env-file .env --name watson-speech-to-text-backend --rm \
    --publish 8000:8000 \
    quay.io/wataru_nishiki_ibm/watson-speech-to-text-backend:<VERSION>

docker push quay.io/wataru_nishiki1_ibm/watson-speech-to-text-backend:<VERSION>
```

### OC login
ブラウザ > ibm cloud > openshift (2112072-ITZ-V2) >openshift web console
※新しいクラスターを選択（語尾がm4u）

ocコンソールの右上からログインコマンドのコピー

```sh
oc login --token=<TOKEN> --server=<SERVER NAME>

oc config current-context

oc new-project nishiki-watson-speech-to-text-backend
```

### Run on K8S

```sh
# Create deployment
oc apply -f ./k8s/deployment.yaml

# Check runnning the two pods.
oc get pods

oc apply -f ./k8s/service.yaml

oc get svc
NAME                          TYPE       CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
watson-speech-to-text-backend-service   NodePort   172.21.145.149   <none>        80:30196/TCP   30s

oc apply -f ./k8s/route.yaml

oc get all
```

### Prepare create pipeline by Tekton

```sh
oc apply -f https://raw.githubusercontent.com/tektoncd/catalog/main/task/git-clone/0.5/git-clone.yaml

oc apply -f https://raw.githubusercontent.com/tektoncd/catalog/main/task/npm/0.1/npm.yaml

oc apply -f https://raw.githubusercontent.com/tektoncd/catalog/main/task/yaml-lint/0.1/yaml-lint.yaml

oc apply -f https://raw.githubusercontent.com/tektoncd/catalog/main/task/buildah/0.2/buildah.yaml

oc get tasks
NAME        AGE
buildah     7s
git-clone   15m
npm         15m
yaml-lint   15m

oc apply -f ./tekton/pvc.yaml
```

```sh
oc apply -f ./tekton/watson-speech-to-text-backend-pipeline.yaml
tkn pipeline list

oc apply -f ./tekton/kustomize/kustomize-build-task.yaml
oc apply -f ./tekton/kustomize/test-deploy-task.yaml

cd tekton
chmod +x create-sa.sh create-secret.sh
sh ./create-secret.sh
oc get secret
sh ./create-sa.sh

oc create -f ./tekton/watson-speech-to-text-backend-pipeline-run.yaml

oc apply -f ./tekton/watson-speech-to-text-backend-pipeline.yaml

```

```
oc apply -f ./tekton/kustomize/trigger/tekton-triggers-sa.yaml
```

  - `$ oc policy add-role-to-user cluster-admin -z tekton-triggers-sa` 

  - `$ oc apply -f ./tekton/kustomize/trigger/tekton-triggers-role.yaml`

  - `$ oc apply -f ./tekton/kustomize/trigger/tekton-triggertemplate.yaml`

  - `$ oc apply -f ./tekton/kustomize/trigger/triggerbinding.yaml`

  - `$ oc apply -f ./tekton/kustomize/trigger/eventlistener.yaml`

  - `$ oc apply -f ./tekton/kustomize/trigger/route.yaml`

- [ ] Webhook を設定

  - アプリのソースコードを `https://github.com/nWaTaR/watson-speech-to-text-backend` に登録

  - Github のパーソナルアクセストークンを指定して `$ oc apply -f webhook.yaml`

  - `$ oc get route` の結果 akpfs-el-route の値として取得されるホスト名を webhook の Payload URL に指定してアプリに Webhook を登録

- [ ] パイプラインを登録

  - `$ oc apply -f pipeline.yaml`