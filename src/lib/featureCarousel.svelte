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
      image: "./src/public/friends-statue.png",
    },
    {
      title: $t('carousel.1.title'),
      description: $t('carousel.1.desc'),
      image: "./src/public/statue-running.png",
    },
    {
      title: $t('carousel.2.title'),
      description: $t('carousel.2.desc'),
      image: "./src/public/cell-statue.png",
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
  <div class="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-4">
    <!-- Texto à esquerda -->
    <div class="flex-1">
      <h3 class="text-6xl lg:text-6xl font-extrabold mb-6 text-white">
        {features[currentSlide].title}
      </h3>
      <div class="bg-orange-500 h-1 w-1/2 rounded-lg m-2"></div>
      <p class="text-xl opacity-80 mb-8 leading-relaxed text-white">
        {features[currentSlide].description}
      </p>
    </div>

    <div class="flex-col items-center justify-center">
      <div class="bg-[#D4C4A8] rounded-2xl flex justify-center p-4">
        <div class="w-72 max-w-md h-64 relative">
          <img
            src={features[currentSlide].image || "/placeholder.svg"}
            alt={features[currentSlide].title}
            class="object-contain object-bottom w-full h-full"
          />
        </div>
      </div>

      <div class="flex items-center space-x-3 mt-4 lg:mt-8 justify-center">
        <button
          class="text-white hover:bg-white/20 p-2 rounded-full cursor-pointer"
          on:click={() => handleNavigation("prev")}
          aria-label="Previous slide"
        >
          
        </button>

        {#each features as image, index}
          <button
            on:click={() => goToSlide(index)}
            class={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        {/each}

        <button
          class="text-white hover:bg-white/20 p-2 rounded-full cursor-pointer"
          on:click={() => handleNavigation("next")}
          aria-label="Next slide"
        >
          
        </button>
      </div>
    </div>
  </div>
</main>