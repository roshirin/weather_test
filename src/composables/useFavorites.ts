import type { FavoriteCityModel } from "@/components/models"
import { useStorage } from "@vueuse/core"
import { computed } from "vue"

export function useFavorites() {
  const favoriteCities = useStorage('favorites', [] as FavoriteCityModel[])

  const favoritesLength = computed(() => favoriteCities.value.length)

  function addToFavorites(newCity: FavoriteCityModel) {
    favoriteCities.value.push(newCity)
  }

  function removeFromFavorites(cityName: string) {
    favoriteCities.value = favoriteCities.value.filter(({ name }) => name !== cityName)
  }

  function checkIfInFavorites(cityName: string) {
    return favoriteCities.value.some(({ name }) => name === cityName)
  }

  return {
    favoritesLength,
    addToFavorites,
    removeFromFavorites,
    checkIfInFavorites,
  }
}