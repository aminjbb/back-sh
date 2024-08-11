import { ref } from 'vue';

export default function setup() {
    const dataTableLength = ref(25)
    const page = ref(1)
    const pageLength =ref(1)
    const loading = ref(false)

    const header =ref( [
        {name:'ردیف' , show:true, value:null, order:false},
        {name:'کد ارسال قبلی' , show:true, value:'first_name', order:false},
        {name:'کد ارسال جدید' , show:true, value:'last_name', order:false},
        {name:'روش ارسال' , show:true, value:'phone_number', order:false},
        {name:'تاریخ ویرایش' , show:true, value:'last_mod', order:true},
    ])

    const filterField = [
        { name:'کد ارسال قبلی' , type:'text', value:'old_barcode'},
        { name:'کد ارسال جدید' , type: 'text', value:'new_barcode'},
        { name:'روش ارسال' , type: 'text', value:'new_shipment_method'},
        { name: 'تاریخ ویرایش', type:'date', value:'last_mod'},
    ]

    return {
        pageLength,
        filterField,
        dataTableLength,
        page,
        header,
        loading,
    }
}

