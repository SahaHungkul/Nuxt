<template>
  <div>
    <header class="fixed top-0 w-full bg-blue-600 text-white p-2 flex justify-between">
      <h1 class="font-bold">My App</h1>
      <nav>
        <NuxtLink to="/kategori" class="mr-3 hover:underline">Kategori</NuxtLink>
        <NuxtLink to="/coa" class="mr-3 hover:underline">Coa</NuxtLink>
        <NuxtLink to="/transaksi" class="mr-3 hover:underline">Transaksi</NuxtLink>
        <NuxtLink to="/laporan" class="mr-3 hover:underline">Laporan</NuxtLink>
        <NuxtLink to="/" class="mr-3 hover:underline">Home</NuxtLink>
      </nav>
    </header>

    <main class="mt-20 mb-20">
      <slot />
    </main>

    <footer class="fixed bottom-0 left-0 w-full bg-gray-800 text-white text-center p-2 mt-4">
      © 2025 My App
    </footer>
  </div>
</template>
