 <template>
   <v-card class="h-100 width-100 position__relative">
       <div class="d-flex justify-space-between align-center pa-4">
         <div class="pa-3 d-flex">
           <HandheldDrawer/>
        <span class="t20400">
          داشبورد
        </span>
       </div>

     </div>
       <v-card min-height="92" class="br__12 d-flex justify-space-between align-center mx-5 px-3" >
          <div class="d-flex">
            <v-icon size="44" color="primary600">
              mdi-account-circle
            </v-icon>
            <span class="t20400 mr-3">
              رامین ناصری
            </span>
          </div>
         <span class="t20400 text-gray600 mr-5">
             1402/08/16
           </span>
       </v-card>
       <v-card class="mx-5 br__12 mt-2 py-10 ">
         <div class="d-flex py-5 px-8 align-center">
          <span class="t16400 text-gray600">
            نمایش فعالیت های
          </span>
           <v-select class="mr-2" variant="outlined"></v-select>
         </div>
         <div class="d-flex justify-center position__relative my-5">
           <v-progress-circular
               model-value="20"
               color="primary500"
               size="100"
           ></v-progress-circular>
           <span class="t20600 text-primary500 pick-up__counter">
              ۴ از ۴۰
           </span>
         </div>
         <div class="text-center">

           <span class="t20400">
              عدد pick up شده
           </span>
         </div>

         <div class="d-flex justify-center position__relative my-5">
           <v-progress-circular
               model-value="20"
               color="primary500"
               size="100"
           ></v-progress-circular>
           <span class="t20600 text-primary500 pick-up__counter">
              ۴ از ۴۰
           </span>
         </div>
         <div class="text-center">

           <span class="t20400">
             عدد جایگذاری شده
           </span>
         </div>
       </v-card>
   </v-card>
 </template>

 <script>

 import {defineComponent} from "vue";
 import HandheldDrawer from "@/components/Layouts/HandheldDrawer.vue";

 export default defineComponent({
   components: {HandheldDrawer}
 })
 </script>
 <style>
 .pick-up__counter{
   position: absolute;
   top: 36px;
 }
 </style>