import asyncio
import time
import os
import paratranz_client
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
configuration.api_key['Token'] = "c6b450a2fb51077faa022f7412d89dcb"

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['Token'] = 'Bearer'

# Enter a context with an instance of the API client
async def f():
    async with paratranz_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
        api_instance = paratranz_client.ArtifactsApi(api_client)
        project_id = 9574 # int | 项目ID

        try:
        # 下载
            await api_instance.download_artifact(project_id)
        except Exception as e:
            print("Exception when calling ArtifactsApi->download_artifact: %s\n" % e)
#asyncio.run(f())
if __name__ == '__main__':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(f())

