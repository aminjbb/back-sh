import './assets/style/font.css'
import './assets/style/typography.css'
import './assets/style/main.css'

import { createApp } from 'vue'
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import App from './App.vue'
import router from './router'

const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
  });
app.use(router  )

app.use(vuetify);
app.mount('#app')
export default (ctx) => {
    const vuetify = new Vuetify({
      rtl: true,
      customVariables: ["~/assets/variables.scss"],
      theme: {
        dark: false,
        themes: {
          light: {
            primary: "#12924F",
            primary2: "#2AC59F",
            secondary: "#21313C",
            Secondary2: "#00654C",
            accent: "#F39C12",
            error: "#E74C3C",
            error2: "#EE4343",
            warning: "#FEDC49",
            warning2: "#008CE0",
            info: "#0082FD",
            info2: "#008CE0",
            info3: "#0023DD",
            success: "#13AA52",
            success2: "#1BA94C",
            text1: "#181818",
            Gunmetal: "#263742",
            OuterSpace: "#424950",
            DimGray: "#636D77",
            Cultured: "#F5F5F5",
            Gainsboro: "#DFDFDF",
            FunGreen: "#096437",
            PigmentGreen: "#03A756",
            Azure: "#0082FD",
            EerieBlack: "#1A1A1A",
            BananaMania: "#FFEEA9",
            LavenderBlue: "#D6D3FF",
            AeroBlue: "#B8E6CB",
            LightSlateBlue: "#766BFF",
            Nero: "#1A1A1A",
            MagicMint: "#ACE6C4",
            CosmicLatte: "#DBFDE9",
            Honeydew: "#E5FFEE",
            Honeydew2: "#E6FFEE",
            PowderBlue: "#B4EDDF",
            MediumAquamarine: "#60D4B8",
            Water: "#DAF1FF",
            DarkCornflowerBlue: "#1F3D83",
            AeroBlue: "#C3FFD8",
            ForestGreen: "#004E1B",
            AntiqueWhite: "#FFE7D9",
            Rust: "#AB3E00",
            MistyRose: "#FFE7E7",
            DarkCandyAppleRed: "#A40000",
            ChineseWhite: "#E0E0E0",
            SpanishGray: "#9E9E9E",
            GraniteGray: "#616161",
            Black: "#000000",
            OldLace: "#FFF5E4",
            Gray02: "#424242",
            DeepGreen:"#21725E",
            successFocus:"#12e573",
            Cultured02:"#F5F6F7",
            DeepCarminePink:"#FF2C2C",
            LightSilver:"#D9D9D9",
            black2:"#0A0A0A",
            mainError:'#A82525',
            collectionGray:'#EDEDED'
            
          },
          dark: {},
        },
      },
    });
    ctx.app.vuetify = vuetify;
    ctx.$vuetify = vuetify.framework;
  };