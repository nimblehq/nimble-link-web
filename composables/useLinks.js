import { reactive, useContext, toRefs, watch } from '@nuxtjs/composition-api'
import humps from 'humps'

const state = reactive({
  links: [],
  currentLink: {},
  saved: false,
})

export default function useLinks() {
  const { $axios, $config } = useContext()

  const fetchLinks = async () => {
    await $axios
      .get('/links')
      .then(({ data }) => {
        state.links = humps.camelizeKeys(data)
      })
      .catch((_error) => {})
  }

  const createLink = async () => {
    if (state.currentLink.originalUrl) {
      await $axios
        .post('/links', humps.decamelizeKeys(state.currentLink))
        .then(({ data }) => {
          const link = humps.camelizeKeys(data)
          state.links.push(link)
          state.currentLink = link
          state.saved = true
        })
        .catch((_error) => {})
    }
  }

  const deleteLink = async (id) => {
    await $axios
      .delete(`/links/${id}`)
      .then(({ data }) => {
        state.links = state.links.filter((link) => link.id !== id)
      })
      .catch((_error) => {})
  }

  const editLink = async ({ id, password, alias }) => {
    await $axios
      .patch(`/links/${id}`, {
        password,
        alias,
      })
      .then(({ data }) => {
        const oldLinkIndex = state.links.findIndex((link) => link.id === id)
        state.links = Object.assign([...state.links], {
          [oldLinkIndex]: humps.camelizeKeys(data),
        })
      })
  }

  const shortLinkUrl = (alias) => {
    return `${$config.shortLinkDomain}/${alias}`
  }

  watch(
    () => state.currentLink.originalUrl,
    (link) => {
      if (state.saved === true) {
        state.saved = false
        state.currentLink = {
          originalUrl: link,
        }
      }
    }
  )

  return {
    ...toRefs(state),
    fetchLinks,
    createLink,
    deleteLink,
    editLink,
    shortLinkUrl,
  }
}
