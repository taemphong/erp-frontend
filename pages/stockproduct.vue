<template>
  <div>
    <h1>แจ้งเตือนสินค้าใกล้หมด</h1>
    <ul>
      <li v-for="(item, index) in lowStockItems" :key="index">
        {{ item.ProductName }} - คงเหลือ {{ item.QuantityInStock }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lowStockItems: []
    }
  },
  mounted () {
    // ฟัง WebSocket Event "low-stock-alert"
    this.$socket.on('low-stock-alert', (data) => {
      console.log('ได้รับแจ้งเตือนสินค้าใกล้หมด:', data)
      this.lowStockItems = data
    })
  }
}
</script>
