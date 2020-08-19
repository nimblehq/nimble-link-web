<template>
  <tr class="border-b h-20">
    <td class="text-left">
      <a
        :href="shortLinkURL"
        class="text-blue leading-5"
        target="_blank"
        rel="noreferrer"
      >
        {{ shortLinkURL }}
        <ExternalLinkIcon class="inline" />
      </a>
      <p class="leading-6 truncate max-w-lg break-all break-words">
        {{ originalUrl }}
      </p>
    </td>
    <td class="text-right">
      <button
        v-if="password"
        class="border-2 w-16 h-8 border-blue text-blue rounded"
        @click="openPasswordPopup(password)"
      >
        View
      </button>
      <div v-else class="">
        No
      </div>
    </td>
    <td class="text-right">
      {{ counter }}
    </td>
    <td class="text-right">
      {{ createdAt | diffForHumans }}
    </td>
    <td class="text-right">
      <div class="relative">
        <button
          v-clipboard:copy="shortLinkURL"
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
            <p
              class="block px-4 py-2 font-medium text-sm text-left text-black hover:text-blue focus:text-blue cursor-pointer"
              role="menuitem"
              @click="toggleConfirmation(id)"
            >
              Delete
            </p>
          </Dropdown>
        </transition>
      </div>
    </td>
  </tr>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { computed, useContext } from '@nuxtjs/composition-api'

import useCopy from '@/composables/useCopy'
import useDropdown from '@/composables/useDropdown'
import usePasswordPopup from '@/composables/usePasswordPopup'
import useConfirmation from '@/composables/useConfirmation'

import ExternalLinkIcon from '~/assets/images/icons/external-link.svg?inline'

export default {
  components: {
    ExternalLinkIcon,
  },

  setup(props) {
    dayjs.extend(relativeTime)

    const { copied, copySuccessed } = useCopy()
    const { toggleDropdown, dropdownOpened } = useDropdown()
    const { openPasswordPopup } = usePasswordPopup()
    const { toggleConfirmation } = useConfirmation()

    const { $config } = useContext()

    const shortLinkURL = computed(() => {
      return `${$config.shortLinkDomain}/${props.alias}`
    })

    return {
      shortLinkURL,
      copied,
      copySuccessed,
      toggleDropdown,
      dropdownOpened,
      openPasswordPopup,
      toggleConfirmation,
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
