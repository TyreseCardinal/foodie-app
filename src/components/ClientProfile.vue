<template>
  <main>
    <ClientHeader></ClientHeader>
    <div class="profile-container" v-if="client">
      <h1>My Profile</h1>
      <button @click="toggleEditMode">
        {{ isEditMode ? 'Save' : 'Edit' }}
      </button>
      <button @click="confirmDeleteProfile">Delete Profile</button>
      <div class="profile-info">
        <div class="profile-field">
          <label for="first_name"><strong>First Name:</strong></label>
          <input v-if="isEditMode" v-model="client.first_name" id="first_name" placeholder="Edit First Name" />
          <p v-else>{{ client.first_name }}</p>
        </div>
        <div class="profile-field">
          <label for="last_name"><strong>Last Name:</strong></label>
          <input v-if="isEditMode" v-model="client.last_name" id="last_name" placeholder="Edit Last Name" />
          <p v-else>{{ client.last_name }}</p>
        </div>
        <div class="profile-field">
          <label for="email"><strong>Email:</strong></label>
          <input v-if="isEditMode" v-model="client.email" id="email" placeholder="Edit Email" />
          <p v-else>{{ client.email }}</p>
        </div>
        <div class="profile-field">
          <label for="username"><strong>Username:</strong></label>
          <input v-if="isEditMode" v-model="client.username" id="username" placeholder="Edit Username" />
          <p v-else>{{ client.username }}</p>
        </div>
        <div class="profile-field">
          <label for="created_at"><strong>Created At:</strong></label>
          <p>{{ client.created_at }}</p>
        </div>
        <div class="profile-field">
          <label for="client_id"><strong>Client ID:</strong></label>
          <p>{{ client.id }} <!-- Note to remove this ID after development --></p>
        </div>
        <div class="profile-field">
          <label for="image_url"><strong>Profile Image URL:</strong></label>
          <input v-if="isEditMode" v-model="client.image_url" id="image_url" placeholder="Edit Profile Image URL" />
          <img v-else :src="client.image_url" alt="Profile Image" />
        </div>
      </div>
    </div>
  </main>
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
      client: null,
      isEditMode: false,
    };
  },

  mounted() {
    this.fetchClientProfile();
  },

  methods: {
    fetchClientProfile() {
      const client_id = cookies.get("client_id");
      console.log("Client ID from cookies:", client_id); // Debugging log
      if (!client_id) {
        console.error("client_id cookie is missing");
        return;
      }

      axios.get('http://209.38.6.175:5000/api/client', {
        headers: {
          'x-api-key': 'NvZSG4',
          'token': cookies.get('token')
        },
        params: {
          client_id: client_id
        }
      })
        .then(response => {
          if (response.data && response.data.length > 0) {
            this.client = response.data[0];
            console.log("Client Data:", this.client); // Debugging log
          } else {
            console.error("No client data found in response");
          }
        })
        .catch(error => {
          console.error("There was an error fetching the profile:", error);
        });
    },

    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
      if (!this.isEditMode) {
        this.saveClientProfile(this.client)
      }
    },

    saveClientProfile(client) {
      let data = JSON.stringify({
        client_id: client.id,
        first_name: client.first_name,
        last_name: client.last_name,
        email: client.email,
        username: client.username,
        image_url: client.image_url,
      });

      let config = {
        method: 'patch',
        url: 'http://209.38.6.175:5000/api/client',
        headers: {
          'x-api-key': 'NvZSG4',
          'token': cookies.get('token'),
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },

    confirmDeleteProfile() {
      if (confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
        this.deleteProfile();
      }
    },

    deleteProfile() {
      const client_id = cookies.get("client_id");
      if (!client_id) {
        console.error("client_id cookie is missing");
        return;
      }

      let config = {
        method: 'delete',
        url: 'http://209.38.6.175:5000/api/client',
        headers: {
          'x-api-key': 'NvZSG4',
          'token': cookies.get('token'),
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({ client_id: client_id })
      };

      axios.request(config)
        .then((response) => {
          if (response.status === 204) {
            console.log("Profile deleted successfully");
            localStorage.clear()
            this.$router.push('/')
          }
        })
        .catch((error) => {
          console.error("There was an error deleting the profile:", error);
        });
    }
  }
}
</script>

<style scoped>
.profile-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-info {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 15px;
}

.profile-info.edit-mode {
  grid-template-columns: 1fr 2fr;
}

.profile-field {
  display: flex;
  flex-direction: column;
}

.profile-field label {
  font-weight: bold;
  color: #154168;
}

.profile-field p {
  margin: 5px 0;
}

.profile-field input {
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.profile-field img {
  max-width: 100%;
  border-radius: 8px;
  margin-top: 10px;
}

button {
  margin-top: 10px;
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #154168;
  cursor: pointer;
}

button:hover {
  background-color: #123456;
}
</style>
