import { reactive, useContext, toRefs, watch } from '@nuxtjs/composition-api'
import humps from 'humps'

const state = reactive({
  links: [],
  currentLink: {},
  saved: false,
})

export default function useGuestLinks() {
  const { $axios, $config } = useContext()

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
    shortLinkUrl,
    createLink,
  }
}
