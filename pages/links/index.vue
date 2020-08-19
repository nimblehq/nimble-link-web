<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 v-if="links.length > 0" class="mb-4">Total {{ links.length }} links</h1>
    <table class="w-full">
      <thead>
        <tr class="border-b">
          <th class="text-left font-normal">URL</th>
          <th class="text-right font-normal">PASSWORD</th>
          <th class="text-right font-normal">TOTAL CLICK</th>
          <th class="text-right font-normal">DATE</th>
          <th class="text-right font-normal">ACTION</th>
        </tr>
      </thead>
      <tbody class="">
        <tr v-for="link in links" :key="link.id" class="border-b h-20">
          <td class="text-left">
            <a
              :href="`https://namtx.dev/${link.alias}`"
              class="text-blue leading-5"
              >https://namtx.dev/{{ link.alias }}</a
            >
            <p class="leading-6">{{ link.original_url }}</p>
          </td>
          <td class="text-right">
            <button
              class="border-2 w-16 h-8 border-blue text-blue rounded"
              @click="togglePasswordPopup(link.password)"
            >
              View
            </button>
          </td>
          <td class="text-right">
            {{ link.counter }}
          </td>
          <td class="text-right">
            {{ link.created_at | diffForHumans }}
          </td>
          <td class="text-right">
            Delete
          </td>
        </tr>
      </tbody>
    </table>

    <div
      class="fixed bottom-0 px-4 pb-4 sm:flex sm:items-center sm:justify-center"
      :class="{ 'insert-0 sm:inset-0': passwordPopupOpened }"
    >
      <!--
    Background overlay, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
      <transition
        enter-active-class="transition ease-out duration-300"
        enter-class="transform opacity-0"
        enter-to-class="transform opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-class="transform opacity-100"
        leave-to-class="transform opacity-0"
      >
        <div
          v-if="passwordPopupOpened"
          class="fixed inset-0 transition-opacity"
          @click="togglePasswordPopup"
        >
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
      </transition>
      <!--
    Modal panel, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      To: "opacity-100 translate-y-0 sm:scale-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100 translate-y-0 sm:scale-100"
      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  -->
      <transition
        enter-active-class="ease-out duration-300"
        enter-class="opacity-0 scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-class="opacity-100 translate-y-4 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          v-if="passwordPopupOpened"
          class="bg-white overflow-hidden transform transition-all shadow-xl sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white">
            <div
              class="flex bg-gray-900 py-6 px-10 justify-between align-center"
            >
              <p class="text-white text-2xl">View password</p>
              <img
                class="h-4 cursor-pointer"
                src="~/assets/images/icons/close.svg"
                alt="logo"
                @click="togglePasswordPopup"
              />
            </div>
            <div class="flex p-10 flex-col">
              <input
                class="border-2 border-black w-full h-12 py-4 px-5 bg-gray-300"
                type="text"
                disabled="disabled"
                :value="displayedPassword"
              />
              <button
                v-clipboard:copy="displayedPassword"
                v-clipboard:success="copySuccessed"
                class="self-end py-4 bg-blue h-12 w-48 text-white leading-4 mt-8"
                :disabled="passwordCopied"
              >
                {{ passwordCopied ? 'Copied' : 'Copy' }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { useFetch } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import useLinks from '@/composables/useLinks'
import usePasswordPopup from '@/composables/usePasswordPopup'

export default {
  middleware: ['auth'],
  setup() {
    dayjs.extend(relativeTime)
    const { links, fetchLinks } = useLinks()
    const {
      passwordPopupOpened,
      displayedPassword,
      togglePasswordPopup,
      passwordCopied,
      copySuccessed,
    } = usePasswordPopup()

    useFetch(fetchLinks)

    return {
      passwordCopied,
      copySuccessed,
      displayedPassword,
      links,
      passwordPopupOpened,
      togglePasswordPopup,
    }
  },
  filters: {
    diffForHumans: (date) => {
      if (!date) {
        return null
      }

      return dayjs(date).fromNow()
    },
  },
}
</script>
