import { toRefs, reactive, getCurrentInstance } from '@nuxtjs/composition-api'

export default function useCopy() {
  const state = reactive({
    copied: false,
  })

  const { $copyText } = getCurrentInstance()

  const setCopied = (value) => {
    if (value !== undefined) {
      $copyText(value)
    }

    state.copied = true
    setTimeout(() => (state.copied = false), 3000)
  }

  return {
    ...toRefs(state),
    setCopied,
  }
}
