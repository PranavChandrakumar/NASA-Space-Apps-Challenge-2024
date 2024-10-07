import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.stattools import adfuller
from datetime import timedelta

df = pd.read_csv('Landsat-8-and-9-SR-Bands-1-7-L08-002-results.csv')[['Date']]
df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
df['Date'] = pd.to_datetime(df['Date'])
df = df.dropna(subset=['Date'])
df.set_index('Date', inplace=True)
df = df.resample('D').size()
print(df)
df = df.reset_index(name='Count') 
df.set_index('Date', inplace=True)

result = adfuller(df['Count'])
print('ADF Statistic:', result[0])
print('p-value:', result[1])

model = ARIMA(df['Count'], order=(1, 1, 1))
model_fit = model.fit()

next_date = df.index[-1] + timedelta(days=1)
forecast = model_fit.forecast(steps=1)
print(f"Predicted next passover date: {next_date}, Count: {forecast[0]}")