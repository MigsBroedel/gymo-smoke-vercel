<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { t, locale } from './locale/i18n';
    import { analytics, logEvent } from '$lib/config.firebase';

      let email = "";
    let name = "";
    let whoami = "";
    let isSubmitted = false;
    let isLoading = false;

    console.log(locale, t)

    

    

    

    // @ts-ignore
    async function handleSubmit(event) {
        event.preventDefault();
        if (!email || !name) return;
        isLoading = true;
        try {
            const response = await fetch(import.meta.env.API_URI, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, whoami }) // ajust to structure backend + add language space
            });
            const result = await response.json();

        } catch (error) {
            console.error('API error:', error);
        }

        isLoading = false;
        isSubmitted = true;

        if (analytics) {
      logEvent(analytics, 'formulario_enviado', {
        nome_preenchido: name !== '',
        email_preenchido: email !== ''
        
      });
      console.log("📡 Evento 'form' disparado");
        }
        setTimeout(() => {
            email = "";
            name = "";
            isSubmitted = false;
        }, 3000);
    }
  
</script>

<main>
    <div class="bg-white rounded-lg shadow-lg p-8 mb-16">
                <div class="text-center mb-8">
                    <h2 class="text-2xl font-bold text-gray-900 mb-3">
                        {$t('homepage.signup.title')}
                    </h2>
                    <p class="text-gray-600 text-sm">
                        {$t('homepage.signup.subtitle')}
                    </p>
                </div>

                {#if isSubmitted}
                    <div class="text-center py-8">
                        <div class="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg
                                class="w-8 h-8 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            {$t('homepage.signup.success.title')}
                        </h3>
                        <p class="text-gray-600 text-sm">
                            {$t('homepage.signup.success.desc')}
                        </p>
                    </div>
                {:else}
                    <form onsubmit={handleSubmit} class="space-y-4">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                                {$t('homepage.signup.form.name')}
                            </label>
                            <input id="name" type="text" bind:value={name} placeholder={$t('homepage.signup.form.namePlaceholder')} required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                        </div>
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                                {$t('homepage.signup.form.email')}
                            </label>
                            <input id="email" type="email" bind:value={email} placeholder={$t('homepage.signup.form.emailPlaceholder')} required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                        </div>
                        <div>
                            <label for="whoami" class="block text-sm font-medium text-gray-700 mb-1">
                                {$t('homepage.signup.form.whoami')}
                            </label>
                            <select id="whoami" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" required bind:value={whoami}>
                                <option value="" disabled selected>{$t('homepage.signup.form.whoamiPlaceholder')}</option>
                                <option value="coach">{$t('homepage.signup.form.coach')}</option>
                                <option value="athlete">{$t('homepage.signup.form.athlete')}</option>
                                <option value="other">{$t('homepage.signup.form.other')}</option>
                            </select>
                        </div>
                        <button type="submit" disabled={isLoading || !email || !name} class="w-full bg-orange-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            {#if isLoading}
                                <span class="flex items-center justify-center">
                                    <svg
                                        class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            class="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            stroke-width="4"
                                        ></circle>
                                        <path
                                            class="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    {$t('homepage.signup.form.loading')}
                                </span>
                            {:else}
                                {$t('homepage.signup.form.cta')}
                            {/if}
                        </button>
                    </form>
                {/if}

                <div class="mt-6 text-center">
                    <p class="text-xs text-gray-500">
                        {$t('homepage.signup.note')}
                    </p>
                </div>
                
            </div>
</main>