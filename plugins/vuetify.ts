// import this after install `@mdi/font` package
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import { aliases, md } from 'vuetify/iconsets/md'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default defineNuxtPlugin((app: any) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'customTheme',
        themes: {
          customTheme: {
            dark: false,
            colors: {
              primary: '#008080', // Teal Color
              secondary: '#006666', // Darker Teal
              background: '#f9fafb',
              surface: '#ffffff',
              error: '#ff5252',
            },
          },
        },
      },
    icons: {
        defaultSet: 'md',
        aliases,
        sets: {
          md,
        },
      },
  })
  app.vueApp.use(vuetify)
})
