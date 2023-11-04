
import { createStore } from "vuex";

export default createStore({
  state: {
    toast: false,
    toastText: '',
    toastStatus: '',
    confirmForm: {
      confirmModal: false,
      confirmModalTitle: 'حذف آیتم',
      confirmModalText: 'آیا از حذف آیتم مطمئن هستید؟',
      confirmModalType: 'delete',
      confirmModalIcon: 'delete',
      confirmModalEndpoint: '',
      confirmModalClose: true,
    },
    progressUpload:0,
    menuNotifications:[],
    massUpdateModal:false,
    adminNewChat:null,
    avatar: null,
    naturalSellerStep1:null,
    naturalSellerStep2:null,
    naturalSellerStep3:null,
    legalSellerStep1:null,
    legalSellerStep2:null,
    legalSellerStep3:null,
    legalSellerStep4:null,
  },
  mutations: {
    set_legalSellerStep4(state , obj){
      state.legalSellerStep4 = obj
    },
    set_legalSellerStep3(state , obj){
      state.legalSellerStep3 = obj
    },
    set_legalSellerStep2(state , obj){
      state.legalSellerStep2 = obj
    },
    set_legalSellerStep1(state , obj){
      state.legalSellerStep1 = obj
    },
    set_naturalSellerStep3(state , obj){
      state.naturalSellerStep3 = obj
    },
    set_naturalSellerStep2(state , obj){
      state.naturalSellerStep2 = obj
    },
    set_naturalSellerStep1(state , obj){
      state.naturalSellerStep1 = obj
    },
    set_avatar(state , avatar){
      state.avatar = avatar
    },
    set_adminNewChat(state , user){
      state.adminNewChat = user
    },
    set_massUpdateModal(state , bool){
      state.massUpdateModal = bool
    },
    set_menuNotifications(state , obj){
      state.menuNotifications = obj
    },
    set_progressUpload(state , number){
      state.progressUpload = number
    },
    set_toast(state, form) {
      state.toast = form.toast
      state.toastText = form.toastText
      state.toastStatus = form.toastStatus
    },
    set_confirmModal(state, form) {
      state.confirmForm.confirmModal = form.confirmModal
      state.confirmForm.confirmModalTitle = form.confirmModalTitle
      state.confirmForm.confirmModalText = form.confirmModalText
      state.confirmForm.confirmModalType = form.confirmModalType
      state.confirmForm.confirmModalIcon = form.confirmModalIcon
      state.confirmForm.confirmModalEndpoint = form.confirmModalEndpoint
      state.confirmForm.confirmModalClose = form.confirmModalClose
    }

  },

  actions: {
  },

  getters: {
    get_legalSellerStep4(state ){
     return  state.legalSellerStep4
    },
    get_legalSellerStep3(state){
     return  state.legalSellerStep3
    },
    get_legalSellerStep2(state){
     return  state.legalSellerStep2
    },
    get_legalSellerStep1(state){
     return  state.legalSellerStep1
    },
    get_naturalSellerStep3(state){
     return  state.naturalSellerStep3
    },
    get_naturalSellerStep2(state){
     return  state.naturalSellerStep2
    },
    get_naturalSellerStep1(state){
      return  state.naturalSellerStep1
    },
    get_avatar(state){
      return  state.avatar
    },
    get_adminNewChat(state ){
     return  state.adminNewChat
    },
    get_massUpdateModal(state){
      return   state.massUpdateModal
    },
    get_menuNotifications(state ){
      return state.menuNotifications 
    },
    get_progressUpload(state ){
      return  state.progressUpload
    },
    get_confirmForm(state) {
      return state.confirmForm
    },
    get_toast(state) {
      return state.toast
    },

    get_toastText(state) {
      return state.toastText
    },

    get_toastStatus(state) {
      return state.toastStatus
    }
  }
});
