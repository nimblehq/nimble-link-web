import { computed, useContext } from '@nuxtjs/composition-api'
import useProfilePopup from './useProfilePopup'

export default function useAuth() {
  const { $auth } = useContext()
  const { togglePopup } = useProfilePopup()

  const user = computed(() => {
    return $auth.user
  })

  const loggedIn = computed(() => {
    return $auth.loggedIn
  })

  const login = () => {
    $auth.loginWith('google')
  }

  const logout = async () => {
    togglePopup(false)

    await $auth.requestWith(
      'google',
      {},
      $auth.strategies.google.options.endpoints.customLogout
    )

    $auth.reset()
  }

  return {
    user,
    loggedIn,
    login,
    logout,
  }
}
