import requests
import os
token = os.environ["API_KEY"]
projectId = 9584
fileId = 1282824


fileUrl = "https://paratranz.cn/api/projects/" + str(projectId) + "/files/"
fileIdList = []
filePathList = []
key = []
value = []
zh_cn = {}

def translate(id):
    fileTranslationUrl = "https://paratranz.cn/api/projects/" + str(projectId) + "/files/" + str(id) + "/translation"
    urlRequests = requests.get(fileTranslationUrl, headers={"Authorization": token, "accept": "*/*"})
    transilationJson = urlRequests.json()
    for i in transilationJson:
        key.append(i["key"])
        if i["translation"] == "":
            value.append(i["original"])
        else:
            value.append(i["translation"])


def getFile():
    fileRequest = requests.get(fileUrl, headers={"Authorization": token, "accept": "*/*"})
    fileJson = fileRequest.json()
    for i in fileJson:
        fileIdList.append(i["id"])
    for n in fileJson:
        filePathList.append(n["name"])


def listClear():
    value.clear()
    key.clear()
    zh_cn.clear()


if __name__ == '__main__':
    getFile()
    for id in fileIdList:
        i = 0
        listClear()
        translate(id)
        print(value)
        zh_cn = zh_cn.fromkeys(key)
        for k in zh_cn:
            zh_cn[k] = value[i]
            i = i+1
        for path in filePathList:
            file = open("./Patch-Pack-CN/" + path, "r", encoding='UTF-8')
            print(file.read())
        print(zh_cn)
