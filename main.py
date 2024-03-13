import asyncio
import re
import time
import os
import paratranz_client
from paratranz_client.models.create_file200_response import CreateFile200Response
from paratranz_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://paratranz.cn/api
# See configuration.py for a list of all supported configuration parameters.
configuration = paratranz_client.Configuration(
    host="https://paratranz.cn/api"
)

configuration.api_key['Token'] = os.environ["API_KEY"]


async def f(self, path):
    async with paratranz_client.ApiClient(configuration) as api_client:
        # Create an instance of the API class
        api_instance = paratranz_client.FilesApi(api_client)
        project_id = 9584  # int | 项目ID
        file = os.environ["FILE_PATH"]  # bytearray | 文件数据，文件名由此项的文件名决定 (optional)
        self.path = ""  # str | 文件路径 (optional)

        try:
            # 上传文件
            api_response = await api_instance.create_file(project_id, file=file, path=self.path)
            print("The response of FilesApi->create_file:\n")
            pprint(api_response)
        except Exception as e:
            print("Exception when calling FilesApi->create_file: %s\n" % e)


def get_filelist(dir, Filelist):
    newDir = dir
    if os.path.isfile(dir):
        if re.match(".+(.json)$", dir, flags=0) is not None:
            Filelist.append(dir)
        # # 若只是要返回文件文，使用这个
        # Filelist.append(os.path.basename(dir))
    elif os.path.isdir(dir):
        for s in os.listdir(dir):
            # 如果需要忽略某些文件夹，使用以下代码
            # if s == "xxx":
            # continue
            if s == "patchouli_books":
                continue
            newDir = os.path.join(dir, s)
            get_filelist(newDir, Filelist)
    return Filelist


if __name__ == '__main__':
    Filelist = []
    s = get_filelist(os.environ["FILE_PATH"], Filelist)
    asyncio.run(f(path="a"))
