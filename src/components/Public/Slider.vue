<template>
    <div 
        v-if="items && items.length"
        class="slider pb-5"
    >
        <v-carousel 
            next-icon="mdi-chevron-left"
            prev-icon="mdi-chevron-right"
            :hide-delimiters="hideDelimiters"
            :height="height"
        >
            <template v-for="(item, index) in items">
                <v-carousel-item 
                    v-if="(index + 1) % columns === 1 || columns === 1"
                    :key="index"
                >
                    <v-row
                        class="flex-nowrap"
                        style="height:100%"
                    >
                        <template v-for="(n, i) in columns">
                            <template v-if="(+index + i) < items.length">
                                <v-col :key="i" :style="`flex: 0 0 ${itemsWidth}`">
                                    <v-sheet
                                        v-if="(+index + i) < items.length"
                                        height="100%"
                                        class="d-flex flex-column align-center justify-center"
                                    >
                                        <div class="slider__item" :class="bordered ? 'slider__bordered' : ''">
                                            <v-img
                                                height="100%"
                                                contain :src="items[+index + i].image_url"
                                            />
                                        </div>
                                    </v-sheet>
                                </v-col>
                            </template>
                        </template>
                    </v-row>
                </v-carousel-item>
            </template>
        </v-carousel>
    </div>
</template>
<script>
export default {
    props: {
        /**
         * items
         */
        items: Array,

        /**
         * number of cols in each page
         */
        cols: {
            type: Number,
            default: 1,
        },

        /**
         * Slider height
         */
        height: {
            type: String,
            default: '200',
        },

        /**
         * Hide delimiters
         */
        hideDelimiters: {
            type: Boolean,
            default: false,
        },

        bordered:{
            type: Boolean,
            default: false,
        },
    },

    computed: {
        itemsWidth() {
            const width = 100 / this.cols;
            return width + '%';
        },

        columns() {
            return this.cols;
        }
    },

}
</script>