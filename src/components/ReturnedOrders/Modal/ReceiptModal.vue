<template>
<div class="receipt-image text-center">
    <a @click="dialog = true" class="pointer">
        <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
    </a>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        width="468">
        <v-card class="receipt-image__main px-2 pt-4 pb-2">
            <v-btn
                @click="dialog = false"
                variant="icon"
                class="receipt-image__icon">
                <v-icon>mdi-close</v-icon>
            </v-btn>

            <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    props: {
        imageAddress: String
    },

    data() {
        return {
            dialog: false,
        }
    },
}
</script>

<style lang="scss">
.receipt-image {
    a {
        border-radius: 8px;
        border: 1px solid var(--Gray-300, #E0E0E0);
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        padding: 5px;
    }

    img {
        width: 100%;
        max-height: 100%;
        height: auto;
    }

    &__icon {
        position: absolute !important;
        top: 0;
        left: 0;

        .v-btn__content {
            background: #E0E0E0 !important;
            border-radius: 50%;
            padding: 3px;
        }
    }
}
</style>
