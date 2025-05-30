<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { t } from './locale/i18n';

  let currentSlide = 0;
  let isUserInteracting = false;
  let timeoutRef: ReturnType<typeof setTimeout> | null = null;
  let interval: ReturnType<typeof setInterval> | null = null;

  $: features = [
    {
      title: $t('carousel.0.title'),
      description: $t('carousel.0.desc'),
      image: "/friends-statue.png",
    },
    {
      title: $t('carousel.1.title'),
      description: $t('carousel.1.desc'),
      image: "/cell-statue.png",
    },
    {
      title: $t('carousel.2.title'),
      description: $t('carousel.2.desc'),
      image: "/statue-running.png",
    },
  ];

  function nextSlide() {
    currentSlide = (currentSlide + 1) % features.length;
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + features.length) % features.length;
  }

  function goToSlide(index: number) {
    currentSlide = index;
    resetUserInteractionTimeout();
  }

  function handleNavigation(direction: "prev" | "next") {
    if (direction === "prev") {
      prevSlide();
    } else {
      nextSlide();
    }
    resetUserInteractionTimeout();
  }

  function resetUserInteractionTimeout() {
    isUserInteracting = true;
    if (timeoutRef) clearTimeout(timeoutRef);
    timeoutRef = setTimeout(() => {
      isUserInteracting = false;
    }, 20000);
  }

  onMount(() => {
    if (!isUserInteracting) {
      interval = setInterval(() => {
        if (!isUserInteracting) {
          nextSlide();
        }
      }, 10000);
    }

    return () => {
      if (timeoutRef) clearTimeout(timeoutRef);
      if (interval) clearInterval(interval);
    };
  });
</script>

<main>
  <div class="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-12 px-2 sm:px-4">
    <!-- Texto à esquerda -->
    <div class="flex-1 text-center lg:text-left order-2 lg:order-1">
      <h3 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-6 text-white px-2 sm:px-0">
        {features[currentSlide].title}
      </h3>
      <div class="bg-orange-500 h-1 w-1/2 rounded-lg m-2 mx-auto lg:mx-2"></div>
      <p class="text-base sm:text-lg lg:text-xl opacity-80 mb-4 sm:mb-8 leading-relaxed text-white px-2 sm:px-0">
        {features[currentSlide].description}
      </p>
    </div>

    <div class="flex-col items-center justify-center order-1 lg:order-2">
      <div class="bg-[#D4C4A8] rounded-2xl flex justify-center p-2 sm:p-4">
        <div class="w-48 h-40 sm:w-60 sm:h-48 lg:w-72 lg:h-64 max-w-md relative">
          <img
            src={features[currentSlide].image || "/placeholder.svg"}
            alt={features[currentSlide].title}
            class="object-contain object-bottom w-full h-full"
          />
        </div>
      </div>

      <div class="flex items-center space-x-2 sm:space-x-3 mt-3 sm:mt-4 lg:mt-8 justify-center">
        <button
          class="text-white hover:bg-white/20 p-1.5 sm:p-2 rounded-full cursor-pointer"
          on:click={() => handleNavigation("prev")}
          aria-label="Previous slide"
        >
          <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>

        {#each features as image, index}
          <button
            on:click={() => goToSlide(index)}
            class={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all cursor-pointer ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        {/each}

        <button
          class="text-white hover:bg-white/20 p-1.5 sm:p-2 rounded-full cursor-pointer"
          on:click={() => handleNavigation("next")}
          aria-label="Next slide"
        >
          <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</main>