<template>
  <div>
    <ClientHeader></ClientHeader>
    <div class="profile-container" v-if="profile">
      <h1>My Profile</h1>
      <div class="profile-info">
        <p><strong>First Name:</strong> {{ profile.first_name }}</p>
        <p><strong>Last Name:</strong> {{ profile.last_name }}</p>
        <p><strong>Email:</strong> {{ profile.email }}</p>
        <p><strong>Username:</strong> {{ profile.username }}</p>
        <img :src="profile.image_url" alt="Profile Image" v-if="profile.image_url" />
        <!-- Add more profile fields as needed -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ClientHeader from './ClientHeader.vue';
import cookies from 'vue-cookies';

export default {
  components: {
    ClientHeader
  },
  data() {
    return {
      profile: null
    };
  },
  created() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        const client_id = cookies.get('client_id'); // Assuming client_id is stored in cookies
        const response = await axios.get('http://209.38.6.175:5000/api/client', {
          params: {
            client_id
          },
          headers: {
            'x-api-key': 'NvZSG4',
            'Authorization': `Bearer ${cookies.get('token')}`
          }
        });
        this.profile = response.data;
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
  }
}
</script>

<style scoped>
.profile-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-info p {
  margin: 10px 0;
}

.profile-info strong {
  color: #154168;
}

.profile-info img {
  max-width: 100%;
  border-radius: 8px;
  margin-top: 20px;
}
</style>
