import {
  reactive,
  useContext,
  toRefs,
  watch,
  computed,
} from '@nuxtjs/composition-api'
import humps from 'humps'

const state = reactive({
  links: [],
  recentLinks: [],
  currentLink: {},
  saved: false,
})

const setRecentLinks = () => {
  state.recentLinks = state.links.slice(0, 3)
}

const linksCount = computed(() => state.links.length)

const setCurrentLink = (value) => {
  if (typeof value === 'number') {
    const link = state.links.find((link) => link.id === value)
    state.currentLink = Object.assign({}, link)
  } else {
    state.currentLink = Object.assign({}, value)
  }
}

watch(
  [() => state.currentLink.originalUrl, () => state.saved],
  ([link, _saved], [_preLink, preSaved]) => {
    if (preSaved) {
      state.saved = false
      state.currentLink = {
        originalUrl: link,
      }
    }
  }
)

watch(
  () => state.links,
  () => setRecentLinks()
)

export default function useLinks() {
  const { $axios, $config } = useContext()

  const fetchLinks = async () => {
    await $axios
      .get('/links')
      .then(({ data }) => {
        state.links = humps.camelizeKeys(data)
        state.links.sort((a, b) => (a.id < b.id ? 1 : -1))
        setRecentLinks()
        state.currentLink = {}
      })
      .catch((_error) => {})
  }

  const createLink = async () => {
    if (state.currentLink.originalUrl && !state.saved) {
      await $axios
        .post('/links', humps.decamelizeKeys(state.currentLink))
        .then(({ data }) => {
          const link = humps.camelizeKeys(data)
          state.links.unshift(link)
          state.currentLink = {
            ...link,
            originalUrl: shortLinkUrl(link.alias),
            canEdit: true,
          }
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
        state.currentLink = {}
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
        const updatedLink = humps.camelizeKeys(data)
        const oldLinkIndex = state.links.findIndex((link) => link.id === id)
        state.links = Object.assign([...state.links], {
          [oldLinkIndex]: updatedLink,
        })
        setCurrentLink(
          Object.assign({}, updatedLink, {
            originalUrl: shortLinkUrl(updatedLink.alias),
          })
        )
      })
  }

  const shortLinkUrl = (alias) => {
    return `${$config.shortLinkDomain}/${alias}`
  }

  return {
    ...toRefs(state),
    fetchLinks,
    createLink,
    deleteLink,
    editLink,
    shortLinkUrl,
    linksCount,
    setCurrentLink,
  }
}
