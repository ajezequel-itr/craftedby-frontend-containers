<template>
  <div class="profile-view mx-auto w-full lg:w-1/3">
    <div class="mt-6">
      <div class="flex justify-end">
        <router-link :to="`/boutique`">
        <CTAButtonBase customClass="btn-secondary" text="Déconnexion" @click="logout">Déconnexion</CTAButtonBase>
        </router-link>
      </div>
      <!--User info collapse box-->
      <div class="collapse border-2 rounded-none mt-12 collapse-arrow">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
          Mettre à jour vos coordonnées
        </div>
        <div class="collapse-content">
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
                  <CTAButtonPrimary customClass="btn btn-primary" text="Mettre à jour les informations" @click="updateProfile"></CTAButtonPrimary>
                </div>
        </div>
      </div>
    </div>
<!--Review collapse box-->
    <div class="collapse border-2 rounded-none mt-2 collapse-arrow">
      <input type="checkbox" />
      <div class="collapse-title text-xl font-medium">
        Vos derniers avis
      </div>
      <div class="collapse-content">
        <div class="mt-8">
          <p class="text-lg mb-4">Vos derniers avis</p>
          <div v-if="currentUser.user && currentUser.user.reviews && currentUser.user.reviews.length > 0" class="space-y-4">
            <router-link v-for="(review, index) in currentUser.user.reviews" :key="index" :to="`/products/${review.product_id}`" class="block">
              <div class="p-4 shadow hover:bg-accent">
                <p class="open-sans-regular text-lg">Evaluation: {{ review.rating }}/5</p>
                <p class="open-sans-regular text-gray-600">Commentaire: {{ review.comment }}</p>
                <div class="text-right text-sm open-sans-regular text-gray-500">Avis laissé le: {{ new Date(review.created_at).toLocaleDateString() }}</div>
              </div>
            </router-link>
          </div>
          <div v-else class="p-4 bg-red-100 rounded-lg shadow text-center">
            <p>No reviews yet.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user.js'
import CTAButtonBase from '@/components/CTAButtonBase.vue'
import { onMounted, ref } from 'vue'
import api from '@/services/api.js'
import CTAButtonPrimary from '@/components/CTAButtonPrimary.vue'
import router from '@/router/index.js'

const user = useUserStore()
const userObject = user.userObject
const changedFields = {}

const markFieldAsChanged = (field) => {
  changedFields[field] = true;
}

const getFullImagePath = (imagePath) => {
  const apiBaseURL = 'http://localhost:8000/images/products/';
  return `${apiBaseURL}${imagePath}`;
};

onMounted(() => {
  getCurrentUSer();
});

const currentUser = ref([]);

const getCurrentUSer = async () => {
  try {
    const response = await api.get(`/users/${userObject.id}`);
    if (response.data) {
      currentUser.value = response.data;
      user.storeOnlyUser(currentUser)
    }
  } catch (error) {
    console.error(error);
  }
};

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
  router.push('/boutique');

}
</script>

<style scoped>
.profile-view {
  align-self: flex-start;
}
</style>
