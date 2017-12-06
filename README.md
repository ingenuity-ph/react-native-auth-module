# react-native-auth-module [![NPM version](https://badge.fury.io/js/react-native-authhentication-module.svg)](https://npmjs.org/package/react-native-authhentication-module) [![Build Status](https://travis-ci.org/Redmond%20Perez/react-native-authhentication-module.svg?branch=master)](https://travis-ci.org/Redmond%20Perez/react-native-authhentication-module)

> An Authentication Module using react-native-api-client-wrapper


## Requirements
```sh
$ npm install --save react-native-api-client-wrapper
```

## Installation

```sh
$ npm install --save react-native-auth-module
```

## Usage
the AuthManager has 3 parameters. 
1.) facebook_secretkey generated from facebook dev for Facebook Login 
2.) GoogleAndroidClientID generated from google API for social auth google email Login
3.) GoogleIOSClientID generated from google API for social auth google email Login

```js
import {AuthManager} from 'react-native-auth-module'
import {Constants} from 'your-constants'

let authManager;
  componentWillMount() {
    /**
     * Initialize the AuthManager
     * preferably during will mount method
     **/
    this.authManager = new AuthManager(
      Constants.Facebook.SECRET_KEY,
      Constants.Gmail.ANDROID.CLIENT_ID,
      Constants.Gmail.IOS.CLIENT_ID
    )
  }

this.authManager.expoFacebookLogin(Constants.Facebook.API_ENDPOINT)
.then((response) => {
  
}).catch((error) => {

})
```

## License

ISC © [Redmond Job V. Perez](https://bitbucket.org/redmond-ingenuity/)
