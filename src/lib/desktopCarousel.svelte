<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let currentSlide = 0;
  let isUserInteracting = false;
  let timeoutRef: ReturnType<typeof setTimeout> | null = null;
  let interval: ReturnType<typeof setInterval> | null = null;

  const appScreens = [
    '/dashboardGYM.jpg',
    '/dashboardGYM2.jpg',
    '/dashboardSTU.jpg',
    '/dashboardSTU2.jpg',
  ];

  function nextSlide() {
    currentSlide = (currentSlide + 1) % appScreens.length;
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + appScreens.length) % appScreens.length;
  }

  function handleNavigation(direction: 'prev' | 'next') {
    if (direction === 'prev') prevSlide();
    else nextSlide();

    isUserInteracting = true;
    if (timeoutRef) clearTimeout(timeoutRef);
    timeoutRef = setTimeout(() => {
      isUserInteracting = false;
    }, 20000);
  }

  onMount(() => {
    interval = setInterval(() => {
      if (!isUserInteracting) nextSlide();
    }, 10000);

    return () => {
      if (interval) clearInterval(interval);
      if (timeoutRef) clearTimeout(timeoutRef);
    };
  });
</script>

<div class="flex items-center justify-between max-w-6xl mx-auto">
  <button
    class="text-white hover:bg-white/20 flex-shrink-0 p-2 rounded-full"
    on:click={() => handleNavigation('prev')}
    aria-label="Previous app screen"
  >
    <i class="mi mi-chevron-left"><span class="u-sr-only"></span></i>
  </button>

  <div class="flex-1 mx-8 lg:mx-16 text-center">
    <div class="flex justify-center">
      <img
        src={appScreens[currentSlide]}
        alt="WEB app interface"
        class="object-cover rounded-2xl max-h-[600px] max-w-full"
        width="1000"
        height="800"
      />
    </div>
  </div>

  <button
    class="text-white hover:bg-white/20 flex-shrink-0 p-2 rounded-full"
    on:click={() => handleNavigation('next')}
    aria-label="Next app screen"
  >
    <i class="mi mi-chevron-right"><span class="u-sr-only"></span></i>
  </button>
</div>
