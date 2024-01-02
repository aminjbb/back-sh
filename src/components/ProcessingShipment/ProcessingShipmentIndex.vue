<template>
<div class="create-product flex-column d-flex vh-100">
    <v-card class="ma-5 br-12 pb-15 flex-grow-1" height="500">
        <div class="d-flex justify-center my-5">
            <span class="t14500">
                پردازش محموله
            </span>
        </div>
        <v-divider></v-divider>
        <v-form
            v-model="valid"
            ref="shipmentId"
            class="pa-15">
            <v-col cols="6">
                <div class="text-right ">
                    <span class="text-gray600 t14500">
                        شناسه محموله
                    </span>
                    <span class="text-error">
                        *
                    </span>
                </div>
                <div>
                    <v-text-field
                        variant="outlined"
                        :rules="rule"
                        v-model="shipmentId" />
                </div>
            </v-col>
        </v-form>
        <footer class="create-warehouse__actions">
            <v-row justify="end" class="pl-10 pt-5">
                <ModalShpsBarCode :shipmentId="shipmentId" class="ml-2"/>
                <ModalDetaiShipment :shipmentId="shipmentId" class="ml-2"/>
                <v-btn
                    :loading="loading"
                    @click="validate()"
                    color="primary500"
                    height="40"
                    rounded
                    class="px-8 mt-1">
                    پردازش
                </v-btn>
            </v-row>
        </footer>
    </v-card>
</div>
</template>

<script>
import ModalDetaiShipment from '@/components/ProcessingShipment/Modal/ModalDetaiShipment.vue'
import ModalShpsBarCode from '@/components/ProcessingShipment/Modal/ModalShpsBarCode.vue'

export default {
    data() {
        return {
            loading: false,
            shipmentId: null,
            rule: [v => !!v || 'این فیلد الزامی است'],
            valid: true
        }
    },
    
    components: {
        ModalDetaiShipment,
        ModalShpsBarCode
    },

    computed: {
        avatar() {
            return this.$store.getters['get_avatar']
        }
    },

    methods: {
        validate() {
            this.$refs.shipmentId.validate()
            setTimeout(() => {
                if (this.valid) this.$router.push(`/processing-shipment/${this.shipmentId}/shps-list`)
            }, 200)
        },
    },
}
</script>
