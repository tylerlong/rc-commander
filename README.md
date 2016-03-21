# rc-commander

RingCentral in your terminal.

This is currently for learning purpose only, there are bugs / issues.


## Support features

This project is new, currently only 2 features are supported:

1. send sms
1. make telephony calls



## Quick start

### Step 1

```
npm install -g rc-commander
```

### Step 2

Create `~/.rc-commander.json`, with the following content:

```
{
  "server": "https://platform.devtest.ringcentral.com", // or https://platform.ringcentral.com for production
  "appKey": "your app key",
  "appSecret": "your app secret",
  "username": "username is phone number",
  "password": "password"
}
```

Please note that the file has to be in your home folder.


### Step 3

Enjoy RingCentral in your terminal:

```
rc sms -n 147258369 -t "hello world"
rc call -n 147258369
```


## Help

```
rc -h
rc sms -h
rc call -h
```
