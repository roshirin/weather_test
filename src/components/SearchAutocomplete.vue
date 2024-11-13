<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import LoadingSpinner from './LoadingSpinner.vue'
import { useI18n } from 'vue-i18n'
import { useWeatherAppStore } from '@/stores/weather-app'
import type { CityAutocompleteModel } from '@/api/api'

const { t } = useI18n()
const weatherAppStore = useWeatherAppStore()

const handleGetAutocomplete = useDebounceFn(() => {
  weatherAppStore.loadCitiesAutocomplete()
}, 600)


function handleClearAutocomplete() {
  weatherAppStore.setCities([])
}

function handleSelectCity(city: CityAutocompleteModel) {
  weatherAppStore.setSearchQuery(city.display_place)
  weatherAppStore.setCities([])
  weatherAppStore.setSelectedCity(city)
}
</script>

<template>
  <div class="search-block">
    <input class="search-block__input"
      v-model="weatherAppStore.searchQuery"
      :placeholder="t('message.searchInputPlaceholder')"
      @input="handleGetAutocomplete"
      @blur="handleClearAutocomplete"
    />

    <loading-spinner
      v-if="weatherAppStore.isAutocompleteLoading"
      :size="18"
      :borderWidth="3"
      class="search-block__spinner"
    />

    <ul
      v-if="weatherAppStore.getCitiesList.length"
      class="search-block__autocomplete autocomplete-variants"
    >
      <li
        v-for="city in weatherAppStore.getCitiesList"
        :key="city.place_id"
        class="autocomplete-variants__element"
        @click="handleSelectCity(city)"
      >
        {{ city.display_place }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
  .search-block {
    position: relative;
    min-width: 320px;

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

  .transparent-font-color {
    color: transparent;
  }
</style>
