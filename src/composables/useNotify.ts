import { useNotification } from "@kyvg/vue3-notification"
import { useI18n } from "vue-i18n"

const { notify } = useNotification()

interface NotifyComposition {
  notifyError: (text: string, duration?: number) => void
}

export function useNotify(): NotifyComposition {
  const { t } = useI18n()

  const notifyError = (text: string, duration?: number) => {
    notify({
      type: 'error',
      title: t('notify.errorTitle'),
      text,
      duration,
    })
  }

  return {
    notifyError,
  }
}
