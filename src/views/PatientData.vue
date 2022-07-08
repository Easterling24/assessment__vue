<template>
  <PatientInfo :data="data" @inputChange="filterDocs" />
  <DocumentsPatient
    :numDocs="numDocs"
    :documents="documents"
    :matched="matched"
  />
</template>

<script>
//Componets
import PatientInfo from '@/components/PatientInfo.vue'
import DocumentsPatient from '@/components/DocumentsPatient.vue'
import patientDB from '@/data/patientData.json'

export default {
  name: 'DocsBrowser',
  components: { PatientInfo, DocumentsPatient },

  data() {
    return {
      items: patientDB.data,
      data: [],
      filteredDocs: [],
      numDocs: Number,
      documents: [],
      formattedDocs: Object,
      searchedWord: '',
      matched: '',
    }
  },
  // ===================================================================== //

  methods: {
    // Getting the data from json file imported above
    getPatientData() {
      this.data = this.items
      this.documents = this.items[0].documents
      this.numDocs = this.items[0].documents.length
      this.formatData()
    },

    // ===================================================================== //

    // Formatting Data e.g date, special characters and others

    formatData() {
      return this.documents.sort(
        (a, b) => new Date(b.document_date) - new Date(a.document_date),
      )
    },

    removeSlash(str) {
      return str.replace('/', '')
    },

    removeSpace(str) {
      return str.replace(/\s+/g, '')
    },
    normalizeString(str) {
      return str.replace(/(\r\n|\n|\r|\\n|\t|\\t|)/gm, '')
    },
    tagsStripped(str) {
      return str.replace(/<\/?[^>]+(>|$)/g, '')
    },

    // ===================================================================== //

    // Getting the found term after filter. This will be usefull for underlying matching results in HTML

    findMatched(word) {
      this.documents.forEach((elt) => {
        if (word === '') {
          this.matched = ''
        } else if (
          elt.document_origin_code
            .toLowerCase()
            .includes(word.trim().toLowerCase())
        ) {
          this.matched = elt.document_origin_code
        } else if (
          elt.document_date
            .trim()
            .toLowerCase()
            .includes(word.trim().toLowerCase())
        ) {
          this.matched = elt.document_date
        } else if (
          elt.displayed_text
            .trim()
            .toLowerCase()
            .includes(word.trim().toLowerCase())
        ) {
          this.matched = elt.displayed_text
        } else if (
          elt.title.trim().toLowerCase().includes(word.trim().toLowerCase())
        ) {
          this.matched = elt.title
        } else if (
          elt.document_type
            .trim()
            .toLowerCase()
            .includes(word.trim().toLowerCase())
        ) {
          this.matched = elt.document_type
        } else {
          this.matched = ''
        }
      })
    },

    // ===================================================================== //

    // Filtering data on input. Checking whether the user input matches title/text/date/origin/type
    filterDocs(search) {
      this.searchedWord = search

      if (this.searchedWord.length === 0) {
        this.getPatientData()
      } else if (this.searchedWord.length >= 1) {
        this.documents = this.documents.filter(
          (elt) =>
            elt.document_type
              .trim()
              .toLowerCase()
              .includes(this.searchedWord.toLowerCase()) ||
            elt.title.toLowerCase().includes(this.searchedWord.toLowerCase()) ||
            elt.document_date
              .toLowerCase()
              .includes(this.searchedWord.toLowerCase()) ||
            this.tagsStripped(elt.displayed_text)
              .toLowerCase()
              .includes(this.searchedWord.trim().toLowerCase()) ||
            elt.document_origin_code
              .trim()
              .toLowerCase()
              .includes(this.searchedWord.trim().toLowerCase()),
        )

        this.numDocs = this.documents.length
      }

      this.findMatched(this.searchedWord)
    },
  },

  // ===================================================================== //

  // Retreiving the patient data on mount

  created() {
    this.getPatientData()
  },
}
</script>

<style lang="scss">
@import '../styles/info.scss';
</style>
