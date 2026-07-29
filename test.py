import requests

BASE = "http://127.0.0.1:5001/"

data = [{"likes": 12, "name": "john", "views": 46999},
        {"likes": 13, "name": "mard", "views": 49867},
        {"likes": 15, "name": "fin", "views": 65245},
        {"likes": 18, "name": "gate", "views": 2555},
        {"likes": 17, "name": "carl", "views": 4598}]
for i in range(len(data)):
    response = requests.put(
        BASE + "video/" + str(i),
        json=data[i]
    )
    print(response.json())
    input()
# response = requests.put(BASE + "video/2",json={"likes": 10, "name": "john", "views": 4500})

response = requests.delete(BASE + "video/0")
print(response)
input()
response = requests.get(BASE + "video/2")
print(response.json())
print("Status Code;", response.status_code)
print("Response text;", response.text)