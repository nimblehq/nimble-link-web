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
      v-if="passworddropdownOpened"
      class="fixed bottom-0 inset-x-0 sm:inset-0 px-4 pb-4 sm:flex sm:items-center sm:justify-center"
    >
      <div class="fixed inset-0 transition-opacity" @click="closePasswordPopup">
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
              <p class="text-white text-2xl">View password</p>
              <img
                class="h-4 cursor-pointer"
                src="~/assets/images/icons/close.svg"
                alt="logo"
                @click="closePasswordPopup"
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
  </transition>
</template>

<script>
import usePasswordPopup from '@/composables/usePasswordPopup'

export default {
  middleware: ['auth'],

  setup() {
    const {
      displayedPassword,
      passworddropdownOpened,
      passwordCopied,
      openPasswordPopup,
      closePasswordPopup,
      copySuccessed,
    } = usePasswordPopup()
    return {
      displayedPassword,
      passworddropdownOpened,
      passwordCopied,
      openPasswordPopup,
      closePasswordPopup,
      copySuccessed,
    }
  },
}
</script>
