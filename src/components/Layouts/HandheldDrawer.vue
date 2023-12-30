<template>
  <v-navigation-drawer
      v-model="drawer"
      temporary

  >

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-view-dashboard-outline" title="داشبورد" value="home"></v-list-item>
      <v-list-item prepend-icon="mdi-archive-outline" title="جایگذاری بسته" value="about"></v-list-item>
      <v-list-item prepend-icon="mdi-bookshelf" title="جایگذاری محصولات" value="about"></v-list-item>
      <v-list-item prepend-icon="mdi-shopping-outline" title="جمع آوری کالا" value="about"></v-list-item>
      <v-list-item prepend-icon="mdi-package-variant-closed" title="جایگذاری در جایگاه سورتینگ" value="about"></v-list-item>
      <v-list-item prepend-icon="mdi-package-variant-closed-minus" title="تخلیه جایگاه سورتینگ" value="about"></v-list-item>
      <v-list-item @click="logOut()" prepend-icon="mdi-exit-to-app" title="خروج از حساب کاربری" value="about"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <div class="d-flex justify-center align-center h-100">
    <v-btn
        variant="icon"
        @click.stop="drawer = !drawer"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </div>

</template>

<script>
export default {
  data () {
    return {
      drawer: null,
    }
  },
  methods:{
    logOut(){
      this.$cookies.remove('adminToken')
      this.$router.push('/login')
    }
  }
}
</script>