import { computed, useContext } from '@nuxtjs/composition-api'

export default function useAuth() {
  const { $auth } = useContext()

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
