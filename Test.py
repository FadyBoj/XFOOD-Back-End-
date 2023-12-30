import requests

url = "https://xfood-ob2l.onrender.com/admin/users-info"
headers = {
    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGUwMjY5ZTU3OGFjYTNmMWRaZWI0OCIsImVtYWlsIjoiZmFkeW5hYmlsNzAxQGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6IkJvaiIsImxhc3RuYW1lIjoiTmFiaWwiLCJpYXQiOjE3MDM5NTU2MzEsImV4cCI6MTcwNDA0MjAzMX0.4sfvyDHtIipkUWFdvoB7-XJv6A49vuWF_jb1hBjuPRU"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    print("Request successful")
    print(response.json())
else:
    print(f"Request failed with status code {response.status_code}")
    print(response.text)