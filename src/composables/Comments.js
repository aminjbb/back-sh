import {ref} from 'vue';
import {useCookies} from "vue3-cookies";
import {AxiosCall} from "@/assets/js/axios_call";
import { useRoute } from 'vue-router'

export default function setup() {

    const header = ref([
        {name: 'ردیف', title: 'ردیف', show: true, key: 'row', sortable: false, align:'center'},
        {name: 'SKU شناسه', title: 'SKU شناسه', show: true, key: 'sku_id', align:'center'},
        {name: 'نام کالا', title: 'نام کالا', show: true, key: 'label', sortable: false, align:'center'},
        {name: 'امتیاز', title: 'امتیاز', show: true, key: 'score', align:'center'},
        {name: 'برند', title: 'برند', show: true, key: 'brand', sortable: false, align:'center'},
        {name: 'نام کاربر', title: 'نام کاربر', show: true, key: 'user', sortable: false, align:'center'},
        {name: 'شماره کاربر', title: 'شماره کاربر', show: false, key: 'phone_number', sortable: false, align:'center'},
        {name: 'ایمیل کاربر', title: 'ایمیل کاربر', show: false, key: 'email', sortable: false, align:'center'},
        {name: 'نام ادمین ', title: 'نام ادمین ', show: true, key: 'admin', sortable: false, align:'center'},
        {name: ' تاریخ ثبت ', title: ' تاریخ ثبت ', show: true, key: 'created_at', align:'center'},
        {name: ' تاریخ بررسی ', title: ' تاریخ بررسی ', show: true, key: 'updated_at', align:'center'},
        {name: 'وضعیت', title: 'وضعیت', show: true, key: 'custom', align:'center'},
        {name: 'نوع نظر', title: 'نوع نظر', show: true, key: 'type', align:'center'},
        {name: 'عملیات', title: 'عملیات', show: true, align:'center', sortable: false, key:'action', fixed: true},

    ]);

    const headerFakeComment = ref([
        {name: 'ردیف', title: 'ردیف', show: true, key: 'row', sortable: false, align:'center'},
        {name: 'SKU شناسه', title: 'SKU شناسه', show: true, key: 'sku_id', align:'center'},
        {name: 'نام کالا', title: 'نام کالا', show: true, key: 'label', sortable: false, align:'center'},
        {name: 'امتیاز', title: 'امتیاز', show: true, key: 'score', align:'center'},
        {name: 'برند', title: 'برند', show: true, key: 'brand', sortable: false, align:'center'},
        {name: 'نام ادمین ', title: 'نام ادمین ', show: true, key: 'admin', sortable: false, align:'center'},
        {name: ' تاریخ ثبت ', title: ' تاریخ ثبت ', show: true, key: 'created_at', align:'center'},
        {name: 'وضعیت', title: 'وضعیت', show: true, key: 'custom', align:'center'},
        {name: 'عملیات', title: 'عملیات', show: true, align:'center', sortable: false, key:'action', fixed: true}
    ]);

    const filterField = ref([
        {name: 'شناسه SKU', type: 'text', value: 'sku_id'},
        {name: 'نام کالا', type: 'text', value: 'sku_name'},
        {name: 'امتیاز', type: 'select', value: 'score'},
        {name: 'برند', type: 'auto-complete', value: 'brand_id'},
        {name: 'نام کاربر', type: 'auto-complete', value: 'user_id'},
        {name: ' شماره کاربر', type: 'text', value: 'phone_number'},
        {name: ' ایمیل کاربر', type: 'text', value: 'email'},
        {name: 'نام ادمین', type: 'auto-complete', value: 'creator_id'},
        {name: 'تاریخ ثبت', type: 'date', value: 'created_at'},
        {name: 'تاریخ بررسی', type: 'date', value: 'updated_at'},
        {name: 'وضعیت', type:'select', value:'status'},
        {name: 'نوع نظر', type:'select', value:'type'}
    ]);

    const filterFieldFakeComment = ref([
        {name: 'شناسه SKU', type: 'text', value: 'sku_id'},
        {name: 'نام کالا', type: 'text', value: 'sku_name'},
        {name: 'وضعیت', type:'select', value:'status'},
        {name: 'امتیاز', type: 'select', value: 'score'},
        {name: 'برند', type: 'auto-complete', value: 'brand_id'},
        {name: 'نام ادمین', type: 'auto-complete', value: 'creator_id'},
        {name: 'تاریخ ثبت', type: 'date', value: 'created_at'},
    ]);

    const page = ref(1)
    const pageLength = ref(1)
    const dataTableLength = ref(25)
    const loading = ref(false)

    const cookies = useCookies()
    const route = useRoute()

    const fakeCommentData = ref([]);
    const userFakeComment = ref([]);

    /* all comments*/
    /* const CommentList = ref([]);
    async function getAllComments() {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `product/comment/crud/index?per_page=100000`
        let data = await AxiosMethod.axios_get()
        if (data) {
            pageLength.value = Math.ceil(data.data.total / data.data.per_page)
            CommentList.value = data.data.data
            loading.value = false
        }
        else {
        }
    }*/

    /*filter comments*/

    const CommentData = ref([]);
    async function getComments() {

        loading.value = true
        const AxiosMethod = new AxiosCall()
        let query = route.query
        AxiosMethod.using_auth = true

        if ( !route.query.per_page ){
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else {
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                }
            }
        }
        else{
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else{
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value
                }
            }
        }


        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `product/comment/crud/index`
        let res = await AxiosMethod.axios_get()
        if (res) {
            pageLength.value = Math.ceil(res.data.total / res.data.per_page)
            CommentData.value = res.data.data
            loading.value = false
        }
        else {
        }
    }


    /*get comment*/

    const userComment = ref([]);
    async function getComment() {

        loading.value = false
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.end_point = `product/comment/crud/get/`  + this.$route.params.id

        let res = await AxiosMethod.axios_get()
        if (res) {
            userComment.value = res.data
            loading.value = true
        }
        else{
        }
    }

    async function getAllFakeComments() {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        let query = route.query
        AxiosMethod.using_auth = true

        if ( !route.query.per_page ){
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else {
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                }
            }
        }
        else{
            if (!route.query.order && !route.query.order_type){
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value,
                    order:'created_at',
                    order_type:'desc'
                }
            }
            else{
                AxiosMethod.form = {
                    ...query,
                    page:page.value,
                    per_page : dataTableLength.value
                }
            }
        }


        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = `product/comment/crud/fake/index`
        let res = await AxiosMethod.axios_get()
        if (res) {
            pageLength.value = Math.ceil(res.data.total / res.data.per_page)
            fakeCommentData.value = res.data.data
            loading.value = false
        }
    }

    async function getFakeComment() {
        loading.value = false
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        AxiosMethod.end_point = `product/comment/crud/fake/get/`  + this.$route.params.id

        let res = await AxiosMethod.axios_get()
        if (res) {
            userFakeComment.value = res.data
            loading.value = true
        }
    }

    return {
        header,
        filterField,
        page,
        pageLength,
        dataTableLength,
        loading,
        getComments,
        CommentData,
        getComment,
        userComment,
        headerFakeComment,
        filterFieldFakeComment,
        getAllFakeComments,
        fakeCommentData,
        getFakeComment,
        userFakeComment
    }
}

