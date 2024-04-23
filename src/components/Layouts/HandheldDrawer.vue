<template>
  <v-navigation-drawer
      v-model="drawer"
      temporary

  >

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-view-dashboard-outline" href="/locating/dashboard" title="داشبورد"  value="home"></v-list-item>
<!--      <v-list-item prepend-icon="mdi-elevator-down" href="/locating/initilize" title="جایگذاری اولیه"  value="initilize"></v-list-item>-->
      <v-list-item prepend-icon="mdi-archive-outline" href="/locating/index" title="جایگذاری بسته" value="locating"></v-list-item>
      <v-list-item prepend-icon="mdi-bookshelf" href="/locating/package/shps-list" title="جایگذاری محصولات" value="package"></v-list-item>
      <v-list-item prepend-icon="mdi-bookshelf" href="/locating/singular-locating" title="جایگداری تکی" value="singular-locating"></v-list-item>
      <v-list-item prepend-icon="mdi-shopping-outline" href="/warehouse-orders/pick-up" title="جمع آوری کالا" value="pick-up"></v-list-item>
      <v-list-item prepend-icon="mdi-package-variant-closed"  href="/warehouse-orders/sorting" title="جایگذاری در جایگاه سورتینگ" value="sorting"></v-list-item>
      <v-list-item prepend-icon="mdi-package-variant-closed-minus"  href="/warehouse-orders/un-load" title="تخلیه جایگاه سورتینگ" value="un-load"></v-list-item>
      <v-list-item @click="logOut()" prepend-icon="mdi-exit-to-app" title="خروج از حساب کاربری" value="logOut"></v-list-item>
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