<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useKategori } from '~/composables/useKategori'

const route = useRoute()
const router = useRouter()

const { updateKategori, getKategoriId } = useKategori()
const nama = ref('');
const tipe = ref('');
const message = ref('');
const error = ref('');
const loading = ref(false);

onMounted(async () => {
  try {
    loading.value = true
    const res = await getKategoriId(route.params.id)

    nama.value = res.data?.nama ?? res.nama
    tipe.value = res.data?.tipe ?? res.tipe
  } catch (err) {
    error.value = err.message || 'Gagal mengambil data kategori'
  } finally {
    loading.value = false
  }
})


const handleSubmit = async () => {
  try {
    loading.value = true
    await updateKategori(route.params.id, { 
      nama: nama.value, 
      tipe: tipe.value,
    })
    message.value = 'Data berhasil diperbarui!'
    setTimeout(() => router.push('/kategori'), 1000)
  } catch (err) {
    error.value = err.message || 'Gagal memperbarui data'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex justify-center mt-10">
    <div class="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
      <h2 class="text-2xl font-bold mb-4 text-gray-700">Edit Kategori</h2>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-gray-600 mb-1">Nama Kategori</label>
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
            {{ loading ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </button>

          <NuxtLink to="/kategori" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
            Kembali
          </NuxtLink>
        </div>
      </form>

      <p v-if="error" class="text-red-500 mt-3 text-sm text-center">
        {{ error }}
      </p>
      <p v-if="message" class="text-green-600 mt-3 text-sm text-center">
        {{ message }}
      </p>
    </div>
  </div>
</template>
