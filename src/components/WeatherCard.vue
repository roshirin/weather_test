<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { PreparedForecastDataModel, PreparedTodaysDataModel } from './models'

defineProps<{
  cityName: string | null
  cardData: [PreparedTodaysDataModel, PreparedForecastDataModel[]]
  isFiveDaysChart: boolean
}>()

const { t } = useI18n()
</script>

<template>
  <div class="weather-card">
    <div class="current-info">
      <div class="current-info__city">
        {{ cityName || '' }}
      </div>

      <div class="current-info__description">
        <div class="current-info__temperature">
          {{ cardData[0].temperature }}°C
        </div>

        <img :src="`/img/icons/${cardData[0].iconSrc}`" class="current-info__icon" />
      </div>
    </div>

    <div
      v-if="isFiveDaysChart"
      class="current-info"
    >
      <div class="days-container">
        <div
          v-for="day of cardData[1]"
          :key="day.id"
          class="days-item"
        >
          <div class="days-item__date">
            {{ `${day.date} ${t(`months.${day.month}`)}` }}
          </div>

          <div class="days-item__day-temp temp-container">
            <img src="/img/icons/icon-day.svg" class="temp-container__icon" />

            <div class="temp-container__info">
              {{ day.dayTemp }}°C
            </div>
          </div>

          <div class="temp-container">
            <img src="/img/icons/icon-night.svg" class="temp-container__icon" />

            <div class="temp-container__info">
              {{ day.nightTemp }}°C
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .weather-card {
    flex-basis: 44%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    gap: 20px;
    color: $color-white;

    @include onDesktop {
      padding-right: 20px;
      gap: 30px;
    }
  }

  .current-info {
    display: flex;
    margin: 0 auto;
    max-width: 300px;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    &__city {
      font-size: 52px;
    }

    &__description {
      display: flex;
    }

    &__temperature {
      padding: 0 15px;
      font-size: 72px;
    }

    &__icon {
      display: block;
      width: 130px;
    };
  }

  .days-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 20px;

    @include onDesktop {
      flex-wrap: nowrap;
    }
  }

  .days-item {
    text-align: center;
    flex-basis: 40%;

    @include onDesktop {
      flex-basis: 25%;
    }

    &__date {
      padding-bottom: 5px;
      border-bottom: 1px solid #8dc1ca;
    }

    &__day-temp {
      padding-top: 5px;
    }
  }

  .temp-container {
    display: flex;
    justify-content: center;
    align-items: center;

    &__icon {
      width: 30px;
    }

    &__info {
      padding-right: 10px;
    }
  }
</style>
