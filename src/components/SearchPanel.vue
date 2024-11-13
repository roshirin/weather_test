<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDebounceFn } from '@vueuse/core'
import LoadingSpinner from './LoadingSpinner.vue'
import { apiGetCitiesAutocomplete } from '@/api/api'
import { autocompleteConfig } from '@/enums/ApiEnum'
import { useNotify } from '@/composables/useNotify'
import type { CityAutocompleteModel } from '@/api/models'

const { t, locale } = useI18n()
const { notifyError } = useNotify()

const emit = defineEmits<{
  (e: 'citySelected', cityData: CityAutocompleteModel): void,
}>()

const isAutocompleteLoading = ref<boolean>(false)
const isAutocompleteShown = ref<boolean>(false)
const searchQuery = ref<string>('')
const cities = ref<CityAutocompleteModel[]>([])
const selectedCityData = ref<CityAutocompleteModel | null>(null)

// loads autocomplete cities suggestions list
async function loadCitiesAutocomplete() {
  try {
    isAutocompleteLoading.value = true
    selectedCityData.value = null

    const query = searchQuery.value.trim()
    const params = {
      ...autocompleteConfig,
      q: query,
      'accept-language': locale.value,
    }

    // request is sent only with 1 or more letters query
    if (query.length > 0) {
      const autocompleteResponse = await apiGetCitiesAutocomplete(params)
      cities.value = autocompleteResponse.data

      const matchingCity = cities.value.find(({ display_place }) => display_place === query)

      // if there is a full matching city name, it becomes chosen at once
      if (matchingCity) {
        selectedCityData.value = matchingCity
      }
    }
  }
  catch {
    notifyError(t('notify.autocompleteError'))
  }
  finally {
    isAutocompleteLoading.value = false
  }
}

const handleGetAutocomplete = useDebounceFn(() => {
  loadCitiesAutocomplete()
}, 600)

function handleSetAutocompleteShown(value: boolean) {
  isAutocompleteShown.value = value
}

function handleAutocompleteSelected(city: CityAutocompleteModel) {
  searchQuery.value = city.display_place
  selectedCityData.value = city
  cities.value = []
}

function handleCitySelected() {
  cities.value = []
  emit('citySelected', selectedCityData.value!)
}
</script>

<template>
  <div class="search-panel">
    <div class="search-block">
      <input class="search-block__input"
        v-model="searchQuery"
        :placeholder="t('message.searchInputPlaceholder')"
        @input="handleGetAutocomplete"
        @focusin="handleSetAutocompleteShown(true)"
        @blur="handleSetAutocompleteShown(false)"
      />

      <loading-spinner
        v-if="isAutocompleteLoading"
        :size="18"
        :borderWidth="3"
        class="search-block__spinner"
      />

      <ul
        v-if="cities.length && isAutocompleteShown"
        class="search-block__autocomplete autocomplete-variants"
      >
        <li
          v-for="city in cities"
          :key="city.place_id"
          class="autocomplete-variants__element"
          @mousedown.prevent="handleAutocompleteSelected(city)"
        >
          {{ city.display_place }}
        </li>
      </ul>
    </div>

    <button
      :disabled="!selectedCityData"
      class="search-button"
      @click="handleCitySelected"
    >
      {{ t('button.search') }}
    </button>
  </div>
</template>

<style lang="scss">
  .search-panel {
    display: flex;
    gap: 12px;
  }

  .search-block {
    position: relative;

    &__input {
      height: 40px;
      width: 100%;
      box-sizing: border-box;

      padding: 0 44px 0 12px;
      background-color: $color-light-grey;
      border: none;
      border-radius: 4px;

      font-size: 20px;

      &:focus-visible {
        outline: 1px solid $color-dark-grey;
      }

      &:disabled {
        color: transparent;
      }
    }

    &__autocomplete {
      margin-top: 8px;
    }

    &__spinner {
      position: absolute;
      right: 12px;
      top: 8px;
    }
  }

  .autocomplete-variants {
    position: absolute;
    min-width: 280px;
    padding: 4px 0;
    list-style: none;
    background-color: $color-white;
    border-radius: 4px;
    font-size: 20px;

    &__element {
      padding: 5px 20px;
      cursor: pointer;

      &:hover {
        background-color: $color-light-grey;
      }
    }
  }

  .search-button {
    padding: 8px 12px;
    background-color: $color-font-active;
    color: $color-white;
    border: none;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: auto;
    }
  }
</style>
