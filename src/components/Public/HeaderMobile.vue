<template>
    <div>
        <v-app-bar
            color="gray"
            density="flat"
            elevation="0"
            flat
            height="70"
        >
        <template v-slot:prepend>
          <UserDetail/>
        </template>

        <template v-slot:append>
          <img src="@/assets/img/openMenu.svg" width="24" @click.stop="openSideMenu" alt="shavaz image">
        </template>
      </v-app-bar>
    </div>
</template>

<script>
import Breadcrumb from '@/components/Public/Breadcrumb.vue'
import UserDetail from '@/components/Public/UserDetail.vue'
export default {
    components:{
        Breadcrumb,
        UserDetail
    },

  methods: {
    openSideMenu() {
      this.$emit('sideMenu')
    }
  }
}
</script>
