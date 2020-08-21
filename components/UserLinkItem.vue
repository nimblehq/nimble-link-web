<template>
  <tr class="border-b h-20">
    <td class="w-5/12 text-left">
      <a
        :href="shortLinkUrl(alias)"
        class="text-blue leading-5"
        target="_blank"
        rel="noreferrer"
      >
        {{ shortLinkUrl(alias) }}
        <ExternalLinkIcon class="inline" />
      </a>
      <p class="leading-6 truncate max-w-lg break-all break-words">
        {{ originalUrl }}
      </p>
    </td>
    <td class="w-1/12 text-right">
      <CustomButton
        v-if="password"
        class="btn-secondary"
        @click="showPasswordClickHandler"
      >
        View
      </CustomButton>
      <div v-else class="">
        No
      </div>
    </td>
    <td class="w-1/12 text-right">
      {{ counter }}
    </td>
    <td class="w-2/12 text-right">
      {{ createdAt | diffForHumans }}
    </td>
    <td class="w-3/12 text-right">
      <div class="relative">
        <CustomButton
          v-clipboard:copy="shortLinkUrl(alias)"
          v-clipboard:success="setCopied"
          class="btn-secondary"
        >
          {{ copied ? 'Copied' : 'Copy' }}
        </CustomButton>
        <CustomButton class="btn-secondary" @click="toggleDropdown">
          ...
        </CustomButton>
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
              class="block px-4 py-2 font-medium text-sm text-left text-black hover:text-blue focus:text-blue cursor-pointer"
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

    const { copied, setCopied } = useCopy()
    const { toggleDropdown, dropdownOpened } = useDropdown()
    const { openPasswordPopup } = usePasswordPopup()
    const { toggleConfirmation } = useConfirmation()
    const { openEditPopup } = useEditPopup()
    const { shortLinkUrl, setCurrentLink } = useLinks()

    const editMenuClickHandler = () => {
      setCurrentLink(props.id)
      openEditPopup()
    }

    const deleteMenuClickHandler = () => {
      toggleConfirmation(props.id)
    }

    const showPasswordClickHandler = () => {
      openPasswordPopup(props.password)
    }

    return {
      shortLinkUrl,
      copied,
      setCopied,
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
