<script setup>
import { onMounted } from 'vue'
import { useKategori } from '~/composables/useKategori'

const { kategori, fetchKategori, loading, error, deleteKategori } = useKategori();
const remove = async (id) => {
  try {
    // console.log('Menghapus ID:', id)
    await deleteKategori(id);
    // console.log('Data berhasil dihapus, memuat ulang list...')
    await fetchKategori()
  } catch (err) {
    console.error('Gagal menghapus kategori:', err)
  }
}

// function create(){
//   router.push("/kategori/create");
// }
onMounted(fetchKategori)
</script>

<template>
  <div class="max-w-6xl mx-auto px-6">
    <h1 class="text-2xl font-bold mb-4 text-black">Kategori</h1>
    <NuxtLink to="/kategori/create" class="bg-blue-600 text-white px-4 py-2 rounded">Create</NuxtLink>
    <div v-if="loading" class="mt-4">Loading...</div>
    <div v-else-if="error">Terjadi kesalahan: {{ error }}</div>
    <table v-else class="mt-4 border w-full">
      <thead class="bg-gray-200">
        <tr>
          <th class="border border-gray-300 p-2">No</th>
          <th class="border border-gray-300 p-2">Nama</th>
          <th class="border border-gray-300 p-2">Tipe</th>
          <th class="border border-gray-300 p-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(k,i) in kategori" :key="k.id">
          <td class="border border-gray-300 text-center">{{ i + 1 }}</td>
          <td class="border border-gray-300 p-2">{{ k.nama }}</td>
          <td class="border border-gray-300 p-2">{{ k.tipe }}</td>
          <td class="border border-gray-300 p-2">
            <div class="flex justify-center gap-2">
              <NuxtLink :to="`/kategori/${k.id}`" class="bg-blue-600 p-2 rounded text-white">Edit</NuxtLink>
              <button class="bg-red-500 rounded p-2 text-white cursor-pointer" @click="remove(k.id)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
