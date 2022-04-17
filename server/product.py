import requests
from bs4 import BeautifulSoup
import json
import uuid
import urllib.request as url
import pymysql

cookies = {
    'NNB': '7GSJAI56AJOGE',
    'nx_ssl': '2',
    'autocomplete': 'use',
    'AD_SHP_BID': '4',
    'spage_uid': 'hDwuwlprvxsssgo%2FjnZssssstmR-224465',
    'ncpa': '95694|l2395d34|5082a63dd7531b7cd88a01517f3e1eec51ead66b|null|36ff457a701be3086972fc5b7c8e90ae073dc2b6',
    'page_uid': 'hDwfowprvmssshI5kCKssssstxG-147850',
    'nid_inf': '1712664262',
    'NID_AUT': '1PdGng0D4Udd06+V7sHWfoqVJbi/ftCl7new7lL8g2I4hgFCJTopVzdf0Dwx/wYo',
    'NID_JKL': 'ewv6EX5ecxrgia1H4k6k3AJblNSAp8jdsmuIjSgolfk=',
    'NID_SES': 'AAABpw/oHot5Ybze0lGGDOqrD5/RAuTHDfNlb8B3L92wdSBB6wZI1apVUjuC1t3oCz/TLJYUpBePobyC9DS0Kr+YJHxFDdfElOcDKTWuuDBXEotaSONpZzgbX1LRvtQP0A42knXHraqJAESaRL3IfJICTaX39uHgZd5V3z5p82b5o8RcjmhzJWylc2PqtQjkLdaMvVbARp4zMo2VfY08NE5Rhd/aKAZHJ5muh11a4YCM5IAoEqI2y8jmem+4wTLcyDp4gDWrRxe28v1M9rfZM5SFJGI2J59Sr5zQmCVSyl3brvJeTUggUxlVoMKBVEEelI1WiXjIO3oou4RXdxU3gA91eF1o/dMDswPaWgDkUH5p+wVHZw0Sme1TwXZEuF9rzib310G3dHYdCrKShjMMK5v1Z9XgCi2KKvdH15AVJ/+g0uQOG0jgPphOPec8J7VOklHaVm9+5UKkE6HB9bOr4/8lzu9u+DU7r0FF/OndrMNAa7NfOM66TF1JLq3Cen5parQUpEaRVFoRD8DIjPMrjXXU1G8VolMPfxgsIplBHjOPwerwAaQLqmjcJnga3fnlwuCwQQ==',
    'BMR': '',
}

headers = {
    'authority': 'search.shopping.naver.com',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'ko-KR,ko;q=0.9,ja-JP;q=0.8,ja;q=0.7,en-US;q=0.6,en;q=0.5',
    # Requests sorts cookies= alphabetically
    # 'cookie': 'NNB=7GSJAI56AJOGE; nx_ssl=2; autocomplete=use; AD_SHP_BID=4; spage_uid=hDwuwlprvxsssgo%2FjnZssssstmR-224465; ncpa=95694|l2395d34|5082a63dd7531b7cd88a01517f3e1eec51ead66b|null|36ff457a701be3086972fc5b7c8e90ae073dc2b6; page_uid=hDwfowprvmssshI5kCKssssstxG-147850; nid_inf=1712664262; NID_AUT=1PdGng0D4Udd06+V7sHWfoqVJbi/ftCl7new7lL8g2I4hgFCJTopVzdf0Dwx/wYo; NID_JKL=ewv6EX5ecxrgia1H4k6k3AJblNSAp8jdsmuIjSgolfk=; NID_SES=AAABpw/oHot5Ybze0lGGDOqrD5/RAuTHDfNlb8B3L92wdSBB6wZI1apVUjuC1t3oCz/TLJYUpBePobyC9DS0Kr+YJHxFDdfElOcDKTWuuDBXEotaSONpZzgbX1LRvtQP0A42knXHraqJAESaRL3IfJICTaX39uHgZd5V3z5p82b5o8RcjmhzJWylc2PqtQjkLdaMvVbARp4zMo2VfY08NE5Rhd/aKAZHJ5muh11a4YCM5IAoEqI2y8jmem+4wTLcyDp4gDWrRxe28v1M9rfZM5SFJGI2J59Sr5zQmCVSyl3brvJeTUggUxlVoMKBVEEelI1WiXjIO3oou4RXdxU3gA91eF1o/dMDswPaWgDkUH5p+wVHZw0Sme1TwXZEuF9rzib310G3dHYdCrKShjMMK5v1Z9XgCi2KKvdH15AVJ/+g0uQOG0jgPphOPec8J7VOklHaVm9+5UKkE6HB9bOr4/8lzu9u+DU7r0FF/OndrMNAa7NfOM66TF1JLq3Cen5parQUpEaRVFoRD8DIjPMrjXXU1G8VolMPfxgsIplBHjOPwerwAaQLqmjcJnga3fnlwuCwQQ==; BMR=',
    'logic': 'PART',
    'referer': 'https://search.shopping.naver.com/search/category/100005308',
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
    'catId': '50000089',
    'spec': '',
    'deliveryFee': '',
    'deliveryTypeValue': '',
    'iq': '',
    'eq': '',
    'xq': '',
}

response = requests.get('https://search.shopping.naver.com/api/search/category/100005308', headers=headers, params=params, cookies=cookies)
result =json.loads(response.text)
products=result["shoppingResult"]["products"]
# productCnt=result["shoppingResult"]["productCount"]

for product in products:
    image=product["imageUrl"]
    
    image_res=requests.get(image)
    image_res.raise_for_status()
    
    product_price=product["price"]
    
    product_image=uuid.uuid4()
    product_name=product["productTitle"]
    product_desc=product["characterValue"]   
    
    with open("./upload/computer_{}.jpg".format(product_image), "wb") as f:
            f.write(image_res.content)
            
    conn = pymysql.connect(host='jinho-test.cuvbn89lbyyp.ap-northeast-2.rds.amazonaws.com', user='admin', password='rptdoa00!!', db='login_lecture', charset='utf8')
    cur = conn.cursor()
    sql = """insert into product (product_name, product_desc, product_price, product_image) values( %s,%s,%s,%s)"""
    
    cur.execute(sql, (product_name,product_desc,product_price,product_image))
    conn.commit()
    conn.close()
        
        
    

# conn = pymysql.connect(host='jinho-test.cuvbn89lbyyp.ap-northeast-2.rds.amazonaws.com', user='admin', password='rptdoa00!!', db='login_lecture', charset='utf8')
# cur = conn.cursor()
# sql = "insert into product (id, product_name, product_desc, product_price, product_image) values(280, 'depth test', 'productName', 'productdesc', 'productimg')"
# cur.execute(sql)

# conn.commit()

# conn.close()
