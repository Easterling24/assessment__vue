<template>
  <section class="patient__info__container">
    <div v-if="data" class="patient__info__container--initial">
      <h1>
        Patient
        <br />
        <p>#{{ data.id }}</p>
      </h1>

      <div class="patient__info__container--initial--birth_gender">
        <p>
          {{ indicatorGrammar }}
          <span>{{ format_data(data.birth_date) }}</span>
        </p>

        <span>
          <fa v-if="data.sex === 'F'" icon="fa-solid fa-venus" />
          <fa v-else icon="fa-solid fa-mars" />
        </span>
        <p>{{ indicator }}</p>
      </div>

      <p>
        IPP
        <span>{{ data.ipp }}</span>
      </p>
    </div>

    <div v-else>
      <h1>Data Loading</h1>
    </div>

    <div class="patient__search__input">
      <fa icon="fa-solid fa-magnifying-glass" />
      <input type="text" @input="handleChange" />
    </div>

    <nav class="patient__info__container__nav">
      <ul>
        <li><router-link to="#">Documents</router-link></li>
        <li><router-link to="#">Biologie</router-link></li>
        <li><router-link to="#">Mouvements</router-link></li>
        <li><router-link to="#">Séjours</router-link></li>
        <li><router-link to="#">Phénotypes</router-link></li>
        <li><router-link to="#">Cohortes</router-link></li>
      </ul>
    </nav>
  </section>
</template>

<script>
// Date formatting
import moment from 'moment'

// Importing Search Component

export default {
  name: 'PatientInfo',
  components: {},
  emits: ['searchedWord'],
  props: ['data'],

  data() {
    return {
      searchedWord: '',
      message: 'Hi there',
    }
  },

  methods: {
    format_data(value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
      }
    },

    handleChange(event) {
      this.$emit('inputChange', event.target.value)
    },
  },

  computed: {
    indicator() {
      if (this.data.sex === 'F') {
        return 'Femme'
      } else {
        return 'Homme'
      }
    },
    indicatorGrammar() {
      if (this.data.sex === 'F') {
        return 'Née le'
      } else {
        return 'Né le'
      }
    },
  },
}
</script>

<style lang="scss">
@import '../styles/info.scss';
@import '../styles/search.scss';
</style>
