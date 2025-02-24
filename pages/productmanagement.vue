<template>
  <v-container fluid>
    <v-card-title class="textheader">
      จัดการสินค้าคงคลัง
    </v-card-title>
    <v-card class="ma-4" elevation="2">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <v-btn
            color="primary"
            class="ml-4"
            elevation="2"
            @click="addProduct"
          >
            <v-icon left>
              mdi-plus
            </v-icon>
            เพิ่มสินค้าใหม่
          </v-btn>
        </div>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหาสินค้า"
          single-line
          hide-details
          class="ml-4"
          style="max-width: 300px"
        />
      </v-card-title>

      <v-divider />
      <v-card-text>
        <v-simple-table>
          <template #default>
            <thead>
              <tr>
                <th>ชื่อสินค้า</th>
                <th>หมวดหมู่</th>
                <th>คงเหลือ</th>
                <th>จุดสั่งซื้อ</th>
                <th>ราคา</th>
                <th>สถานะสินค้า</th>
                <th>วันที่เพิ่ม</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in filteredProducts"
                :key="product.ProductID"
              >
                <td>{{ product.ProductName }}</td>
                <td>{{ product.CategoryName }}</td>
                <td>{{ product.QuantityInStock }}</td>
                <td>{{ product.ReorderPoint }}</td>
                <td>{{ product.Price }}</td>
                <td>
                  <span :class="getStatusClass(product)">
                    {{ getStatusText(product) }}
                  </span>
                </td>
                <td>{{ product.CreatedAt }}</td>
                <td>
                  <v-btn
                    small
                    color="primary"
                    class="mr-2"
                    @click="editProduct(product.ProductID)"
                  >
                    <v-icon small left>
                      mdi-pencil
                    </v-icon>
                    แก้ไข
                  </v-btn>
                  <v-btn
                    small
                    color="success"
                    class="mr-2"
                    @click="updateStock(product.ProductID)"
                  >
                    <v-icon small left>
                      mdi-plus
                    </v-icon>
                    เพิ่มสต๊อกสินค้า
                  </v-btn>
                  <v-btn
                    small
                    color="error"
                    @click="deleteProduct(product.ProductID)"
                  >
                    <v-icon small left>
                      mdi-delete
                    </v-icon>
                    ลบ
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="editDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">แก้ไขข้อมูลสินค้า</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="editForm">
            <v-text-field
              label="ชื่อสินค้า"
            />

            <v-text-field
              label="จำนวนในคลัง"
              type="number"
            />

            <v-text-field
              label="จุดสั่งซื้อใหม่"
              type="number"
            />

            <v-text-field
              label="ราคา"
              type="number"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeEditDialog">
            ยกเลิก
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveProduct">
            บันทึก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="stockDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">เพิ่มสต๊อกสินค้า</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="stockForm">
            <v-text-field v-model="stockQuantity" label="จำนวนที่เพิ่ม" type="number" min="1" required />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="red lighten-2" text @click="closeStockDialog">
            ยกเลิก
          </v-btn>
          <v-btn color="green" text @click="confirmAddStock">
            เพิ่มสต๊อก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      stockDialog: false,
      editDialog: false,
      search: '',
      products: [],
      editedProduct: {
        ProductID: null,
        ProductName: '',
        CategoryID: null,
        QuantityInStock: null,
        ReorderPoint: null,
        Price: null
      },
      stockQuantity: null
    }
  },
  computed: {
    filteredProducts () {
      return this.products.filter((product) => {
        const productName = product?.ProductName || ''
        const categoryName = product?.CategoryName || ''
        const statusText = this.getStatusText(product) || ''
        const search = this.search?.toLowerCase() || ''

        return [productName, categoryName, statusText]
          .some(field => field.toLowerCase().includes(search))
      })
    }
  },
  mounted () {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts () {
      try {
        const response = await this.$axios.$post(
          'http://localhost:8100/api/product/getproducts'
        )
        this.products = response.result
        this.filteredProducts = response.result
      } catch (error) {
        console.error('Failed to fetch product :', error)
      }
    },
    getStatusClass (product) {
      if (product.QuantityInStock === 0) {
        return 'text-red'
      } else if (product.QuantityInStock <= product.ReorderPoint) {
        return 'text-orange'
      } else {
        return 'text-green'
      }
    },
    getStatusText (product) {
      if (product.QuantityInStock === 0) {
        return 'หมดแล้ว'
      } else if (product.QuantityInStock <= product.ReorderPoint) {
        return 'ใกล้หมด'
      } else {
        return 'ปกติ'
      }
    },
    addProduct () {
      this.$notiflix.loading()
      this.$router.push('/addproduct')
    },
    editProduct () {
      // ดึงข้อมูลสินค้าที่ต้องการแก้ไขจาก API
      this.editDialog = true
    },
    saveProduct () {
      // ส่งข้อมูลสินค้าที่แก้ไขไปบันทึก
      this.closeEditDialog()
    },
    closeEditDialog () {
      this.editDialog = false
    },
    updateStock (productID) {
      console.log('stock', productID)
      this.selectedProductId = productID
      this.stockDialog = true
    },

    async confirmAddStock () {
      if (!this.selectedProductId) {
        Swal.fire({ title: 'เกิดข้อผิดพลาด', text: 'ไม่พบสินค้า', icon: 'error' })
        return
      }

      if (this.stockQuantity < 1) {
        Swal.fire({ title: 'จำนวนต้องมากกว่า 0', icon: 'error' })
        return
      }

      try {
        const response = await this.$axios.$post('http://localhost:8100/api/product/addstock', {
          ProductID: this.selectedProductId,
          QuantityInStock: this.stockQuantity
        })

        if (response.status === 'success') {
          Swal.fire({ title: 'เพิ่มสต๊อกสำเร็จ', icon: 'success' })
          this.fetchProducts()
        } else {
          Swal.fire({ title: 'เกิดข้อผิดพลาด', text: response.message, icon: 'error' })
        }
      } catch (error) {
        console.error('Error adding stock:', error)
        Swal.fire({ title: 'เกิดข้อผิดพลาด', text: 'ไม่สามารถเพิ่มสต๊อกได้', icon: 'error' })
      }

      this.closeStockDialog()
      this.selectedProductId = null
    },

    closeStockDialog () {
      this.stockDialog = false
      this.selectedProductId = null
      this.stockQuantity = null
    },
    async deleteProduct (productID) {
      try {
        const result = await Swal.fire({
          title: 'ลบสินค้า',
          text: 'ยืนยันการลบสินค้า',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#5cd65c',
          cancelButtonColor: '#ff4d4d',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก'
        })

        if (result.isConfirmed) {
          // หากผู้ใช้กดยืนยันการลบ
          const response = await this.$axios.$post('http://localhost:8100/api/product/deleteproduct', { ProductID: productID })

          if (response.status === 'success') {
            Swal.fire({
              title: 'ลบสินค้าสำเร็จ',
              icon: 'success'
            })
            this.fetchProducts()
          } else {
            Swal.fire({
              title: 'ผิดพลาด',
              text: response.message || 'ไม่สามารถลบสินค้าได้',
              icon: 'error'
            })
          }
        }
      } catch (error) {
        console.error('Failed to delete product:', error)
        Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถลบสินค้าได้',
          icon: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>
.textheader {
  font-size: 24px;
}
.v-card {
  border-radius: 8px;
}
.v-simple-table {
  background-color: white !important;
  color: black !important;
}
.v-simple-table th, .v-simple-table td {
  color: black !important;
}

.text-red {
  color: red;
  font-weight: bold;
}

.text-orange {
  color: orange;
  font-weight: bold;
}

.text-green {
  color: green;
  font-weight: bold;
}

</style>
