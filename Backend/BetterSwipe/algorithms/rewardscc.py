import requests

def getCardImage(card_id):
    url = "https://rewards-credit-card-api.p.rapidapi.com/creditcard-card-image/" + str(card_id)
    headers = {
        "X-RapidAPI-Key": "7f76593528msh895867acf925af0p188c6ejsndf3c621c761a",
        "X-RapidAPI-Host": "rewards-credit-card-api.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers).json()[0]['cardImageUrl']
    return response

def getCardDetails(card_id):
    url = "https://rewards-credit-card-api.p.rapidapi.com/creditcard-detail-bycard/" + str(card_id)
    headers = {
        "X-RapidAPI-Key": "7f76593528msh895867acf925af0p188c6ejsndf3c621c761a",
        "X-RapidAPI-Host": "rewards-credit-card-api.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers).json()
    return response

def getCategoryList():
    url = "https://rewards-credit-card-api.p.rapidapi.com/creditcard-spendbonuscategory-categorylist"
    headers = {
        "X-RapidAPI-Key": "7f76593528msh895867acf925af0p188c6ejsndf3c621c761a",
        "X-RapidAPI-Host": "rewards-credit-card-api.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers).json()
    return response


def getCardsInCategory(category_id):
    url = "https://rewards-credit-card-api.p.rapidapi.com/creditcard-spendbonuscategory-categorycard/" + str(category_id)
    headers = {
        "X-RapidAPI-Key": "7f76593528msh895867acf925af0p188c6ejsndf3c621c761a",
        "X-RapidAPI-Host": "rewards-credit-card-api.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers).json()
    return response
