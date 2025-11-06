<template>
  <div class="relative inline-block text-left">
    <!-- Tombol Trigger -->
    <button
    class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
      @click="toggleDropdown"
    >
      <i class="i-lucide:filter w-4 h-4"></i>
      Urutkan / Filter
    </button>

    <!-- Dropdown -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="open"
        class="absolute mt-2 right-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
      >
        <div class="p-3 space-y-3">
          <h3 class="text-sm font-semibold text-gray-600">Urut Berdasarkan</h3>
          <div class="flex flex-col gap-1">
            <label class="flex items-center gap-2 cursor-pointer">
                <input
                v-model="sortBy"
                type="radio"
                value="kode"
                class="accent-blue-600"
              >
              <span class="text-sm">Kode</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
                <input
                v-model="sortBy"
                type="radio"
                value="nama"
                class="accent-blue-600"
              >
              <span class="text-sm">Nama</span>
            </label>
          </div>

          <hr class="my-2" >

          <h3 class="text-sm font-semibold text-gray-600">Urutan</h3>
          <div class="flex flex-col gap-1">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="sortOrder"
                type="radio"
                value="asc"
                class="accent-blue-600"
              >
              <span class="text-sm">Naik (A → Z)</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="sortOrder"
                type="radio"
                value="desc"
                class="accent-blue-600"
              >
              <span class="text-sm">Turun (Z → A)</span>
            </label>
          </div>

          <hr class="my-2">

          <button
          class="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg"
            @click="applySort"
          >
            Terapkan
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onClickOutside } from 'vue'

const emit = defineEmits(['apply'])

const open = ref(false)
const sortBy = ref('kode')
const sortOrder = ref('asc')

const toggleDropdown = () => {
  open.value = !open.value
}

const applySort = () => {
  open.value = false
  emit('apply', { sortBy: sortBy.value, sortOrder: sortOrder.value })
}

const dropdownRef = ref(null)
onClickOutside(dropdownRef, () => (open.value = false))
</script>
