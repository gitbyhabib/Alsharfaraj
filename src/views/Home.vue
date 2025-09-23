<template>
  <div>
    <Navbar @toggle-mobile-menu="toggleMobileMenu" :mobileMenuOpen="mobileMenuOpen" />

    <Hero />

    <Services />

    <About />

    <Team />

    <Testimonials />

    <Contact />

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Import your components
import Navbar from '../components/client/Navbar.vue'
import Hero from '../components/client/Hero.vue'
import Services from '../components/client/Services.vue'
import About from '../components/client/About.vue'
import Team from '../components/client/Team.vue'
import Testimonials from '../components/client/Testimonials.vue'
import Contact from '../components/client/Contact.vue'
import Footer from '../components/client/Footer.vue'

// State to control mobile menu in Navbar
const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<style>
/* Global custom styles, like nav-link hover */
.nav-link {
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #007bff;
}
</style>
