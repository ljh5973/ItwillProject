import requests
import json
# from bs4 import BeautifulSoup
import uuid
# import urllib.request as url
import pymysql
import os

BASE_DIR="config"
secret_file= os.path.join(BASE_DIR, "pythonConfig.json")

with open(secret_file)as f:
    screts=json.loads(f.read())

cookies = {
    'NNB': 'EERZQSZJGJXGE',
    'nid_inf': '1728948940',
    'NID_AUT': 'TL6AZ46yEo6Hv9vTsug02xdHGeJpNhj74b+NgC8RnxUY1vmi8eP18CYb39UY708/',
    'NID_JKL': '5VrZqApUxRylWUl9FRdTs7XO7oSh6tkTcRtpjIh6Ito=',
    'NID_SES': 'AAABoeQg/UDDCQ9y2Vn1DqGzqdpkeF3h6OJ3ic+GlSaMU6PgQ9lw4kWFCUO/+rqRv0iMmgD+DxOVYGX4idIyhqNjIcy/mw++bCrPt9ekNPa9eZVGJBrvgLy4idm98lNM9CqgpAeacQtGC9XXBe7o2vy+UaNCZODlCBe8amQA41w72Ib0+TKMiVBclup49xp/gEviGAMi4Ct5mn9EI/660iRf3BDgKX/PCImkorGtthh1TjnddiViKa9mLqunwl3+I6dEuyp4PImwa72qyEi5sVE8Xyk88EtOsPtPPsuLPALHIwRdGNLc8yd63juDIztyfFiJ7VjSAjCO8NoyzDA1mSFqEIWRuPTs5ICdudgjWGZG1NQnjx4NKwQQNEL6lbuNsoJKm1xalRt6WiZ02pzpnceWfUdPEe0SRd6jf1MjyTEZUOX7DOxGH1Gfo1hZe+e2zxVjLZDzExFo3oksQnhl4OqR+DVI254a/P69CopcNOWDESnBiBYFcPX/4K4sTvnwP2iw1lNjalFvNndET+WWOkNIJF3Q53VN4TVgrRFyfATA9hY0qhTn0iaNFyOOIndixSZLVQ==',
    'sus_val': 'J5KIif0RCg/nDuesc5J5FK0C',
    'autocomplete': 'use',
    'AD_SHP_BID': '21',
    'spage_uid': '',
}

headers = {
    'authority': 'search.shopping.naver.com',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'ko-KR,ko;q=0.9,ja-JP;q=0.8,ja;q=0.7,en-US;q=0.6,en;q=0.5',
    # Requests sorts cookies= alphabetically
    # 'cookie': 'NNB=EERZQSZJGJXGE; nid_inf=1728948940; NID_AUT=TL6AZ46yEo6Hv9vTsug02xdHGeJpNhj74b+NgC8RnxUY1vmi8eP18CYb39UY708/; NID_JKL=5VrZqApUxRylWUl9FRdTs7XO7oSh6tkTcRtpjIh6Ito=; NID_SES=AAABoeQg/UDDCQ9y2Vn1DqGzqdpkeF3h6OJ3ic+GlSaMU6PgQ9lw4kWFCUO/+rqRv0iMmgD+DxOVYGX4idIyhqNjIcy/mw++bCrPt9ekNPa9eZVGJBrvgLy4idm98lNM9CqgpAeacQtGC9XXBe7o2vy+UaNCZODlCBe8amQA41w72Ib0+TKMiVBclup49xp/gEviGAMi4Ct5mn9EI/660iRf3BDgKX/PCImkorGtthh1TjnddiViKa9mLqunwl3+I6dEuyp4PImwa72qyEi5sVE8Xyk88EtOsPtPPsuLPALHIwRdGNLc8yd63juDIztyfFiJ7VjSAjCO8NoyzDA1mSFqEIWRuPTs5ICdudgjWGZG1NQnjx4NKwQQNEL6lbuNsoJKm1xalRt6WiZ02pzpnceWfUdPEe0SRd6jf1MjyTEZUOX7DOxGH1Gfo1hZe+e2zxVjLZDzExFo3oksQnhl4OqR+DVI254a/P69CopcNOWDESnBiBYFcPX/4K4sTvnwP2iw1lNjalFvNndET+WWOkNIJF3Q53VN4TVgrRFyfATA9hY0qhTn0iaNFyOOIndixSZLVQ==; sus_val=J5KIif0RCg/nDuesc5J5FK0C; autocomplete=use; AD_SHP_BID=21; spage_uid=',
    'logic': 'PART',
    'referer': 'https://search.shopping.naver.com/search/category/100005023',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
}

params = {
    'sort': 'rel',
    'pagingIndex': '2',
    'pagingSize': '40',
    'viewType': 'list',
    'productSet': 'total',
    'catId': '50000206',
    'brand': '',
    'maker': '',
    'spec': '',
    'mall': '',
    'deliveryFee': '',
    'deliveryTypeValue': '',
    'iq': '',
    'eq': '',
    'xq': '',
}

response = requests.get('https://search.shopping.naver.com/api/search/category/100005023', params=params, cookies=cookies, headers=headers)

result =json.loads(response.text)
products=result["shoppingResult"]["products"]
# productCnt=result["shoppingResult"]["productCount"]

for product in products:
    image=product["imageUrl"]
    
    image_res=requests.get(image)
    image_res.raise_for_status()
    
    camera_price=product["price"]
    # "localhost:5000/api/products/"
    camera_image= uuid.uuid4()
    test= "http://localhost:5000/api/products/image/" + str(camera_image)
    camera_name=product["productTitle"]
    camera_desc=product["characterValue"]   
    
    with open("./upload/{}".format(camera_image), "wb") as f:
            f.write(image_res.content)
            
    conn = pymysql.connect(host=screts["DB_HOST"], user=screts["DB_USER"], password=screts["DB_PASS"], db=screts["DB_NAME"], charset='utf8')
    cur = conn.cursor()
    sql = """insert into camera (camera_name, camera_desc, camera_price, camera_image) values( %s,%s,%s,%s)"""
    
    cur.execute(sql, (camera_name,camera_desc,camera_price,test))
    conn.commit()
    conn.close()
