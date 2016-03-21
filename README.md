# rc-commander

RingCentral in your terminal


## Support features

This project is new, currently only one feature is supported:

1. send sms


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
```


## Help

```
rc -h
rc sms -h
```


## todo

1. submit to npm
