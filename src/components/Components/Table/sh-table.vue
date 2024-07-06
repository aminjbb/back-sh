<template>
  <div class="c-table rounded-t-lg">
    <v-data-table
        class="table mt-5"
        :headers="headers"
        :items="items"
        :show-select="isSelect"
        hide-default-footer

        item-value="index">
      <template v-slot:item.row="{ item, index }">
        <span class="number-font"> {{rowIndexTable(index)}} </span>
      </template>
      <template v-slot:item.id="{ item }">
        <span class="number-font"> {{ item.id }}</span>
      </template>
      <template v-slot:item.created_at_fa="{ item }">
        <span class="number-font">
          {{ item.created_at_fa}}
        </span>
      </template>
      <template v-slot:item.updated_at_fa="{ item }">
        <span class="number-font">
          {{ item.updated_at_fa}}
        </span>
      </template>
      <template v-slot:item.identification_code="{ item }">
        <span class="number-font">
          {{ item.identification_code}}
        </span>
      </template>
      <template v-slot:item.phone_number="{ item }">
        <span class="number-font">
          {{ item.phone_number}}
        </span>
      </template>
      <template v-slot:item.action_driver="{ item }">
        <v-menu :close-on-content-click="false" :location="location">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props">
              mdi-dots-vertical
            </v-icon>
          </template>
          <v-list class="c-table__more-options">
            <v-list-item >
              <v-list-item-title>
                <div
                    class="ma-5 pointer"
                    @click="$router.push(`/driver-management/update/${item.id}`)">
                  <v-icon size="small" class="text-grey-darken-1">mdi-pen</v-icon>
                  <span class="mr-2 text-grey-darken-1 t14300">
                                                ویرایش
                                                </span>
                </div>
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>
                <div class="ma-5 pointer" @click="removeItem(item.id)">
                  <v-icon size="small" class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                  <span class="mr-2 text-grey-darken-1 t14300">
                                                حذف
                                            </span>
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:no-data>
        <div class="d-flex justify-center align-center flex-column py-14">
          <img src="@/assets/img/NullTable.png" alt="shavaz image">
          <div class="d-flex justify-center align-center flex-column">
            <span class="text-gray500 text-center text-body-1">اطلاعاتی برای نمایش وجود ندارد.</span>
          </div>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {
  openConfirm,
  isOdd
} from "@/assets/js/functions";
export default {
  name: "Table",

  props: {
    headers: {
      type: Array,
      default: () => []
    },    items: Array,
    isSelect: Boolean,
    page: Number,
    perPage:Number,
    deletePath: {
      type: String,
      default: ''
    },
  },

  components: {

  },

  data() {
    return {

    }
  },

  methods: {
    rowIndexTable(index) {
      let rowIndex = 0
      if (this.page === 1) {
        rowIndex = (1 + index)
        return rowIndex
      } else {
        rowIndex = ((this.page - 1) * this.perPage) + index + 1
        return rowIndex
      }
    },
    removeItem(id) {
      openConfirm(this.$store, "با حذف راننده دیگر به جزئیات آن دسترسی نخواهید داشت.آیا از انجام این کار اطمینان دارید؟", "حذف راننده","delete", this.deletePath + id, true)
    },
    oddIndex(index) {
      return isOdd(index)
    },


  },
  computed: {

  },
}
</script>

