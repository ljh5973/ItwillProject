import os 
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import sys
import base64


model = SentenceTransformer('jhgan/ko-sroberta-multitask')
df = pd.read_csv('./chat/camera.csv')
# df = df.drop(columns=['링크'])
model.encode(df.loc[0, '품명'])
df['embedding'] = pd.Series([[]] * len(df)) # dummy 만들기
df['embedding'] = df['품명'].map(lambda x: list(model.encode(x)))
text = sys.argv[-1:][0]

# print(text)
embedding = model.encode(text)
df['similarity'] = df['embedding'].map(lambda x: cosine_similarity([embedding], [x]).squeeze())
answer = df.sort_values(by="similarity", ascending=False).head(1) # 최대값 뽑기
answer=answer.reset_index(drop=True)
answer=answer[['품명', '가격']]
answer=str(answer)

print(base64.b64encode(answer.encode('utf-8')))