import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useUserStore = defineStore('user', ()=> {
  const user = ref({})
  function changeUser(value) {
    user.value = value
  }
  return {
    user,
    changeUser
  }
}, {
  persist: true
})