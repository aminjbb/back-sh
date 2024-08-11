<template>
    <v-card 
        class="stepper ma-5 br-12"
        height="103px"
    >
        <v-row
            justify="center"
            align="start"
            class="my-2 pt-4 px-15"
        >
          <template v-for="(item , index) in steps" :key="index">
            <v-col
                cols="2"
                class="cursor__pointer"
                @click="changeStep(index+1)"
            >
              <v-row justify="center">
                <div :class="step >= index + 1 ? 'stepper__value__box--active' : 'stepper__value__box'">
                        <span class="text-white t14 w500">
                            {{ index + 1 }}
                        </span>
                </div>
              </v-row>

              <v-row justify="center" class="mt-5">
                <div>
                        <span class="t14 w500">
                           {{ item }}
                        </span>
                </div>
              </v-row>
            </v-col>

            <v-col cols="1" class="pt-5">
              <v-divider />
            </v-col>
          </template>

        </v-row>
    </v-card>
</template>
<script>

export default {
    props:{
        step:1,
        changeStep:{type : Function},
        steps:[]
    }
}
</script>