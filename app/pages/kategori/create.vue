<script setup>
import { ref } from 'vue'
import { useKategori } from '~/composables/useKategori'
import { useRouter } from 'vue-router';

const router = useRouter();
const { createKategori } = useKategori();
const nama = ref('');
const tipe = ref('');
const loading = ref(false);
const message = ref('');


const handleSubmit = async () => {
  try {
    await createKategori({ 
      nama: nama.value,
      tipe: tipe.value,
    });
    message.value = 'Kategori berhasil ditambahkan!';
    nama.value = '';
    tipe.value = '';

    router.push("/kategori");
  } catch (err) {
    message.value = err.message || 'Gagal menambahkan kategori!';
  }
}
</script>

<template>
  <div class="flex justify-center mt-10">
    <div class="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
      <h2 class="text-2xl font-bold mb-4 text-gray-700">Add Kategori</h2>
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-gray-600 mb-1" for="">Nama Kategori</label>
          <input 
          v-model="nama" type="text" placeholder="Masukkan nama kategori"
            class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none">
        </div>
        <div>
          <label class="block text-gray-600 mb-1" for="">Tipe Kategori</label>
          <input 
          v-model="tipe" type="text" placeholder="Masukkan tipe kategori"
            class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none">
        </div>
        <div class="flex justify-between">
          <button 
          :disabled="loading"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer" @click="updateData">
            {{ loading ? 'Menambah...' : 'Tambahkan' }}
          </button>

          <NuxtLink to="/kategori" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer">
            Kembali
          </NuxtLink>
        </div>
      </form>
      <p v-if="error" class="text-red-500 mt-3 text-sm text-center">
        {{ error }}
      </p>
    </div>
  </div>
</template>