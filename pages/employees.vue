<template>
  <v-container fluid>
    <v-card-title class="textheader">
      รายชื่อพนักงาน
    </v-card-title>
    <v-card class="ma-4" elevation="2">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <v-btn color="primary" class="ml-4" elevation="2" @click="addEmployee">
            <v-icon left>
              mdi-plus
            </v-icon>
            เพิ่มพนักงาน
          </v-btn>
        </div>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหาพนักงาน"
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
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>เบอร์โทรศัพท์</th>
                <th>ตำแหน่ง</th>
                <th>แผนก</th>
                <th>เงินเดือน</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in filteredEmployees" :key="employee.EmployeeID">
                <td>{{ employee.Firstname }}</td>
                <td>{{ employee.Lastname }}</td>
                <td>{{ employee.PhoneNumber }}</td>
                <td>{{ employee.Position }}</td>
                <td>{{ employee.Department }}</td>
                <td>{{ employee.Salary }}</td>
                <td>
                  <v-btn small color="primary" class="mr-2" @click="editEmployee(employee.EmployeeID)">
                    <v-icon small left>
                      mdi-pencil
                    </v-icon>
                    แก้ไข
                  </v-btn>
                  <v-btn small color="error" class="mr-2" @click="deleteEmployee(employee.EmployeeID)">
                    <v-icon small left>
                      mdi-delete
                    </v-icon>
                    ลบ
                  </v-btn>
                  <v-menu offset-y>
                    <template #activator="{ on, attrs }">
                      <v-btn small color="success" v-bind="attrs" v-on="on">
                        เพิ่มเติม
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="viewDetails(employee.EmployeeID)">
                        <v-list-item-title>ดูรายละเอียด</v-list-item-title>
                      </v-list-item>

                      <v-list-item @click="adduser(employee.EmployeeID)">
                        <v-list-item-title>กำหนดสิทธิ์</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      employees: []
    }
  },
  computed: {
    filteredEmployees () {
      return this.employees.filter((employee) => {
        const search = this.search.toLowerCase()
        return (
          employee.Firstname.toLowerCase().includes(search) ||
          employee.Lastname.toLowerCase().includes(search) ||
          employee.PhoneNumber.includes(search) ||
          employee.Position.toLowerCase().includes(search) ||
          employee.Department.toLowerCase().includes(search)
        )
      })
    }
  },
  mounted () {
    this.fetchEmployee()
  },
  methods: {
    async fetchEmployee () {
      try {
        const response = await this.$axios.$post(
          'http://localhost:8100/api/emp/getallemp'
        )
        this.employees = response.result
      } catch (error) {
        console.error('Error occurred during fetch:', error)
      }
    },
    addEmployee () {
      console.log('addจ้า')
    },
    editEmployee () {
      console.log('แก้ไขจ้า')
    },
    deleteEmployee () {
      console.log('ลบจ้า')
    },
    viewDetails (EmployeeID) {
      console.log('ดูรายละเอียด', EmployeeID)
    },
    adduser (EmployeeID) {
      console.log('กำหนดสิทธิ์', EmployeeID)
    }
  }
}
</script>
