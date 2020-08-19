import { toRefs, reactive } from '@nuxtjs/composition-api'

const state = reactive({
  displayedPassword: '',
  passwordPopupOpened: false,
  passwordCopied: false,
})

export default function usePasswordPopup() {
  const copySuccessed = () => {
    state.passwordCopied = true
  }

  const closePasswordPopup = () => {
    state.passwordPopupOpened = false
    state.displayedPassword = ''
    state.passwordCopied = false
  }

  const openPasswordPopup = (value) => {
    if (typeof value === 'string') {
      state.passwordPopupOpened = true
      state.displayedPassword = value
      state.passwordCopied = false
    } else {
      closePasswordPopup()
    }
  }

  return {
    ...toRefs(state),
    openPasswordPopup,
    closePasswordPopup,
    copySuccessed,
  }
}
