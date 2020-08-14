<template>
  <nav class="bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <nuxt-link class="flex-shrink-0" to="/">
            <img class="h-4" src="~/assets/images/icons/logo.svg" alt="logo" />
          </nuxt-link>
        </div>
        <div v-if="$auth.$state.loggedIn" class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6 font-medium">
            <div>
              Alex
            </div>

            <!-- Profile dropdown -->
            <div class="ml-4 relative">
              <div @click="togglePopup">
                <button
                  id="user-menu"
                  class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                  aria-label="User menu"
                  aria-haspopup="true"
                >
                  <img
                    class="h-10 w-10 rounded-full"
                    src="https://via.placeholder.com/256/000000/000000"
                    alt="Avatar"
                  />
                </button>
              </div>
              <!--
                Profile dropdown panel, show/hide based on dropdown state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              -->
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="state.popupOpened"
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded shadow-lg border-black border-2"
                >
                  <div
                    class="py-1 rounded-md bg-white shadow-xs"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <nuxt-link
                      to="#"
                      class="block px-4 py-2 text-sm text-black hover:text-blue focus:text-blue"
                      role="menuitem"
                    >
                      Profile
                    </nuxt-link>
                    <nuxt-link
                      to="#"
                      class="block px-4 py-2 text-sm text-black hover:text-blue focus:text-blue"
                      role="menuitem"
                    >
                      Sign out
                    </nuxt-link>
                  </div>
                </div>
              </transition>
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
            :class="{ 'text-blue': state.popupOpened }"
            @click="togglePopup"
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
    <div :class="state.popupOpened ? 'block md:hidden' : 'hidden md:hidden'">
      <div
        v-if="$auth.$state.loggedIn"
        class="pt-4 pb-3 border-t border-gray-700"
      >
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="https://via.placeholder.com/256/000000/000000"
              alt=""
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-none text-white">
              Alex
            </div>
            <div class="mt-1 text-sm font-medium leading-none text-black">
              alex@example.com
            </div>
          </div>
        </div>
        <div class="mt-3 px-2">
          <nuxt-link
            to="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-blue focus:outline-none focus:text-blue"
          >
            Profile
          </nuxt-link>
          <nuxt-link
            to="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-blue focus:outline-none focus:text-blue"
          >
            Sign out
          </nuxt-link>
        </div>
      </div>
      <div v-else class="pt-4 pb-3 border-t border-gray-700">
        <div class="mt-3 px-2">
          <button
            type="button"
            class="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-blue focus:outline-none focus:text-blue"
            @click="$auth.loginWith('google')"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { reactive } from '@nuxtjs/composition-api'

export default {
  name: 'Header',

  setup() {
    const state = reactive({
      popupOpened: 0,
    })

    const togglePopup = () => {
      state.popupOpened = !state.popupOpened
    }

    return {
      state,
      togglePopup,
    }
  },
}
</script>
