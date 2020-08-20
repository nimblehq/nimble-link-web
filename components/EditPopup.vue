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
              <div class="mb-6">
                <a
                  class="text-blue"
                  target="_blank"
                  :href="shortLinkUrl(alias)"
                >
                  {{ shortLinkUrl(alias) }}
                </a>
                <CustomButton
                  v-clipboard:copy="shortLinkUrl(alias)"
                  v-clipboard:success="setCopied"
                  class="btn-secondary"
                >
                  {{ copied ? 'Copied' : 'Copy' }}
                </CustomButton>
                <CustomButton class="btn-secondary">
                  Delete
                </CustomButton>
              </div>
              <hr />
              <div class="flex flex-col">
                <label class="mt-6 mb-2">Customize back-half</label>
                <input
                  v-model="alias"
                  class="border-2 border-black w-full h-12 py-4 px-5"
                  type="text"
                  required="true"
                  @keydown.space.prevent
                />
                <label class="mt-6 mb-2">Link password (Optional)</label>
                <input
                  v-model="password"
                  class="border-2 border-black w-full h-12 py-4 px-5"
                  type="password"
                />

                <CustomButton
                  v-clipboard:copy="shortLinkUrl(alias)"
                  v-clipboard:success="save"
                  class="self-end mt-8 btn-primary btn-lg w-48"
                >
                  Save &amp; Copy
                </CustomButton>
              </div>
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

export default {
  middleware: ['auth'],
  components: {
    CloseIcon,
  },

  setup(props) {
    const { copied, setCopied } = useCopy()

    const {
      alias,
      password,
      id,
      editPopupOpened,
      openEditPopup,
      closeEditPopup,
    } = useEditPopup()

    const { shortLinkUrl } = useLinks()

    const save = () => {
      props
        .saveCallbackFunction({
          id: id.value,
          password: password.value,
          alias: alias.value,
        })
        .then(closeEditPopup)
    }

    return {
      copied,
      setCopied,
      alias,
      password,
      id,
      editPopupOpened,
      openEditPopup,
      closeEditPopup,
      save,
      shortLinkUrl,
    }
  },

  props: {
    saveCallbackFunction: {
      type: Function,
      required: true,
    },
  },
}
</script>
