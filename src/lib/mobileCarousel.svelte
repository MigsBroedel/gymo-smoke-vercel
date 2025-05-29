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
      mockup: `<img src="./src/public/mobile-app.png" alt="Mobile app interface" class="object-cover rounded-2xl border-2 border-black" width="300" height="300" />`,
    },
    {
      title: $t('appCarousel.1.title'),
      description: $t('appCarousel.1.desc'),
      mockup: `<img src="./src/public/social-mobile.png" alt="Mobile app interface" class="object-cover rounded-2xl border-2 border-black" width="300" height="300" />`,
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
  <div class="flex flex-col lg:flex-row items-center justify-between max-w-8xl mx-auto">
  <div class="flex-1 flex-col justify-between text-white w-full pl-16 pr-32 px-32">
    <h3 class="text-2xl lg:text-5xl font-bold mb-6 leading-tight">
      {appScreens[currentSlide].title}
    </h3>
    <p class="text-lg lg:text-3xl opacity-90 mb-8 leading-relaxed max-w-4xl lg:max-w-none lg:mx-0">
      {appScreens[currentSlide].description}
    </p>
  </div>

  <div class="flex items-center justify-between mx-auto">
    <button
      class="text-white hover:bg-white/20 flex-shrink-0 flex justify-center items-center border-2 border-gray-700 h-8 w-8 rounded-lg"
      on:click={() => handleNavigation('prev')}
      aria-label="Previous app screen"
    >
      <i class="mi mi-chevron-left"><span class="u-sr-only"></span></i>
    </button>

    <div class="flex justify-center mx-4">
      {@html appScreens[currentSlide].mockup}
    </div>

    <button
      class="text-white hover:bg-white/20 flex-shrink-0 flex justify-center items-center border-2 border-gray-700 h-8 w-8 rounded-lg"
      on:click={() => handleNavigation('next')}
      aria-label="Next app screen"
    >
      <i class="mi mi-chevron-right"><span class="u-sr-only"></span></i>
    </button>
  </div>
</div>


</main>