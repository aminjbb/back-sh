import {ref} from "vue";

export default function setup() {
   const header =ref( [
       { name: 'ردیف', show: true , value:null, order:false},
       { name: 'شناسه سفارش', show: true , value:'id', order: false},
       { name: 'شماره سفارش', show: true , value:'order_number', order: false},
       { name: 'نام کاربر', show: true, value:'user' , order: false},
       { name: 'شماره کاربر', show: true, value:'phone_number' , order: false},
       { name: 'تعداد کالا', show: true , value:'shps_count', order: false},
       { name: 'وضعیت سفارش', show: true, value:'status', order: false },
       { name: 'مبلغ پرداختی', show: true, value:'paid_price', order: false },
       { name: 'وضعیت بارگیری', show: true, value:'packed_status', order: false },
       { name: 'روش ارسال', show: true, value:'shipping_method', order: false },
       { name: 'تاریخ ثبت سفارش', show: true, value:'submit_date', order: true },
    ])
   const page = ref(1)
    const dataTableLength = ref(25)
    const pageLength = ref(1)
    const loading = ref(false)
    const manualOrderList = ref([])

    return {header, page, dataTableLength, pageLength, loading, manualOrderList}
}