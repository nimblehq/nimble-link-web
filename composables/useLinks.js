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

  const deleteLink = async (id) => {
    await $axios
      .delete(`/links/${id}`)
      .then(({ data }) => {
        state.links = state.links.filter((link) => link.id !== id)
      })
      .catch((_error) => {})
  }

  return {
    ...toRefs(state),
    fetchLinks,
    deleteLink,
  }
}
