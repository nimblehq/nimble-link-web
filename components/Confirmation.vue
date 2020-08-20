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
      v-if="confirmationOpened"
      class="fixed bottom-0 inset-x-0 sm:inset-0 px-4 pb-4 sm:flex sm:items-center sm:justify-center"
    >
      <div class="fixed inset-0 transition-opacity" @click="toggleConfirmation">
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
            <div class="flex p-10 flex-col">
              <h1 class="mb-2">
                Are you sure you want to permanently delete this link?
              </h1>
              <p class="mb-6">
                You can't undo this action
              </p>
              <div class="flex flex-row justify-end">
                <CustomButton class="btn-primary" @click="cancel">
                  Cancel
                </CustomButton>
                <CustomButton
                  class="btn-secondary ml-4"
                  @click="confirmHandler"
                >
                  Delete
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
import useConfirmation from '@/composables/useConfirmation'

export default {
  middleware: ['auth'],

  setup(props) {
    const {
      confirm,
      cancel,
      params,
      toggleConfirmation,
      confirmationOpened,
    } = useConfirmation()

    const confirmHandler = () => {
      confirm(props.confirmCallbackFunction)
    }

    return {
      confirm,
      cancel,
      params,
      confirmationOpened,
      toggleConfirmation,
      confirmHandler,
    }
  },
  props: {
    confirmCallbackFunction: {
      type: Function,
      required: true,
    },
  },
}
</script>
