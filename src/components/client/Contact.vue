<template>
  <section id="contact" class="py-16">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800">Contact Us</h2>
        <p class="text-lg text-gray-600 mt-2">
          Get in touch for a free consultation or any queries.
        </p>
      </div>

      <div class="flex flex-col md:flex-row gap-12">
        <!-- Contact Details + Map -->
        <div class="md:w-1/2">
          <h4 class="text-2xl font-bold mb-4">Contact Details</h4>
          <div class="space-y-4 text-gray-700 mb-6">
            <p><i class="fas fa-map-marker-alt mr-2"></i>S.S Tower, Haji Camp, Askona, Dhaka-1230</p>
            <p><i class="fas fa-phone mr-2"></i> +880 1712498738</p>
            <p><i class="fas fa-envelope mr-2"></i> alsharfaraj2023@gmail.com</p>
          </div>
       <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.072037714363!2d90.40975771844384!3d23.85157557734609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c75df7f862ab%3A0x7a8b6e99b9ed2587!2sS%20S%20Tower!5e0!3m2!1sen!2sbd!4v1757408494174!5m2!1sen!2sbd" width=100% height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <!-- Contact Form -->
        <div class="md:w-1/2">
          <h4 class="text-2xl font-bold mb-4">Send us a message</h4>
          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label class="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                v-model="form.name"
                class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-gray-700 font-medium mb-1">Email address</label>
              <input
                type="email"
                v-model="form.email"
                class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-gray-700 font-medium mb-1">Phone Number (Optional)</label>
              <input
                type="tel"
                v-model="form.phone"
                class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-gray-700 font-medium mb-1">Your Message</label>
              <textarea
                v-model="form.message"
                rows="5"
                class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </form>

          <!-- Status Message -->
          <p v-if="statusMessage" class="mt-4 text-center text-green-600 font-medium">
            {{ statusMessage }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: { name: '', email: '', phone: '', message: '' },
      statusMessage: '',
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('https://your-server-endpoint.com/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form),
        })

        if (!response.ok) throw new Error('Network response was not ok')

        this.statusMessage = 'Thank you! Your message has been sent.'
        this.form = { name: '', email: '', phone: '', message: '' }
      } catch (error) {
        this.statusMessage = 'Oops! Something went wrong. Please try again.'
        console.error(error)
      }
    },
  },
}
</script>
