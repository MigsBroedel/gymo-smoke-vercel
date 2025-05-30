<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { t } from './locale/i18n'; // exemplo, importe sua função de tradução

  let currentSlide = 0;
  let isUserInteracting = false;
  let timeoutRef: ReturnType<typeof setTimeout> | null = null;
  let intervalRef: ReturnType<typeof setInterval> | null = null;

  const appScreens = [
    {
      title: $t('appCarousel.0.title'),
      description: $t('appCarousel.0.desc'),
      mockup: `<img src="/homemobile.png" alt="Mobile app interface" class="object-cover rounded-2xl border-2 border-black w-48 h-90 sm:w-60 sm:h-1/2 lg:w-2/3 lg:h-5/6" />`,
    },
    {
      title: $t('appCarousel.1.title'),
      description: $t('appCarousel.1.desc'),
      mockup: `<img src="/social-mobile.png" alt="Mobile interface" class="object-cover rounded-2xl border-2 border-black w-48 h-90 sm:w-60 sm:h-1/2 lg:w-2/3 lg:h-5/6" />`,
    }
  ];

  function nextSlide() {
    currentSlide = (currentSlide + 1) % appScreens.length;
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + appScreens.length) % appScreens.length;
  }

 function handleNavigation(direction: "prev" | "next") {
    if (direction === "prev") {
      prevSlide();
    } else {
      nextSlide();
    }
    isUserInteracting = true;

    if (timeoutRef) clearTimeout(timeoutRef);
    timeoutRef = setTimeout(() => {
      isUserInteracting = false;
    }, 20000);
  }

  // Essa declaração reativa precisa ficar no topo do script, fora do onMount
  $: {
    // Sempre que isUserInteracting mudar, limpa e reinicia o intervalo
    if (intervalRef) clearInterval(intervalRef);

    if (!isUserInteracting) {
      intervalRef = setInterval(nextSlide, 10000);
    }
  }

  onMount(() => {
    // Apenas inicializa o intervalo (já está na declaração reativa, mas aqui garantimos a criação inicial)
    if (!isUserInteracting && !intervalRef) {
      intervalRef = setInterval(nextSlide, 10000);
    }

    return () => {
      if (timeoutRef) clearTimeout(timeoutRef);
      if (intervalRef) clearInterval(intervalRef);
    };
  });
</script>

<style>
  /* coloque seu estilo aqui, se necessário */
</style>

<main>
  <div class="flex flex-col lg:flex-row items-center justify-between max-w-8xl mx-auto px-2 sm:px-4 gap-6 lg:gap-0">
    
    <!-- Seção de Texto -->
    <div class="flex-1 flex-col justify-between text-white w-full order-2 lg:order-1 text-center lg:text-left px-2 sm:px-4 lg:pl-16 lg:pr-32 lg:px-32">
      <h3 class="text-xl sm:text-2xl lg:text-5xl font-bold mb-3 sm:mb-6 leading-tight">
        {appScreens[currentSlide].title}
      </h3>
      <p class="text-base sm:text-lg lg:text-3xl opacity-90 mb-4 sm:mb-8 leading-relaxed max-w-4xl mx-auto lg:max-w-none lg:mx-0">
        {appScreens[currentSlide].description}
      </p>
    </div>

    <!-- Seção do Carousel com Imagem -->
    <div class="flex flex-col items-center justify-center order-1 lg:order-2 w-full lg:w-auto">
      <!-- Controles + Imagem em linha no mobile, verticais no desktop -->
      <div class="flex flex-row lg:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 w-full max-w-sm lg:max-w-none">
        
        <!-- Botão Anterior -->
        <button
          class="text-white hover:bg-white/20 flex-shrink-0 flex justify-center items-center border-2 border-gray-700 h-6 w-6 sm:h-8 sm:w-8 rounded-lg transition-colors"
          on:click={() => handleNavigation('prev')}
          aria-label="Previous app screen"
        >
          <i class="mi mi-chevron-left text-xs sm:text-sm"><span class="u-sr-only"></span></i>
        </button>

        <!-- Imagem Central -->
        <div class="flex justify-center flex-shrink-0">
          {@html appScreens[currentSlide].mockup}
        </div>

        <!-- Botão Próximo -->
        <button
          class="text-white hover:bg-white/20 flex-shrink-0 flex justify-center items-center border-2 border-gray-700 h-6 w-6 sm:h-8 sm:w-8 rounded-lg transition-colors"
          on:click={() => handleNavigation('next')}
          aria-label="Next app screen"
        >
          <i class="mi mi-chevron-right text-xs sm:text-sm"><span class="u-sr-only"></span></i>
        </button>
      </div>

      <!-- Indicadores de slide (apenas no mobile/tablet) -->
      <div class="flex items-center justify-center gap-2 mt-4 lg:hidden">
        {#each appScreens as _, index}
          <button
            on:click={() => { currentSlide = index; }}
            class={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all cursor-pointer ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        {/each}
      </div>
    </div>
  </div>
</main>