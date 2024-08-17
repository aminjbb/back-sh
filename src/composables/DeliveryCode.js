import { ref } from 'vue';

export default function setup() {
    const dataTableLength = ref(25)
    const page = ref(1)
    const pageLength =ref(1)
    const loading = ref(false)

    const header =ref( [
        {name:'ردیف' , title:'ردیف' , show:true, key:'row', sortable: false, align:'center'},
        {name:'کد ارسال قبلی' , title:'کد ارسال قبلی' , show:true, key:'old_barcode', sortable: false, align:'center'},
        {name:'کد ارسال جدید' , title:'کد ارسال جدید' , show:true, key:'new_barcode', sortable: false, align:'center'},
        {name:'روش ارسال' , title:'روش ارسال' , show:true, key:'new_sending_method', sortable: false, align:'center'},
        {name:'تاریخ ویرایش' , title:'تاریخ ویرایش' , show:true, key:'last_mod', sortable: false, align:'center'},
        {name: 'عملیات',title: 'عملیات', show: true, align:'center', sortable: false, key:'action',minWidth:'50', fixed: true}
    ])

    const filterField = [
        { name:'کد ارسال قبلی' , type:'text', value:'old_barcode'},
        { name:'کد ارسال جدید' , type: 'text', value:'new_barcode'},
        { name:'روش ارسال' , type: 'text', value:'new_sending_method'},
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

