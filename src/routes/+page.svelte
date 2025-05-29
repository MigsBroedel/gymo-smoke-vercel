<script lang="ts">
    import FeatureCarousel from "$lib/featureCarousel.svelte";
    import { t, locale } from "$lib/locale/i18n";
    import MobileCarousel from "$lib/mobileCarousel.svelte";
    import { onMount } from 'svelte';
    import { analytics, logEvent } from '$lib/config.firebase';
    import DesktopCarousel from "$lib/desktopCarousel.svelte";
    import Form from "$lib/form.svelte";

    onMount(() => {
    if (analytics != null) {
      logEvent(analytics, 'visit_site');
      console.log("📡 Evento 'visit_site' disparado");
    }
  });



    function scrollToSignup() {
        const signupSection = document.getElementById("signup");
        if (signupSection) {
            signupSection.scrollIntoView({ behavior: "smooth" });
        }
    }

    function toggleLocale() {
        locale.update(l => l === 'en' ? 'pt' : 'en');
    }
</script>



<!-- Language Switcher -->
<div class="fixed top-4 right-4 z-50 flex items-center gap-2">
    <button
        onclick={toggleLocale}
        class="focus:outline-none text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-gray-900"
    >
        {$t('homepage.language.switch')}
        
    </button>
</div>

<div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="min-h-screen bg-gradient-to-br from-gray-800 to-orange-500 flex items-center justify-center px-4">

        <div class="absolute inset-0 -z-0">
          <img
            src="./src/public/gradient-background.png"
            alt="Gradient background"
            class="w-full h-full object-cover absolute top-0 left-0 z-0"
          />
        </div>

        <div class="flex flex-row justify-around items-center">


            <div class="-z-0">
                <img
                    src="./src/public/note-statue.png"
                    alt="Gradient background"
                    width="500"
                    height="650"
                    class="object-cover"
                />

            </div>

            <div class="max-w-5xl mx-auto text-center -z-0">
                <!-- Logo/Brand -->
                <div class="w-16 h-16 bg-orange-600 rounded-xl mx-auto mb-8 flex items-center justify-center">
                    <svg
                        class="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </svg>
                </div>

                <h1 class="text-6xl md:text-7xl font-bold text-white mb-6">
                    GYMO
                </h1>

                <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
                    {@html $t('homepage.hero.title')}
                </h1>
                <p class="text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed">
                    {@html $t('homepage.hero.subtitle')}
                </p>
                <button
                    onclick={scrollToSignup}
                    class="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors shadow-lg"
                >
                    {$t('homepage.hero.cta')}
                </button>
                <p class="text-sm text-gray-500 mt-4">
                    {$t('homepage.hero.note')}
                </p>
            </div>
        </div>
    </section>

    <!-- Benefits Section -->
    <section class=" bg-[#252422] flex items-center justify-center px-4 py-32">
        <div class="max-w-6xl mx-auto w-full">
            <FeatureCarousel />
        </div>
    </section>

    <!-- How It Works Section -->
    <section class="min-h-screen bg-gradient-to-br from-orange-500 to-gray-800 flex items-center justify-center px-4">
        <div class="max-w-4xl mx-auto w-full">
            <MobileCarousel />
        </div>
    </section>

    <!-- Platform Preview Section -->
    <section class="min-h-screen bg-[#252422] flex items-center justify-center px-4">
        <div class="max-w-6xl mx-auto w-full">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-50 mb-4">
                    {$t('homepage.preview.title')}
                </h2>
                <p class="text-gray-200 text-lg">
                    {$t('homepage.preview.subtitle')}
                </p>
            </div>

            <div class="bg-gray-500 rounded-2xl shadow-2xl overflow-hidden py-4 ">
                <DesktopCarousel />
                
                
            </div>

            <div class="text-center mt-8">
                <p class="text-gray-400 mb-4">
                    {$t('homepage.preview.note')}
                </p>
                <button
                    onclick={scrollToSignup}
                    class="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                    {$t('homepage.preview.cta')}
                </button>
            </div>
        </div>
    </section>

    <!-- Signup Section -->
    <section id="signup" class="min-h-screen bg-gradient-to-br from-indigo-50 to-orange-50 flex items-center justify-center px-4">
        
        <div class="max-w-md mx-auto w-full py-5">
            <div>
                <img
                    src="./src/public/db-statue.png"
                    alt="Big Biceps"
                    width="500"
                    height="650"
                    class="object-cover"
                />
                <Form />
            </div>
        </div>
    </section>

    <footer class="bg-zinc-900 h-32 flex-col justify-center items-center text-white text-center font-bold">
        <div class=" text-gray-400 pt-5">
          <p class="font-bold text-xl">{$t('footer.contact')} </p>
          <p><a class="text-orange-500" href="mailto:miguel.broedel09@gmail.com">Email</a></p>
          <p><a class="text-orange-500" href="https://www.linkedin.com/in/miguel-broedel-dos-santos-9b54952a6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">Linkedin</a></p>
        </div>
      </footer>
</div>
