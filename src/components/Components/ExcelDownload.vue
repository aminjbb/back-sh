<template>
  <v-row justify="end" v-if="hasFilter">
    <v-col cols="6">
      <v-checkbox
          v-model="filter"
          class="mr-8"
      >
        <template v-slot:label>
          <div>
            <span class="t14500">
              {{filterTitle}}
            </span>
          </div>
        </template>
      </v-checkbox>
    </v-col>
  </v-row>

  <div class="text-center my-5">
    <v-btn
        :loading="loading"
        @click="actionButton()"
        width="400"
        color="black"
        rounded
    >
      <span class="t14300">
          {{buttonTitle}}
       </span>
    </v-btn>
  </div>
</template>
<script>
export default {
  props: {
    hasFilter: {type: Boolean, default: true},
    loading:{type:Boolean , default: false},
    buttonTitle:{type:String , default:'خروجی اکسل'},
    filterTitle:{type:String , default:'خروجی بهمراه اعمال فیلتر'},
  },
  methods:{
    actionButton(){
      this.$emit('action')
    }
  }
}
</script>