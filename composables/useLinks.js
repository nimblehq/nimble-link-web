import { reactive, useContext, toRefs } from '@nuxtjs/composition-api'
import humps from 'humps'

export default function useLinks() {
  const state = reactive({
    links: [],
  })

  const { $axios } = useContext()

  const fetchLinks = async () => {
    await $axios
      .get('/links')
      .then(({ data }) => {
        state.links = humps.camelizeKeys(data)
      })
      .catch((_error) => {})
  }

  return {
    ...toRefs(state),
    fetchLinks,
  }
}
