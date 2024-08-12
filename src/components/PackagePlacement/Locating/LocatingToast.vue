<template>
  <div class="text-center ma-2">

    <v-snackbar
        v-model="snackbar"
    >

      <div class="text-right">
        <span class="text-white t16 w400">
          در حال دریافت اطلاعات
        </span>
      </div>
      <div class="mt-3">
        <v-progress-linear
            v-model="value"
            :buffer-value="bufferValue"
            color="success"
        ></v-progress-linear>
      </div>
    </v-snackbar>
  </div>

</template>
<script>
export default {
  data () {
    return {
      value: 10,
      bufferValue: 20,
      interval: 0,
      snackbar:true
    }
  },

  watch: {
    value (val) {
      if (val < 100) return

      this.value = 0
      this.bufferValue = 10
      this.startBuffer()
    },
  },

  mounted () {
    this.startBuffer()
  },

  beforeUnmount () {
    clearInterval(this.interval)
  },

  methods: {
    startBuffer () {
      clearInterval(this.interval)

      this.interval = setInterval(() => {
        this.value += Math.random() * (15 - 5) + 5
        this.bufferValue += Math.random() * (15 - 5) + 6
      }, 450)
    },
  },
}
</script>
