<template lang="">
    <div />
</template>
<script>
import Export from '@/composables/Export'
export default {
    setup(props) {
        const {getOneExports}  = Export()
        return {getOneExports}
    },

    mounted(){
        this.getOneExports()
    }
}
</script>
