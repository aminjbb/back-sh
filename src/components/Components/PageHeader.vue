<template>
  <div>
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 py-5">
        <v-col cols="6">
          <v-row justify="start">
            <v-btn
                @click="buttonAction()"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1">
              <template v-slot:prepend v-if="hasIcon">
                <v-icon>mdi-plus</v-icon>
              </template>
              {{ btnTitle }}
            </v-btn>
          </v-row>
        </v-col>

        <v-col cols="6">
          <v-row justify="end">
            <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

            <PanelFilter
                @resetPage="resetPage"
                path="admin/index"
                :filterField="filterField"
                :page="page"
                :perPage="dataTableLength"/>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";
const ModalColumnFilter = defineAsyncComponent(()=> import('@/components/Public/ModalColumnFilter.vue'))
const PanelFilter = defineAsyncComponent(()=> import('@/components/PanelFilter/PanelFilter.vue'))

export default {

  props:{
    btnTitle:{
      type:String,
      default:''
    },

    hasIcon:{
      type:Boolean,
      default: true
    }
  },
  components: {ModalColumnFilter , PanelFilter},
  methods:{
    buttonAction(){
      this.$emit('buttonAction')
    }
  }
}
</script>