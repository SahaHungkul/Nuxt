<script setup>
import { ref, onMounted } from 'vue';
import { useCoa } from '~/composables/useCoa';
import { useKategori } from '~/composables/useKategori';
import { useRouter } from '#app';

const router = useRouter();
const { createCoa } = useCoa();
const { kategori, fetchKategori } = useKategori();

const kode = ref('');
const nama = ref('');
const kategori_id = ref('');
const message = ref('');

onMounted(async () => {
    await fetchKategori();
})
const handleSubmit = async () => {
    try {
        await createCoa({
            kode: kode.value,
            nama: nama.value,
            kategori_id: kategori_id.value,
        })
        message.value = 'data berhasil ditambahkan';
        kode.value = '';
        nama.value = '';
        kategori_id.value = '';

        router.push("/coa");
    } catch (err) {
        console.log(err);
        message.value = err.message || 'gagal menambahkan data';
    }
}
</script>

<template>
    <div class="flex justify-center items-center mt-10">
        <div class="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
            <h2 class="text-2xl font-bold mb-4 text-gray-700">Create Coa</h2>
            <form class="space-y-4" @submit.prevent="handleSubmit">
                <div>
                    <label class="block text-gray-600 mb-1" for="">Kode</label>
                    <input 
                    v-model="kode" type="number" placeholder="masukan kode"
                        class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none">

                    <label class="block text-gray-600 mb-1" for="">Nama</label>
                    <input 
                    v-model="nama" type="text" placeholder="masukan nama"
                        class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none">

                    <label class="block text-gray-600 mb-1 mt-3">Kategori</label>
                    <select 
                    v-model="kategori_id"
                        class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none  bg-white cursor-pointer">
                        <option disabled value="">Pilih Kategori</option>
                        <option v-for="k in kategori" :key="k.id" :value="k.id">
                            {{ k.nama }}
                        </option>
                    </select>
                </div>
                <div class="flex justify-between">
          <button
          :disabled="loading"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          @click="updateData"
          >
            {{ isSaving ? 'Menambahkan...' : 'Tambah ' }}
          </button>

          <NuxtLink
            to="/coa"
            class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
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

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>