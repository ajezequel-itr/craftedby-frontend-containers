<template>
  <div class="input-field mt-6">
    <p class="text-lg mb-4">Informations personnelles</p>
    <div class="grid grid-cols-2 gap-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Prénom *</span>
        </label>
        <input type="text" v-model="userObject.first_name" @input="markFieldAsChanged('first_name')" placeholder="Prénom" class="input input-bordered custom-input w-full" />
      </div>
      <!-- Other fields with v-model and @input -->

      <div class="form-control col-span-2">
        <button @click="updateProfile" class="btn btn-primary">Mettre à jour le profil</button>
        <button @click="logout" class="btn btn-secondary">Déconnexion</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user.js'
import api from '@/services/api.js'

const user = useUserStore()
const userObject = user.userObject

const changedFields = {}

const markFieldAsChanged = (field) => {
  changedFields[field] = true;
}

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
/* Styles here */
</style>
