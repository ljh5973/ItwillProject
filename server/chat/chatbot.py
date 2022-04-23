import os 
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import sys

model = SentenceTransformer('jhgan/ko-sroberta-multitask')
df = pd.read_csv('./chat/computer.csv')
df = df.drop(columns=['링크'])
model.encode(df.loc[0, '품명'])
df['embedding'] = pd.Series([[]] * len(df)) # dummy
df['embedding'] = df['품명'].map(lambda x: list(model.encode(x)))
df.to_csv('./chat/computer1.csv', index=False)
text = sys.argv[-1:][0]
# print(text)
embedding = model.encode(text)
df['similarity'] = df['embedding'].map(lambda x: cosine_similarity([embedding], [x]).squeeze())
answer = df.loc[df['similarity'].idxmax()] # 최대값 뽑기

print(answer['가격'][:-1])