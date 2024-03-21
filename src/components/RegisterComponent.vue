<template>
  <form @submit.prevent="register" class="form-control w-full max-w-xs mx-auto my-8 space-y-4">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Prénom</span>
      </label>
      <input type="text" v-model="first_name" class="input input-bordered w-full max-w-xs" />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Nom</span>
      </label>
      <input type="text" v-model="last_name" class="input input-bordered w-full max-w-xs" />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Adresse</span>
      </label>
      <input type="text" v-model="address" class="input input-bordered w-full max-w-xs" />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Code postal</span>
      </label>
      <input type="text" v-model="postal_code" class="input input-bordered w-full max-w-xs" />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Ville</span>
      </label>
      <input type="text" v-model="city" class="input input-bordered w-full max-w-xs" />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Numéro de téléphone</span>
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
        <span class="label-text">Mot de passe<span class="text-error">*</span></span>
      </label>
      <input type="password" v-model="password" name="password" class="input input-bordered w-full max-w-xs" required minlength="6" />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Confirmation de mot de passe<span class="text-error">*</span></span>
      </label>
      <input type="password" v-model="password_confirmation" name="password_confirmation" class="input input-bordered w-full max-w-xs" required minlength="6" :class="{ 'border-red-500': password !== password_confirmation && password_confirmation.length > 0 }" />
      <p v-if="password !== password_confirmation && password_confirmation.length > 0" class="text-red-500 text-sm">Les mots de passe ne correspondent pas.</p>
    </div>

    <button type="submit" class="btn btn-primary mt-4 w-full">Enregistrer</button>
  </form>

  <div class="form-group row">
    <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

    <div class="col-md-6">
      <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from "../stores/user";

    const userStore = useUserStore();
    const router = useRouter();

    const first_name = ref('');
    const last_name = ref('');
    const address = ref('');
    const postal_code = ref('');
    const city = ref('');
    const phone_number = ref('');
    const email = ref('');
    const password = ref('');
    const password_confirmation = ref('');

    const register = async () => {
      try {
        if (password.value !== password_confirmation.value) {
          alert("Les mots de passe ne correspondent pas.");
          return;
        }
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
          password_confirmation: password_confirmation.value,
        };

        await userStore.signUp(userData);
        alert("User successfully created.");
        await router.push('/boutique');
      } catch (error) {
        alert("Failed to create user. " + (error.message || "Unknown error"));
      }
    };
</script>