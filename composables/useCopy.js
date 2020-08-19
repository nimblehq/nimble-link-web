import { toRefs, reactive } from '@nuxtjs/composition-api'

export default function useCopy() {
  const state = reactive({
    copied: false,
  })

  const copySuccessed = () => {
    state.copied = true
  }

  return {
    ...toRefs(state),
    copySuccessed,
  }
}
