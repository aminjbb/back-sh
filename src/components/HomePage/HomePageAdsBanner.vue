<template>
<section class="create-product flex-column d-flex h-100">
    <v-card class="ma-5 br-12 pb-15 flex-grow-1" min-height="500">
        <div class="create-form__info-form scroller">
            <div class="text-right pa-10">
                <span class="t14 w500">
                    دسکتاپ
                </span>
            </div>
            <div>
                <AddAdsBanner
                    :banners="desktopBanner"
                    :max="homeSection?.max"
                    :getHomePageBanner="getHomePageBanner"
                    device="desktop" />
            </div>
            <div class="text-right pa-10">
                <span class="t14 w500">
                    تبلت
                </span>
            </div>
            <div>
                <AddAdsBanner
                    :banners="tabletBanner"
                    :max="homeSection?.max"
                    :getHomePageBanner="getHomePageBanner"
                    device="tablet" />
            </div>
            <div class="text-right pa-10">
                <span class="t14 w500">
                    موبایل
                </span>
            </div>
            <div>
                <AddAdsBanner
                    :banners="mobileBanner"
                    :max="homeSection?.max"
                    :getHomePageBanner="getHomePageBanner"
                    device="mobile" />
            </div>
        </div>

    </v-card>
</section>
</template>

<script>
import Home from '@/composables/Home'
import AddAdsBanner from '@/components/HomePage/Add/AddAdsBanner.vue'
export default {
    components: {
        AddAdsBanner
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
