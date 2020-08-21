<template>
  <transition
    enter-active-class="ease-out duration-300"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="editPopupOpened"
      class="fixed bottom-0 inset-x-0 sm:inset-0 px-4 pb-4 sm:flex sm:items-center sm:justify-center"
    >
      <div class="fixed inset-0 transition-opacity" @click="closeEditPopup">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <transition
        enter-active-class="ease-out duration-300"
        enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          class="bg-white overflow-hidden transform transition-all shadow-xl sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white">
            <div
              class="flex bg-gray-900 py-6 px-10 justify-between items-center"
            >
              <p class="text-white text-2xl">Edit link</p>
              <CloseIcon class="h-4 cursor-pointer" @click="closeEditPopup" />
            </div>
            <div class="flex flex-col m-6 mx-10 mb-10">
              <div class="mb-6 flex justify-between items-center">
                <a
                  class="text-blue"
                  target="_blank"
                  :href="shortLinkUrl(currentLink.alias)"
                >
                  {{ shortLinkUrl(currentLink.alias) }}
                  <ExternalLinkIcon class="inline" />
                </a>
                <CustomButton
                  v-clipboard:copy="shortLinkUrl(currentLink.alias)"
                  v-clipboard:success="setCopied"
                  class="btn-secondary ml-8"
                >
                  {{ copied ? 'Copied' : 'Copy' }}
                </CustomButton>
              </div>
              <hr />
              <EditCurrentLinkForm @on-saved="closeEditPopup" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import useEditPopup from '@/composables/useEditPopup'
import useCopy from '@/composables/useCopy'
import useLinks from '@/composables/useLinks'
import CloseIcon from '~/assets/images/icons/close.svg?inline'
import ExternalLinkIcon from '~/assets/images/icons/external-link.svg?inline'

export default {
  middleware: ['auth'],
  components: {
    CloseIcon,
    ExternalLinkIcon,
  },

  setup(props) {
    const { copied, setCopied } = useCopy()

    const { editPopupOpened, openEditPopup, closeEditPopup } = useEditPopup()

    const { shortLinkUrl, currentLink } = useLinks()

    return {
      copied,
      setCopied,
      editPopupOpened,
      openEditPopup,
      closeEditPopup,
      currentLink,
      shortLinkUrl,
    }
  },
}
</script>
