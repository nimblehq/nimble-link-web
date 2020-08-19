import { toRefs, reactive } from '@nuxtjs/composition-api'

const state = reactive({
  confirmed: false,
  cancelled: false,
  confirmationOpened: false,
  params: null,
})

export default function useConfirmation() {
  const toggleConfirmation = (params) => {
    state.params = params
    state.confirmationOpened = !state.confirmationOpened
  }

  const confirm = (callbackFunc) => {
    if (typeof callbackFunc === 'function') {
      callbackFunc(state.params)
      toggleConfirmation()
    }
  }

  return {
    ...toRefs(state),
    confirm,
    toggleConfirmation,
  }
}
