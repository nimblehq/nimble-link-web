import { ref } from '@nuxtjs/composition-api'

export default function useProfilePopup() {
  const popupOpened = ref(false)

  const togglePopup = (value) => {
    if (typeof value === 'boolean') {
      popupOpened.value = value
    } else {
      popupOpened.value = !popupOpened.value
    }
  }

  return {
    popupOpened,
    togglePopup,
  }
}
