import requests

token = environ["API_KEY"]
projectId = 9584
fileId = 1282824

fileUrl = "https://paratranz.cn/api/projects/" + str(projectId) + "/files/"


def translate(id):
    resourcePackUrl = "https://paratranz.cn/api/projects/" + str(projectId) + "/files/" + str(id)
    urlRequests = requests.get(resourcePackUrl, headers={"Authorization": token, "accept": "*/*"})
    print(urlRequests.json())


def getFile():
    fileRequest = requests.get(fileUrl, headers={"Authorization": token, "accept": "*/*"})
    fileJson = fileRequest.json()
    for i in fileJson:
        print(i["id"])


if __name__ == '__main__':
    translate(fileId)
    getFile()
