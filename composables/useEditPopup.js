import { toRefs, reactive } from '@nuxtjs/composition-api'

const state = reactive({
  alias: '',
  password: '',
  id: 0,
  editPopupOpened: false,
  aliasCopied: false,
})

export default function useEditPopup() {
  const copySuccessed = () => {
    state.aliasCopied = true
  }

  const closeEditPopup = () => {
    state.editPopupOpened = false
    state.aliasCopied = false
  }

  const openEditPopup = ({ id, password, alias }) => {
    if (typeof id === 'number') {
      state.editPopupOpened = true
      state.aliasCopied = false
      state.password = password
      state.alias = alias
      state.id = id
    } else {
      closeEditPopup()
    }
  }

  return {
    ...toRefs(state),
    openEditPopup,
    closeEditPopup,
    copySuccessed,
  }
}
