import {ref} from 'vue';
import {useCookies} from "vue3-cookies";
import {AxiosCall} from "@/assets/js/axios_call";
import { useRoute } from 'vue-router'

export default function setup() {

    const header = ref([
        {name: 'ردیف', show: true, value: null, order: false},
        {name: ' SKU شناسه', show: true, value: 'id', order: true},
        {name: 'نام کالا', show: true, value: 'label', order: false},
        {name: 'امتیاز', show: true, value: 'score', order: true},
        {name: 'برند', show: true, value: 'brand', order: false},
        {name: 'نام کاربر', show: true, value: 'user', order: false},
        {name: 'شماره کاربر', show: false, value: 'phone_number', order: false},
        {name: 'ایمیل کاربر', show: false, value: 'email', order: false},
        {name: 'نام ادمین ', show: true, value: 'admin', order: false},
        {name: ' تاریخ ثبت ', show: true, value: 'created_at', order: true},
        {name: ' تاریخ بررسی ', show: true, value: 'updated_at', order: true},
        {name: 'وضعیت', show: true, value: 'status', order: true},
    ]);

    const filterField = ref([
        {name: 'شناسه SKU', type: 'text', value: 'sku_id'},
        {name: 'نام کالا', type: 'text', value: 'sku_name'},
        {name: 'وضعیت', type:'select', value:'status'},
        {name: 'امتیاز', type: 'select', value: 'score'},
        {name: 'برند', type: 'auto-complete', value: 'brand_id'},
        {name: 'نام کاربر', type: 'auto-complete', value: 'user_id'},
        {name: ' شماره کاربر', type: 'text', value: 'phone_number'},
        {name: ' ایمیل کاربر', type: 'text', value: 'email'},
        {name: 'نام ادمین', type: 'auto-complete', value: 'creator_id'},
        {name: 'تاریخ ثبت', type: 'date', value: 'created_at'},
        {name: 'تاریخ بررسی', type: 'date', value: 'updated_at'},
    ]);

    const page = ref(1)
    const pageLength = ref(1)
    const dataTableLength = ref(25)
    const loading = ref(false)

    const cookies = useCookies()
    const route = useRoute()

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

    return {header, filterField, page, pageLength, dataTableLength, loading, getComments, CommentData, getComment, userComment}
}
