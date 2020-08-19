import { ref } from '@nuxtjs/composition-api'

export default function useDropdown() {
  const dropdownOpened = ref(false)

  const toggleDropdown = (value) => {
    if (typeof value === 'boolean') {
      dropdownOpened.value = value
    } else {
      dropdownOpened.value = !dropdownOpened.value
    }
  }

  return {
    dropdownOpened,
    toggleDropdown,
  }
}
