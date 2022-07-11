<template>
  <section class="patient__docs">
    <div class="patient__docs--num">
      <fa icon="fa-solid fa-file-lines" />
      <h4>{{ numDocs }} documents</h4>
    </div>

    <table class="patient__docs__table">
      <thead>
        <tr>
          <th>
            <span>
              <p>Date</p>
              <fa icon="fa-solid fa-angle-down" />
            </span>
          </th>
          <th>
            <span>
              <p>Type</p>
              <fa icon="fa-solid fa-angle-down" />
            </span>
          </th>
          <th>
            <span>
              <p>Origine</p>
              <fa icon="fa-solid fa-angle-down" />
            </span>
          </th>
          <th>
            <span>
              <p>Aperçu</p>
              <fa icon="fa-solid fa-angle-down" />
            </span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody v-for="document in documents" :key="document.index">
        <tr
          class="patient__docs__table__initial"
          v-bind:class="{
            patient__docs__table__initial__toggled: document.toggled === true,
          }"
        >
          <td
            v-html="highlightFoundItem(date_time(document.document_date))"
          ></td>
          <td>{{ document.document_type }}</td>
          <td>{{ document.document_origin_code }}</td>
          <td style="width: 800px;">
            <div
              class="patient__docs__table__initial__textbox"
              v-bind:class="{
                patient__docs__table__initial__textbox__empty:
                  document.toggled === true,
              }"
            >
              <h3>{{ document.title }}</h3>
              <p v-html="normalizeString(document.displayed_text)"></p>
            </div>
          </td>
          <td>
            <button @click="expandText(document)">
              <fa icon="fa-solid fa-angle-right" />
            </button>
          </td>
        </tr>
        <tr
          class="patient__docs__table__hidden"
          v-bind:class="{
            patient__docs__table__expanded: document.toggled === true,
          }"
        >
          <td colspan="4">
            <table>
              <tbody>
                <tr>
                  <td>
                    <div class="patient__docs__table__hidden--container">
                      <div>
                        <p v-html="document.title"></p>
                      </div>

                      <p v-html="normalizeString(document.displayed_text)"></p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DocumentsPatient',
  props: ['data', 'numDocs', 'documents', 'matched'],

  data() {
    return {
      toggled: Boolean,
    }
  },

  methods: {
    // Removing special characters such as tags, br's
    normalizeString(str) {
      return str.replace(/(\r\n|\n|\r|\\n|\t|\\t|-|=|_)/gm, '')
    },

    highlightFoundItem(text) {
      return text.replace(
        this.matched,
        `<p class="underline">${this.matched} </p>`,
      )
    },

    tagsStripped(str) {
      return str.replace(/<\/?[^>]+(>|$)/g, '')
    },

    date_time(value) {
      return moment(String(value)).format('YYYY')
    },

    // Finding the element to be toggled for text expansion

    expandText(document) {
      console.log(document)
      if (document.toggled === false) {
        document.toggled = true
      } else {
        document.toggled = false
      }
    },
  },


}
</script>

<style lang="scss">
@import '../styles/docs.scss';
</style>
