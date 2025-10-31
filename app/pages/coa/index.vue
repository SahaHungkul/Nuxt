<script setup>
import { onMounted } from 'vue';
import { useCoa } from '~/composables/useCoa';

const { coa, fetchCoa, loading, error, deleteCoa } = useCoa();
const remove = async (id) => {
    try {
        await deleteCoa(id);
        await fetchCoa();
    } catch (err) {
        console.error('gagal hapus data:', err);
    }
}
onMounted(fetchCoa);
</script>

<template>
    <div class="max-w-6xl mx-auto px-6">
        <h1 class="text-2xl font-bold mb-4 text-black">Chart of Accounts</h1>

        <NuxtLink to="/coa/create" class="bg-blue-600 text-white px-4 py-2 rounded">Create</NuxtLink>
        <div v-if="loading">loading...</div>
        <div v-else-if="error">Terjadi kesalahan: {{ error }}</div>
        <table v-else class="mt-4 border w-full">
            <thead class="bg-gray-200">
                <tr>
                    <th class="border border-gray-300 p-2">No</th>
                    <th class="border border-gray-300 p-2">kode</th>
                    <th class="border border-gray-300 p-2">Nama</th>
                    <th class="border border-gray-300 p-2">Kategori</th>
                    <th class="border border-gray-300 p-2">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(c,i) in coa" :key="c.id">
                    <td class="border  border-gray-300 p-2 text-center">{{ i + 1 }}</td>
                    <td class="border  border-gray-300 p-2 text-center">{{ c.kode }}</td>
                    <td class="border  border-gray-300 p-2">{{ c.nama }}</td>
                    <td class="border  border-gray-300 p-2">{{ c.kategori?.nama }}</td>
                    <td class="border border-gray-300 p-2 text-center">
                        <div class="flex justify-center gap-2">
                            <NuxtLink :to="`/coa/${c.id}`" class="bg-blue-600 p-2 rounded text-white">Edit</NuxtLink>
                            <button class="bg-red-500 rounded p-2 text-white cursor-pointer" @click="remove(c.id)">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>