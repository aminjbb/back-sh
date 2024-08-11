<template>
  <v-form
      ref="addForm"
      class="d--rtl pb-10"
      v-model="valid">
    <v-row justify="start" align="center" class="px-15 pb-15">
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14 w500">
                  عنوان<span class="text-error">*</span>
                </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            placeholder="عنوان وارد نمایید"
            :rules="rule"
            v-model="form.title" />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                <span class="t14 w500">
                     ترتیب نمایش<span class="text-error">*</span>
                </span>
        </div>
        <v-text-field
            placeholder="ترتیب نمایش را وارد نمایید"
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.priority" />
      </v-col>

    </v-row>
  </v-form>
</template>

<script>

export default {

  props: {
    status: null,

  },

  data() {
    return {

      form: {
        title: '',
        priority: '',

      },
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid: false,
    }
  },
  methods: {

    /**
     * Set from
     */
    setForm() {
      try {

        this.form.title = this.objectSection.label
        this.form.priority = this.objectSection.priority

      } catch (error) {}
    },
  },
  mounted() {
    if (this.status == 'edit') this.setForm()
  },

  computed:{
    objectSection(){
      return this.$store.getters['get_homePageSectionForSliderObject']
    }
  }

}
</script>
