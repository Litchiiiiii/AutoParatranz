import asyncio
import os

import paratranz_client

configuration = paratranz_client.Configuration(
    host="https://paratranz.cn/api"
)
configuration.api_key['Token'] = os.environ["API_KEY"]


async def translate():
    async with paratranz_client.ApiClient(configuration) as api_client:
        api_instance = paratranz_client.FilesApi(api_client)
        project_id = 9584  # int | 项目ID
        file_id = 1282824  # int | 文件ID

        try:
            # 文件翻译
            api_response = await api_instance.get_file_translation(project_id, file_id)
            print(api_response)
        except Exception as e:
            print("Exception when calling FilesApi->get_file_translation: %s\n" % e)


if __name__ == '__main__':
    asyncio.run(translate())
