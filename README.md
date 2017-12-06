# react-native-auth-module [![NPM version](https://badge.fury.io/js/react-native-auth-module.svg)](https://npmjs.org/package/react-native-auth-module) [![Build Status](https://travis-ci.org/Redmond%20Perez/react-native-auth-module.svg?branch=master)](https://travis-ci.org/Redmond%20Perez/react-native-auth-module)

> An Authentication Module using react-native-api-client-wrapper


## Dependencies
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

##Functions
```js

  expoFacebookLogin(APIEndpoint) {
  /**
   * accepts an APIEndpoint param of your APIServer
   * returns a Token that will send to the APIEndpoint
   **/
  }

  expoGoogleLogin(APIEndpoint) {
  /**
   * accepts an APIEndpoint param of your API Server
   * returns a token that will send to the APIEndpoint
   **/
  }

  credentialsLogin(loginUrl, username, password) {
  /**
   * default login usage
   * loginUrl = Login APIEndpoint of your API Server
   * username, password
   * returns a Token which you can access by .then((resposne) => {response.key})
   **/
  }

  changePassword(Token, url, old_password, new_password, confirm_password) {
  /**
   * accepts a Token from your Account, can be null depends on your API Server
   * url = APIendpoint for your changepassword
   **/
  }

  resetPassword(resetPasswordUrl, email) {
  /**
   * resetPasswordUrl param = APIEndpoint of your reset password
   * email = email used in your account to send the details of your new password
   **/
  }

  signUp(signUpUrl, params = {}) {
  /**
   * signUpUrl = APIEndpoint where you send the params object
   * params = object type parameter that will send the details of your registration
   * ex: {
   * username: username,
   * password; password,
   * email: email
   * }
   **/
  }

```

## License

ISC © [Redmond Job V. Perez](https://bitbucket.org/redmond-ingenuity/)
