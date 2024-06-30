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
        { name: 'ردیف', show: true , value:null, order:false},
        { name: 'شناسه سفارش', show: true , value:'order_id', order: false},
        { name: 'شماره سفارش', show: true , value:'order_number', order: false},
        { name: 'وضعیت سفارش', show: true, value:'order_status' , order: false},
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
