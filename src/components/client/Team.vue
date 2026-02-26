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

<script lang="ts">
import b1 from '../../assets/team/b1.png'
import b2 from '../../assets/team/b2.png' 
import b3 from '../../assets/team/b3.png'
export default {
  name: 'TeamSection',
  data() {
    return {
      team: [
        {
          photo: b1,
          name: 'Md. Afaj Uddin',
          role: 'CEO & Founder',
          email: 'afajtradeinternational2022@gmail.com',
          phone: '+8801511361847',
        },
        {
          photo: b2,
          name: 'Md. Mahbub Rahman',
          role: 'Head of Services',
          email: 'apontravels2023@gmail.com',
          phone: '+8801712498738',
        },
        {
                 photo: b3,

                  name: 'Md. Momin Ali',
          role: 'Study Abroad Consultant',
          email: 'alsharfaraj2023@gmail.com',
          phone: '+8801823133426',
        },
      ],
    }
  },
}
</script>

<style scoped>
/* optional scoped styling */
</style>
