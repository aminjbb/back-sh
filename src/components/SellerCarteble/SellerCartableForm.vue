<template>
  <div>
    <v-row justify="center" align="center">
        <v-col cols="4" v-for="(item , index) in items" :key="`formInput${index}`">
          <div class="text-right">
            <div class="t12 w400 text-gray600 mb-3">
              {{item.label}}
            </div>
            <div>
              <v-text-field variant="outlined" v-model="formData[index]"></v-text-field>
            </div>
          </div>
        </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12">
        <div class="text-right">
          <div class="t12 w400 text-gray600">
            توضیحات
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <v-textarea variant="outlined" :rows="4" v-model="description"></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props:{
    items:[],
    type:{type:String , default: 'text'}
  },

  data(){
    return{
      formData:[],
      description:null
    }
  },

  mounted() {
    this.items.forEach(element=>{
      this.formData.push('')
    })
  },

  watch:{
    items(val){
      if (val.length){
        val.forEach(element=>{
          const form = {
            label:element.label,
            value:''
        }
          this.formData.push(form)
        })

      }
    }
  }
}
</script>