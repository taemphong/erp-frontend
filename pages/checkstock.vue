<template>
  <v-card class="ma-4 flex-grow-1" elevation="2">
    <v-card-title class="text-h5 d-flex align-center">
      รายการสินค้าใกล้หมด
    </v-card-title>

    <v-card-text class="pa-0">
      <v-simple-table class="stock-table">
        <template #default>
          <thead>
            <tr>
              <th class="primary--text font-weight-bold">
                ชื่อสินค้า
              </th>
              <th class="primary--text font-weight-bold text-center">
                จำนวนคงเหลือ
              </th>
              <th class="primary--text font-weight-bold text-center">
                สถานะ
              </th>
              <th class="primary--text font-weight-bold text-center">
                วัน-เวลา
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in lowStockItems" :key="index">
              <td>{{ item.ProductName }}</td>
              <td class="text-center">
                <v-chip
                  :color="getStockColor(item.QuantityInStock, item.ReorderPoint)"
                  small
                  dark
                >
                  {{ item.QuantityInStock }}
                </v-chip>
              </td>
              <td class="text-center">
                <v-chip
                  :color="getStockColor(item.QuantityInStock, item.ReorderPoint)"
                  small
                  outlined
                >
                  {{ getStockStatus(item.QuantityInStock, item.ReorderPoint) }}
                </v-chip>
              </td>
              <td class="text-center">
                {{ item.CreatedAt }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { Loading } from 'notiflix/build/notiflix-loading-aio'
export default {
  data () {
    return {
      lowStockItems: []
    }
  },
  mounted () {
    Loading.circle('กำลังโหลดข้อมูลกรุณารอสักครู่...')
    this.$socket.on('low-stock-alert', (data) => {
      console.log('ได้รับแจ้งเตือนสินค้าใกล้หมด:', data)
      this.lowStockItems = data
    })
    Loading.remove(10000)
  },
  methods: {
    getStockColor (quantity, ReorderPoint) {
      // console.log('checkq', quantity)
      // console.log('checkr', ReorderPoint)
      if (quantity <= 0) { return 'error' }
      if (quantity <= ReorderPoint) { return 'warning' }
    },
    getStockStatus (quantity, ReorderPoint) {
      // console.log('checkq', quantity)
      // console.log('checkr', ReorderPoint)
      if (quantity <= 0) { return 'สินค้าหมด' }
      if (quantity <= ReorderPoint) { return 'สินค้าใกล้หมด' }
    }
  }
}
</script>

<style scoped>
.stock-table {
  background-color: white !important;
  width: 100%;
}
.stock-table th {
  font-size: 1.1em !important;
  white-space: nowrap;
  padding: 12px 16px !important;
}
.stock-table td {
  vertical-align: middle;
  padding: 12px 16px !important;
}
.v-card {
  display: flex;
  flex-direction: column;
}
.v-card__text {
  flex-grow: 1;
  overflow: auto;
}
</style>
