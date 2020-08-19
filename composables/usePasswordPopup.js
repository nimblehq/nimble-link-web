import { toRefs, reactive } from '@nuxtjs/composition-api'

export default function usePasswordPopup() {
  const state = reactive({
    displayedPassword: '',
    passwordPopupOpened: false,
    passwordCopied: false,
  })

  const copySuccessed = () => {
    state.passwordCopied = true
  }

  const togglePasswordPopup = (value) => {
    if (typeof value === 'string') {
      state.passwordPopupOpened = true
      state.displayedPassword = value
      state.passwordCopied = false
    } else {
      state.passwordPopupOpened = !state.passwordPopupOpened
      state.displayedPassword = ''
      state.passwordCopied = false
    }
  }

  return {
    ...toRefs(state),
    togglePasswordPopup,
    copySuccessed,
  }
}
