import { toRefs, reactive } from '@nuxtjs/composition-api'

const state = reactive({
  displayedPassword: '',
  passwordDropdownOpened: false,
})

export default function usePasswordPopup() {
  const closePasswordPopup = () => {
    state.passwordDropdownOpened = false
    state.displayedPassword = ''
  }

  const openPasswordPopup = (value) => {
    if (typeof value === 'string') {
      state.passwordDropdownOpened = true
      state.displayedPassword = value
    } else {
      closePasswordPopup()
    }
  }

  return {
    ...toRefs(state),
    openPasswordPopup,
    closePasswordPopup,
  }
}
