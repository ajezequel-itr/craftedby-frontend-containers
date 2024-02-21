<template>
  <form @submit.prevent="register" class="form-control w-full max-w-xs mx-auto my-8 space-y-4">
    <div class="form-control">
      <label class="label">
        <span class="label-text">First Name</span>
      </label>
      <input type="text" v-model="first_name" class="input input-bordered w-full max-w-xs" />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Last Name</span>
      </label>
      <input type="text" v-model="last_name" class="input input-bordered w-full max-w-xs" />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Address</span>
      </label>
      <input type="text" v-model="address" class="input input-bordered w-full max-w-xs" />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Postal Code</span>
      </label>
      <input type="text" v-model="postal_code" class="input input-bordered w-full max-w-xs" />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">City</span>
      </label>
      <input type="text" v-model="city" class="input input-bordered w-full max-w-xs" />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Phone Number</span>
      </label>
      <input type="text" v-model="phone_number" class="input input-bordered w-full max-w-xs" />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Email <span class="text-error">*</span></span>
      </label>
      <input type="email" v-model="email" class="input input-bordered w-full max-w-xs" required />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Password <span class="text-error">*</span></span>
      </label>
      <input type="password" v-model="password" class="input input-bordered w-full max-w-xs" required minlength="6" />
    </div>

    <button type="submit" class="btn btn-primary mt-4 w-full">Register</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from "../stores/user";

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    // Define reactive properties
    const first_name = ref('');
    const last_name = ref('');
    const address = ref('');
    const postal_code = ref('');
    const city = ref('');
    const phone_number = ref('');
    const email = ref('');
    const password = ref('');

    const register = async () => {
      try {
        // Prepare userData correctly
        const userData = {
          first_name: first_name.value,
          last_name: last_name.value,
          address: address.value,
          postal_code: postal_code.value,
          city: city.value,
          phone_number: phone_number.value,
          email: email.value,
          password: password.value,
        };

        await userStore.signUp(userData);
        alert("User successfully created.");
        await router.push('/boutique');
      } catch (error) {
        alert("Failed to create user. " + (error.message || "Unknown error"));
      }
    };

    return {
      first_name, last_name, address, postal_code, city, phone_number, email, password, register
    };
  },
};

</script>