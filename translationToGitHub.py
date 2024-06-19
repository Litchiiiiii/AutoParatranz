import json
import os
import re

import requests
from github import Github
from github import Auth

# 从环境变量中获取必要的Token和项目ID
token = os.environ["API_TOKEN"]
gittoken = os.environ["GH_TOKEN"]
project_id = os.environ["PROJECT_ID"]
file_url = f"https://paratranz.cn/api/projects/{project_id}/files/"

# 初始化列表和字典
file_id_list, file_path_list, zh_cn_list = [], [], []


def translate(file_id):
    """
    获取指定文件的翻译内容，并返回键值对列表。
    """
    url = f"https://paratranz.cn/api/projects/{project_id}/files/{file_id}/translation"
    response = requests.get(url, headers={"Authorization": token, "accept": "*/*"})
    translations = response.json()
    keys, values = [], []

    for item in translations:
        keys.append(item["key"])
        translation = item["translation"]
        original = item["original"]
        values.append(original if not(translation) and (item["stage"]==0 or item["stage"] == -1) else translation)

    return keys, values


def get_files():
    """
    获取项目中的文件列表，并提取文件ID和路径。
    """
    response = requests.get(file_url, headers={"Authorization": token, "accept": "*/*"})
    files = response.json()

    for file in files:
        file_id_list.append(file["id"])
        file_path_list.append(file["name"])


def save_translation(zh_cn_dict, path):
    """
    保存翻译字典为JSON文件。
    """
    dir_path = os.path.join("Patch-Pack-CN", os.path.dirname(path))
    os.makedirs(dir_path, exist_ok=True)
    file_path = os.path.join(dir_path, "zh_cn.json")

    with open(file_path, "w+", encoding='UTF-8') as f:
        json.dump(zh_cn_dict, f, ensure_ascii=False, indent=4, separators=(',', ':'))


def main():
    get_files()

    for file_id, path in zip(file_id_list, file_path_list):
        keys, values = translate(file_id)
        zh_cn_dict = {key: re.sub(r'\\n', '\n', value) for key, value in zip(keys, values)}
        zh_cn_list.append(zh_cn_dict)
        save_translation(zh_cn_dict, path)
        print(f"上传完成：{path}")


if __name__ == '__main__':
    main()