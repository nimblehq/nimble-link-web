import { toRefs, reactive } from '@nuxtjs/composition-api'

export default function useCopy() {
  const state = reactive({
    isOpened: false,
    onClose: null,
    onSubmit: null,
    onCancel: null,
  })

  const openPopup = () => {
    state.isOpened = true
  }

  const closePopup = () => {
    state.isOpened = false
    execute(state.onClose)
  }

  const submitPopup = (closePopup) => {
    if (closePopup) closePopup()
    execute(state.onSubmit)
  }

  const cancelPopup = (closePopup) => {
    if (closePopup) closePopup()
    execute(state.onCancel)
  }

  const togglePopup = (value) => {
    if (typeof value === 'boolean') {
      state.isOpened = value
    } else {
      state.isOpened = !state.isOpened
    }
  }

  const execute = (func) => {
    if (typeof func === 'function') {
      func()
    }
  }

  return {
    ...toRefs(state),
    openPopup,
    closePopup,
    togglePopup,
    submitPopup,
    cancelPopup,
  }
}
