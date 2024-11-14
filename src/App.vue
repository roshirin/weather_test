<script setup lang="ts">
import { Notifications } from '@kyvg/vue3-notification'
import { useI18n } from 'vue-i18n'
import LanguagePicker from './components/LanguagePicker.vue'

const { t } = useI18n()
</script>

<template>
  <header class="header">
    <div class="header__content container">
      <nav class="navigation">
        <router-link :to="{ name: 'home' }">{{ t('navigation.home') }}</router-link>
        <router-link :to="{ name: 'favorites' }">{{ t('navigation.favorites') }}</router-link>
      </nav>

      <language-picker />
    </div>
  </header>

  <main class="main">
    <notifications />

    <div class="container page">
      <router-view />
    </div>
  </main>
</template>

<style lang="scss">
  body, ul {
    margin: 0;
    padding: 0;
  }

  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    font-family: SourceSans, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 20px;
    color: $color-font-dark;
  }

  .header {
    min-height: 72px;
    background-color: $color-light-blue;

    &__content {
      box-sizing: border-box;
      display: flex;
      padding: 0 40px;
      justify-content: space-between;
      align-items: center;
    }
  }

  .main {
    padding-bottom: 20px;
    flex-grow: 1;
    background: linear-gradient(to bottom, $color-light-blue, $color-lightest-blue);
  }

  .navigation {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 20px 0;

    @include onTablet {
      padding: 30px 0;
    }

    a {
      font-size: 22px;
      font-weight: bold;
      color: $color-font-dark;
      text-decoration: none;

      &.router-link-exact-active {
        color: $color-font-active;
      }
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .page {
    @include onDesktop {
      box-sizing: border-box;
      padding: 0 30px;
    }
  }

  .language {
    display: flex;
    align-items: center;

    &__select {
      border: none;
      outline: none;
      background-color: transparent;
      font-size: 20px;
      color: $color-font-dark;
    }
  }

  .weather-blocks-container {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @include onTablet {
      gap: 30px;
    }
  }
</style>
