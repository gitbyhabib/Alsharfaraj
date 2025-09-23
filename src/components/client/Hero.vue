<template>
  <header id="hero" class="relative hero-section text-white text-center py-40">
    <div class="video-background-container">
      <iframe 
        src="https://www.youtube.com/embed/Mf_nGEPIsQ8?autoplay=1&mute=1&loop=1&playlist=Mf_nGEPIsQ8&controls=0&modestbranding=1&rel=0"
        title="Travel Agency Video Background"
        frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="youtube-iframe">
      </iframe>
    </div>
    
    <div class="absolute inset-0 bg-black opacity-60"></div>

    <div class="container mx-auto px-4 relative z-10">
      <h1 class="text-5xl font-extrabold leading-tight">Your Gateway to Global Opportunities</h1>
      <p class="text-xl mt-4 max-w-2xl mx-auto">
        We are the leading travel and consultancy agency in Bangladesh, specializing in visa services, work permits, air tickets, and study abroad programs.
      </p>
      <a href="#contact" class="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-full mt-8 hover:bg-blue-700 transition duration-300">
        Get a Free Consultation <i class="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  </header>
</template>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
}

.video-background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.youtube-iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* New CSS for full-page video */
  width: 150vw;
  height: 150vh;
}
</style>