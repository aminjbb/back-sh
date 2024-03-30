<template >
    <div>
        <div class="text-center mb-5">
            <span class="t14500">
                مقادیر ویژگی
            </span>
        </div>
        <v-row 
            justify="center" 
            align="center" 
            class="px-15 mx-15"
        >
            <v-col cols="12" md="6">
                <v-text-field
                    :loading="loading"
                    density="compact"
                    variant="outlined"
                    single-line
                    hide-details
                    :label="' متن ویژگی ' + attrValueLength "
                    v-model="value"
                    @keyup.enter="addValues()"
                >
                    <template v-slot:prepend-inner>
                        <v-btn @click="addValues()" width="32" height="32" rounded color="success" min-width="10" small>
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                    </template>
                </v-text-field>
            </v-col>
        </v-row>

        <div class="pa-5">
            <v-divider />
        </div>

        <div class="text-center" >
            <div>
                <span class="t14500">
                مقادیر ویژگی
                </span>
            </div>

            <div class="pa-5 px-15">
                <v-divider />
            </div>

            <v-chip 
                v-for="(item, index) in values" 
                :key="index"
                class="ma-2 p-2"
            >
                <v-icon 
                    @click="removeValue(item)"
                    size="15"
                    start
                    icon="mdi-close" 
                />

                <span class=t14300>
                    {{item}}
                </span>
          </v-chip>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        attributeId: null,
        attributeValues: [],
        type: null,
        skuType:''
    },

    data() {
        return {
            values: new Set(),
            attributeValuesForModal: [],
            value: '',
            loading: false
        }
    },

    methods: {
        /**
         * Remove value
         * @param {*} value 
         */
        removeValue(value) {
            this.values.delete(value);
        },

        /**
         * Add value
         */
        addValues() {
            if (this.value) {
                this.values.add(this.value)
                this.value = ''
            }
        },

        /**
         * Set values
         * @param {*} element 
         */
        setValues(element) {
            const form = {
                id: element.id,
                value: element.value
            }
            this.attributeValuesForModal.push(form)
            this.values.add(element.value)
        },
      /**
         * Set values
         * @param {*} element
         */
      setValuesFromSku(element) {
        const form = {
                id: element.id,
                value: element.title
            }
        this.attributeValuesForModal.push(form)
            this.values.add(element.title)
        }
    },

    computed: {
        /**
         * Get atts value length
         */
        attrValueLength() {
            try {
                return this.values.size + 1
            } catch (error) {
                return 1
            }
        }
    },
    
    watch: {
        attributeValues() {
          if (this.skuType === 'updateFromSku'){
            this.attributeValues.forEach(element => {
              this.setValuesFromSku(element)
            });
          }
          else if (this.type === 'update') {

                this.attributeValues.forEach(element => {
                    this.setValues(element)
                });
            }
        }
    },

    mounted() {
      if (this.skuType === 'updateFromSku'){
        this.attributeValues.forEach(element => {
          this.setValuesFromSku(element)
        });
      }
      else if (this.type === 'update') {
            this.attributeValues.forEach(element => {
                this.setValues(element)
            });
        }
    },
}
</script>
<style lang="">
    
</style>