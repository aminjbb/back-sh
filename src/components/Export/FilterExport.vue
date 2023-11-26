<template>
    <div>
        <v-row
            justify="space-between"
            align="center"
            class="px-5"
            id="filterForm"
        >
            <v-col cols="11">
                <v-row 
                    justify="start"
                    align="center"
                    class="pt-7"
                >
                    <v-col cols="2">
                        <v-select 
                            :items="modelItems" 
                            v-model="model" 
                            variant="solo"
                        />
                    </v-col>

                    <v-col cols="2">
                        <div>
                            <v-text-field
                                class="custom-input"
                                v-model="date"
                                placeholder="تاریخ ساخت"
                                variant="solo"
                            />
                            
                            <date-picker  
                                range
                                clearable
                                custom-input=".custom-input"
                                format="jYYYY-jMM-jDD"
                                display-format="jYYYY-jMM-jDD" 
                                v-model="date"
                                variant="outlined"
                            />
                        </div>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="1">
                <v-btn
                    @click="filter()"
                    variant="outlined"
                    rounded class="px-3 mt-1 mr-4"
                >
                    <template v-slot:prepend>
                        <img src="@/assets/img/Fillter.svg" alt="shavaz image">
                      </template>
                      فیلتر
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
//Mixin
import { PanelFilter } from '@/assets/js/filter'
import { jalaliToGregorian } from '@/assets/js/functions'

export default {
    data() {
        return {
            date: [],
            modelItems: [{ title: 'کتگوری', value: 'category' }, { title: 'برند', value: 'brand' }],
            model: null,
            PanelFilter: new PanelFilter()
        }
    },

    methods: {
        /**
         * Cahnge data
         * @param {*} date 
         */
        changeDate(date) {
            const splitDate = date.split('-')
            const finaldate = jalaliToGregorian(splitDate[0], splitDate[1], splitDate[2])
            return finaldate
        },
        
        /**
         * Filter data
         */
        filter() {
            if (this.date.length > 1) {
                this.PanelFilter.created_at_from_date = this.changeDate(this.date[0])
                this.PanelFilter.created_at_to_date = this.changeDate(this.date[1])
            }
            this.PanelFilter.model = this.model
            const query = this.PanelFilter.query_maker()
            this.$router.push('/exports/index' + query)
        }
    }
}
</script>
