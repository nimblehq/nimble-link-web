<template>
  <tr class="border-b h-20">
    <td class="text-left">
      <a
        :href="`${$config.shortLinkDomain}${alias}`"
        class="text-blue leading-5"
        >{{ `${$config.shortLinkDomain}${alias}` }}</a
      >
      <p class="leading-6">{{ originalUrl }}</p>
    </td>
    <td class="text-right">
      <button
        class="border-2 w-16 h-8 border-blue text-blue rounded"
        @click="openPasswordPopup(password)"
      >
        View
      </button>
    </td>
    <td class="text-right">
      {{ counter }}
    </td>
    <td class="text-right">
      {{ createdAt | diffForHumans }}
    </td>
    <td class="text-right">
      <button
        v-clipboard:copy="`${$config.shortLinkDomain}${alias}`"
        v-clipboard:success="copySuccessed"
        class="border-2 w-16 h-8 border-blue text-blue rounded"
      >
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
      <button
        class="border-2 w-8 h-8 border-blue text-blue rounded"
        @click="toggleDropdown"
      >
        ...
      </button>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <Dropdown
          class="right-8"
          :is-opened="dropdownOpened"
          :toggle-function="toggleDropdown"
        >
          <nuxt-link
            to="#"
            class="block px-4 py-2 font-medium text-sm text-left text-black hover:text-blue focus:text-blue"
            role="menuitem"
          >
            Edit
          </nuxt-link>
          <nuxt-link
            to="#"
            class="block px-4 py-2 font-medium text-sm text-left text-black hover:text-blue focus:text-blue"
            role="menuitem"
          >
            Delete
          </nuxt-link>
        </Dropdown>
      </transition>
    </td>
  </tr>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import useCopy from '@/composables/useCopy'
import useDropdown from '@/composables/useDropdown'
import usePasswordPopup from '@/composables/usePasswordPopup'

export default {
  setup() {
    dayjs.extend(relativeTime)

    const { copied, copySuccessed } = useCopy()
    const { toggleDropdown, dropdownOpened } = useDropdown()
    const { openPasswordPopup } = usePasswordPopup()

    return {
      copied,
      copySuccessed,
      toggleDropdown,
      dropdownOpened,
      openPasswordPopup,
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
  props: {
    alias: {
      type: String,
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
      default: '',
    },
    id: {
      type: Number,
      required: true,
    },
    counter: {
      type: Number,
      requied: true,
      default: 0,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
}
</script>
