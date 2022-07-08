<template>
  <section class="patient__docs">
    <div class="patient__docs--num">
      <fa icon="fa-solid fa-file-lines" />
      <h4>{{ numDocs }} documents</h4>
    </div>

    <table class="patient__docs__table">
      <thead class="patient__docs__table__head">
        <tr>
          <th>
            <span>
              Date
              <fa icon="fa-solid fa-angle-down" />
            </span>
          </th>
          <th>
            <span>
              Type
              <fa icon="fa-solid fa-angle-down" />
            </span>
          </th>
          <th>
            <span>
              Origine
              <fa icon="fa-solid fa-angle-down" />
            </span>
          </th>
          <th>
            <span>
              Aperçu
              <fa icon="fa-solid fa-angle-down" />
            </span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody class="patient__docs__table__body">
        <tr
          class="docs_rows"
          v-for="document in documents"
          :key="document.index"
        >
          <td valign="top">
            <span
              v-html="highlightFoundItem(date_time(document.document_date))"
            ></span>
          </td>
          <td valign="top">
            <span v-html="highlightFoundItem(document.document_type)"></span>
          </td>
          <td valign="top">
            <span
              v-html="highlightFoundItem(document.document_origin_code)"
            ></span>
          </td>
          <td valign="top">
            <div class="patient__docs__table__body--text_container">
              <h4 v-html="highlightFoundItem(document.title)"></h4>

              <p
                v-html="
                  normalizeString(highlightFoundItem(document.displayed_text))
                "
              ></p>
            </div>
    
          </td>

          <td
            valign="top"
            class="patient__docs__table__body--text_container--expand"
       
          >
            <span v-on:click="toggleText(document)">
              <fa icon="fa-solid fa-angle-right" />
            </span>
         
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
      showMoreText: false,
    }
  },

  methods: {
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

    toggleText(item) {

      item.toggled = true
      if(item.toggled){
          this.showMoreText = true
      } else {
        this.showMoreText = false
      }
      // if(item.toggled === true){
      //   this.showMoreText = true

      // } else {
      //   this.showMoreText = false
      // }
    
    },
  },
}
</script>

<style lang="scss">
@import '../styles/docs.scss';
</style>
