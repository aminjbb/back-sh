<template>
  <div>
    <v-form ref="updateTemplate" v-model="valid">
      <v-row justify="start" align="center" class="px-15">
        <v-col cols="12" md="6">
          <div class="text-right my-5">
                      <span class="t14500">
                          موبایل
                      </span>
          </div>
          <v-select
              density="compact"
              variant="outlined"
              single-line
              :rules="rule"
              v-model="form.mobile"
              :items="templateList"
          />
        </v-col>

        <v-col cols="12" md="6">
          <div class="text-right my-5">
                      <span class="t14500">
                       تبلت
                      </span>
          </div>
          <v-select
              density="compact"
              variant="outlined"
              single-line
              :rules="rule"
              v-model="form.tablet"
              :items="templateList"
          />
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-right my-5">
                      <span class="t14500">
                       دسکتاپ
                      </span>
          </div>
          <v-select
              density="compact"
              variant="outlined"
              single-line
              :rules="rule"
              v-model="form.desktop"
              :items="templateList"
          />
        </v-col>

      </v-row>
    </v-form>
  </div>
</template>
<script>

export default {

  props: {
    page:null,
    templateList:[]
  },


  data() {
    return {
      form: {
        mobile: '',
        tablet: '',
        desktop:'',

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
        this.page.templates.forEach(template=>{
          if (template.pivot.device_type === 'desktop') this.form.desktop = template.id
          if (template.pivot.device_type === 'mobile') this.form.mobile = template.id
          if (template.pivot.device_type === 'tablet') this.form.tablet = template.id
        })
      } catch (error) { }
    }
  },
  watch: {
      page(){
        this.setForm()
      }
  },

}
</script>
