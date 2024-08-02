import {ref} from 'vue';
import {useCookies} from "vue3-cookies";
import {AxiosCall} from "@/assets/js/axios_call";
import { useRoute } from 'vue-router'

export default function setup() {

    const header = ref([
        {name: 'ردیف', show: true, value: null, order: false},
        {name: 'شناسه سفارش', show: true, value: 'id', order: true},
        {name: 'شماره سفارش', show: true, value: 'order_number', order: false},
        {name: 'نام کاربر', show: true, value: 'user', order: true},
        {name: 'شماره کاربر', show: true, value: 'mobile_number', order: false},
        {name: 'تعداد کالا', show: true, value: 'count', order: false},
        {name: 'وضعیت سفارش', show: true, value: 'order_status', order: false},
        {name: 'وضعیت', show: true, value: 'status', order: false},
        {name: 'روش پرداخت', show: true, value: 'payment', order: false},
        {name: ' مبلغ پرداختی', show: true, value: 'paid_price', order: true},
        {name: 'وضعیت بارگیری', show: true, value: 'logestic', order: true},
        {name: 'روش ارسال', show: true, value: 'sending_method', order: true},
        {name: 'تاریخ ثبت سفارش', show: true, value: 'created_at', order: true},
    ]);

    const loading = ref(false)

    const cookies = useCookies()
    const route = useRoute()


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


    return {header, loading, getComments}
}
