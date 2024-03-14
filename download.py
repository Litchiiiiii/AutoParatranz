import asyncio
import os
import requests
from urllib3 import response

token = os.environ["API_KEY"]
projectId = 9584
fileId = 1282824
resourcePackUrl = "https://paratranz.cn/api/projects/" + str(projectId) + "/files/" + str(fileId)


async def translate():
    urlRequests = requests.get(resourcePackUrl, headers={"Authorization": token, "accept": "*/*"})
    print(urlRequests.content)
if __name__ == '__main__':
    asyncio.run(translate())
