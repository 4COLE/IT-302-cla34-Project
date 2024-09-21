from pymongo import MongoClient
import requests
from datetime import datetime

# Connect to MongoDB (assuming localhost and default port)
client = MongoClient("mongodb://localhost:27017/")

# Check if the "it302" database exists; if not, create it
db_name = "it302"
if db_name not in client.list_database_names():
    db = client[db_name]
else:
    db = client[db_name]

# Define the collection name "coincap_cla34"
collection_name = "coincap_cla34"
collection = db[collection_name]

# Fetch data from the CoinCap API
api_url = "https://api.coincap.io/v2/assets"
response = requests.get(api_url)

if response.status_code == 200:
    data = response.json().get("data", [])

    # Check if there are at least 20 records
    if len(data) >= 20:
        documents = []
        
        # Extract 20 records to fulfill the requirement
        for item in data[:20]:
            document = {
                "id": item["id"],
                "name": item["name"],
                "symbol": item["symbol"],
                "priceUsd": item["priceUsd"],
                "rank": item["rank"],
                "image": f"https://assets.coingecko.com/coins/images/{item['rank']}/large/{item['id']}.png",
                "lastUpdated": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
            documents.append(document)
        
        # Insert documents into the MongoDB collection
        collection.insert_many(documents)
        inserted_count = collection.count_documents({})
        print(f"Successfully inserted {inserted_count} documents into the '{collection_name}' collection.")
    else:
        print("The API did not return 20 or more records.")
else:
    print(f"Failed to fetch data from API. Status code: {response.status_code}")
