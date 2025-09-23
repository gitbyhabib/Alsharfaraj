<template>
  <section id="team" class="py-16 bg-gray-100">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800">Meet Our Team</h2>
        <p class="text-lg text-gray-600 mt-2">
          Our dedicated professionals are here to guide you every step of the way.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <!-- Team Member Cards -->
        <div
          v-for="(member, index) in team"
          :key="index"
          class="team-member bg-white rounded-lg shadow-md p-8 transition duration-300 hover:-translate-y-2"
        >
          <img
            :src="member.photo"
            :alt="member.name"
            class="w-40 h-40 object-cover rounded-full mx-auto mb-4 border-4 border-blue-600"
          />
          <h5 class="text-xl font-semibold text-gray-800">{{ member.name }}</h5>
          <p class="text-gray-500">{{ member.role }}</p>
          <div class="space-y-1 mt-2 text-gray-600">
            <a :href="`mailto:${member.email}`" class="block hover:text-blue-600 transition-colors">
              <i class="fas fa-envelope mr-2"></i> {{ member.email }}
            </a>
            <a :href="`tel:${member.phone}`" class="block hover:text-blue-600 transition-colors">
              <i class="fas fa-phone mr-2"></i> {{ member.phone }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TeamSection',
  data() {
    return {
      team: [
        {
          photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          name: 'Mr. Rashid Khan',
          role: 'CEO & Founder',
          email: 'rashid.k@yourcompany.com',
          phone: '+8801234567891',
        },
        {
          photo: 'https://images.unsplash.com/photo-1627161683077-e34782c24d81?q=80&w=703&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          name: 'Ms. Fatima Akhter',
          role: 'Head of Visa Services',
          email: 'fatima.a@yourcompany.com',
          phone: '+8801234567892',
        },
        {
          photo: 'https://images.unsplash.com/photo-1605599355426-c671ba78fdab?q=80&w=636&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          name: 'Mr. Karim Ahmed',
          role: 'Study Abroad Consultant',
          email: 'karim.a@yourcompany.com',
          phone: '+8801234567893',
        },
      ],
    }
  },
}
</script>

<style scoped>
/* optional scoped styling */
</style>
