<template>
  <nav class="bg-gray-100 sticky top-0 z-50 shadow-md">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <a class="text-2xl font-bold text-blue-600" href="#">Al Sharfaraj Overseas</a>
      <div class="hidden md:flex space-x-6">
        <a class="nav-link text-gray-800 font-medium" href="#hero">Home</a>
        <a class="nav-link text-gray-800 font-medium" href="#services">Services</a>
        <a class="nav-link text-gray-800 font-medium" href="#about">About Us</a>
        <a class="nav-link text-gray-800 font-medium" href="#team">Our Team</a>
        <a class="nav-link text-gray-800 font-medium" href="#contact">Contact</a>
      </div>
      <button class="md:hidden text-gray-800 text-2xl" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </button>
    </div>
    <div v-show="isOpen" class="md:hidden bg-gray-100">
      <div class="flex flex-col items-center py-4 space-y-2">
        <a class="nav-link text-gray-800 font-medium hover:text-blue-600" href="#hero">Home</a>
        <a class="nav-link text-gray-800 font-medium hover:text-blue-600" href="#services">Services</a>
        <a class="nav-link text-gray-800 font-medium hover:text-blue-600" href="#about">About Us</a>
        <a class="nav-link text-gray-800 font-medium hover:text-blue-600" href="#team">Our Team</a>
        <a class="nav-link text-gray-800 font-medium hover:text-blue-600" href="#contact">Contact</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style>
.nav-link {
  transition: color 0.3s ease-in-out;
}
.nav-link:hover {
  color: #007BFF;
}
</style>
