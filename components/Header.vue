<template>
  <nav class="bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <nuxt-link class="flex-shrink-0" to="/">
            <img class="h-4" src="~/assets/images/icons/logo.svg" alt="logo" />
          </nuxt-link>
        </div>
        <div v-if="loggedIn" class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6 font-medium">
            <div>
              {{ user.email }}
            </div>

            <!-- Profile dropdown -->
            <div class="ml-4 relative">
              <div @click="toggleDropdown">
                <button
                  id="user-menu"
                  class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                  aria-label="User menu"
                  aria-haspopup="true"
                >
                  <img
                    class="h-10 w-10 rounded-full"
                    :src="user.picture"
                    :alt="user.email"
                  />
                </button>
              </div>
              <Dropdown
                :is-opened="dropdownOpened"
                :toggle-function="toggleDropdown"
              >
                <nuxt-link
                  to="/links"
                  class="block px-4 py-2 font-medium text-sm text-black hover:text-blue focus:text-blue"
                  role="menuitem"
                >
                  Links
                </nuxt-link>
                <nuxt-link
                  to="#"
                  class="block px-4 py-2 font-medium text-sm text-black hover:text-blue focus:text-blue"
                  role="menuitem"
                  @click.native="logout"
                >
                  Logout
                </nuxt-link>
              </Dropdown>
            </div>
          </div>
        </div>
        <div v-else class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6 font-medium">
            <button
              type="button"
              class="px-3 py-2 rounded-md text-base font-medium text-black hover:text-blue focus:outline-none focus:text-blue"
              @click="$auth.loginWith('google')"
            >
              Login
            </button>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button
            class="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-blue focus:outline-none"
            :class="{ 'text-blue': dropdownOpened }"
            @click="toggleDropdown"
          >
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <svg
              class="block h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Menu open: "block", Menu closed: "hidden" -->
            <svg
              class="hidden h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!--
      Mobile menu, toggle classes based on menu state.

      Open: "block", closed: "hidden"
    -->
    <div :class="dropdownOpened ? 'block md:hidden' : 'hidden md:hidden'">
      <div v-if="loggedIn" class="pt-4 pb-3 border-t border-gray-700">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              :src="user.picture"
              :alt="user.email"
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-none text-white">
              Alex
            </div>
            <div class="mt-1 text-sm font-medium leading-none text-black">
              {{ user.email }}
            </div>
          </div>
        </div>
        <div class="mt-3 px-2">
          <nuxt-link
            to="/links"
            class="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-blue focus:outline-none focus:text-blue"
          >
            Links
          </nuxt-link>
          <nuxt-link
            to="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-blue focus:outline-none focus:text-blue"
            @click.native="logout"
          >
            Logout
          </nuxt-link>
        </div>
      </div>
      <div v-else class="pt-4 pb-3 border-t border-gray-700">
        <div class="mt-3 px-2">
          <button
            type="button"
            class="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-blue focus:outline-none focus:text-blue"
            @click="login"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import useDropdown from '../composables/useDropdown'
import useAuth from '../composables/useAuth'

export default {
  name: 'Header',

  setup() {
    const { dropdownOpened, toggleDropdown } = useDropdown()
    const { user, loggedIn, login, logout } = useAuth()

    return {
      dropdownOpened,
      toggleDropdown,
      user,
      loggedIn,
      login,
      logout,
    }
  },
}
</script>
