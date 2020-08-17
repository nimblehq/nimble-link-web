import { reactive, useContext, toRefs } from '@nuxtjs/composition-api'

export default function useLinks() {
  const state = reactive({
    links: [],
  })

  const { $axios } = useContext()

  const fetchLinks = async () => {
    await $axios
      .get('/links')
      .then(({ data }) => {
        state.links = data
      })
      .catch((_error) => {})
  }

  return {
    ...toRefs(state),
    fetchLinks,
  }
}
