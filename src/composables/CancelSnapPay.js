import {ref} from 'vue';
import {useCookies} from "vue3-cookies";
import {AxiosCall} from "@/assets/js/axios_call";
import { useRoute } from 'vue-router'

export default function setup() {

    const header = ref([
        {name: 'ردیف',title: 'ردیف', show: true, key: 'row', sortable:false, align:'center'},
        {name: 'شناسه سفارش',title: 'شناسه سفارش', show: true, key: 'id', order: true},
        {name: 'شماره سفارش',title: 'شماره سفارش', show: true, key: 'order_number', sortable:false, align:'center'},
        {name: 'نام کاربر',title: 'نام کاربر', show: true, key: 'user', align:'center'},
        {name: 'شماره کاربر',title: 'شماره کاربر', show: true, key: 'mobile_number', sortable:false, align:'center'},
        {name: 'تعداد کالا',title: 'تعداد کالا', show: true, key: 'count', sortable:false, align:'center'},
        {name: 'وضعیت سفارش',title: 'وضعیت سفارش', show: true, key: 'order_status', sortable:false, align:'center'},
        {name: 'وضعیت',title: 'وضعیت', show: true, key: 'custom', sortable:false, align:'center'},
        {name: 'روش پرداخت',title: 'روش پرداخت', show: true, key: 'payment', sortable:false, align:'center'},
        {name: ' مبلغ پرداختی',title: ' مبلغ پرداختی', show: true, key: 'paid_price', align:'center'},
        {name: 'وضعیت بارگیری',title: 'وضعیت بارگیری', show: true, key: 'logestic', align:'center', model: 'icon'},
        {name: 'روش ارسال',title: 'روش ارسال', show: true, key: 'sending_method', align:'center'},
        {name: 'تاریخ ثبت سفارش',title: 'تاریخ ثبت سفارش', show: true, key: 'created_at', align:'center'},
        {name: 'عملیات',title: 'عملیات', key:'action', show: true , align:'center', sortable: false, fixed: true},
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
