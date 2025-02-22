import {
    createStore
} from "vuex";

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
        progressUpload: 0,
        menuNotifications: [],
        massUpdateModal: false,
        adminNewChat: null,
        avatar: null,
        manualOrderStep1: null,
        manualOrderStep2: null,
        naturalSellerStep1: null,
        naturalSellerStep2: null,
        naturalSellerStep3: null,
        legalSellerStep1: null,
        legalSellerStep2: null,
        legalSellerStep3: null,
        legalSellerStep4: null,
        packageId: null,

        shipmentId:null,
        shpsId:null,
        sendingMethod:null,
        orderId: null,
        //seller modals
        transferStockModal: {
            dialog: false,
            id: ''
        },
        orderLimitModal: {
            dialog: false,
            id: ''
        },
        modalPrintOrder: {
            dialog: false,
            id: ''

        },
        
        marketingDiscountModal: {
            dialog: false,
            id: ''
        },
        inventoryManagementModal: {
            dialog: false,
            id: ''
        },
        consumerPriceModal: {
            dialog: false,
            id: ''
        },
        basicDiscountModal: {
            dialog: false,
            id: ''
        },
        homePageBannerModal: {
            dialog: false,
            object: ''
        },
        homePageCategoryModal: {
            dialog: false,
            object: ''
        },
        homePageSectionForSliderModal: {
            dialog: false,
            object: ''
        },
        homePageBrandModal: {
            dialog: false,
            object: ''
        },
        homeBlogModal: {
            dialog: false,
            object: ''
        },
        modalRequestShipment: {
            dialog: false,
            object: ''
        },
        modalRetailShipmentDetail: {
            dialog: false,
            object: ''
        },
        modalRejectRequestShipment: {
            dialog: false,
            object: ''
        },
        modalRejectWithdrawRequest: {
            dialog: false,
            object: ''
        },

        detailModalTest: {
            dialog: false,
            object: ''
        },
        depositDetail: {
            dialog: false,
            object: ''
        },
        detailModalTestQrCode: {
            dialog: false,
            object: ''
        },
        detailModalTestQrCodeFull: {
            dialog: false,
            object: ''
        },
        showDetailsModal: {
            dialog: false,
            id: ''
        },
        marketPlaceDetailModal: {
            dialog: false,
            id: ''
        },
        inventoryReductionModal: {
            dialog: false,
            id: ''
        },
        printModal: {
            dialog: false,
            id: ''
        },

        bulkPrintLabel: {
            dialog: false,
            id: ''
        },
        orderDetailsModal: {
            dialog: false,
            id: ''
        },
        modalLostShpss: {
            dialog: false,
            id: ''

        },
        modalDamageShpss: {
            dialog: false,
            id: ''

        },
        modalWarehouseOrdersFactor: {
            dialog: false,
            object : ''
        },
        orderFactorModal: {
            dialog: false,
            id: ''
        },
        warningTolerance: {
            dialog: false,
            object: ''
        },
        returnedOrderFactorModal: {
            dialog: false,
            id: ''
        },
        returnedOrderDetailsModal: {
            dialog: false,
            id: ''
        },
        openOrderModal:{
            dialog: false,
            object:null
        },
        returnedOrderItems:[],
        packageManagementModal:false,
    },

    mutations: {
        set_packageManagementModal(state , bool){
            state.packageManagementModal = bool
        },
        set_returnedOrderItems(state , object){
            state.returnedOrderItems.push(object)
        },
        set_openOrderModal(state , form){
          state.openOrderModal.dialog = form.dialog
          state.openOrderModal.object = form.object
        },
        set_orderId(state, orderId){
            state.orderId = orderId
        },

        set_sendingMethod(state, sendingMethod){
            state.sendingMethod = sendingMethod
        },
        
        set_shpsId(state, shpsId) {
            state.shpsId = shpsId;
        },

        set_shipmentId(state, shipmentId) {
            state.shipmentId = shipmentId;
        },


        set_packageId(state, packageId) {
            state.packageId = packageId;
        },
        set_modalPrintOrder(state, form){
            state.modalPrintOrder.dialog = form.dialog
            state.modalPrintOrder.object = form.object
        },
        set_warningTolerance(state, form){
            state.warningTolerance.dialog = form.dialog
            state.warningTolerance.object = form.object
        },
        set_modalWarehouseOrdersFactor(state, form) {
            state.modalWarehouseOrdersFactor.dialog = form.dialog
            state.modalWarehouseOrdersFactor.object = form.object
        },
        set_modalDamageShpss(state, form) {
            state.modalDamageShpss.dialog = form.dialog
            state.modalDamageShpss.object = form.object
        },
        set_modalLostShpss(state, form) {
            state.modalLostShpss.dialog = form.dialog
            state.modalLostShpss.object = form.object
        },


        set_bulkPrintLabel(state, form) {
            state.bulkPrintLabel.dialog = form.dialog
            state.bulkPrintLabel.object = form.object
        },
        set_marketPlaceDetailModal(state, form) {
            state.marketPlaceDetailModal.dialog = form.dialog
            state.marketPlaceDetailModal.object = form.object
        },
        set_detailModalTest(state, form) {
            state.detailModalTest.dialog = form.dialog
            state.detailModalTest.object = form.object
        },
        set_depositDetail(state, form) {
            state.depositDetail.dialog = form.dialog
            state.depositDetail.object = form.object
        },
        set_detailModalTestQrCode(state, form) {
            state.detailModalTestQrCode.dialog = form.dialog
            state.detailModalTestQrCode.object = form.object
        },
        set_detailModalTestQrCodeFull(state, form) {
            state.detailModalTestQrCodeFull.dialog = form.dialog
            state.detailModalTestQrCodeFull.object = form.object
        },
        set_modalRejectRequestShipment(state, form) {
            state.modalRejectRequestShipment.dialog = form.dialog
            state.modalRejectRequestShipment.object = form.object
        },
        set_modalRejectWithdrawRequest(state, form) {
            state.modalRejectWithdrawRequest.dialog = form.dialog
            state.modalRejectWithdrawRequest.object = form.object
        },
        set_modalRetailShipmentDetail(state, form) {
            state.modalRetailShipmentDetail.dialog = form.dialog
            state.modalRetailShipmentDetail.object = form.object
        },
        set_modalRequestShipment(state, form) {
            state.modalRequestShipment.dialog = form.dialog
            state.modalRequestShipment.object = form.object
        },
        // set_homeBlogModal(state, form) {
        //     state.homeBlogModal.dialog = form.dialog
        //     state.homeBlogModal.object = form.object
        // },
        set_homePageBrandModal(state, form) {
            state.homePageBrandModal.dialog = form.dialog
            state.homePageBrandModal.object = form.object
        },
        set_homePageSectionForSliderModal(state, form) {
            state.homePageSectionForSliderModal.dialog = form.dialog
            state.homePageSectionForSliderModal.object = form.object
        },
        // set_homePageCategoryModal (state, form) {
        //     state.homePageCategoryModal.dialog = form.dialog
        //     state.homePageCategoryModal.object = form.object
        // },
        // set_homePageBannerModal(state, form) {
        //     state.homePageBannerModal.dialog = form.dialog
        //     state.homePageBannerModal.object = form.object
        // },
        set_legalSellerStep4(state, obj) {
            state.legalSellerStep4 = obj
        },
        set_legalSellerStep3(state, obj) {
            state.legalSellerStep3 = obj
        },
        set_legalSellerStep2(state, obj) {
            state.legalSellerStep2 = obj
        },
        set_legalSellerStep1(state, obj) {
            state.legalSellerStep1 = obj
        },
        set_naturalSellerStep3(state, obj) {
            state.naturalSellerStep3 = obj
        },
        set_naturalSellerStep2(state, obj) {
            state.naturalSellerStep2 = obj
        },
        set_naturalSellerStep1(state, obj) {
            state.naturalSellerStep1 = obj
        },
        set_manualOrderStep1(state, obj) {
            state.manualOrderStep1 = obj
        },
        set_manualOrderStep2(state, obj) {
            state.manualOrderStep2 = obj
        },
        set_avatar(state, avatar) {
            state.avatar = avatar
        },
        set_adminNewChat(state, user) {
            state.adminNewChat = user
        },
        set_massUpdateModal(state, bool) {
            state.massUpdateModal = bool
        },
        set_menuNotifications(state, obj) {
            state.menuNotifications = obj
        },
        set_progressUpload(state, number) {
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
        },
        //seller modals
        set_transferStockModal(state, form) {
            state.transferStockModal.dialog = form.dialog
            state.transferStockModal.id = form.id
        },
        set_orderLimitModal(state, form) {
            state.orderLimitModal.dialog = form.dialog
            state.orderLimitModal.id = form.id
        },
        set_marketingDiscountModal(state, form) {
            state.marketingDiscountModal.dialog = form.dialog
            state.marketingDiscountModal.id = form.id
        },
        set_inventoryManagementModal(state, form) {
            state.inventoryManagementModal.dialog = form.dialog
            state.inventoryManagementModal.id = form.id
        },
        set_consumerPriceModal(state, form) {
            state.consumerPriceModal.dialog = form.dialog
            state.consumerPriceModal.id = form.id
        },
        set_basicDiscountModal(state, form) {
            state.basicDiscountModal.dialog = form.dialog
            state.basicDiscountModal.id = form.id
        },
        set_showDetailsModal(state, form) {
            state.showDetailsModal.dialog = form.dialog
            state.showDetailsModal.id = form.id
        },
        set_inventoryReductionModal(state, form) {
            state.inventoryReductionModal.dialog = form.dialog
            state.inventoryReductionModal.id = form.id
        },
        set_printModal(state, form) {
            state.inventoryReductionModal.dialog = form.dialog
            state.inventoryReductionModal.id = form.id
        },
        set_orderDetailsModal(state, form) {
            state.orderDetailsModal.dialog = form.dialog
            state.orderDetailsModal.id = form.id
        },
        set_orderFactorModal(state, form) {
            state.orderFactorModal.dialog = form.dialog
            state.orderFactorModal.id = form.id
        },
        set_returnedOrderDetailsModal(state, form) {
            state.returnedOrderDetailsModal.dialog = form.dialog
            state.returnedOrderDetailsModal.id = form.id
        },
        set_returnedOrderFactorModal(state, form) {
            state.returnedOrderFactorModal.dialog = form.dialog
            state.returnedOrderFactorModal.id = form.id
        },
    },

    actions: {
        set_returnedOrderItems({state , commit} , object ){
            const findObject = state.returnedOrderItems.find(returnOrder=> returnOrder?.object?.barcode === object.object.barcode)
            if (findObject) findObject.subTitle = object.subTitle
            else commit('set_returnedOrderItems' ,  object)
        }
    },

    getters: {
        get_packageManagementModal(state){
           return  state.packageManagementModal
        },
        get_returnedOrderItems(state) {
          return state.returnedOrderItems
        },
        get_openOrderModal(state){
           return  state.openOrderModal.dialog
        },
        get_openOrderModalObject(state){
           return  state.openOrderModal.object

        },
        get_orderId(state){
            return state.orderId 
         },

        get_sendingMethod(state){
           return state.sendingMethod 
        },
        get_shpsId(state) {
            return state.shpsId;
        },

        get_shipmentId(state) {
            return state.shipmentId;
        },



        get_packageId(state) {
            return state.packageId;
        },
        get_modalPrintOrder(state){
            return  state.modalPrintOrder.dialog
 
         },
         get_modalPrintOrderObject(state){
            return   state.modalPrintOrder.object
 
         },

        get_warningTolerance(state){
           return  state.warningTolerance.dialog

        },
        get_warningToleranceObject(state, form){
           return   state.warningTolerance.object

        },
        get_modalWarehouseOrdersFactor(state) {
            return state.modalWarehouseOrdersFactor.dialog
        },
        get_modalWarehouseOrdersFactorObject(state) {
            return state.modalWarehouseOrdersFactor.object
        },
        get_modalDamageShpss(state) {
            return state.modalDamageShpss.dialog
        },
        get_modalDamageShpssObject(state) {
            return state.modalDamageShpss.object
        },

        get_modalLostShpss(state) {
            return state.modalLostShpss.dialog
        },
        get_modalLostShpssObject(state) {
            return state.modalLostShpss.object
        },

        get_bulkPrintLabel(state) {
            return state.bulkPrintLabel.dialog
        },
        get_bulkPrintLabelObject(state) {
            return state.bulkPrintLabel.object
        },
        get_marketPlaceDetailModal(state) {
            return state.marketPlaceDetailModal.dialog
        },
        get_marketPlaceDetailModalObject(state) {
            return state.marketPlaceDetailModal.object
        },
        get_detailModalTest(state) {
            return state.detailModalTest.dialog
        },
        get_detailModalTestObject(state) {
            return state.detailModalTest.object
        },
        get_depositDetail(state) {
            return state.depositDetail.dialog
        },
        get_depositDetailObject(state) {
            return state.depositDetail.object
        },
        get_detailModalTestQrCode(state) {
            return state.detailModalTestQrCode.dialog
        },
        get_detailModalTestQrCodeObject(state) {
            return state.detailModalTestQrCode.object
        },
        get_detailModalTestQrCodeFull(state) {
            return state.detailModalTestQrCodeFull.dialog
        },
        get_detailModalTestQrCodeFullObject(state) {
            return state.detailModalTestQrCodeFull.object
        },
        get_modalRejectRequestShipment(state) {
            return state.modalRejectRequestShipment.dialog
        },
        get_modalRejectRequestShipmentObject(state) {
            return state.modalRejectRequestShipment.object
        },
        get_modalRejectWithdrawRequest(state) {
            return state.modalRejectWithdrawRequest.dialog
        },
        get_modalRejectWithdrawRequestObject(state) {
            return state.modalRejectWithdrawRequest.object
        },
        get_modalRetailShipmentDetail(state) {
            return state.modalRetailShipmentDetail.dialog
        },
        get_modalRetailShipmentDetailObject(state) {
            return state.modalRetailShipmentDetail.object
        },
        get_modalRequestShipment(state) {
            return state.modalRequestShipment.dialog
        },
        get_modalRequestShipmentObject(state) {
            return state.modalRequestShipment.object
        },
        get_homeBlogModal(state) {
            return state.homeBlogModal.dialog
        },
        get_homeBlogObject(state) {
            return state.homeBlogModal.object
        },
        get_homePageBrandModal(state) {
            return state.homePageBrandModal.dialog
        },
        get_homePageBrandObject(state) {
            return state.homePageBrandModal.object
        },
        get_homePageSectionForSliderModal(state) {
            return state.homePageSectionForSliderModal.dialog
        },
        get_homePageSectionForSliderObject(state) {
            return state.homePageSectionForSliderModal.object
        },
        get_homePageCategoryModal(state) {
            return state.homePageCategoryModal.dialog
        },
        get_homePageCategoryObject(state) {
            return state.homePageCategoryModal.object
        },
        get_homePageBannerModal(state) {
            return state.homePageBannerModal.dialog
        },
        get_homePageBannerObject(state) {
            return state.homePageBannerModal.object
        },
        get_legalSellerStep4(state) {
            return state.legalSellerStep4
        },
        get_legalSellerStep3(state) {
            return state.legalSellerStep3
        },
        get_legalSellerStep2(state) {
            return state.legalSellerStep2
        },
        get_legalSellerStep1(state) {
            return state.legalSellerStep1
        },
        get_naturalSellerStep3(state) {
            return state.naturalSellerStep3
        },
        get_naturalSellerStep2(state) {
            return state.naturalSellerStep2
        },
        get_naturalSellerStep1(state) {
            return state.naturalSellerStep1
        },
        get_manualOrderStep1(state) {
            return state.manualOrderStep1
        },
        get_manualOrderStep2(state) {
            return state.manualOrderStep2
        },
        get_avatar(state) {
            return state.avatar
        },
        get_adminNewChat(state) {
            return state.adminNewChat
        },
        get_massUpdateModal(state) {
            return state.massUpdateModal
        },
        get_menuNotifications(state) {
            return state.menuNotifications
        },
        get_progressUpload(state) {
            return state.progressUpload
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
        },
        //seller modals
        get_transferStockModal(state) {
            return state.transferStockModal
        },
        get_orderLimitModal(state) {
            return state.orderLimitModal
        },
        get_marketingDiscountModal(state) {
            return state.marketingDiscountModal
        },
        get_inventoryManagementModal(state) {
            return state.inventoryManagementModal
        },
        get_consumerPriceModal(state) {
            return state.consumerPriceModal
        },
        get_basicDiscountModal(state) {
            return state.basicDiscountModal
        },
        get_showDetailsModal(state) {
            return state.showDetailsModal
        },
        get_inventoryReductionModal(state) {
            return state.inventoryReductionModal
        },
        get_printModal(state) {
            return state.inventoryReductionModal
        },
        get_orderDetailsModal(state) {
            return state.orderDetailsModal
        },
        get_orderFactorModal(state) {
            return state.orderFactorModal
        },
        get_returnedOrderDetailsModal(state) {
            return state.returnedOrderDetailsModal
        },
        get_returnedOrderFactorModal(state) {
            return state.returnedOrderFactorModal
        }
    }
});