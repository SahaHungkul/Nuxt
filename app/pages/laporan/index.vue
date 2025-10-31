<script setup>
import { useLaporan } from '~/composables/useLaporan';
import { onMounted } from 'vue';

const { laporan, loading, fetchLaporan, error, exportExcel } = useLaporan();

onMounted(fetchLaporan);
</script>

<template>
    <div class="max-w-6xl mx-auto px-6">
        <h1 class="text-2xl font-bold mb-4 text-black">Laporan</h1>
        <button 
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
        @click="exportExcel" 
        >
            Export Excel
        </button>

        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Terjadi kesalahan: {{ error }}</div>
        <table v-else class="mt-4 border w-full">
            <thead class="bg-gray-200">
                <tr>
                    <th class="border border-gray-300 p-2">Tahun</th>
                    <th class="border border-gray-300 p-2">Bulan</th>
                    <th class="border border-gray-300 p-2">Kategori</th>
                    <th class="border border-gray-300 p-2">Total Debit</th>
                    <th class="border border-gray-300 p-2">Total Kredit</th>
                    <th class="border border-gray-300 p-2">Periode</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in laporan" :key="i" class="hover:bg-gray-50">
                    <td class="border border-gray-300 p-2 text-center">{{ item.tahun }}</td>
                    <td class="border border-gray-300 p-2 text-center">{{ item.bulan }}</td>
                    <td class="border border-gray-300 p-2">{{ item.kategori }}</td>
                    <td class="border border-gray-300 p-2 text-right">{{ item.total_debit }}</td>
                    <td class="border border-gray-300 p-2 text-right">{{ item.total_kredit }}</td>
                    <td class="border border-gray-300 p-2 text-center">{{ item.periode }}</td>
                </tr>
            </tbody>
        </table>
        <p v-if="!loading && !laporan.length" class="text-gray-500 mt-4">Tidak ada data laporan.</p>
    </div>
</template>