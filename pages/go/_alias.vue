<template>
  <div>
    <h1 class="mt-16 text-5xl font-bold leading-extra-loose">
      This content is password protected.
    </h1>
    <p class="mt-6 text-xl font-bold">
      To view it please enter your password below
    </p>
    <form class="mt-2">
      <CustomInput
        v-model="password"
        placeholder="Password"
        type="password"
        class="w-full mt-10"
        :error="error"
        @input="passwordChangeHandler"
      >
      </CustomInput>
      <p v-show="error" class="mt-3 text-red-600">
        <AlertIcon class="inline" />
        The password you have entered is incorrect, please try again
      </p>
      <CustomButton class="btn-primary btn-lg w-full mt-10" @click="verifyLink">
        Enter
      </CustomButton>
    </form>
  </div>
</template>

<script>
import humps from 'humps'
import { useContext, toRefs, reactive } from '@nuxtjs/composition-api'

import AlertIcon from '~/assets/images/icons/alert.svg?inline'
export default {
  layout: 'verify_password',

  components: { AlertIcon },

  setup() {
    const { params, $axios } = useContext()
    const state = reactive({
      password: '',
      error: false,
    })

    const verifyLink = async () => {
      state.error = false
      await $axios
        .post(`links/${params.value.alias}`, { password: state.password })
        .then(({ data }) => {
          const { originalUrl } = humps.camelizeKeys(data)
          window.location.replace(originalUrl)
        })
        .catch((_error) => {
          state.error = true
        })
    }

    const passwordChangeHandler = () => {
      state.error = false
    }

    return {
      verifyLink,
      passwordChangeHandler,
      ...toRefs(state),
    }
  },
}
</script>
