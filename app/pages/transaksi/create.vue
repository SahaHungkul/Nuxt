<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from '#app';
import { useTransaksi } from '~/composables/useTransaksi';
import { useCoa } from '~/composables/useCoa';

const router = useRouter();
const { createTransaksi } = useTransaksi();
const { coa, fetchCoa } = useCoa();

const tanggal = ref('');
const coa_id = ref('');
const nama = ref('');
const deskripsi = ref('');
const debit = ref('');
const kredit = ref('');
const message = ref('');
const error = ref('');
const loading = ref(false);

onMounted(async () => {
  await fetchCoa();
})

watch(coa_id, (val) => {
  const selected = coa.value.find((c) => c.id === val);
  nama.value = selected ? selected.nama : '';
})

const handleSubmit = async () => {
  try {
    loading.value = true
    await createTransaksi({
      tanggal: tanggal.value,
      coa_id: coa_id.value,
      deskripsi: deskripsi.value,
      debit: debit.value,
      kredit: kredit.value
    })

    message.value = 'Data transaksi berhasil ditambahkan!';
    tanggal.value = '';
    coa_id.value = '';
    deskripsi.value = '';
    debit.value = '';
    kredit.value = '';

    router.push('/transaksi');
  } catch (err) {
    console.error(err);
    error.value = err.message || 'Gagal menambahkan data transaksi';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex justify-center mt-10">
    <div class="bg-white shadow-lg rounded-2xl w-full max-w-lg p-6">
      <h2 class="text-2xl font-bold mb-4 text-gray-700">Tambah Transaksi</h2>

      <form class="space-y-4" @submit.prevent="handleSubmit" >
        <div>
          <label class="block text-gray-600 mb-1">Tanggal</label>
          <input
            v-model="tanggal"
            type="date"
            class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
        </div>

        <div>
          <label class="block text-gray-600 mb-1">Kode</label>
          <select
            v-model="coa_id"
            class="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none cursor-pointer"
          >
            <option disabled value="">Pilih Kode</option>
            <option v-for="c in coa" :key="c.id" :value="c.id">
              {{ c.kode }} - {{ c.nama }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-gray-600 mb-1">Nama Akun</label>
          <input
            v-model="nama"
            type="text"
            readonly
            class="border border-gray-300 rounded-lg px-3 py-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
        </div>
        
        <div>
          <label class="block text-gray-600 mb-1">Deskripsi</label>
          <textarea
            v-model="deskripsi"
            placeholder="Masukkan deskripsi transaksi"
            class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-600 mb-1">Debit</label>
            <input
              v-model="debit"
              type="number"
              placeholder="0"
              class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
          </div>
          <div>
            <label class="block text-gray-600 mb-1">Kredit</label>
            <input
              v-model="kredit"
              type="number"
              placeholder="0"
              class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
          </div>
        </div>

        <div class="flex justify-between">
          <button
            type="submit"
            :disabled="loading"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {{ loading ? 'Menyimpan...' : 'Simpan' }}
          </button>

          <NuxtLink to="/transaksi" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Kembali</NuxtLink>
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

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
