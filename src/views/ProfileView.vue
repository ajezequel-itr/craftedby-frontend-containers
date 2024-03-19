<!--<template>-->
<!--  <div class="wrapper">-->
<!--  <div class="input-field mt-6">-->
<!--    <div class="flex justify-end">-->
<!--      <CTAButtonBase customClass="btn-secondary" text="Déconnexion" @click="logout">Déconnexion</CTAButtonBase>-->
<!--    </div>-->
<!--    <p class="text-lg mb-4">Informations personnelles</p>-->
<!--    <div class="grid grid-cols-2 gap-4">-->
<!--      <div class="form-control">-->
<!--        <label class="label">-->
<!--          <span class="label-text">Prénom *</span>-->
<!--        </label>-->
<!--        <input type="text" v-model="userObject.first_name" @input="markFieldAsChanged('first_name')" placeholder="Prénom" class="input input-bordered custom-input w-full" />-->
<!--      </div>-->
<!--      <div class="form-control">-->
<!--        <label class="label">-->
<!--          <span class="label-text">Nom *</span>-->
<!--        </label>-->
<!--        <input type="text" v-model="userObject.last_name" @input="markFieldAsChanged('last_name')" placeholder="Nom" class="input input-bordered custom-input w-full" />-->
<!--      </div>-->
<!--      <div class="form-control col-span-2">-->
<!--        <label class="label">-->
<!--          <span class="label-text">Adresse *</span>-->
<!--        </label>-->
<!--        <input type="text" v-model="userObject.address" @input="markFieldAsChanged('address')" placeholder="Adresse" class="input input-bordered custom-input w-full" />-->
<!--      </div>-->
<!--      <div class="form-control">-->
<!--        <label class="label">-->
<!--          <span class="label-text">Code postal *</span>-->
<!--        </label>-->
<!--        <input type="text" v-model="userObject.postal_code" @input="markFieldAsChanged('postal_code')" placeholder="Code Postal" class="input input-bordered custom-input w-full" />-->
<!--      </div>-->
<!--      <div class="form-control">-->
<!--        <label class="label">-->
<!--          <span class="label-text">Ville *</span>-->
<!--        </label>-->
<!--        <input type="text" v-model="userObject.city" @input="markFieldAsChanged('city')" placeholder="Ville" class="input input-bordered custom-input w-full" />-->
<!--      </div>-->
<!--      <div class="form-control col-span-2">-->
<!--        <label class="label">-->
<!--          <span class="label-text">Email *</span>-->
<!--        </label>-->
<!--        <input type="email" v-model="userObject.email" @input="markFieldAsChanged('email')" placeholder="Email" class="input input-bordered custom-input w-full" />-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="center mt-10">-->
<!--      <button @click="updateProfile" class="btn btn-primary">Mettre à jour le profil</button>-->
<!--    </div>-->
<!--  </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { useUserStore } from '@/stores/user.js'-->
<!--import api from '@/services/api.js'-->
<!--import CTAButtonBase from '@/components/CTAButtonBase.vue'-->

<!--const user = useUserStore()-->
<!--const userObject = user.userObject-->

<!--const changedFields = {}-->

<!--const markFieldAsChanged = (field) => {-->
<!--  changedFields[field] = true;-->
<!--}-->

<!--const updateProfile = async () => {-->
<!--  try {-->
<!--    const updatedData = Object.keys(changedFields).reduce((acc, key) => {-->
<!--      if (changedFields[key]) {-->
<!--        acc[key] = userObject[key];-->
<!--      }-->
<!--      return acc;-->
<!--    }, {});-->

<!--    const response = await api.patch(`/users/${userObject.id}`, updatedData);-->
<!--    if (response.data) {-->
<!--      user.storeLoggedInUser(user.token, response.data);-->
<!--    }-->
<!--  } catch (error) {-->
<!--    console.error(error);-->
<!--  }-->
<!--}-->

<!--const logout = () => {-->
<!--  user.logout();-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.wrapper{-->
<!--  min-width: 50%;-->
<!--}-->

<!--.custom-input {-->
<!--  border: 1px solid black;-->
<!--  border-radius: 0;-->
<!--  font-family: 'open-sans-regular', sans-serif;-->
<!--  font-size: 0.875rem;-->
<!--}-->
<!--</style>-->

<template>
  <div class="wrapper mx-auto w-full lg:w-1/2">
    <div class="mt-6">
      <div class="flex justify-end">
        <CTAButtonBase customClass="btn-secondary" text="Déconnexion" @click="logout">Déconnexion</CTAButtonBase>
      </div>
      <p class="text-lg mb-4">Informations personnelles</p>
      <div class="grid grid-cols-2 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Prénom *</span>
          </label>
          <input type="text" v-model="userObject.first_name" @input="markFieldAsChanged('first_name')" placeholder="Prénom" class="input input-bordered w-full p-2 border-black border rounded-none" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Nom *</span>
          </label>
          <input type="text" v-model="userObject.last_name" @input="markFieldAsChanged('last_name')" placeholder="Nom" class="input input-bordered w-full p-2 border-black border rounded-none" />
        </div>
        <div class="form-control col-span-2">
          <label class="label">
            <span class="label-text">Adresse *</span>
          </label>
          <input type="text" v-model="userObject.address" @input="markFieldAsChanged('address')" placeholder="Adresse" class="input input-bordered w-full p-2 border-black border rounded-none" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Code postal *</span>
          </label>
          <input type="text" v-model="userObject.postal_code" @input="markFieldAsChanged('postal_code')" placeholder="Code Postal" class="input input-bordered w-full p-2 border-black border rounded-none" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Ville *</span>
          </label>
          <input type="text" v-model="userObject.city" @input="markFieldAsChanged('city')" placeholder="Ville" class="input input-bordered w-full p-2 border-black border rounded-none" />
        </div>
        <div class="form-control col-span-2">
          <label class="label">
            <span class="label-text">Email *</span>
          </label>
          <input type="email" v-model="userObject.email" @input="markFieldAsChanged('email')" placeholder="Email" class="input input-bordered w-full p-2 border-black border rounded-none" />
        </div>
      </div>
      <div class="flex justify-center mt-10">
        <button @click="updateProfile" class="btn btn-primary">Mettre à jour le profil</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useUserStore } from '@/stores/user.js'
import CTAButtonBase from '@/components/CTAButtonBase.vue'

const user = useUserStore()
const userObject = user.userObject
const changedFields = {}

const markFieldAsChanged = (field) => {
  changedFields[field] = true;
}

const token = localStorage.getItem('token') || null;
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_ENDPOINT}/`,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const updateProfile = async () => {
  try {
    const updatedData = Object.keys(changedFields).reduce((acc, key) => {
      if (changedFields[key]) {
        acc[key] = userObject[key];
      }
      return acc;
    }, {});

    const response = await api.patch(`/users/${userObject.id}`, updatedData);
    if (response.data) {
      user.storeLoggedInUser(user.token, response.data);
    }
  } catch (error) {
    console.error(error);
  }
}

const logout = () => {
  user.logout();
}
</script>

<style scoped>
/* Tailwind CSS is used, so you might not need custom styles here. */
</style>
