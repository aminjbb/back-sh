<template>
    <div class="message-list d-flex flex-column" >
        <header class="message-list__header px-4">
            <v-row class="align-center my-0">
                <v-col
                    sm="2"
                    md="1"
                    xs="3"
                    class="message-list__avatar d-flex align-center justify-center h-100"
                >
                    <template v-if="image" />
                    <template v-else>
                        <img
                            src="@/assets/img/no-avatar.png"
                            alt="no avatar"
                            class="rounded-circle"
                        >
                    </template>
                </v-col>

                <v-col
                    sm="9"
                    xs="7"
                    md="10"
                    class="message-list__user-name"
                >
                    <a class="text-black">
                      {{userFullName}}
                    </a>
                </v-col>
            </v-row>
        </header>

        <div class="message-list__contents flex-grow-1 scroller" >
          <div v-for="message in conversationMessages" :key="`message${message.id}`" ref="conversation" >
            <div class="message-list__body message-list__body--receiver" :ref="`chatMessage${message.id}`" v-if="!message.sent_from_me">
              <div class="message-list__body__content">
                <div class="message-list__text pointer" v-if="message.parent" @click="scrollToElement(message.parent.id)">
                 <span class="text-gray500 pa-2">
                    {{message.parent.message}}
                 </span>
                  <v-divider class="mt-2"></v-divider>
                </div>

                <div class="message-list__text ">
                  {{message.message}}
                </div>
                <span class="reply-icon">
                        <v-icon icon="mdi-reply" @click="replyToMessage(message)"/>
                    </span>
              </div>
            </div>

            <div class="message-list__body message-list__body--sender" :ref="`chatMessage${message.id}`" v-else>
              <div class="message-list__body__content">
                <div class="message-list__text  pointer" v-if="message.parent" @click="scrollToElement(message.parent.id)">
                 <span class="text-gray500 pa-2">
                    {{message.parent.message}}
                 </span>
                  <v-divider class="mt-2"></v-divider>
                </div>
                <div class="message-list__text">
                  {{message.message}}
                </div>
                <span class="reply-icon">
                        <v-icon icon="mdi-reply" @click="replyToMessage(message)"/>
                    </span>
              </div>
            </div>
          </div>

        </div>

        <v-row class="message-list__reply px-2 py-2 ma-0">
            <div class="message-preview pa-3" id="message-preview">
                <v-icon @click="cancelReply">mdi-close</v-icon>
                <span id="message-preview-text"> {{repliedMessage}}</span>
            </div>

            <v-col 
                xs="1"
                sm="1"
                md="1"
                lg="1"
                class="message-list__reply__send h-100 pa-0 d-flex align-center justify-center"
                @click="sendMessage"
            >
                <v-icon icon="mdi-send-outline" color="primary500"/>
            </v-col>

            <v-col
                xs="10"
                sm="10"
                md="10"
                lg="10"
                class="message-list__reply__text h-100 pa-0 d-flex align-start  justify-center"
            >
                <v-textarea 
                    variant="outlined" 
                    placeholder="پیام خود را وارد کنید"
                    v-model="messageModal"
                    rows="1"
                    @keyup.enter="sendMessage"
                />
            </v-col>

            <v-col
                xs="1"
                sm="1"
                md="1"
                lg="1"
                class="message-list__reply__emojis h-100 pa-0 d-flex align-center justify-center"
            >
                <v-icon icon="mdi-emoticon-happy-outline" @click="openEmojiList"/>

                <EmojiList :class="{showEmojiList}" @addSticker="addSticker"/>
            </v-col>
        </v-row>
    </div>
</template>
<script>

//Components
import EmojiList from '@/components/Chat/EmojiList/EmojiList.vue'
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  props:{
    conversationMessages:[],
    conversation:null,
    getConversation:{type:Function},
    getConversationList:{type:Function}
  },
    data() {
        return {
            showEmojiList: false,
            messageModal: '',
            repliedMessage:null,
            repliedMessageId:null
        }
    },
    components: {
        EmojiList,
    },

    methods:{
      scrollToElement(id) {
        const prentMessage = this.conversationMessages.findIndex(message =>  message.id === id)
        const el = this.$refs.conversation;
        if (el[prentMessage]) {
          el[prentMessage].scrollIntoView({ behavior: "smooth" });
        }
      },
        /**
         * Show emojis bos
         */
        openEmojiList(){
            this.showEmojiList = !this.showEmojiList
        },

        /**
         * Get emoji from EmojiList.vue
         * @param {*} sticker 
         */
        addSticker(sticker){
            this.messageModal = this.messageModal + sticker;
        },

        /**
         * Reply to message
         * @param {*} message
         */
        replyToMessage(message){
            this.repliedMessageId = message.id
            this.repliedMessage = message.message
            document.getElementById("message-preview").classList.add('show');
        },

        /**
         * Cancel reply 
         * @param {*} id 
         */
        cancelReply(id){
            //TODO: cancel reply should write
          this.repliedMessageId = null
          this.repliedMessage = null
            document.getElementById("message-preview").classList.remove('show');
        },
      /**
       * send message
       */
      async  sendMessage(){
       
        let formData = new FormData();
        const toUserType = this.$route.query.user_type
        const toUserId = this.$route.query.user_id
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'message/crud/create'
        if (this.conversation) formData.append('conversation_id' , this.conversation.id)
        formData.append('to_user_type' , toUserType)
        formData.append('message' , this.messageModal)
        if (toUserId) formData.append('to_user_id' ,toUserId )
        if (this.repliedMessageId) formData.append('replied_to' ,this.repliedMessageId )
        AxiosMethod.form = formData
        AxiosMethod.using_auth =true
        AxiosMethod.token =this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.loading=false
          this.messageModal = null
          this.cancelReply()
          // this.getConversationList()
          if (this.adminSelectedForChat === null){
            this.getConversation(this.conversation.id , this.$route.query.user_type ,this.conversation.user)
          }
          else{
            this.getConversation(data.data.conversation_id ,this.$route.query.user_type ,this.adminSelectedForChat )
          }
        }
        else{
          this.loading=false
        }
        
      }
    },

    computed:{
    adminSelectedForChat(){
        try {
          return this.$store.getters['get_adminNewChat']
        }
        catch (e) {
          return null
        }
    },
    userFullName(){
      try {
        if (this.adminSelectedForChat == null){
          if (this.conversation.user) return this.conversation.user.first_name + ' ' +this.conversation.user.last_name
          else return 'ناشناس'
        }
        else {
          return  this.adminSelectedForChat.first_name + ' ' +this.adminSelectedForChat.last_name
        }
      }
      catch (e) {
        return  ''
      }
    },
  },
    watch:{
      conversationMessages(val){
        if (val.length) {
         setTimeout(()=>{
           this.scrollToElement(val[val.length - 1].id)
         } , 100)
        }

      }
    }
}
</script>
