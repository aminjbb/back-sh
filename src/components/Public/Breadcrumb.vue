<template>
<div>
    <v-breadcrumbs :items="breadcrumbsItems">
        <template v-slot:divider>
            <img class="mt-2" src="@/assets/img/Arrows.svg" alt="shavaz image">
        </template>
    </v-breadcrumbs>
</div>
</template>

<script>
export default {
    computed: {
        breadcrumbsItems() {
            try {
                const itemsArray = [];
                this.$route.matched.forEach(element => {
                    const itemForm = {
                        title: element.meta.name,
                        disabled: false,
                        href: '',
                    }
                    itemsArray.push(itemForm);
                });
                const itemsArrayReversed = itemsArray.reverse();
                return itemsArrayReversed;
            } catch (e) {

            }
        }
    },
}
</script>
