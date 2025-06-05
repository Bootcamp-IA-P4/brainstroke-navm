import pandas as pd
import os
import joblib
from sklearn.preprocessing import OneHotEncoder

path = 'data/dataset_tratado.csv'
df = pd.read_csv(path)

print(df.head(5))

# Vamos a mapear las binarias primero:
# df['ever_married'] = df['ever_married'].map({'Yes': 1, 'No': 0})
# df['Residence_type'] = df['Residence_type'].map({'Urban': 1, 'Rural': 0})
# df['gender'] = df['gender'].map({'Female':1, 'Male':0})
# df.to_csv(path, index=False)
# print(df.head(5))

categorical = ['work_type', 'smoking_status']
encoder = OneHotEncoder(drop='first', sparse_output=False)
encoded = encoder.fit_transform(df[categorical])
encoded_cols = encoder.get_feature_names_out(categorical)

df_encoded = pd.DataFrame(encoded, columns=encoded_cols, index=df.index)

df_final = pd.concat([df.drop(categorical, axis=1), df_encoded], axis=1)
df_final.to_csv('data/dataset_encoded.csv', index=False)
print(df_final.head(5))