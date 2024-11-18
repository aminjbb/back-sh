<template>
  <div class="h-100 d-flex flex-column align-stretch">

    <v-card class="pa-15 flex-grow-1 d-flex flex-column align-stretch">
      <div>
        <v-form ref="createTicket" v-model="valid">
          <v-row
              justify="center"
              align="center"
              class="pa-5 pt-7">
            <v-col cols="4">
              <div class="text-right mb-3">
                    <span class="t14 w500">
                        کاربر
                    </span>
                <span class="text-error">*</span>
              </div>
              <v-autocomplete
                  :items="userList"
                  v-model="selectedUser"
                  return-object
                  clearable
                  :rules="rule"
                  variant="outlined"
                  no-data-text="کاربری برای نمایش وجود ندارد"
                  v-debounce=" searchUser"/>
            </v-col>
            <v-col cols="4">
              <div class="text-right mb-3">
                    <span class="t14 w500">
                        موضوع
                    </span>
                <span class="text-error">*</span>
              </div>
              <v-autocomplete
                  :items="parentTopices"
                  v-model="parentTopicId"
                  return-object
                  clearable
                  :rules="rule"
                  variant="outlined"
                  no-data-text="موضوع ای برای نمایش وجود ندارد"
                  @update:model-value="getTopic"
              />
            </v-col>
            <v-col cols="4">
              <div class="text-right mb-3">
                    <span class="t14 w500">
                        زیر موضوع
                    </span>

              </div>
              <v-autocomplete
                  :items="topic"
                  v-model="topicId"
                  return-object
                  clearable

                  variant="outlined"
                  no-data-text="زیر موضوع ای برای نمایش وجود ندارد"
                  v-debounce=" searchUser"/>
            </v-col>
            <v-col cols="6">
              <div class="text-right mb-3">
                    <span class="t14 w500">
                        اولیت
                    </span>
                <span class="text-error">*</span>
              </div>
              <v-select
                  v-model="priority"
                  variant="outlined"
                  :rules="rule"
                  :items="priorities"/>
            </v-col>
            <v-col cols="10">
              <div class="text-right mb-3">
                    <span class="t14 w500">
                        پیام
                    </span>
              </div>
              <keep-alive>
                <TinymceVue @input="fillDescription" v-if="load" :value="content" id="d2" class="mb-8"
                            :other_options="options">
                </TinymceVue>
              </keep-alive>

            </v-col>

          </v-row>
        </v-form>
      </div>


      <footer class="create-product__actions pl-15">
        <v-row justify="space-between" class="pl-10 pt-8">
          <div>
            <v-btn
                @click="$router.go(-1)"
                variant="outlined"
                height="40"
                rounded
                class="px-8 mt-1 mr-5">

              انصراف
            </v-btn>

          </div>

          <div>
            <v-btn
                :loading="loading"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1"
                @click="createTicket()">

              تایید
            </v-btn>

          </div>
        </v-row>
      </footer>
    </v-card>
  </div>
</template>

<script>
import User from '@/composables/User'
import {AxiosCall} from "@/assets/js/axios_call";
import TinymceVue from "@/components/Public/TinymceVue.vue";

export default {
  setup() {
    const {
      users,
      getUsers
    } = new User
    return {
      users,
      getUsers
    };

  },

  components: {
    TinymceVue
  },

  data: () => ({
    valid: true,
    rule: [v => !!v || 'این فیلد الزامی است'],
    parentTopices: [],
    parentTopicId: null,
    topicId: null,
    topic: [],
    tags: [],
    selectTags: [],
    options: {
      height: 500,
    },
    load: false,
    selectedUser: null,
    loading: false,
    title: null,
    priority: null,
    content: null,
    priorities: [{
      title: 'فوری',
      value: 'urgent'
    },
      {
        title: 'بالا',
        value: 'high'
      },
      {
        title: 'معمولی',
        value: 'medium'
      },
      {
        title: 'پایین',
        value: 'low '
      },
    ],
  }),

  methods: {
    async getTags() {
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `system/admin/tag/crud/index`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.tags = data.data

      }
    },
    fillDescription(e) {
      this.content = e
    },
    searchUser(e) {
      const filter = {
        per_page: 10,
        phone_number: e
      }
      this.getUsers(filter)
    },

    async validate() {
      await this.$refs.createTicket.validate()
      if (this.valid) this.createTicket()
    },

    async createTicket() {
      this.loading = true
      var formdata = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'ticket/admin/crud/create'
      AxiosMethod.form = formdata
      formdata.append('user_id', this.selectedUser.value)
      formdata.append('title', this.title)
      formdata.append('priority', this.priority)
      formdata.append('content', this.content)
      formdata.append('status', 'open')
      if (this.topicId) formdata.append('topic_id', this.topicId.id)
      else formdata.append('topic_id', this.parentTopicId.id)
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth = true
      AxiosMethod.token = this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading = false
        this.$router.push('/ticket/index')

      } else {
        this.loading = false
      }
    },
    async getParentTopic() {
      const form = {
        per_page: 10000
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.form = form
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = 'ticket/topic/crud/index'
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.parentTopices = data.data.data
      }
    },

    async getTopic(topicId) {
      this.topic = []
      this.topicId = null
      const form = {
        per_page: 10000
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.using_auth = true
      AxiosMethod.form = form
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `ticket/topic/crud/get/${this.parentTopicId?.id}`
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.topic = data.data.children
      }
    },
  },

  mounted() {
    this.getTags()
    this.getParentTopic()
    const filter = {
      per_page: 10
    }
    this.getUsers(filter)
    setTimeout(() => {
      this.load = true
    }, 500)
  },

  computed: {
    userList() {
      try {
        let users = []
        this.users.data.forEach(user => {
          const form = {
            title: user.first_name + ' ' + user.last_name + ' (' + user.phone_number + ') ',
            value: user.id
          }
          users.push(form)
        })
        return users
      } catch (e) {
        return []
      }
    }
  }
}
</script>
