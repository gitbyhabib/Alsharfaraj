<template>
  <div
    class="bg-white rounded-lg shadow-md p-8 text-center transition duration-300 hover:-translate-y-2"
  >
    <div class="text-blue-600 text-5xl mb-4">
      <i :class="['fas', icon]"></i>
    </div>
    <h5 class="text-xl font-semibold mb-2">{{ title }}</h5>
    <p class="text-gray-500">{{ description }}</p>
    <a href="#" class="inline-block text-blue-600 font-semibold mt-4 hover:underline">
      {{ linkText }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'ServiceCard',
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    linkText: { type: String, required: true },
  },
}
</script>
