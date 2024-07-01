## 使用教程
## 1. 设置环境变量

- 创建环境: Settings -> Environments -> New environment

- 设置加密变量: Name:API_KEY , Value:你的ParatranzTOKEN

- 设置环境变量: 

    - Name:G_PATH , Value:仓库链接(.git的域名)

    - Name:ID , Value:Paratranz项目ID
- 设置issue Labels:

    - 设置Labels: '自动化:Github→paratranz'(无需引号)

    - 设置Labels: '自动化:paratranz→Github'(无需引号)
## 2. 搭建仓库目录
- 目标仓库workflow文件夹直接使用使用本仓库的workflow内容

- 本仓库的Py文件复制到目标仓库(无需放入文件夹)

- 创建Patch-Pack-CN文件夹(用于放置汉化包的所有内容包括MOD|语言文件|Config等)

## 3.开始使用
- 上传原文至Paratranz: 使用issue事件启动,open一个issue并选择上文提到的'自动化:Github→paratranz' Label

- 上传译文至Github:

    - 使用issue事件启动,open一个issue并选择上文提到的'自动化:paratranz→Github' Label

    - 根据schedule启动,可自行在workflow文件夹中的auto-download_action.yml文件修改自动执行时间
