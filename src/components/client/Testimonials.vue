<template>
  <section id="testimonials" class="py-16 bg-gray-100">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800">What Our Clients Say</h2>
        <p class="text-lg text-gray-600 mt-2">
          Trusted by thousands of happy clients across Bangladesh.
        </p>
      </div>

      <div class="relative max-w-3xl mx-auto min-h-[250px]">
        <!-- fixed min height -->

        <!-- Single testimonial with transition -->
        <transition name="fade" mode="out-in">
          <div :key="currentIndex" class="bg-white p-8 rounded-lg shadow-md text-center">
            <p class="text-xl italic text-gray-700">"{{ testimonials[currentIndex].message }}"</p>
            <div class="mt-6">
              <cite class="font-semibold text-lg text-gray-800 not-italic">{{
                testimonials[currentIndex].name
              }}</cite>
              <span class="block text-gray-500">{{ testimonials[currentIndex].designation }}</span>
            </div>
          </div>
        </transition>

        <!-- Navigation Buttons (transparent) -->
        <button
          @click="prev"
          class="absolute left-0 top-1/3 -translate-y-1/2 text-gray-700 p-2 transition"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <button
          @click="next"
          class="absolute right-0 top-1/3 -translate-y-1/2 text-gray-700 p-2 transition"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <!-- Dots -->
      <div class="flex justify-center mt-6 space-x-2">
        <span
          v-for="(testimonial, index) in testimonials"
          :key="'dot-' + index"
          @click="goTo(index)"
          :class="{
            'w-3 h-3 rounded-full cursor-pointer border': true,
            'bg-gray-700': currentIndex === index,
            'bg-gray-400': currentIndex !== index,
          }"
        ></span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TestimonialSlider',
  data() {
    return {
      currentIndex: 0,
      testimonials: [
        {
          name: 'Jane Doe',
          designation: 'Client, Dhaka',
          message:
            "I couldn't be happier with the service. They handled my visa application with professionalism and efficiency. Highly recommended!",
        },
        {
          name: 'John Smith',
          designation: 'Client, Chittagong',
          message:
            'Excellent guidance throughout my study abroad process. Friendly and professional team!',
        },
        {
          name: 'Ayesha Rahman',
          designation: 'Client, Sylhet',
          message: 'Quick and reliable service for visa processing. Truly a trustworthy agency.',
        },
        {
          name: 'Rafiq Islam',
          designation: 'Client, Khulna',
          message:
            'They made my work permit process seamless. Highly recommended for international jobs.',
        },
      ],
    }
  },
  mounted() {
    this.startAutoSlide()
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  methods: {
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length
    },
    prev() {
      this.currentIndex =
        (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length
    },
    goTo(index) {
      this.currentIndex = index
    },
    startAutoSlide() {
      this.timer = setInterval(() => {
        this.next()
      }, 5000)
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
