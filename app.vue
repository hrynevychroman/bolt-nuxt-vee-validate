<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Form Validation Examples</h1>
    <nav class="mb-4">
      <NuxtLink to="/" class="mr-4 text-blue-500 hover:text-blue-700"
        >Home</NuxtLink
      >
      <NuxtLink to="/login" class="mr-4 text-blue-500 hover:text-blue-700"
        >Login</NuxtLink
      >
      <NuxtLink
        to="/registration"
        class="mr-4 text-blue-500 hover:text-blue-700"
        >Registration</NuxtLink
      >
      <NuxtLink to="/profile" class="mr-4 text-blue-500 hover:text-blue-700"
        >Profile</NuxtLink
      >
      <NuxtLink to="/contact" class="mr-4 text-blue-500 hover:text-blue-700"
        >Contact</NuxtLink
      >
      <NuxtLink to="/newsletter" class="mr-4 text-blue-500 hover:text-blue-700"
        >Newsletter</NuxtLink
      >
      <NuxtLink
        to="/shopping-list"
        class="mr-4 text-blue-500 hover:text-blue-700"
        >Shopping List</NuxtLink
      >
    </nav>
    <NuxtPage />
  </div>
</template>
