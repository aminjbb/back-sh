<template>
  <v-col class="py-0 px-0" cols="12" sm="4">
    <v-card class="ma-2 px-2 py-2 flex-grow-1 rounded-lg">
      <v-row justify="space-between" align="center">
        <v-col v-if="itemImagePath" cols="2">
          <img class="w-100" :src=itemImagePath :width="100" alt="order-box">
        </v-col>
        <v-col cols="md-10 sm-12">
          <v-skeleton-loader type="list-item-two-line" v-if="loading"></v-skeleton-loader>
          <template v-else>
            <v-row class="my-1">
              <span class="modal__content__title"><b>{{ itemName }}</b></span>
            </v-row>
            <v-row>
            <span v-if="itemValueFormatted" class="text-h6 number-font">
              <b>
                {{
                  itemValueFormatted?.toLocaleString()
                }}
              </b>
            </span>
            </v-row>
            <v-row class="mb-1">
              <span class="number-font">{{ itemValue?.toLocaleString() ?? '&nbsp;'}}</span>
            </v-row>
          </template>

        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script setup>
import {toRefs} from "vue";

const props = defineProps({
  itemName: {
    type: String,
    required: true
  },
  itemValueFormatted: {
    type: String,
    required: true
  },
  itemValue: {
    type: String,
    required: false
  },
  itemImagePath: {
    type: String,
    required: false
  },
  loading: {
    type: Boolean,
    default: true,
    required: true
  }
});
const {itemName} = toRefs(props);
const {itemValue} = toRefs(props);
const {itemValueFormatted} = toRefs(props);
const {itemImagePath} = toRefs(props);
const {loading} = toRefs(props);
</script>