<script setup>
import { onMounted } from 'vue'
import { useTransaksi } from '~/composables/useTransaksi'

const { transaksi, fetchTransaksi, loading, error, deleteTransaksi } = useTransaksi();
const remove = async (id) => {
    try {
        // console.log('Menghapus ID:', id)
        await deleteTransaksi(id);
        // console.log('Data berhasil dihapus, memuat ulang list...')
        await fetchTransaksi();
    } catch (err) {
        console.error('Gagal menghapus kategori:', err)
    }
}
onMounted(fetchTransaksi);
</script>

<template>
    <div class="max-w-6xl mx-auto px-6">
        <h1 class="text-2xl font-bold mb-4 text-black">Transaksi</h1>

        <NuxtLink to="/transaksi/create" class="bg-blue-600 text-white p-2 rounded">Create</NuxtLink>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Terjadi kesalahan: {{ error }}</div>
        <table v-else class="mt-4 border w-full">
            <thead class="bg-gray-200">
                <tr>
                    <th class="border border-gray-300 p-2">No</th>
                    <th class="border border-gray-300 p-2">Tanggal</th>
                    <th class="border border-gray-300 p-2">coa_kode</th>
                    <th class="border border-gray-300 p-2">coa_name</th>
                    <th class="border border-gray-300 p-2">deskripsi</th>
                    <th class="border border-gray-300 p-2">Debit</th>
                    <th class="border border-gray-300 p-2">Kredit</th>
                    <th class="border border-gray-300 p-2">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(t,i) in transaksi" :key="t.id">
                    <td class="border  border-gray-300 p-2 text-center">{{ i+1 }}</td>
                    <td class="border  border-gray-300 p-2 text-center">{{ t.tanggal }}</td>
                    <td class="border  border-gray-300 p-2 text-center">{{ t.coa?.kode }}</td>
                    <td class="border  border-gray-300 p-2">{{ t.coa?.nama }}</td>
                    <td class="border  border-gray-300 p-2">{{ t.deskripsi }}</td>
                    <td class="border  border-gray-300 p-2 text-right">{{ t.debit }}</td>
                    <td class="border  border-gray-300 p-2 text-right">{{ t.kredit }}</td>
                    <td class="border  border-gray-300 p-2">
                        <div class="flex justify-center ">
                            <button 
                            class="bg-red-500 rounded p-2 text-white cursor-pointer"
                                @click="remove(t.id)">Delete
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>