import { ref } from 'vue';
import { AxiosCall } from '@/assets/js/axios_call.js'
import { useCookies } from "vue3-cookies";
import {useStore} from 'vuex'
import { openToast } from "@/assets/js/functions";

export default function setup() {
    const orderDetails = ref([]);
    const cookies = useCookies()
    const store = useStore()

    const header =ref([
        {name: 'ردیف', title: 'ردیف', show: true , key:'row',align:'center', sortable: false},
        {name: 'شناسه سفارش', title: 'شناسه سفارش', show: true , key:'order_id', align:'center', sortable: false},
        {name: 'شماره سفارش', title: 'شماره سفارش', show: true , key:'order_number', align:'center', sortable: false},
        {name: 'وضعیت سفارش', title: 'وضعیت سفارش', show: true, key:'order_status', align:'center', sortable: false},
        {name: 'عملیات',title: 'عملیات', key:'show', show: true , align:'center', sortable: false},
    ]);


    const loading = ref(false)

    async function getUserOrders(user) {
        const AxiosMethod = new AxiosCall();
        const formData = new FormData()

        if(user.first_name !== null || user.last_name !== null){
            if(user.first_name !== null && user.last_name !== null){
                formData.append('first_name' , user.first_name)
                formData.append('last_name' , user.last_name)

                AxiosMethod.using_auth = true
                AxiosMethod.form = formData
                AxiosMethod.toast_error = true
                AxiosMethod.token = cookies.cookies.get('adminToken');
                AxiosMethod.end_point = `admin/order/crud/track-user-orders`;
                let data = await AxiosMethod.axios_post();
                if (data){
                    orderDetails.value = data.data
                }
            }else{
                openToast(
                    store,
                    ' نام و نام خانوادگی الزامی است.',
                    "error")
            }
        }
        else{
            if(user.order_id !== null){
                formData.append('order_id' , user.order_id)
            }
            else if(user.order_number !== null){
                formData.append('order_number' , user.order_number)
            }
            else if(user.phone_number !== null){
                formData.append('phone_number' , user.phone_number)
            }

            AxiosMethod.using_auth = true
            AxiosMethod.form = formData
            AxiosMethod.toast_error = true
            AxiosMethod.token = cookies.cookies.get('adminToken');
            AxiosMethod.end_point = `admin/order/crud/track-user-orders`;
            let data = await AxiosMethod.axios_post();
            if (data){
                orderDetails.value = data.data
            }
            
        }
        

    }

    return {getUserOrders, loading, orderDetails, header}
}
