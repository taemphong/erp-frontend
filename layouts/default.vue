<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      class="white"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon color="primary">
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="primary--text">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title>ERP System</v-toolbar-title>
      <v-spacer />

      <v-icon left size="30">
        mdi-account-circle
      </v-icon>
      <span class="text-h6">{{ mockuser.name }}</span>
    </v-app-bar>

    <v-main
      class="grey lighten-4"
      :style="{
        background: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
        url(${require('~/assets/img/erp-001.jpeg')}) no-repeat center center fixed`,
        backgroundSize: 'cover'
      }"
    >
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app color="white">
      <span class="grey--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      miniVariant: false,
      mockuser: {
        name: 'customer'
      },
      items: [
        { icon: 'mdi-view-dashboard', title: 'Dashboard', to: '/' },
        { icon: 'mdi-basket-fill', title: 'เพิ่มสินค้า', to: '/addproduct' },
        { icon: 'mdi-package-variant', title: 'จัดการสินค้าคงคลัง', to: '/productmanagement' },
        { icon: 'mdi-package-variant', title: 'จัดการสต๊อกสินค้า', to: '/stockproduct' }
      ]
    }
  }
}
</script>
