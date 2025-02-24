import Vue from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

Vue.use(Toast, {
  timeout: 5000, // เวลาแสดงแจ้งเตือน (5 วินาที)
  position: 'top-right', // ตำแหน่งแจ้งเตือน
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false
})
