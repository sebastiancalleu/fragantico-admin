import { defineStore } from 'pinia'
import axios from 'axios'
import bcrypt from 'bcryptjs';
import * as jose from 'jose'

const alg = 'HS256';
const secret = new TextEncoder().encode(
  import.meta.env.VITE_JWT_SECRET
);

export const useGlobalStore = defineStore('global', {
  state: () => ({
    username: null,
    uid: null,
    email: null,
  }),
  getters: {
  },
  actions: {
    setUserInfo(username, uid, email) {
      this.username = username
      this.uid = uid
      this.email = email
    },
    async loginUserProvider(token, uid) {
      try {      
        if (token) {
          localStorage.setItem('FGToken', token);
        }
        
        // if (data.status === 'success') {
        //   const payload = await jose.decodeJwt(data.token)
        //   this.setUserInfo(payload.username, payload.uid, payload.email);
        //   this.$router.push('/Dashboard');
        // }
  
        return data;
      } catch (error) {
        return 'failed';
      }
    },
    async validateUser(token) {
      try {      
        return true;
      } catch (error) {
        return 'failed';
      }
    },
    logoutUser() {
      localStorage.removeItem('FGToken')
      this.$router.push('/');
    }
  },
  persist: true,
})
