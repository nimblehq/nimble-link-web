<template>
  <tr class="border-b h-20">
    <td class="text-left">
      <a
        :href="shortLinkURL(alias)"
        class="text-blue leading-5"
        target="_blank"
        rel="noreferrer"
      >
        {{ shortLinkURL(alias) }}
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
        @click="showPasswordClickHandler"
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
          v-clipboard:copy="shortLinkURL(alias)"
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
            <p
              class="block px-4 py-2 font-medium text-sm text-left text-black hover:text-blue focus:text-blue"
              role="menuitem"
              @click="editMenuClickHandler"
            >
              Edit
            </p>
            <p
              class="block px-4 py-2 font-medium text-sm text-left text-black hover:text-blue focus:text-blue cursor-pointer"
              role="menuitem"
              @click="deleteMenuClickHandler"
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

import useCopy from '@/composables/useCopy'
import useDropdown from '@/composables/useDropdown'
import usePasswordPopup from '@/composables/usePasswordPopup'
import useConfirmation from '@/composables/useConfirmation'
import useEditPopup from '@/composables/useEditPopup'
import useLinks from '@/composables/useLinks'

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
    const { openEditPopup } = useEditPopup()
    const { shortLinkURL } = useLinks()

    const editMenuClickHandler = () => {
      openEditPopup({
        id: props.id,
        password: props.password,
        alias: props.alias,
      })
    }

    const deleteMenuClickHandler = () => {
      toggleConfirmation(props.id)
    }

    const showPasswordClickHandler = () => {
      openPasswordPopup(props.password)
    }

    return {
      shortLinkURL,
      copied,
      copySuccessed,
      toggleDropdown,
      dropdownOpened,
      openPasswordPopup,
      toggleConfirmation,
      openEditPopup,
      editMenuClickHandler,
      deleteMenuClickHandler,
      showPasswordClickHandler,
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
