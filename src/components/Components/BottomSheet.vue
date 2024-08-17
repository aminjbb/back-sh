<template>
  <v-bottom-sheet v-model="sheet">
    <div class="text-center">
      <p v-if="title">
        {{title}}
      </p>
      <div>
        <slot name="bottomSheetBody"></slot>
      </div>
    </div>
  </v-bottom-sheet>
</template>

<script>
export default {
  props:{
    title:{type:String , default:''},
    sheet:{type:Boolean , default: false}
  }
}
</script>