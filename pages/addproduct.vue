<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-card-title class="textheader">
          เพิ่มสินค้าใหม่
        </v-card-title>
        <v-card class="ma-4" elevation="2">
          <ValidationObserver ref="form" v-slot="{ invalid }">
            <v-form>
              <v-card-text>
                <ValidationProvider v-slot="{ errors }" name="ชื่อสินค้า" rules="required">
                  <v-text-field v-model="newProduct.ProductName" label="ชื่อสินค้า" :error-messages="errors" outlined />
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="หมวดหมู่" rules="required">
                  <v-select
                    v-model="newProduct.CategoryID"
                    :items="categories"
                    item-text="CategoryName"
                    item-value="CategoryID"
                    label="หมวดหมู่"
                    :error-messages="errors"
                    outlined
                  />
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="จำนวน" rules="required">
                  <v-text-field v-model="newProduct.QuantityInStock" label="จำนวน(ต่อชิ้น)" type="number" :error-messages="errors" outlined />
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="จุดสั่งซื้อ" rules="required">
                  <v-text-field v-model="newProduct.ReorderPoint" label="จุดสั่งซื้อ" type="number" :error-messages="errors" outlined />
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="ราคา" rules="required">
                  <v-text-field v-model="newProduct.Price" label="ราคา" type="number" :error-messages="errors" outlined />
                </ValidationProvider>
              </v-card-text>
              <v-card-actions>
                <v-btn :disabled="invalid" color="primary" @click="saveProduct">
                  บันทึก
                </v-btn>
                <v-btn text color="error" @click="cancel">
                  ยกเลิก
                </v-btn>
              </v-card-actions>
            </v-form>
          </ValidationObserver>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card-title class="textheader">
          เพิ่มหมวดหมู่ใหม่
        </v-card-title>
        <v-card class="ma-4" elevation="2">
          <ValidationObserver ref="categoryForm" v-slot="{ invalid }">
            <v-form>
              <v-card-text>
                <ValidationProvider v-slot="{ errors }" name="ชื่อหมวดหมู่" rules="required">
                  <v-text-field v-model="newCategory.CategoryName" label="ชื่อหมวดหมู่" :error-messages="errors" outlined />
                </ValidationProvider>
              </v-card-text>
              <v-card-actions>
                <v-btn :disabled="invalid" color="primary" @click="saveCategory">
                  บันทึก
                </v-btn>
              </v-card-actions>
            </v-form>
          </ValidationObserver>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      newProduct: {
        ProductName: '',
        CategoryID: null,
        QuantityInStock: null,
        ReorderPoint: null,
        Price: null
      },
      newCategory: {
        CategoryName: ''
      },
      categories: []
    }
  },
  mounted () {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories () {
      try {
        const response = await this.$axios.$post('http://localhost:8100/api/category/getcategory')
        this.categories = response.result
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    },
    async saveProduct () {
      if (!this.$refs.form.validate()) { return }
      try {
        await this.$axios.$post('http://localhost:8100/api/product/addproduct', this.newProduct)
        Swal.fire({ icon: 'success', title: 'เพิ่มสินค้าสำเร็จ', timer: 1500, showConfirmButton: false })
        this.fetchCategories()
      } catch (error) {
        console.error('Failed to save product:', error)
        Swal.fire({ icon: 'error', title: 'ล้มเหลว', text: 'โปรดลองใหม่อีกครั้ง' })
      }
    },
    async saveCategory () {
      if (!this.$refs.categoryForm.validate()) { return }
      try {
        await this.$axios.$post('http://localhost:8100/api/category/category', this.newCategory)
        Swal.fire({ icon: 'success', title: 'เพิ่มหมวดหมู่สำเร็จ', timer: 1500, showConfirmButton: false })
        this.newCategory.CategoryName = ''
        this.fetchCategories()
      } catch (error) {
        console.error('Failed to save category:', error)
        Swal.fire({ icon: 'error', title: 'ล้มเหลว', text: 'โปรดลองใหม่อีกครั้ง' })
      }
    },
    cancel () {
      this.$router.push('/productmanagement')
    }
  }
}
</script>

<style>
.textheader {
  font-size: 24px;
}
.v-card {
  border-radius: 8px;
}
</style>
