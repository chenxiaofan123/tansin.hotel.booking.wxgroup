import Base64 from './base64.js'
import CryptoJS from './hmac-sha256.js'
import store from '../../vuex/store'
export default {
  //测试8^EOvH$s1D
  //生产PQsLImqw
  jwt(payload, key = store.getters.isJwtkey) {
    if (this.isJSON(payload)) {
      if (typeof payload == 'object') {
        payload = JSON.stringify(payload)
      }
      var header = '{"typ":"JWT","alg":"HS256"}'
      var headerBase64 = Base64.encoder(header)
      var payloadBase64 = Base64.encoder(payload)
      var base64Token = headerBase64 + '.' + payloadBase64
      var signature = CryptoJS.HmacSHA256(base64Token, key)
      var signatureBase64 = Base64.hexToBase64(signature.toString())
      var jwt = base64Token + '.' + signatureBase64
      return jwt
    }else {
      throw '请传入正确的JSON字符串'
    }
  }, 
  isJSON(str) {
    if (typeof str === 'string') {
      try {
        JSON.parse(str)
        return true
      } catch(e) {
        return false
      }
    }else if (typeof str === 'object') {
      try {
        return true
      } catch(e) {
        return false
      }
    }
  }
}
