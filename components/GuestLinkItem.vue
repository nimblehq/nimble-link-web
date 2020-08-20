<template>
  <tr class="border-b border-gray h-20">
    <td class="text-left w-6/12">
      <p
        class="text-black text-sm leading-6 truncate max-w-lg break-all break-words"
      >
        {{ originalUrl }}
      </p>
    </td>
    <td class="text-right w-4/12">
      <a
        :href="shortLinkUrl(alias)"
        class="text-blue leading-7"
        target="_blank"
        rel="noreferrer"
      >
        {{ shortLinkUrl(alias) }}
        <ExternalLinkIcon class="inline" />
      </a>
    </td>
    <td class="text-right w-2/12">
      <CustomButton
        v-clipboard:copy="shortLinkUrl(alias)"
        v-clipboard:success="setCopied"
        class="btn-secondary"
      >
        {{ copied ? 'Copied' : 'Copy' }}
      </CustomButton>
    </td>
  </tr>
</template>

<script>
import useCopy from '@/composables/useCopy'
import useLinks from '@/composables/useLinks'

import ExternalLinkIcon from '~/assets/images/icons/external-link.svg?inline'

export default {
  components: {
    ExternalLinkIcon,
  },

  setup(props) {
    const { copied, setCopied } = useCopy()
    const { shortLinkUrl } = useLinks()

    return {
      shortLinkUrl,
      copied,
      setCopied,
    }
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
  },
}
</script>
