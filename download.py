import asyncio
import os

import paratranz_client
from paratranz_client import CreateFile200Response

configuration = paratranz_client.Configuration(
    host="https://paratranz.cn/api"
)
configuration.api_key['Token'] = os.environ["API_KEY"]


async def translate():
    async with paratranz_client.ApiClient(configuration) as api_client:
        api_instance = paratranz_client.FilesApi(api_client)
        project_id = 9584  # int | 项目ID
        file_id = 1282824  # int | 文件ID
        json = '[{"id": 406760824,"key": "eee","original": "e","translation": "1","stage": 1,"context": null}]'

        try:
            # 文件翻译
            create_file200_response_instance = CreateFile200Response.from_json(json)
            api_response = await api_instance.get_file_translation(project_id, file_id)
            print(create_file200_response_instance)
            print(api_response)
        except Exception as e:
            print("Exception when calling FilesApi->get_file_translation: %s\n" % e)


if __name__ == '__main__':
    asyncio.run(translate())
