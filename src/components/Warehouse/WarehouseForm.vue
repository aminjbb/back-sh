<template>
<v-form
    ref="addWarehouse"
    class="create-product__info-form scroller"
    v-model="valid">
    <v-row justify="center" align="center">
        <v-col cols="12">
            <div class="text-center">
                <span class="t14500">ساخت انبار</span>
            </div>
        </v-col>
        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500 text-gray600">
                    نام انبار
                </span>
            </div>
            <v-text-field
                density="compact"
                variant="outlined"
                single-line
                placeholder="نام انبار را وارد نمایید"
                :rules="persianRule"
                v-model="form.name" />
        </v-col>

        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500 text-gray600">
                    نوع انبار
                </span>
            </div>
            <v-select
                multiple
                density="compact"
                variant="outlined"
                single-line
                :rules="rule "
                v-model="form.type"
                :items="warehouseTypes" />
        </v-col>
        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500 text-gray600">
                    ظرفیت Market
                </span>
            </div>
            <v-text-field
                density="compact"
                variant="outlined"
                single-line
                placeholder="ظرفیت را به صورت عدد وارد نمایید   "
                :rules="rule  "
                v-model="form.marketCapacity" />
        </v-col>

        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500 text-gray600">
                    ظرفیت Retail
                </span>
            </div>
            <v-text-field
                density="compact"
                variant="outlined"
                single-line
                placeholder="ظرفیت را به صورت عدد وارد نمایید   "
                :rules="rule  "
                v-model="form.RetailCapacity" />
        </v-col>
        <v-col cols="12">
            <div class="page">
                <NeshanMap
                    ref="myMap"
                    mapKey="web.b7948d6910464e19ac797f017491bb4b"
                    serviceKey="service.766910339dfa43af93c0dbadc0f3023a"
                    :center="form.latLong"
                    :poi="false"
                    :traffic="false"
                    :markers-icon-callback="markersIconCallback"
                    :zoom="15"
                    :state="state" />
            </div>
        </v-col>
        <v-col cols="12">
            <div class="text-right my-5">
                <span class="t14500">
                    آدرس انبار
                </span>
            </div>
            <v-text-field
                placeholder="آدرس انبار را وارد نمایید"
                single-line
                clearable
                density="compact"
                variant="outlined"
                v-model="form.address"
                :rules="rule" />
        </v-col>

        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500 text-gray600">
                    کد پستی
                </span>
            </div>
            <v-text-field
                placeholder="کد پستی انبار را وارد نمایید"
                single-line
                clearable
                density="compact"
                variant="outlined"
                :rules="postalCodeRule"
                v-model="form.postalCode" />

        </v-col>

        <v-col cols="12" md="6">
            <div class="text-right my-5">
                <span class="t14500 text-gray600">
                    شماره تماس
                </span>
            </div>
            <v-text-field
                placeholder="برای مثال : ۷۷۷۷۷۷۷۷-۰۲۱"
                single-line
                clearable
                density="compact"
                variant="outlined"
                :rules="rule"
                v-model="form.phoneNumber" />
        </v-col>

        <v-col cols="12">
            <v-row>
                <v-col cols="2">
                    <span class="t12500 text-gray500">
                        روز کاری فعال
                    </span>
                    <div>
                        <div
                            class="mt-2"
                            v-for="day in days "
                            :key="`day${day.label}`">
                            <v-checkbox
                                v-model="day.active"
                                :label="day.label"
                                value="1"></v-checkbox>
                        </div>
                    </div>
                </v-col>
                <v-col cols="3">
                    <span class="t12500 text-gray500">
                        شروع
                    </span>
                    <div>
                        <div
                            class="mt-2"
                            v-for="(day , index) in days "
                            :key="`day${day.label}`">
                            <v-text-field
                                :disabled="!day.active"
                                v-model="day.startTime"
                                variant="outlined"
                                placeholder="ساعت شروع کار"
                                :class="`start-input${day.label}`"></v-text-field>
                            <date-picker
                                clearable
                                :custom-input="`.start-input${day.label}`"
                                type="time"
                                v-model="day.startTime" />
                        </div>
                    </div>
                </v-col>
                <v-col cols="3">
                    <span class="t12500 text-gray500">
                        پایان
                    </span>
                    <div>
                        <div
                            class="mt-2"
                            v-for="day in days "
                            :key="`day${day.label}`">
                            <v-text-field
                                :disabled="!day.active"
                                v-model="day.endTime"
                                variant="outlined"
                                placeholder="ساعت پایان کار"
                                :class="`end-input${day.label}`"></v-text-field>
                            <date-picker
                                :min="day.startTime"
                                clearable
                                :custom-input="`.end-input${day.label}`"
                                type="time"
                                v-model="day.endTime" />
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</v-form>
</template>

  
<script>
import {
    watch
} from 'vue'
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";
import ModalUploaderAvatar from '@/components/Public/ModalUploaderAvatar.vue'
import {
    convertDateToJalai
} from "@/assets/js/functions";
import NeshanMap from "@neshan-maps-platform/vue3-openlayers"
import {
    da
} from "vuetify/locale";
export default {

    props: {
        warehouse: null,
        workDays: []
    },
    components: {
        datePicker: VuePersianDatetimePicker,
        ModalUploaderAvatar,
        NeshanMap
    },

    data() {
        return {
            state: null,
            CreateMarkersPointsItem: {
                iconUrl: '@/assets/img/Arrows.svg',
                iconScale: 2,
                text: 'amn',
                isReverseMarker: true
            },
            days: [{
                    label: 'شنبه',
                    value: 'Sat',
                    active: 0,
                    startTime: null,
                    endTime: null
                },
                {
                    label: 'یکشنبه',
                    value: 'Sun',
                    active: 0,
                    startTime: null,
                    endTime: null
                },
                {
                    label: 'دوشنبه',
                    value: 'Mon',
                    active: 0,
                    startTime: null,
                    endTime: null
                },
                {
                    label: 'سه‌شنبه',
                    value: 'Tue',
                    active: 0,
                    startTime: null,
                    endTime: null
                },
                {
                    label: 'چهار‌شنبه',
                    value: 'Wed',
                    active: 0,
                    startTime: null,
                    endTime: null
                },
                {
                    label: 'پنج‌شنبه',
                    value: 'Thu',
                    active: 0,
                    startTime: null,
                    endTime: null
                },
                {
                    label: 'جمعه',
                    value: 'Fri',
                    active: 0,
                    startTime: null,
                    endTime: null
                },
            ],
            warehouseTypes: [{
                    title: 'دریافتی',
                    value: 'receiver'
                },
                {
                    title: 'ارسالی',
                    value: 'sender'
                },

            ],
            form: {
                name: '',
                type: [],
                marketCapacity: '',
                RetailCapacity: '',
                address: '',
                postalCode: '',
                phoneNumber: '',
                latLong: {
                    latitude: 35.745669792668494,
                    longitude: 51.35438114404677
                },
            },
            rule: [v => !!v || 'این فیلد الزامی است'],
            valid: false,
            persianRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/.test(v) ||
                "فقط حروف فارسی ",
            ],
            mobileRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                /^(?:(\u0660\u0669[\u0660-\u0669][\u0660-\u0669]{8})|(\u06F0\u06F9[\u06F0-\u06F9][\u06F0-\u06F9]{8})|(09[0-9][0-9]{8}))$/.test(
                    v
                ) || "شماره موبایل معتبر نیست",
            ],
            emailRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                    v
                ) || " ایمیل معتبر نیست",
            ],
            postalCodeRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                /^[0-9]{10}$/.test(
                    v
                ) || "کد پستی معتبر وارد کنید",
            ],
        }
    },

    methods: {
        markersIconCallback(point) {
            setTimeout(() => {
                this.form.latLong.latitude = this.$refs.myMap.state.reverseResult.mapCoords[1]
                this.form.latLong.longitude = this.$refs.myMap.state.reverseResult.mapCoords[0]
                this.form.address = this.$refs.myMap.state.reverseResult.formatted_address
            }, 1000)
            return {
                src: "https://img.icons8.com/fluency/344/find-clinic.png",
                iconScale: 0.09

            }

        },
        /**
         * Get image id
         * @param {*} url
         */
        getAvatar(url) {
            this.form.avatar = url
        },

        /**
         * Set from
         */
        setForm() {
            try {
                this.form.name = this.warehouse.name
                this.warehouse.types.forEach(type => {
                    this.form.type.push(type.type)
                })

                this.form.marketCapacity = this.warehouse.market_storage_count
                this.form.RetailCapacity = this.warehouse.retail_storage_count
                this.form.address = this.warehouse.address
                this.form.postalCode = this.warehouse.postal_code
                this.form.phoneNumber = this.warehouse.phone_number
                this.form.latLong.latitude = this.warehouse.lat
                this.form.latLong.longitude = this.warehouse.long
            } catch (error) {}
        },

        setWorkDays() {
            try {
                this.days.forEach((day, index) => {
                    const dayIndex = this.workDays.findIndex(el => el.day == day.value)
                    if (dayIndex != -1) {
                      const startTime = this.workDays[dayIndex].start_time.split(':')
                      const endTime = this.workDays[dayIndex].end_time.split(':')
                        this.days[index].active = '1'
                        this.days[index].startTime = startTime[0] +':' +startTime[1]
                        this.days[index].endTime = endTime[0] +':'+ endTime[1]
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    },
    watch: {
        warehouse(val) {
            this.setForm()
        },
        workDays(val) {
            this.setWorkDays()
        }
    },

}
</script>
  
  
<style>
@import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");
</style>
