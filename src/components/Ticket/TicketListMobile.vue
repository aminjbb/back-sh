<template>
  <div class="h-100 d-flex flex-column align-stretch scroller">
    <div class="mx-5">
      <!-- filter -->
      <div class="d-flex justify-end">
        <PanelFilterMobile
            @resetPage="resetPage"
            path="ticket/index"
            :filterField="filterField"
            :statusItems="statusTicket"
            :priorityItems="priorityList"
            :scoreItems="scoreItems"
        />
      </div>

      <!-- cards -->
      <div
          v-for="(item, itemIndex) in allTickets"
          :key="itemIndex"
          class="">
        <v-card class="py-5 px-5 mt-5">
          <div class="d-flex align-center justify-space-between">
                <div class="">
                  <v-icon icon="mdi-circle-small"/>
                  <span class="t12 w500"> موضوع سایت : </span>
                  <div class="">
                    <span v-if="item.parent_topic" class="t12 w500 number-font"> {{ item.parent_topic }} </span>
                    <span v-else class="t12 w500 number-font"> - </span>
                  </div>

                </div>
                <div class="">
                  <v-icon icon="mdi-circle-small"/>
                  <span class="t12 w500"> زیر موضوع سایت : </span>
                  <div class="">
                    <span v-if="item.topic_title" class="t12 w500 number-font"> {{ item.topic_title }} </span>
                    <span v-else class="t12 w500 number-font"> - </span>
                  </div>

                </div>
                <div class="">
                  <v-chip
                      class="ma-2 rounded-lg t10 w400"
                      :color="getStatusColor(item.status)"
                      text-color="white">
                    {{getStatusText(item.status)}}
                  </v-chip>
                </div>
              </div>

          <div class="d-flex align-center justify-space-between">
                <div class="mt-3">
                  <v-icon icon="mdi-circle-small"/>
                  <span class="t12 w500"> شماره تیکت : </span>
                  <span class="t12 w500 number-font"> {{ item.code }} </span>
                </div>
                <div class="mt-3">
                  <v-icon icon="mdi-circle-small"/>
                  <span class="t12 w500"> شناسه تیکت : </span>
                  <span class="t12 w500">  {{ item.id }} </span>
                </div>
              </div>

          <div class="d-flex align-center justify-space-between">
                <div class="mt-3">
                  <v-icon icon="mdi-circle-small"/>
                  <span class="t12 w500"> اولویت: </span>
                  <span class="t12 w500 number-font"> {{ getPriorityText(item.priority) }} </span>
                </div>
                <div class="mt-3">
                  <v-icon icon="mdi-circle-small"/>
                  <span class="t12 w500"> کاربر: </span>
                  <span class="t12 w500 number-font">  {{ item.user.first_name }} {{ item.user.last_name }}</span>
                </div>
              </div>

          <div class="d-flex align-center justify-space-between mt-3">
            <div class="">
              <v-icon icon="mdi-circle-small"/>
              <span class="t12 w500"> امتیاز کاربر: </span>
            </div>

            <v-rating
                v-model="item.rate"
                half-increments
                readonly
                class="me-3"
                style="direction: ltr!important;">
              <template v-slot:item="props">
                <v-icon
                    size="large"
                    :color="props.isFilled ? 'rgb(243, 193, 28)' : 'grey-lighten-1'">
                  mdi-star
                </v-icon>
              </template>
            </v-rating>
          </div>

          <div class="d-flex justify-space-between mt-3">
            <BottomSheetTicket :item="item" :title="`اطلاعات تیکت`"/>
            <v-btn
                @click="$router.push(`/ticket/get/${item.id}`)"
                color="primary500"
                width="142"
                height="24"
                rounded
                class="text-white t12 w500">
              <v-icon icon="mdi-eye" class="mx-1"/>
              نمایش
            </v-btn>
          </div>
        </v-card>
      </div>

      <!-- pagination -->
      <div class="my-3">
        <v-row justify="center">
          <v-col cols="12">
            <v-pagination
                v-model="page"
                :length="pageLength"
                rounded="circle"
                size="40"
                :total-visible="7"
                prev-icon="mdi-chevron-right"
                next-icon="mdi-chevron-left"/>
          </v-col>

          <v-col cols="12">

            <div
                id="rowSection"
                class="d-flex justify-center align-center">
              <span class="ml-5">تعداد سطر در هر صفحه</span>
              <span id="row-selector">
                <v-select
                    v-model="dataTableLength"
                    class="t1330"
                    variant="outlined"
                    :items="[25,50,100]" />
              </span>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import Table from '@/components/Ticket/TicketTable/TicketTable.vue'
import Ticket from '@/composables/Ticket';
import PanelFilterMobile from "@/components/PanelFilterMobile.vue";
import BottomSheetTicket from "@/components/BottomSheetTicket.vue";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";

export default {
  data() {
    return {
      perPageFilter: false,
      scoreItems: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
    }
  },
  components: {
    PanelFilter,
    PanelFilterMobile,
    Table,
    BottomSheetTicket,
  },

  setup() {
    const statusTicket = [
      {
        label: 'همه وضعیت‌ها',
        value: ''
      },
      {
        label: 'باز',
        value: 'open'
      },
      {
        label: 'پاسخ داده شده',
        value: 'answered'
      },
      {
        label: 'بسته شده',
        value: 'resolved'
      },
      {
        label: 'در حال بررسی',
        value: 'pending'
      }
    ]
    const priorityList = [
      {
        label: 'همه اولویت ها',
        value: ''
      },
      {
        label: 'فوری',
        value: 'urgent'
      },
      {
        label: 'پایین',
        value: 'low'
      },
      {
        label: 'بالا',
        value: 'high'
      },
      {
        label: 'متوسط',
        value: 'medium'
      }
    ]

    const {
      pageLength,
      filterField,
      dataTableLength,
      page,
      header,
      item,
      loading,
      getTicketList,
      allTickets
    } = Ticket();
    return {
      pageLength,
      filterField,
      dataTableLength,
      page,
      header,
      item,
      loading,
      getTicketList,
      allTickets,
      statusTicket,
      priorityList
    };
  },

  mounted() {
    this.getTicketList();
    this.setEcho();

  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    setEcho() {
      if (this.$cookies.get('adminToken')) {
        setTimeout(() => {
          window.Echo.channel(`admin.ticket`).listen('TicketCreated', (event) => {
            this.getTicketList()
          })
        }, 300)
      }
    },

    resetPage() {
      this.perPageFilter = true
      this.page = 1
      setTimeout(() => {
        this.perPageFilter = false
      }, 1000)
    },

    getPriorityText(priority) {
      const text = '';

      if (priority == 'urgent') {
        return 'فوری';
      }
      if (priority == 'low') {
        return 'پایین';
      }
      if (priority == 'high') {
        return 'بالا';
      }
      if (priority == 'medium') {
        return 'متوسط';
      }

      return 'معمولی';
    },

    getStatusColor(status) {
      const color = '';

      if (status == 'open') {
        return 'blue';
      }
      if (status == 'answered') {
        return 'green';
      }
      if (status == 'resolved') {
        return 'grey-lighten-1';
      }
      if (status == 'pending') {
        return 'warning';
      }

      return '';
    },

    getStatusText(status) {
      const text = '';

      if (status == 'open') {
        return 'باز';
      }
      if (status == 'answered') {
        return 'پاسخ داده شده';
      }
      if (status == 'resolved') {
        return 'بسته شده';
      }
      if (status == 'pending') {
        return 'در حال بررسی';
      }

      return 'نامعلوم';
    },

    scrollToTop(container) {
      const element = document.querySelector(container)
      if (element) {
        element.scrollTo({top:0, behavior: 'smooth'})
      }
    },

    pageChanged () {
      this.scrollToTop('.scroller')
    }
  },

  watch: {
    dataTableLength() {
      this.perPageFilter = true
      this.page = 1
      let query = this.$route.query
      if (query) {
        this.$router.replace({
          query: {
            ...query,
            per_page: this.dataTableLength,
          }
        })
      } else {
        this.$router.push({
          query: {
            per_page: this.dataTableLength,
          }
        })
      }
      this.perPageFilter = false
    },
    page() {
      this.pageChanged()
      if (!this.perPageFilter) {
        this.getTicketList()
      }
    },
    $route() {
      this.getTicketList()
    }
  }
}
</script>
