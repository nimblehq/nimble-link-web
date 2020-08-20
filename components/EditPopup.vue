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
              class="flex bg-gray-900 py-6 px-10 justify-between align-center"
            >
              <p class="text-white text-2xl">Edit link</p>
              <img
                class="h-4 cursor-pointer"
                src="~/assets/images/icons/close.svg"
                alt="logo"
                @click="closeEditPopup"
              />
            </div>
            <div class="flex flex-col m-6 mx-10 mb-10">
              <div class="mb-6">
                <a
                  class="text-blue"
                  target="_blank"
                  :href="`${$config.shortLinkDomain}${alias}`"
                >
                  {{ `${$config.shortLinkDomain}${alias}` }}
                </a>
                <button
                  v-clipboard:copy="`${$config.shortLinkDomain}${alias}`"
                  v-clipboard:success="copySuccessed"
                  class="border-2 w-16 h-8 border-blue text-blue rounded ml-8 mr-2"
                >
                  {{ aliasCopied ? 'Copied' : 'Copy' }}
                </button>
                <button class="border-2 w-16 h-8 border-blue text-blue rounded">
                  Delete
                </button>
              </div>
              <hr />
              <div class="flex flex-col">
                <label class="mt-6 mb-2">Customize back-half</label>
                <input
                  v-model="alias"
                  class="border-2 border-black w-full h-12 py-4 px-5"
                  type="text"
                  required="true"
                  @keydown.space="(event) => event.preventDefault()"
                />
                <label class="mt-6 mb-2">Link password (Optional)</label>
                <input
                  v-model="password"
                  class="border-2 border-black w-full h-12 py-4 px-5"
                  type="password"
                />

                <button
                  v-clipboard:copy="`${$config.shortLinkDomain}${alias}`"
                  v-clipboard:success="
                    () =>
                      saveCallbackFunction({ id, password, alias }).then(
                        closeEditPopup
                      )
                  "
                  class="self-end py-4 bg-blue h-12 w-48 text-white leading-4 mt-8 rounded"
                >
                  Save &amp; Copy
                </button>
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

export default {
  middleware: ['auth'],

  setup(props) {
    const {
      alias,
      password,
      id,
      aliasCopied,
      editPopupOpened,
      openEditPopup,
      closeEditPopup,
      copySuccessed,
    } = useEditPopup()

    return {
      alias,
      password,
      id,
      aliasCopied,
      editPopupOpened,
      openEditPopup,
      closeEditPopup,
      copySuccessed,
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
