# rc-commander

RingCentral in your terminal


## Quick start

### Step 1

```
npm install rc-commander
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

### Step 3

Enjoy RingCentral in your terminal:

```
rc sms -n 147258369 -t "hello world"
```
