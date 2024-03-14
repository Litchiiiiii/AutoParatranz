import requests
import os
token = os.environ["API_KEY"]
projectId = 9584
fileId = 1282824

fileUrl = "https://paratranz.cn/api/projects/" + str(projectId) + "/files/"
fileTranslationUrl = "https://paratranz.cn/api/projects/" + str(projectId) + "/files/" + str(id) + "/translation"
fileIdList = []
filePathList = []

def translate(id):
    urlRequests = requests.get(fileTranslationUrl, headers={"Authorization": token, "accept": "*/*"})
    print(urlRequests.json())

def getFile():
    fileRequest = requests.get(fileUrl, headers={"Authorization": token, "accept": "*/*"})
    fileJson = fileRequest.json()
    for i in fileJson:
        fileIdList.append(i["id"])
    for n in fileJson:
        filePathList.append(n["name"])


if __name__ == '__main__':
    getFile()
    #for v in fileList:
        #translate()
    for v in filePathList:
        print(v)
