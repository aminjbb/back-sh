<template>

  <v-form ref="createMenu" v-model="valid" class="create-with-title__info-form scroller">
    <v-row justify="start" align="center">


      <v-col cols="12" md="6">
        <div class="text-right my-5">
                      <span class="t14 w500">
                          نام فارسی <span class="text-error">*</span>
                      </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            :rules="persianRule"
            v-model="form.lable"
        />
      </v-col>

      <v-col cols="12" md="6">
        <div class="text-right my-5">
                      <span class="t14 w500">
                        نام انگلیسی <span class="text-error">*</span>
                      </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            :rules="englishRule"
            v-model="form.name"
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                      <span class="t14 w500">
                       منو مادر <span class="text-error">*</span>
                      </span>
        </div>
        <v-autocomplete
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.menu"
            :items="menuList"
            item-title="title"
            item-value="value"
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                      <span class="t14 w500">
                         اولویت
                      </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            v-model="form.priority"
        />
      </v-col>

      <v-col cols="12" md="6">
        <div class="text-right my-5">
                      <span class="t14 w500">
                       آیکون
                      </span>
        </div>
        <v-text-field
            density="compact"
            variant="outlined"
            single-line
            v-model="form.icon"
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                      <span class="t14 w500">
                       منو URL <span class="text-error">*</span>
                      </span>
        </div>
        <v-text-field
            placeholder="about-us"
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.url"
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                      <span class="t14 w500">
                        موقعیت
                      </span>
        </div>
        <v-select
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.position"
            :items="positions"
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                      <span class="t14 w500">
                        آیکون فلش
                      </span>
        </div>
        <v-select
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.flashIcon"
            :items="flashIcon"
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right my-5">
                      <span class="t14 w500">
                       نوع دستگاه
                      </span>
        </div>
        <v-select
            density="compact"
            variant="outlined"
            single-line
            :rules="rule"
            v-model="form.deviceType"
            :items="deviceType"
        />
      </v-col>

    </v-row>
  </v-form>
</template>
<script>

import Menu from "@/composables/Menu";
export default {
  setup(){
    const {allMenu, getAllMenu } = new Menu()
    return {allMenu, getAllMenu}
  },
  props: {
    menu:null
  },

  data() {
    return {
      form: {
        lable: '',
        name: '',
        menu:'',
        priority:'',
        icon:'',
        url:'',
        deviceType:'',
        flashIcon:'',
        position:''
      },
      rule: [v => !!v || 'این فیلد الزامی است'],
      persianRule: [
        (v) => !!v || "این فیلد الزامی است",
        (v) =>
            /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/.test(v) ||
            "فقط حروف فارسی ",
      ],
      englishRule: [
        (v) => !!v || "این فیلد الزامی است",
        (v) => !RegExp("[\u0600-\u06FF]").test(v) || "فقط حروف انگلیسی ",
      ],

      valid: false,
      deviceType:[
        {title:'موبایل' , value:'mobile'},
        {title:'تبلت' , value:'tablet'},
        {title:'دسکتاپ' , value:'desktop'},
      ],
      flashIcon:[
        {title:'دارد' , value:1},
        {title:'ندارد' , value:'none'},
      ],
      positions:[
        {title:'سمت راست رعدوبرق' , value:'right-flash'},
        {title:'وسط هاور گرادینت' , value:'center'},
        {title:'سمت راست ساده' , value:'right'},
      ],

    }
  },
  computed:{
    menuList(){
      try {
        let menus = [ {title:'هیچ کدام' , value:'none'}]
        this.allMenu.forEach(menu =>{
          const form = {
            title:menu.label,
            value : menu.id
          }
          menus.push(form)
        })
        return menus
      }
      catch (e) {
        return  []
      }
    },
  },
  methods: {
    /**
     * Set from
     */
    setForm() {
      try {
        this.form.lable = this.menu.label
        this.form.name = this.menu.name
        if (this.menu.menu_id) this.form.menu = this.menu.menu_id
        else this.form.menu = 'none'
        this.form.priority = this.menu.priority
        this.form.icon = this.menu.icon
        this.form.url = this.menu.url
        this.form.deviceType = this.menu.type
        if (this.menu.has_chevron == 0)this.form.flashIcon = 'none'
        else this.form.flashIcon = this.menu.has_chevron
        this.form.position = this.menu.position

      } catch (error) {
        console.log(error) }
    }
  },
  watch: {
    menu(){
      this.setForm()
    }
  },
  mounted() {
    this.getAllMenu()
  }

}
</script>
