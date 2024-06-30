<template>
<v-dialog v-model="dialog" width="1000px">
    <v-card class="pa-5 ">
        <v-expansion-panels class="accordion" variant="inset">
            <v-expansion-panel>
                <v-expansion-panel-title class="accordion__header">
                    <span>
                        اطلاعات مشتری
                    </span>
                </v-expansion-panel-title>

                <v-expansion-panel-text class="accordion__items__content">
                    <div class="simple-table-parent">
                        <div class="simple-table ">
                            <v-row class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">نام و نام خانوادگی</v-col>
                                <v-col col="6" class="pa-0 number-font">{{ data.first_name }} {{ data.last_name }}</v-col>
                            </v-row>

                            <v-row class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">شناسه کاربری</v-col>
                                <v-col col="6" class="pa-0 number-font">{{ data.id }}</v-col>
                            </v-row>

                            <v-row class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">شماره تماس</v-col>
                                <v-col col="6" class="pa-0 number-font">{{ data.phone_number }}</v-col>
                            </v-row>

                            <v-row class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">آدرس</v-col>
                                <v-col col="6" class="pa-0 number-font">{{ data.addresses }}</v-col>
                            </v-row>

                            <v-row class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">تعداد سفارشات مشتری</v-col>
                                <v-col col="6" class="pa-0 number-font">{{ data.order_count }}</v-col>
                            </v-row>

                            <v-row class="ma-0 d--rtl">
                                <v-col col="6" class="pa-0">آخرین زمان سفارش مشتری</v-col>
                                <v-col col="6" class="pa-0 number-font">{{ data.last_order_date }}</v-col>
                            </v-row>
                        </div>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title class="accordion__header">
                    <span>
                        نظرات مشتری
                    </span>
                </v-expansion-panel-title>

                <v-expansion-panel-text class="accordion__items__content">
                    <div class="simple-table-parent">
                        <div class="simple-table">
                            <v-row v-for="(item,index) in data?.comments" :key="`comments-${index}`" class="ma-0 d--rtl">
                                <v-col cols="4" class="pa-0">{{ item.sku_label }}</v-col>
                                <v-col cols="8" class="pa-0 number-font">{{ item.comment }}</v-col>
                            </v-row>
                        </div>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title class="accordion__header">
                    <span>
                        تیکت های مشتری
                    </span>
                </v-expansion-panel-title>

                <v-expansion-panel-text class="accordion__items__content">
                    <div class="simple-table-parent">
                        <div class="simple-table">
                            <v-row v-for="(item,index) in data?.tickets" :key="`ticket-${index}`" class="ma-0 d--rtl">
                                <v-col cols="4" class="pa-0">{{ item.title }}</v-col>
                                <v-col cols="8" class="pa-0 number-font">{{ item.content }}</v-col>
                            </v-row>
                        </div>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</v-dialog>
</template>
    
<script>
export default {
    data() {
        return {
            dialog: false,
        }
    },
    props: {
        data: Array
    }
}
</script>
    
    
<style>
.v-expansion-panels--variant-inset>.v-expansion-panel--active {
    max-width: 100% !important;
}

.v-expansion-panel-title--active>.v-expansion-panel-title__overlay {
    background: #FCE4EC !important;
    opacity: 1 !important;
}

.accordion__header span {
    z-index: 1 !important;
}

.v-expansion-panel-title {
    min-height: 56px !important;
}

.v-expansion-panels {
    overflow-y: auto !important;
}
</style>
