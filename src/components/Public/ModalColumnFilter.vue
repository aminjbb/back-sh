<template>
    <div class="text-center">

        <v-btn
            @click="dialog = true"
            variant="outlined"
            rounded
            class="px-3 mt-1"
        >
            <template v-slot:prepend>
                <img src="@/assets/img/Setting.svg" alt="shavaz image">
            </template>
            ستون ها
        </v-btn>

        <v-dialog
            v-if="dialog"
            v-model="dialog"
            width="468"
        >
            <v-card>
                <v-row
                    justify="center"
                    align="center"
                    class="px-5 pt-5 pb-3"
                >
                    <v-col cols="1">
                        <v-btn @click="dialog = false" variant="icon">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>

                    <v-col cols="10">
                        <div class="text-center pr-5">
                            <span class="t14500">
                                تنظیمات ستون های جدول
                            </span>
                        </div>
                    </v-col>
                </v-row>
                <div class="mt-3 mb-8  px-5">
                    <v-divider/>
                </div>

                <div>
                    <v-row
                        justify="center"
                        align="center"
                        class="px-10"
                    >
                        <template v-for="(head, index) in header" :key="index">
                            <v-col cols="2">
                                <div class="text-right">
                                    <v-switch
                                        v-model="active[index]"
                                        inset
                                        color="success"
                                        @change="changeHeaderShow(index,active[index])"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="10">
                                <div class="text-right">
                                    <span class=t14500>
                                        {{ head.name }}
                                    </span>
                                </div>
                            </v-col>
                        </template>
                    </v-row>
                </div>

                <div class="mt-3 mb-5  px-5">
                    <v-divider/>
                </div>
                <v-row
                    justify="center"
                    align="center"
                    class="px-5 pb-2 pt-1"
                >
                    <v-col cols="6">
                        <v-btn
                            @click="deleteFilters()"
                            variant="text"
                            height="40"
                            rounded
                            class="px-5 mt-1 mr-5"
                        >
                            حذف همه فیلترها
                        </v-btn>
                    </v-col>

                    <v-col cols="6">
                        <div class="text-right">
                            <v-btn
                                @click="dialog = false"
                                color="primary500"
                                height="40"
                                rounded
                                class="px-5 mt-1 mr-5"
                            >
                                نمایش
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    props: {
        header: [],
        changeHeaderShow: {type: Function},
    },

    data() {
        return {
            dialog: false,
            categoryName: '',
            label: '',
            active: [],
        }
    },

    mounted() {
        this.header.forEach(element => {
            this.active.push(element.show)
        });
    },

    methods: {
        /**
         * Delete filters
         */
        deleteFilters() {
            for (const key in this.active) {
                if (Object.hasOwnProperty.call(this.active, key)) {
                    this.active[key] = true;
                }
                this.changeHeaderShow(key, true);
            }
            this.dialog = false;
        },
    },
}
</script>
