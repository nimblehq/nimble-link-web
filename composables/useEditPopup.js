import { toRefs, reactive } from '@nuxtjs/composition-api'

const state = reactive({
  editPopupOpened: false,
})

export default function useEditPopup() {
  const closeEditPopup = () => {
    state.editPopupOpened = false
  }

  const openEditPopup = () => {
    state.editPopupOpened = true
  }

  return {
    ...toRefs(state),
    openEditPopup,
    closeEditPopup,
  }
}
