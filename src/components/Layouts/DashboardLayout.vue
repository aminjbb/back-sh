<template>
<div class="menu">
    <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        location="right"
        color="gray">
        <v-row
            justify="start"
            align="center"
            class="pa-5 pt-8">
            <img src="@/assets/img/openMenu.svg" @click.stop="rail = !rail" width="24" class="mb-5 ml-10" alt="shavaz image">

            <img v-if="!rail" src="@/assets/img/shavaz-logo2.png" width="56" class="mb-5 mr-7" alt="shavaz image">
        </v-row>

        <v-list v-model:opened="open">
            <template v-slot:activator />

            <v-list-item active-class="bg-active" to="/">
                <template v-slot:prepend>
                    <img class="ml-5" src="@/assets/img/Dasboard.svg" alt="shavaz image">
                </template>

                <span class="t14500">
                    داشبورد
                </span>
            </v-list-item>

            <v-list-group value="Admins">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" active-class="bg-active">
                        <template v-slot:prepend>
                            <v-icon>mdi-account-multiple</v-icon>
                        </template>

                        <span class="t14500">
                            مدیریت ادمین
                        </span>
                    </v-list-item>
                </template>

                <v-list-item
                    v-for="([title, to, icon], i) in admins"
                    v-bind="props"
                    :key="i"
                    :value="title"
                    :to="to"
                    active-class="bg-active"
                    style="padding-right:16px !important">
                    <template v-slot:prepend>
                        <v-icon size="x-small">{{icon}}</v-icon>
                    </template>

                    <span class="t14500">
                        {{title}}
                    </span>
                </v-list-item>
            </v-list-group>

            <v-list-group value="Products">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" active-class="bg-active">
                        <template v-slot:prepend>
                            <img class="ml-5" src="@/assets/img/ProductIcon.svg" alt="shavaz image">
                        </template>

                        <span class="t14500">
                            محصولات
                        </span>
                    </v-list-item>
                </template>

                <v-list-item
                    v-for="([title, to, icon], i) in products"
                    v-bind="props"
                    :key="i"
                    :value="title"
                    :to="to"
                    active-class="bg-active"
                    style="padding-right:16px !important">
                    <template v-slot:prepend>
                        <v-icon size="x-small">{{icon}}</v-icon>
                    </template>

                    <span class="t14500">
                        {{title}}
                    </span>
                </v-list-item>
            </v-list-group>

            <v-list-item
                v-for="([title, to, icon], index) in menuOption"
                :key="index"
                active-class="bg-active"
                :to="to">
                <template v-slot:prepend>
                    <v-icon>{{icon}}</v-icon>
                </template>

                <span class="t14500">
                    {{title}}
                </span>
            </v-list-item>

            <v-list-group value="warehouse">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" active-class="bg-active">
                        <template v-slot:prepend>
                            <v-icon>mdi-package-variant</v-icon>
                        </template>

                        <span class="t14500">
                            انبار
                        </span>
                    </v-list-item>
                </template>

                <v-list-item
                    v-for="([title, to, icon], i) in warehouse"
                    v-bind="props"
                    :key="i"
                    :value="title"
                    :to="to"
                    active-class="bg-active"
                    style="padding-right:16px !important">
                    <template v-slot:prepend>
                        <v-icon size="x-small">{{icon}}</v-icon>
                    </template>

                    <span class="t14500">
                        {{title}}
                    </span>
                </v-list-item>

            </v-list-group>
            <v-list-group value="marketing">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" active-class="bg-active">
                        <template v-slot:prepend>
                            <v-icon>mdi-chart-line</v-icon>
                        </template>

                        <span class="t14500">
                            مارکتینگ
                        </span>
                    </v-list-item>
                </template>

                <v-list-item
                    v-for="([title, to, icon], i) in marketing"
                    v-bind="props"
                    :key="i"
                    :value="title"
                    :to="to"
                    active-class="bg-active"
                    style="padding-right:16px !important">
                    <template v-slot:prepend>
                        <v-icon size="x-small">{{icon}}</v-icon>
                    </template>

                    <span class="t14500">
                        {{title}}
                    </span>
                </v-list-item>

            </v-list-group>
            <v-list-group value="commerce">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" active-class="bg-active">
                        <template v-slot:prepend>
                            <v-icon>mdi-cart-outline</v-icon>
                        </template>

                        <span class="t14500">
                            بازرگانی
                        </span>
                    </v-list-item>
                </template>

                <v-list-item
                    v-for="([title, to, icon], i) in commerce"
                    v-bind="props"
                    :key="i"
                    :value="title"
                    :to="to"
                    active-class="bg-active"
                    style="padding-right:16px !important">
                    <template v-slot:prepend>
                        <v-icon size="x-small">{{icon}}</v-icon>
                    </template>

                    <span class="t14500">
                        {{title}}
                    </span>
                </v-list-item>

            </v-list-group>

            <v-list-group value="setting">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" active-class="bg-active">
                        <template v-slot:prepend>
                            <v-icon>mdi-cog</v-icon>
                        </template>

                        <span class="t14500">
                            تنظیمات
                        </span>
                    </v-list-item>
                </template>

                <v-list-item
                    v-for="([title, to, icon], i) in setting"
                    v-bind="props"
                    :key="i"
                    :value="title"
                    :to="to"
                    active-class="bg-active"
                    style="padding-right:16px !important">
                    <template v-slot:prepend>
                        <v-icon size="x-small">{{icon}}</v-icon>
                    </template>

                    <span class="t14500">
                        {{title}}
                    </span>
                </v-list-item>

            </v-list-group>

        </v-list>

    </v-navigation-drawer>
</div>
</template>

<script>
export default {
    data() {
        return {
            drawer: true,
            rail: false,
            open: [],
            menuOption: [
                ['درخواست های خروجی', '/exports/index', 'mdi-export'],
                ['پیام ها', '/notifications/index', 'mdi-email-outline'],
                ['تیکت ها', '/ticket/index', 'mdi-forum'],
                ['گفتگو', '/chat', 'mdi-chat'],
                ['مدیریت مشتریان', '/user/index', 'mdi-account-group'],
                ['پرداخت', '/pay/index', 'mdi-credit-card'],
                ['ارسال', '/send/index', 'mdi-truck'],
            ],
            products: [
                ['محصولات', '/product/index', 'mdi-checkbox-blank-circle-outline'],
                ['کالا ها', '/product/get/skus/index', 'mdi-checkbox-blank-circle-outline'],
                ['گروه کالا ها', '/product/get/skugroups/index', 'mdi-checkbox-blank-circle-outline'],
                ['برند', '/brand/index', 'mdi-checkbox-blank-circle-outline'],
                ['دسته بندی', '/categories/index', 'mdi-checkbox-blank-circle-outline'],
                ['رنگ', '/color/index', 'mdi-checkbox-blank-circle-outline'],
                ['ویژگی ها', '/attributes/index', 'mdi-checkbox-blank-circle-outline'],
            ],
            warehouse: [
                ['لیست انبارها', '/warehouse/index', 'mdi-checkbox-blank-circle-outline'],
                ['درخواست انبار ', '/warehouse/create', 'mdi-checkbox-blank-circle-outline'],
                ['مدیریت بسته‌ها', '/package/index', 'mdi-checkbox-blank-circle-outline'],
                ['پردازش محموله', '/processing-shipment/index', 'mdi-checkbox-blank-circle-outline'],
                ['بسته های فعال', '/active-package/index', 'mdi-checkbox-blank-circle-outline'],
                ['مدیریت کارگو', '/cargo-management/index', 'mdi-checkbox-blank-circle-outline'],
                ['مدیریت خودروها', '/vehicle/index', 'mdi-checkbox-blank-circle-outline'],
                ['مدیریت رانندگان ', '/driver-management/index', 'mdi-checkbox-blank-circle-outline'],
                ['مدیریت جایگذاری ', '/placement/index', 'mdi-checkbox-blank-circle-outline'],
                ['موجودی انبار', '/warehouse-inventory/index', 'mdi-checkbox-blank-circle-outline'],
                ['ضایعات و مفقودی', '/waste-and-lost/index', 'mdi-checkbox-blank-circle-outline'],
            ],
            commerce: [
                ['تامین‌کنندگان', '/supplier/index', 'mdi-checkbox-blank-circle-outline'],
                ['فاکتور', '/factor/index', 'mdi-checkbox-blank-circle-outline'],
                ['فروشندگان ', '/seller/index', 'mdi-checkbox-blank-circle-outline'],
                ['محموله‌ها ', '/retail-shipment/index', 'mdi-checkbox-blank-circle-outline'],               
                ['محموله های درخواستی ', '/shipment-requests/index', 'mdi-checkbox-blank-circle-outline'],            
            ],
            admins: [
                ['مدیریت ادمین', '/admin/index', 'mdi-checkbox-blank-circle-outline'],
                ['دسترسی ها', '/permission/index', 'mdi-checkbox-blank-circle-outline'],
                ['مدیریت نقش', '/role-permission/index', 'mdi-checkbox-blank-circle-outline'],
            ],
            setting: [
                ['صفحات', '/page/index', 'mdi-checkbox-blank-circle-outline'],
                ['منو ها', '/menu/index', 'mdi-checkbox-blank-circle-outline'],
                ['صفحه اصلی', '/home-page/index', 'mdi-checkbox-blank-circle-outline'],
            ],
            marketing: [
                ['صفحات پروموشن', '/promotion-page/index', 'mdi-checkbox-blank-circle-outline'],
            ],
        }
    },
}
</script>
