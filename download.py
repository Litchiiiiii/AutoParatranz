import os
import paratranz_client

# Defining the host is optional and defaults to https://paratranz.cn/api
# See configuration.py for a list of all supported configuration parameters.
configuration = paratranz_client.Configuration(
    host="https://paratranz.cn/api"
)
configuration.api_key['Token'] = os.environ["API_KEY"]


async def download():
    async with paratranz_client.ApiClient(configuration) as api_client:
        # Create an instance of the API class
        api_instance = paratranz_client.ArtifactsApi(api_client)
        project_id = 9584  # int | 项目ID

        try:
            # 下载
            api_response = await api_instance.download_artifact(project_id)
            print(api_response)
        except Exception as e:
            print("Exception when calling ArtifactsApi->download_artifact: %s\n" % e)


if __name__ == '__main__':
    download()
