<template>
<section class="create-product flex-column d-flex h-100">
    <v-card class="mx-5 br-12 py-5" height="250">
        <v-row
            justify="center"
            align="center"
            class="px-10 ">
            <v-col cols="11">
                <div class="text-right mb-2">
                    عنوان
                    <span class="text-error">
                        *
                    </span>
                </div>
                <div class="mb-4">
                    <v-text-field
                        v-model="title"
                        variant="outlined"
                        placeholder="عنوان نمایشی را وارد نمایید" />
                </div>
            </v-col>

            <v-col cols="1">
                <v-row justify="end">
                    <v-btn
                        :loading="editLoading"
                        @click="editSection()"
                        color="primary500"
                        height="40"
                        rounded
                        class="px-8 mt-1">

                        تایید
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
    <v-card class="ma-5 br-12 pb-15 flex-grow-1" min-height="500">
        <div class="create-form__info-form scroller">
            <div class="text-right pa-10">
                <span class="t14500">
                    دسکتاپ
                </span>
            </div>
            <div>
                <AddAdsBanner
                    :banners="desktopBanner"
                    :max="homeSection?.max"
                    device="desktop" />
            </div>
            <div class="text-right pa-10">
                <span class="t14500">
                    تبلت
                </span>
            </div>
            <div>
                <AddAdsBanner
                    :banners="tabletBanner"
                    :max="homeSection?.max"
                    device="tablet" />
            </div>
            <div class="text-right pa-10">
                <span class="t14500">
                    موبایل
                </span>
            </div>
            <div>
                <AddAdsBanner
                    :banners="mobileBanner"
                    :max="homeSection?.max"
                    device="mobile" />
            </div>
        </div>

    </v-card>
</section>
</template>

<script>
import Home from '@/composables/Home'
import AddAdsBanner from '@/components/HomePage/Add/AddAdsBanner.vue'
import {
    AxiosCall
} from "@/assets/js/axios_call";
export default {
    data() {
        return {
            title: '',
            editLoading: false
        }
    },
    components: {
        AddAdsBanner
    },
    watch: {
        homeSection(val) {
            this.title = val.label
        },
    },
    methods: {
        async editSection() {
            this.editLoading = true
            let formData = new FormData();
            const AxiosMethod = new AxiosCall()
            AxiosMethod.end_point = `page/home/section/crud/update/${this.$route.params.sectionId}`

            formData.append('label', this.title)
            AxiosMethod.form = formData
            AxiosMethod.store = this.$store
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            let data = await AxiosMethod.axios_post()
            if (data) {
                this.editLoading = false
                this.dialog = false
            } else {
                this.editLoading = false
            }

        },
    },
    setup() {
        const {
            getHomeSection,
            homeSection,
            getHomePageBanner,
            homePageBanner
        } = new Home()
        return {
            getHomeSection,
            homeSection,
            getHomePageBanner,
            homePageBanner
        }
    },
    mounted() {
        this.getHomeSection()
        this.getHomePageBanner()
    },
    computed: {
        banners() {
            return this.homePageBanner ?.data
        },
        desktopBanner() {
            try {
                const banners = this.banners.filter(el => el.device == 'desktop')
                return banners
            } catch (e) {
                return []
            }
        },

        tabletBanner() {
            try {
                const banners = this.banners.filter(el => el.device == 'tablet')
                return banners
            } catch (e) {
                return []
            }
        },
        mobileBanner() {
            try {
                const banners = this.banners.filter(el => el.device == 'mobile')
                return banners
            } catch (e) {
                return []
            }
        }
    }
}
</script>
