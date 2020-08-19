import { toRefs, reactive } from '@nuxtjs/composition-api'

const state = reactive({
  displayedPassword: '',
  passworddropdownOpened: false,
  passwordCopied: false,
})

export default function usePasswordPopup() {
  const copySuccessed = () => {
    state.passwordCopied = true
  }

  const closePasswordPopup = () => {
    state.passworddropdownOpened = false
    state.displayedPassword = ''
    state.passwordCopied = false
  }

  const openPasswordPopup = (value) => {
    if (typeof value === 'string') {
      state.passworddropdownOpened = true
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
