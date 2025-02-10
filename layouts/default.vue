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

      <!-- Notification Button -->
      <v-menu offset-y transition="scale-transition">
        <template #activator="{ attrs, on }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-badge :value="totalNotifications" color="red" overlap>
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <!-- Dropdown Content -->
        <v-card>
          <v-card-title>Notifications</v-card-title>
          <v-divider />

          <!-- Low Stock Notifications -->
          <v-list>
            <v-subheader>Low Stock</v-subheader>
            <v-list-item v-for="(item, index) in notifications.lowStock" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ item.ProductName }}</v-list-item-title>
                <v-list-item-subtitle>Quantity: {{ item.QuantityInStock }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider />

          <!-- Pending Approval Notifications -->
          <v-list>
            <v-subheader>Pending Approvals</v-subheader>
            <v-list-item v-for="(item, index) in notifications.pendingApprovals" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider />

          <!-- General Notifications -->
          <v-list>
            <v-subheader>General Notifications</v-subheader>
            <v-list-item v-for="(item, index) in notifications.general" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider />
        </v-card>
      </v-menu>

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
      ],
      notifications: {
        lowStock: [
          { ProductName: 'Product A', QuantityInStock: 5 },
          { ProductName: 'Product B', QuantityInStock: 2 }
        ],
        pendingApprovals: [

        ],
        general: [

        ]
      }
    }
  },
  computed: {
    totalNotifications () {
      return (
        this.notifications.lowStock.length +
        this.notifications.pendingApprovals.length +
        this.notifications.general.length
      )
    }
  },
  mounted () {
    this.fetchNotifications()
  },
  methods: {
    async fetchNotifications () {
      try {
        const response = await this.$axios.get('/api/notifications')
        this.notifications = response.data
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    }
  }
}
</script>
