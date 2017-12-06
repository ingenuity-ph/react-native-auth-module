import {
  Alert,
  AsyncStorage,
} from 'react-native';

import { APIClient, APIConstants } from 'react-native-api-client-wrapper';

/**
 * this function is to register
 * @param {*} signUpUrl APIEndpoint for SignUp
 * @param {*} params object type parameter for signup
 */
function doSignUp(signUpUrl, params) {  
    let  headers = {
      'Accept': APIConstants.ContentType.JSON,
      'Content-Type': APIConstants.ContentType.JSON,
    }
    console.log(params)
    console.log(headers)
    let client = new APIClient(signUpUrl, APIConstants.HTTPMethod.POST)  
    return client.sendRequest(headers,params)
}

/**
 * this function will reset your password, the api will send a new password to your email
 * @param {*} url APIEndpoint for resetPassword
 * @param {*} email email parameter to be sent in the Endpoint
 */
function doResetPassword(url, email) {
  let  headers = {
    'Accept': APIConstants.ContentType.JSON,
    'Content-Type': APIConstants.ContentType.JSON,
  }
  let params = {
    email,
  }
  console.log(params)
  let client = new APIClient(url, APIConstants.HTTPMethod.POST)
  return client.sendRequest(headers, params);

}

/**
 * 
 * @param {*} Token 
 * @param {*} url 
 * @param {*} oldpassword 
 * @param {*} newpassword 
 * @param {*} confirmpassword 
 */
function doChangePassword(Token, url,  oldpassword, newpassword, confirmpassword) {
  let  headers = {
    'Accept': APIConstants.ContentType.JSON,
    'Content-Type': APIConstants.ContentType.JSON,
    'Authorization': 'Token ' + Token,
  }
  let params = {
    old_password: oldpassword,
    new_password1: newpassword,
    new_password2: confirmpassword,
  }
  console.log(params)
  console.log(headers)
  let client = new APIClient(url, APIConstants.HTTPMethod.POST)  
  return client.sendRequest(headers,params)
}

/**
 * 
 * @param {*} url API Endpoint for Login
 * @param {*} username username/email
 * @param {*} password 
 */
function loginWithCredentials(url, username, password) {
    let headers = {
      'Accept': APIConstants.ContentType.JSON,
      'Content-Type': APIConstants.ContentType.JSON,
    }
    let params = {
      email: username,
      password,
    }
    let client = new APIClient(url, APIConstants.HTTPMethod.POST)  
    return client.sendRequest(headers,params)
  
  }
  
  /**
   * 
   * @param {*} url API Endpoint where you send the facebooktoken
   * @param {*} facebook_secretkey secretkey from the facebookdev to access facebook API
   */
  function logInwithFacebook(url, facebook_secretkey) {
    return new Promise(function (resolve, reject) {
    Expo.Facebook.logInWithReadPermissionsAsync(facebook_secretkey, {
        behavior: 'system',
        permissions: ['public_profile', 'email', 'user_birthday'],
      }).then((response) => {
          switch (response.type) {
            case 'success':
            return response.token;
            case 'cancel':
            reject({
              type: 'error',
              msg: 'login canceled'
            })
            break;
            default:
            reject({
              type: 'error',
              msg: 'login failed'
            })
          }
      }).then(async (token) => {
        let client = new APIClient(url, APIConstants.HTTPMethod.POST);
        let headers = {
          'Accept': APIConstants.ContentType.JSON,
          'Content-Type': APIConstants.ContentType.JSON,
        }
        let params = {
          token,
        };
        return client.sendRequest(headers, params)
      }).then((response) => {
        resolve(response);
      }).then((facebookJSONResponse) => {
        console.log({facebookJSONResponse})
        if (facebookJSONResponse.hasOwnProperty('error')) {
          reject({
            type: 'error'
          })
        }
      }).catch(function (error) {
        reject({
          type: 'error',
          msg: 'Facebook login failed'
        })
      })

    })
  }

  /**
   * 
   * @param {*} androidClientId Android clientID from GoogleAPI
   * @param {*} iosClientId IOS clientID from googleAPI
   * @param {*} url Endpoint where you send the Token after logging-in in Google
   */
  function loginWithGoogle(androidClientId, iosClientId, url) {
    return new Promise(function (resolve, reject) {
      Expo.Google.logInAsync({
        androidClientId: androidClientId,
        iosClientId: iosClientId,
        scopes: ['profile', 'email'],
      }).then((response) => {
            switch (response.type) {
              case 'success':
              return response.accessToken;
              case 'cancel':
              reject({
                type: 'error',
                msg: 'login canceled'
              })
              break;
              default:
              reject({
                type: 'error',
                msg: 'login failed'
              })
            }
        }).then(async (token) => {
          let client = new APIClient(url, APIConstants.HTTPMethod.POST);
          let headers = {
            'Accept': APIConstants.ContentType.JSON,
            'Content-Type': APIConstants.ContentType.JSON,
          }
          let params = {
            token,
          };
          return client.sendRequest(headers, params);
        }).then((response) => {
          resolve(response);
        }).then((facebookJSONResponse) => {
          console.log({facebookJSONResponse})
          if (facebookJSONResponse.hasOwnProperty('error')) {
            reject({
              type: 'error'
            })
          }
        }).catch(function (error) {
          reject({
            type: 'error',
            msg: 'Gmail login failed'
          })
        })
  
      })
  }


class LoginManager {
  constructor(facebook_secretkey, androidClientId, iosClientId) {
    this.facebook_secretkey = facebook_secretkey;
    this.androidClientId = androidClientId;
    this.iosClientId = iosClientId;
  }

  expoFacebookLogin(APIEndpoint) {
    return logInwithFacebook(APIEndpoint, this.facebook_secretkey)
  }

  expoGoogleLogin(APIEndpoint) {
    return loginWithGoogle(APIEndpoint, this.androidClientId, this.iosClientId)
  }

  credentialsLogin(loginUrl, username, password) {
    return loginWithCredentials(loginUrl, username, password)
  }

  changePassword(Token, url, old_password, new_password, confirm_password) {
    return doChangePassword(Token, url, old_password, new_password, confirm_password);
  }

  resetPassword(resetPasswordUrl, email) {
    return doResetPassword(resetPasswordUrl, email);
  }

  signUp(signUpUrl, params = {}) {
    return doSignUp(signUpUrl, params);
  }


}

/* Export ==================================================================== */

module.exports = LoginManager;
module.exports.details = {
title: 'LoginManager'
}
