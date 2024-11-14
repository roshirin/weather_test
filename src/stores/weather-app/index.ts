import { ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 } from 'uuid'
import { initialBlockId } from '@/enums/HelpersEnum'

export const useWeatherAppStore = defineStore('weather-app', () => {
  const userCoordinates = ref<[number, number] | null>(null)
  const isUserCoodinatesChecked = ref<boolean>(false)
  const weatherBlocks = ref<string[]>([])
  const blockToCloseId = ref<string | null>(null)
  const isMaxFavoritesDialogShown = ref<boolean>(false)
  const isRemoveWeatherBlockDialogShown = ref<boolean>(false)

  function setUserCoordinates(value: [number, number] | null) {
    userCoordinates.value = value
  }

  function setIsUserCoodinatesChecked(value: boolean) {
    isUserCoodinatesChecked.value = value
  }

  function addWeatherBlock(isInitialBlock?: boolean) {
    if (isInitialBlock) {
      weatherBlocks.value.push(initialBlockId)
      return
    }

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
    userCoordinates,
    isUserCoodinatesChecked,
    weatherBlocks,
    isMaxFavoritesDialogShown,
    isRemoveWeatherBlockDialogShown,
    setUserCoordinates,
    setIsUserCoodinatesChecked,
    addWeatherBlock,
    setIsMaxFavoritesDialogShown,
    setIsRemoveWeatherBlockDialogShown,
    setBlockToCloseId,
    closeWeatherBlock,
    clearWeatherBlocks,
  }
})
