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

            <v-list-item
                v-for="([title, to, icon], index) in groupsFunction"
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

            <v-list-group value="Admins">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" active-class="bg-active">
                        <template v-slot:prepend>
                            <v-icon size="large">mdi-account-box-outline</v-icon>
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

            <v-list-item
                v-for="([title, to, icon], index) in users"
                :key="index"
                active-class="bg-active"
                :to="to">
                <template v-slot:prepend>
                    <v-icon size="large">{{icon}}</v-icon>
                </template>

                <span class="t14500">
                    {{title}}
                </span>
            </v-list-item>

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

            <v-list-group value="orders">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" active-class="bg-active">
                        <template v-slot:prepend>
                            <v-icon>mdi-shopping-outline</v-icon>
                        </template>

                        <span class="t14500">
                            سفارش ها
                        </span>
                    </v-list-item>
                </template>

                <v-list-item
                    v-for="([title, to, icon], i) in orders"
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

            <v-list-group value="support">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" active-class="bg-active">
                        <template v-slot:prepend>
                            <v-icon>mdi-face-agent</v-icon>
                        </template>

                        <span class="t14500">
                            پشتیبانی
                        </span>
                    </v-list-item>
                </template>

                <v-list-item
                    v-for="([title, to, icon], i) in support"
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

            <v-list-group value="withdraw">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" active-class="bg-active">
                <template v-slot:prepend>
                  <v-icon size="large">mdi-account-credit-card-outline</v-icon>
                </template>

                <span class="t14500">
                    مالی
                </span>
              </v-list-item>
            </template>

            <v-list-item
                v-for="([title, to, icon], i) in withdraw"
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
                v-for="([title, to, icon], index) in payment"
                :key="index"
                active-class="bg-active"
                :to="to">
                <template v-slot:prepend>
                    <v-icon size="large">{{icon}}</v-icon>
                </template>

                <span class="t14500">
                    {{title}}
                </span>
            </v-list-item>

            <v-list-item
                v-for="([title, to, icon], index) in sending"
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

            <v-list-group value="setting">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" active-class="bg-active">
                        <template v-slot:prepend>
                            <v-icon>mdi-cog-outline</v-icon>
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

          <v-list-group value="sms">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" active-class="bg-active">
                <template v-slot:prepend>
                  <v-icon>mdi-chart-line</v-icon>
                </template>

                <span class="t14500">
                            پیامک
                        </span>
              </v-list-item>
            </template>

            <v-list-item
                v-for="([title, to, icon], i) in smsNotification"
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

          <v-list-group value="bulk">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" active-class="bg-active">
                <template v-slot:prepend>
                  <v-icon>mdi-file-edit-outline</v-icon>

                </template>

                <span class="t14500">
                                ویرایش گروهی
                            </span>
              </v-list-item>
            </template>

            <v-list-item
                v-for="([title, to, icon], i) in bulkEdit"
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

          <v-list-group value="report">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" active-class="bg-active">
                <template v-slot:prepend>
                  <v-icon>mdi-file-edit-outline</v-icon>

                </template>

                <span class="t14500">
                                گزارشات
                            </span>
              </v-list-item>
            </template>

            <v-list-item
                v-for="([title, to, icon], i) in reports"
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

          <v-list-group value="message">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" active-class="bg-active">
                <template v-slot:prepend>
                  <v-icon>mdi-tooltip-text-outline</v-icon>
                </template>

                <span class="t14500">
                            پیام ها
                        </span>
              </v-list-item>
            </template>

            <v-list-item
                v-for="([title, to, icon], i) in message"
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
                v-for="([title, to, icon], index) in chat"
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

          <v-list-item
              v-for="([title, to, icon], index) in comments"
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
            sending: [
                // ['ارسال', '/send/index', 'mdi-truck-outline'],
            ],
            comments: [
                ['نظرات', '/comment/index', 'mdi-message-reply-text-outline'],
            ],
            chat: [
                ['گفتگو', '/chat', 'mdi-chat-outline'],
            ],
            support: [
                ['کنسل اسنپ پی', '/snap-pay/cancel', 'mdi-checkbox-blank-circle-outline'],
                ['تیکت ها', '/ticket/index', 'mdi-checkbox-blank-circle-outline'],
                ['ساخت رمز', '/change-password/index', 'mdi-checkbox-blank-circle-outline'],
                ['پیگیری سفارشات', '/order-tracking/index', 'mdi-checkbox-blank-circle-outline'],
                ['بازگردانی سفارش', '/warehouse-return-order/index', 'mdi-checkbox-blank-circle-outline'],
            ],
            groupsFunction: [
                ['عملیات گروهی', '/exports/index', 'mdi-export'],
            ],
            users: [
                ['مدیریت کاربران', '/user/index', 'mdi-account-group-outline'],
            ],
            payment: [
                // ['پرداخت', '/pay/index', 'mdi-credit-card-outline'],
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
                ['درخواست انبار ', '/warehouse/create', 'mdi-checkbox-blank-circle-outline'],
                ['لیست انبارها', '/warehouse/index', 'mdi-checkbox-blank-circle-outline'],
                ['مدیریت بسته‌ها', '/package/index', 'mdi-checkbox-blank-circle-outline'],
                ['پردازش محموله', '/processing-shipment/index', 'mdi-checkbox-blank-circle-outline'],
                ['محموله های آتی  ', '/up-coming/index', 'mdi-checkbox-blank-circle-outline'],
                ['اختصاص کالا به بسته', '/assign-shps-package/index', 'mdi-checkbox-blank-circle-outline'],
                ['بسته های فعال', '/active-package/index', 'mdi-checkbox-blank-circle-outline'],
                ['مدیریت کارگو', '/cargo-management/index', 'mdi-checkbox-blank-circle-outline'],
                ['مدیریت خودروها', '/vehicle/index', 'mdi-checkbox-blank-circle-outline'],
                ['مدیریت رانندگان ', '/driver-management/index', 'mdi-checkbox-blank-circle-outline'],
                ['دریافت کارگو', '/cargo-receiving/index', 'mdi-checkbox-blank-circle-outline'],
                ['برنامه پیک آپ', '/pick-up-task/index', 'mdi-checkbox-blank-circle-outline'],
                // [' پرینت گروهی اولیه برچسب', '/initial-print-label-bulk/index', 'mdi-checkbox-blank-circle-outline'],
                [' پرینت گروهی برچسب', '/print-label-bulk/index', 'mdi-checkbox-blank-circle-outline'],
                ['مدیریت جایگذاری ', '/placement/index', 'mdi-checkbox-blank-circle-outline'],
                ['جایگذاری بسته', '/package-placement/index', 'mdi-checkbox-blank-circle-outline'],
                ['موجودی انبار', '/warehouse-inventory/index', 'mdi-checkbox-blank-circle-outline'],
                [' بسته بندی سفارش ها', '/order-packaging/index', 'mdi-checkbox-blank-circle-outline'],
                [' پرینت سفارش', '/order-packaging/print-order-label', 'mdi-checkbox-blank-circle-outline'],
                [' پرینت پرچسب', '/print-label/index', 'mdi-checkbox-blank-circle-outline'],
                ['ناحیه بندی انبار', '/zone/index', 'mdi-checkbox-blank-circle-outline'],
                ['سفارش های سورتینگ', '/warehouse-orders/index', 'mdi-checkbox-blank-circle-outline'],
                ['ضایعات', '/wastage/index', 'mdi-checkbox-blank-circle-outline'],
                ['مفقودی', '/lost/index', 'mdi-checkbox-blank-circle-outline'],
                [' تسک های پیک آپ', '/report-bug-task/index', 'mdi-checkbox-blank-circle-outline'],
            ],
            commerce: [
                ['تامین‌کنندگان', '/supplier/index', 'mdi-checkbox-blank-circle-outline'],
                ['فاکتور', '/factor/index', 'mdi-checkbox-blank-circle-outline'],
                ['محموله‌های بازرگانی ', '/retail-shipment/index', 'mdi-checkbox-blank-circle-outline'],
                ['محموله های درخواستی ', '/shipment-requests/index', 'mdi-checkbox-blank-circle-outline'],
                ['فروشندگان ', '/seller/index', 'mdi-checkbox-blank-circle-outline'],
            ],
            admins: [
                ['مدیریت ادمین', '/admin/index', 'mdi-checkbox-blank-circle-outline'],
                ['دسترسی ها', '/permission/index', 'mdi-checkbox-blank-circle-outline'],
                ['مدیریت نقش', '/role-permission/index', 'mdi-checkbox-blank-circle-outline'],
            ],
            setting: [
                ['صفحات', '/page/index', 'mdi-checkbox-blank-circle-outline'],
                ['منو ها', '/menu/index', 'mdi-checkbox-blank-circle-outline'],
                ['پرفروش ترین دسته بندی ها', '/best-selling-categories/index', 'mdi-checkbox-blank-circle-outline'],
                ['صفحه اصلی', '/home-page/index', 'mdi-checkbox-blank-circle-outline'],
                ['متغییر ها', '/system/index', 'mdi-checkbox-blank-circle-outline'],
                ['بنر مناسبتی', '/occasion-banner/index', 'mdi-checkbox-blank-circle-outline'],
            ],
            marketing: [
                ['صفحات پروموشن', '/promotion-page/index', 'mdi-checkbox-blank-circle-outline'],
                ['کد تخفیف', '/voucher/index', 'mdi-checkbox-blank-circle-outline'],
                ['ارسال رایگان', '/free-delivery/index', 'mdi-checkbox-blank-circle-outline'],
                ['گردونه شانس', '/lucky-wheel/index', 'mdi-checkbox-blank-circle-outline'],
            ],
          smsNotification: [
                ['لیست پیامک ها', '/sms-notification/index', 'mdi-checkbox-blank-circle-outline'],
                ['تنظیمات پیامک', '/sms-setting/index', 'mdi-checkbox-blank-circle-outline']
            ],
            orders: [
                ['سفارش های اپراتوری', '/orders/manual-order-list', 'mdi-checkbox-blank-circle-outline'],
                ['لیست سفارش ها', '/orders/index', 'mdi-checkbox-blank-circle-outline'],
                ['کالاهای مرجوعی', '/returned-orders/index', 'mdi-checkbox-blank-circle-outline'],
            ],
            bulkEdit: [
                ['ویرایش shps', '/bulk_edit/index', 'mdi-checkbox-blank-circle-outline'],
            ],
            reports: [
              ['داشبورد بازرگانی', '/reports/commercial', 'mdi-checkbox-blank-circle-outline'],
            ],
            withdraw: [
                ['درخواست واریز', '/withdraw-request/index', 'mdi-checkbox-blank-circle-outline'],
                [' تراکنش ها', '/wallet/index', 'mdi-checkbox-blank-circle-outline'],
            ],
            message: [
                ['پیام های کاربران', '/contact-us/index', 'mdi-checkbox-blank-circle-outline'],
                ['پیام های سیستمی', '/notifications/index', 'mdi-checkbox-blank-circle-outline'],
            ]

        }
    },
}
</script>
