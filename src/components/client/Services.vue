<template>
  <section id="services" class="py-16">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800">Our Comprehensive Services</h2>
        <p class="text-lg text-gray-600 mt-2">
          A one-stop solution for all your international travel and career needs.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ServiceCard
          v-for="(service, index) in services"
          :key="index"
          :icon="service.icon"
          :title="service.title"
          :description="service.description"
          :linkText="service.linkText"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ServiceCard from './ServiceCard.vue'

export default {
  components: { ServiceCard },
  data() {
    return {
      services: [
        {
          icon: 'fa-passport',
          title: 'Visa Processing',
          description:
            'Expert assistance for tourist, business, and visit visas to over 50 countries.',
          linkText: 'Learn More',
        },
        {
          icon: 'fa-briefcase',
          title: 'Work Permits & Manpower',
          description:
            'We connect skilled and unskilled manpower with reputable international employers.',
          linkText: 'Learn More',
        },
        {
          icon: 'fa-plane',
          title: 'Air Ticketing',
          description:
            'Affordable and convenient flight booking services for both domestic and international travel.',
          linkText: 'Book Now',
        },
        {
          icon: 'fa-graduation-cap',
          title: 'Study Abroad',
          description:
            'Your trusted partner for pursuing higher education in top universities worldwide.',
          linkText: 'Learn More',
        },
      ],
    }
  },
}
</script>
