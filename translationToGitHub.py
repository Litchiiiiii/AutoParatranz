import requests
import os
from github import Github
from github import Auth
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
def linkgithub():
    gittoken = os.envrion["GH_TOKEN"]
    auth = Auth.Token(gittoken)
    g = Github(auth = auth)
    for repo in g.get_user().get_repos():
        print(repo.name+".")

if __name__ == '__main__':
    getFile()
    '''
    for id in fileIdList:
        i = 0
        listClear()
        translate(id)
        #print(value)
        zh_cn = zh_cn.fromkeys(key)
        for k in zh_cn:
            zh_cn[k] = value[i]
            i = i+1
        for path in filePathList:
            filename = os.path.basename(path)
            path = path.replace(filename,"")
            if not os.path.exists(path):
                os.makedirs("Patch-Pack-CN/" + path,0o777,True)
            with open("Patch-Pack-CN/" + path + filename, "w+", encoding='UTF-8') as f:    #读操作与写操作
                f.write(str(zh_cn))    #写入
                f.seek(0)    #读出前将指针移到文件开头
                cNames = f.read()    #文件所有行读出，此处也可以使用read（）函数，结果一样 
        #print(zh_cn)
    '''
    linkgithub()