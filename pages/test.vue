<template>
  <v-container>
    <v-col>
      <validation-observer ref="observer" v-slot="{handleSubmit}">
        <v-form @submit.prevent="handleSubmit(onSubmit)">
          <v-row>
            <v-col>
              <span> ชื่อ </span>
              <validation-provider v-slot="{ errors }" name="firstname" rules="required">
                <v-text-field v-model="firstname" :error-messages="errors" outlined dense />
              </validation-provider>
            </v-col>
            <v-col>
              <span> นามสกุล </span>
              <validation-provider v-slot="{ errors }" name="lastname" rules="required">
                <v-text-field v-model="lastname" :error-messages="errors" outlined dense />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span> อายุ </span>
              <validation-provider v-slot="{ errors }" name="age" rules="required">
                <v-text-field v-model="age" :error-messages="errors" outlined dense />
              </validation-provider>
            </v-col>
            <v-col>
              <span> เบอร์โทร </span>
              <validation-provider v-slot="{ errors }" name="phone" rules="addressNumber">
                <v-text-field v-model="phone" :error-messages="errors" outlined dense />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-btn @click="onSubmit">
              Submit
            </v-btn>
          </v-row>
        </v-form>
      </validation-observer>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      firstname: null,
      lastname: null,
      age: null,
      phone: null
    }
  },
  methods: {
    async onSubmit () {
      const confirm = await this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, submit it!'
      })

      if (confirm.isConfirmed) {
        this.$swal({
          title: 'Success!',
          text: 'Your file has been submitted successfully.',
          icon: 'success'
        })

        console.log('Data submitted:')
        console.log({
          firstname: this.firstname,
          lastname: this.lastname,
          age: this.age,
          phone: this.phone
        })

        this.submitData()
      }
    },
    submitData () {
      console.log('Sending data to API...')
    }
  }
}
</script>

  <style scoped>
  .bg {
    color: rgb(255, 0, 0);
  }
  </style>
