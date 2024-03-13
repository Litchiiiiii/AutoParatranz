import os

import paratranz_client
from paratranz_client import FilesApi

configuration = paratranz_client.Configuration(
    host = "https://paratranz.cn/api"
)
configuration.api_key['Token'] = os.environ["API_KEY"]
async def f():
    async with paratranz_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
        api_instance = paratranz_client.FilesApi(api_client)
        project_id = 9574 # int | 项目ID
        try:
        # 文件列表
            api_response = await api_instance.get_files(project_id)
            print("The response of FilesApi->get_files:\n")
            print(api_response)
        except Exception as e:
            print("Exception when calling FilesApi->get_files: %s\n" % e)
f()
