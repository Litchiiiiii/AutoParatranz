import asyncio
import os
import re
from pprint import pprint
import paratranz_client

# 配置Paratranz客户端
configuration = paratranz_client.Configuration(host="https://paratranz.cn/api")
configuration.api_key['Token'] = os.environ["API_TOKEN"]
project_id = int(os.environ["PROJECT_ID"])

async def upload_file(file_path, upload_path):
    """
    异步上传文件到Paratranz。
    :param file_path: 本地文件路径
    :param upload_path: 服务器端路径
    """
    async with paratranz_client.ApiClient(configuration) as api_client:
        api_instance = paratranz_client.FilesApi(api_client)
        try:
            # 上传文件
            api_response = await api_instance.create_file(project_id, file=file_path, path=upload_path)
            print("The response of FilesApi->create_file:\n")
            pprint(api_response)
        except Exception as e:
            print(f"Exception when calling FilesApi->create_file: {e}\n")


def get_filelist(dir, Filelist):
    newDir = dir
    if os.path.isfile(dir):
        if re.match(".+(en_us.json)$", dir, flags=0) is not None:
            Filelist.append(dir)
        # # 若只是要返回文件文，使用这个
        # Filelist.append(os.path.basename(dir))
    elif os.path.isdir(dir):
        for s in os.listdir(dir):
            # 如果需要忽略某些文件夹，使用以下代码
            # if s == "xxx":
            # continue
            #if s == "patchouli_books":
                #continue
            newDir = os.path.join(dir, s)
            get_filelist(newDir, Filelist)
    return Filelist


async def main():
    Filelist = []
    file_list = get_filelist(os.environ["FILE_PATH"], Filelist)
    print(file_list)
    for file_path in file_list:
        relative_path = file_path.split("Patch-Pack-CN")[1]
        upload_path = relative_path.replace('\\', '/').replace(os.path.basename(file_path), "")
        print(f"Uploading {file_path} to {upload_path}\n")
        await upload_file(file_path, upload_path)


if __name__ == '__main__':
    asyncio.run(main())
