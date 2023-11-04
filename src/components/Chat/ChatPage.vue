<template>
<div class="chat-page">
    <v-row>
        <v-col cols="3">
            <ChatList
                :getConversation="getConversation"
                :userList="userConversationList"
                :adminList="adminConversationList" />

        </v-col>
        <v-col cols="9">
            <div class="pl-5">
                <v-card class="ma-5 br-12 chat-page__message-list ma-0">
                    <MessageList
                        :getConversationList="getConversationList"
                        :getConversation="getConversation"
                        :conversation="conversation"
                        :conversationMessages="conversationMessages" />
                </v-card>
            </div>
        </v-col>
    </v-row>
</div>
</template>

<script>
import {
    ref
} from 'vue'
//components
import MessageList from '@/components/Chat/MessageList/MessageList.vue'
import ChatList from '@/components/Chat/ChatList.vue'
import {
    AxiosCall
} from "@/assets/js/axios_call";

export default {
  components: {
    MessageList,
    ChatList
  },
  data: () => ({
    conversationList:[],
    conversation:null,
    conversationId:null
  }),
  methods:{
    async  getConversationList(){
      const filter = {
        per_page : 10000,
        order: 'updated_at',
        order_type:'desc'
      }
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = 'conversation/crud/index'
      AxiosMethod.form = filter
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.using_auth =  true
      let data = await AxiosMethod.axios_get()
      if (data) {
        this.conversationList = data.data.data
      }
      else {
      }
    },
    async  getConversation(id , userType , user){
      this.$store.commit('set_adminNewChat' , null)

      let userId = ''
      if (user){
        userId = user.id
      }
      this.$router.push({ query: { user_type: userType , user_id:userId}})
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `conversation/crud/get/${id}`
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.using_auth =  true
      let data = await AxiosMethod.axios_get()
      if (data) {

        this.conversation = data.data
        this.conversationId = data.data.id
      }
      else {
      }
    },
    clearConversation(){
      this.conversation = null
      this.conversationId = null
    },
    setEcho(){
      if (this.$cookies.get('adminToken')){
        setTimeout(()=>{
          window.Echo.channel(`admin.chat`).listen('ConversationCreated', (event) => {
            console.log(event)
            this.getConversationList()
          })

          window.Echo.private(`admin.chat.${localStorage.getItem('userId')}`).listen('Chat.ConversationCreated', (event) => {
            if (this.conversationId === event.message.conversation_id) {
              this.getConversation(this.conversationId, this.$route.query.user_type ,this.conversation.user)
            }
            this.getConversationList()
          })
        }, 1000)
      }

    },

  },
  mounted() {

    this.getConversationList()
    this.setEcho()
  },

  computed:{
    userConversationList(){
      try {
        const userList = this.conversationList.filter((conversation) =>   conversation.user == null ||  conversation.user.type === 'user' )
        return userList
      }catch (e) {
        return  e
      }
    },

    adminConversationList(){
      try {
        const adminList = this.conversationList.filter((conversation) =>  conversation.user != null && conversation.user.type === 'admin' )
        return adminList
      }catch (e) {
        return  e
      }
    },
    conversationMessages(){
      try {
        const message = this.conversation.messages
        return message.reverse()
      } catch (error){
        return  []
      }
    },


  },

  watch:{
    $route(){
      // this.clearConversation()
    }
  }

}
</script>