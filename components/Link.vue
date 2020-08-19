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
        @click="$emit('show-password')"
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
        @click="togglePopup"
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
        <div
          v-if="popupOpened"
          class="origin-top-right absolute right-0 mt-2 w-48 rounded shadow-lg border-black border-2"
        >
          <div
            class="py-1 rounded-md bg-white shadow-xs text-left"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <nuxt-link
              to="#"
              class="block px-4 py-2 font-medium text-sm text-black hover:text-blue focus:text-blue"
              role="menuitem"
            >
              Edit
            </nuxt-link>
            <nuxt-link
              to="#"
              class="block px-4 py-2 font-medium text-sm text-black hover:text-blue focus:text-blue"
              role="menuitem"
              @click.native="logout"
            >
              Delete
            </nuxt-link>
          </div>
        </div>
      </transition>
    </td>
  </tr>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import useCopy from '@/composables/useCopy'
import useProfilePopup from '@/composables/useProfilePopup'

export default {
  setup() {
    dayjs.extend(relativeTime)

    const { copied, copySuccessed } = useCopy()
    const { togglePopup, popupOpened } = useProfilePopup()

    return {
      copied,
      copySuccessed,
      togglePopup,
      popupOpened,
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
