import asyncio
import time
import os
import paratranz_client
from paratranz_client.models.create_file200_response import CreateFile200Response
from paratranz_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://paratranz.cn/api
# See configuration.py for a list of all supported configuration parameters.
configuration = paratranz_client.Configuration(
    host = "https://paratranz.cn/api"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: Token
configuration.api_key['Token'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['Token'] = 'Bearer'

# Enter a context with an instance of the API client
async def f():
    async with paratranz_client.ApiClient(configuration) as api_client:
        # Create an instance of the API class
        api_instance = paratranz_client.FilesApi(api_client)
        project_id = 9574 # int | 项目ID
        file = "book.json"# bytearray | 文件数据，文件名由此项的文件名决定 (optional)
        path = "" # str | 文件路径 (optional)

        try:
            # 上传文件
            api_response = await api_instance.create_file(project_id, file=file, path=path)
            print("The response of FilesApi->create_file:\n")
            pprint(api_response)
        except Exception as e:
            print("Exception when calling FilesApi->create_file: %s\n" % e)
if __name__ == '__main__':
    asyncio.run(f())
    print(os.environ["FILE_PATH"])
