<template>
  <div class="min-h-screen flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-white shadow-xl sm:rounded-lg sm:p-20 border border-gray-200">
        <div class="max-w-md mx-auto">
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <h1 class="text-3xl font-bold text-center mb-8 text-black">User CRUD App</h1>

              <form @submit.prevent="submitUser" class="space-y-4">
                <div class="flex flex-col space-y-2">
                  <input 
                    v-model="user.name" 
                    placeholder="Name" 
                    required 
                    class="px-4 py-2 border border-gray-300 focus:ring-black focus:border-black block w-full rounded-md"
                  />
                  <input 
                    v-model="user.email" 
                    placeholder="Email" 
                    required 
                    class="px-4 py-2 border border-gray-300 focus:ring-black focus:border-black block w-full rounded-md"
                  />
                  <button 
                    type="submit" 
                    class="w-full bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  >
                    {{ user.id ? 'Update' : 'Add' }} User
                  </button>
                </div>
              </form>

              <ul class="mt-8 space-y-4">
                <li 
                  v-for="u in users" 
                  :key="u.id" 
                  class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div class="flex flex-col">
                    <span class="font-medium text-black">{{ u.name }}</span>
                    <span class="text-gray-500 text-sm">{{ u.email }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <button   
                      @click="editUser(u)"
                      class="bg-gray-800 text-white px-4 py-1.5 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      @click="deleteUser(u.id)"
                      class="border text-white px-4 py-1.5 rounded-md hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      user: { id: null, name: '', email: '' }
    };
  },
  methods: {
    async fetchUsers() {
      const res = await axios.get('http://localhost:3000/users');
      this.users = res.data;
    },
    async submitUser() {
      if (this.user.id) {
        await axios.put(`http://localhost:3000/users/${this.user.id}`, this.user);
      } else {
        await axios.post('http://localhost:3000/users', this.user);
      }
      this.user = { id: null, name: '', email: '' };
      this.fetchUsers();
    },
    editUser(user) {
      this.user = { ...user };
    },
    async deleteUser(id) {
      await axios.delete(`http://localhost:3000/users/${id}`);
      this.fetchUsers();
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>
