<template>
  <div>
    <div class="text-center py-3">
      <span class="t14500">
        تعریف گردان شانس
      </span>
    </div>
    <v-divider/>

    <v-form ref="LuckyWheelStep1Form" v-model="valid">
      <v-row justify="start" align="center" class="pa-5">
        <v-col cols="4">
          <div>
            <span>نام فارسی گردونه شانس</span>
            <span class="text-error">*</span>
          </div>
          <div class="mt-2">
            <v-text-field variant="outlined" v-model="label" :rules="rule"/>
          </div>
        </v-col>
        <v-col cols="4">
          <div>
            <span>لبیل انگلیسی گردانه</span>
            <span class="text-error">*</span>
          </div>
          <div class="mt-2">
            <v-text-field variant="outlined" v-model="name" :rules="rule"/>
          </div>
        </v-col>
        <v-col cols="4">
          <div>
            <span>تاریخ شروع</span>
            <span class="text-error">*</span>
          </div>
          <div class="mt-2">
            <v-text-field class="input-start-date" variant="outlined" v-model="startDate" :rules="rule"/>
            <date-picker
                clearable
                type="datetime"
                display-format="jYYYY-jMM-jDD"
                :custom-input="`.input-start-date`"
                v-model="startDate" />
          </div>
        </v-col>
        <v-col cols="4">
          <div>
            <span>تاریخ پایان</span>
            <span class="text-error">*</span>
          </div>
          <div class="mt-2">
            <v-text-field class="input-end-date" variant="outlined" v-model="endDate" :rules="rule"/>
            <date-picker
                clearable
                type="datetime"
                display-format="jYYYY-jMM-jDD"
                :custom-input="`.input-end-date`"
                v-model="endDate" />
          </div>
        </v-col>
        <v-col cols="4">
          <div>
            <span>تعداد شانس</span>
            <span class="text-error">*</span>
          </div>
          <div class="mt-2">
            <v-text-field variant="outlined" v-model="chance" :rules="rule"/>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
  import VuePersianDatetimePicker from "vue3-persian-datetime-picker";

  export default {
    data(){
      return{
        valid:true,
        rule: [v => !!v || "این فیلد الزامی است"],
        label:null,
        name :null,
        startDate:null,
        endDate:null,
        chance:null,
      }
    },
    components:{
      datePicker: VuePersianDatetimePicker
    },

    watch: {
      label(label){
        this.$emit('label',label)
      },

      name(name){
        this.$emit('name',name)
      },

      startDate(startDate){
        this.$emit('startDate',startDate)
      },

      endDate(endDate){
        this.$emit('endDate',endDate)
      },

      chance(chance){
        this.$emit('chance',chance)
      },
    }
  }
</script>