import { ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 } from 'uuid'

export const useWeatherAppStore = defineStore('weather-app', () => {
  const weatherBlocks = ref<string[]>([])
  const blockToCloseId = ref<string | null>(null)
  const isMaxFavoritesDialogShown = ref<boolean>(false)
  const isRemoveWeatherBlockDialogShown = ref<boolean>(false)

  function addWeatherBlock() {
    const id = v4()

    weatherBlocks.value.push(id)
  }

  function setIsMaxFavoritesDialogShown(value: boolean) {
    isMaxFavoritesDialogShown.value = value
  }

  function setIsRemoveWeatherBlockDialogShown(value: boolean) {
    isRemoveWeatherBlockDialogShown.value = value
  }

  function setBlockToCloseId(value: string | null) {
    blockToCloseId.value = value
  }

  function closeWeatherBlock() {
    weatherBlocks.value = weatherBlocks.value.filter(id => id !== blockToCloseId.value)
    blockToCloseId.value = null
  }

  function clearWeatherBlocks() {
    weatherBlocks.value = []
  }

  return {
    weatherBlocks,
    isMaxFavoritesDialogShown,
    isRemoveWeatherBlockDialogShown,
    addWeatherBlock,
    setIsMaxFavoritesDialogShown,
    setIsRemoveWeatherBlockDialogShown,
    setBlockToCloseId,
    closeWeatherBlock,
    clearWeatherBlocks,
  }
})
