import { toRefs, reactive } from '@nuxtjs/composition-api'

export default function useCopy() {
  const state = reactive({
    copied: false,
  })

  const setCopied = () => {
    state.copied = true
    setTimeout(() => (state.copied = false), 5000)
  }

  return {
    ...toRefs(state),
    setCopied,
  }
}
