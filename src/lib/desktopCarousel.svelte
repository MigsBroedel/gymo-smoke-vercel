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

  function goToSlide(index: number) {
    currentSlide = index;
    isUserInteracting = true;
    if (timeoutRef) clearTimeout(timeoutRef);
    timeoutRef = setTimeout(() => {
      isUserInteracting = false;
    }, 20000);
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

<div class="w-full">
  <!-- Layout Desktop (lg+) -->
  <div class="hidden lg:flex items-center justify-between max-w-6xl mx-auto">
    <button
      class="text-white hover:bg-white/20 flex-shrink-0 p-2 rounded-full transition-colors"
      on:click={() => handleNavigation('prev')}
      aria-label="Previous app screen"
    >
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </button>

    <div class="flex-1 mx-8 lg:mx-16 text-center">
      <div class="flex justify-center">
        <img
          src={appScreens[currentSlide]}
          alt="WEB app interface"
          class="object-cover rounded-2xl max-h-[600px] max-w-full shadow-lg"
          width="1000"
          height="800"
        />
      </div>
    </div>

    <button
      class="text-white hover:bg-white/20 flex-shrink-0 p-2 rounded-full transition-colors"
      on:click={() => handleNavigation('next')}
      aria-label="Next app screen"
    >
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>

  <!-- Layout Mobile/Tablet (até lg) -->
  <div class="lg:hidden px-2 sm:px-4">
    <!-- Imagem Principal -->
    <div class="text-center mb-4">
      <img
        src={appScreens[currentSlide]}
        alt="WEB app interface"
        class="object-cover  sm:rounded-2xl max-h-48 sm:max-h-64 md:max-h-80 w-full shadow-lg"
      />
    </div>

    <!-- Controles de Navegação -->
    <div class="flex items-center justify-center gap-4 sm:gap-6">
      <!-- Botão Anterior -->
      <button
        class="text-white hover:bg-white/20 flex-shrink-0 p-1.5 sm:p-2 rounded-full transition-colors border border-white/30"
        on:click={() => handleNavigation('prev')}
        aria-label="Previous app screen"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>

      <!-- Indicadores de Slide -->
      <div class="flex items-center gap-2">
        {#each appScreens as _, index}
          <button
            on:click={() => goToSlide(index)}
            class={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all cursor-pointer ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        {/each}
      </div>

      <!-- Botão Próximo -->
      <button
        class="text-white hover:bg-white/20 flex-shrink-0 p-1.5 sm:p-2 rounded-full transition-colors border border-white/30"
        on:click={() => handleNavigation('next')}
        aria-label="Next app screen"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <!-- Contador de Slides (apenas mobile) -->
    <div class="text-center mt-3 sm:hidden">
      <span class="text-white/70 text-sm">
        {currentSlide + 1} / {appScreens.length}
      </span>
    </div>
  </div>
</div>