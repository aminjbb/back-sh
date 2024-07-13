<template>
    <v-bottom-sheet v-model="operations" >
        <v-card class="rounded-t-lg px-3 ">

            <div class="d-flex justify-space-between t16500 py-6 mx-3">
                <v-icon   @click="operations = false"  class="bg-grey-lighten-3 rounded-circle" color="grey-darken-1">
                    mdi-close
                </v-icon>
                <span >عملیات</span>
            </div>

            <v-list>
                <v-list-item-title @click="openEdit">
                    <div class="d-flex justify-space-between t12400 my-4">
                        <v-icon>mdi-chevron-left</v-icon>
                        <div>

                            <span class="text-grey-darken-1 me-3">ویرایش</span>
                            <v-icon size="small" >mdi-pencil-box-outline</v-icon>
                        </div>
                    </div>
                </v-list-item-title>

                <v-list-item-title v-for="(item, i) in operationList" :key="i" @click="$router.push(`/voucher/${voucherId}/${item.to}`)"
                >
                    <v-divider/>

                    <div class="d-flex justify-space-between t12400 my-4">
                        <v-icon>mdi-chevron-left</v-icon>

                        <div>
                            <span class="text-grey-darken-1 me-3">{{item.title}}</span>
                            <v-icon size="small">{{item.icon}}</v-icon>
                        </div>
                    </div>
                </v-list-item-title>
            </v-list>
        </v-card>
    </v-bottom-sheet>
</template>

<script>
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";

export default {
    components: {PanelFilter},
    props: {
        voucherId: Number
    },
    data(){
        return {
            operations: false,
            operationList:[
                {title: "نمایش کالاهای تخفیف", icon: "mdi-eye-outline", to: "shps"},
                {title: "نمایش مشتری های تخفیف", icon: "mdi-eye-outline", to: "customer"},
                {title: "سفارش های کد تخفیف", icon: "mdi-text-box-multiple-outline", to: "order"}
            ]
        }
    },
    methods: {
        openEdit(){
            this.operations = false
            this.$emit('openEdit')
        }
    }
}
</script>

