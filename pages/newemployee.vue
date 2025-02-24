<template>
  <form @submit.prevent="submit">
    <v-text-field v-model="Firstname" label="Firstname" required />
    <v-text-field v-model="Lastname" label="Lastname" required />
    <v-text-field v-model="PhoneNumber" label="Phone Number" required />
    <v-text-field v-model="Position" label="Position" required />
    <v-text-field v-model="Department" label="Department" required />
    <v-text-field v-model="Salary" label="Salary" required type="number" />

    <v-btn class="mr-4" type="submit">
      Submit
    </v-btn>
    <v-btn @click="clear">
      Clear
    </v-btn>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    Firstname: '',
    Lastname: '',
    PhoneNumber: '',
    Position: '',
    Department: '',
    Salary: ''
  }),

  methods: {
    async submit () {
      try {
        await axios.post('http://localhost:8100/api/emp/addemployee', {
          Firstname: this.Firstname,
          Lastname: this.Lastname,
          PhoneNumber: this.PhoneNumber,
          Position: this.Position,
          Department: this.Department,
          Salary: this.Salary
        })
        this.clear()
        alert('Employee added successfully!')
      } catch (error) {
        alert('Error adding employee!')
      }
    },
    clear () {
      this.Firstname = ''
      this.Lastname = ''
      this.PhoneNumber = ''
      this.Position = ''
      this.Department = ''
      this.Salary = ''
    }
  }
}
</script>
