# qiwi

Qiwi Api Node

## Получаем токен https://qiwi.com/api

```javascript
import QiwiApi from "@kiyasov/qiwi";

const api = new QiwiApi({
  accessToken: "", // Токен кошелька https://qiwi.com/api
  personId: "" // Номер кошелька
});
```

### Список балансов

Запрос выгружает текущие балансы счетов вашего QIWI Кошелька.

```javascript
api.balanceInfo().then(data => console.log(data));
```

Ответ

```
{
   "accounts": [
       {
           "alias": "mc_beeline_rub",
           "fsAlias": "qb_mc_beeline",
           "bankAlias": "QIWI",
           "title": "MC",
           "type": {
               "id": "MC",
               "title": "Счет мобильного кошелька"
           },
           "hasBalance": false,
           "balance": null,
           "currency": 643
       },
       {
           "alias": "qw_wallet_rub",
           "fsAlias": "qb_wallet",
           "bankAlias": "QIWI",
           "title": "WALLET",
           "type": {
               "id": "WALLET",
               "title": "QIWI Wallet"
           },
           "hasBalance": true,
           "balance": {
               "amount": 8.74,
               "currency": 643
           },
           "currency": 643
       }
   ]
}
```

### Профиль пользователя

Запрос возвращает информацию о вашем профиле - наборе пользовательских данных и настроек вашего QIWI кошелька.

```javascript
api.accountInfo().then(data => console.log(data));
```

Ответ

```
{
 "authInfo": {
   "boundEmail": "m@ya.ru",
   "ip": "81.210.201.22",
   "lastLoginDate": "2017-07-27T06:51:06.099Z",
   "mobilePinInfo": {
     "lastMobilePinChange": "2017-07-13T11:22:06.099Z",
     "mobilePinUsed": true,
     "nextMobilePinChange": "2017-11-27T06:51:06.099Z"
   },
   "passInfo": {
     "lastPassChange": "2017-07-21T09:25:06.099Z",
     "nextPassChange": "2017-08-21T09:25:06.099Z",
     "passwordUsed": true
   },
   "personId": 79683851815,
   "pinInfo": {
     "pinUsed": true
   },
   "registrationDate": "2017-01-07T16:51:06.100Z"
 },
 "contractInfo": {
   "blocked": false,
   "contractId": 79683851815,
   "creationDate": "2017-01-07T16:51:06.100Z",
   "features": [
     ...
   ],
   "identificationInfo": [
     {
       "bankAlias": "QIWI",
       "identificationLevel": "SIMPLE"
     }
   ]
 },
 "userInfo": {
   "defaultPayCurrency": 643,
   "defaultPaySource": 7,
   "email": null,
   "firstTxnId": 10807097143,
   "language": "string",
   "operator": "Beeline",
   "phoneHash": "lgsco87234f0287",
   "promoEnabled": null
 }
}
```

### Оплата других услуг

Оплата услуги по идентификатору пользователя. Данный запрос применяется для провайдеров, использующих в реквизитах единственный пользовательский идентификатор, без проверки номера аккаунта.

[Как найти идентификатор провайдера](https://developer.qiwi.com/ru/qiwi-wallet-personal/?http#provider-search)

Подробнее https://developer.qiwi.com/ru/qiwi-wallet-personal/?http#payments_model

```javascript
api
  .processPayment({
    pattern_id: "", // Идентификатор провайдера
    data: {
      id: String(moment().unix() * 1000), // Клиентский ID транзакции (максимум 20 цифр). Должен быть уникальным для каждой транзакции и увеличиваться с каждой последующей транзакцией. Для выполнения этих требований рекомендуется задавать равным 1000*(Standard Unix time в секундах).
      sum: {
        amount: "", // Сумма (можно указать рубли и копейки, разделитель .). Положительное число, округленное до 2 знаков после десятичной точки. При большем числе знаков значение будет округлено до копеек в меньшую сторону.
        currency: "643" // Валюта (только 643, рубли)
      },
      fields: {
        account: "" // Пользовательский идентификатор
      },
      paymentMethod: {
        type: "Account", // Константа, Account
        accountId: "643" // Константа, 643
      }
    }
  })
  .then(data => console.log(data));
```

Ответ

```
{
   "id": "", // Копия параметра id из платежного запроса
   "terms": "", // Идентификатор провайдера, на которого был отправлен платеж
   "fields": {
       "account": "" // Пользовательский идентификатор
   },
   "sum": {
       "amount": 100, // Сумма
       "currency": "643"
   },
   "transaction": {
       "id": "", // ID транзакции в процессинге QIWI Wallet
       "state": {
           "code": "Accepted"
       }
   },
   "source": "account_643",
}
```
