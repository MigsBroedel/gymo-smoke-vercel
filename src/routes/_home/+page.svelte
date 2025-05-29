<script lang="ts">
    export let columnData = [
        {
            title: "Empresa",
            links: ["Sobre nós", "Carreiras", "Blog", "Imprensa"],
        },
        {
            title: "Recursos",
            links: ["Treinos", "Nutrição", "Comunidade", "Aplicativo"],
        },
        {
            title: "Suporte",
            links: ["Ajuda", "Contato", "Relatar bugs", "Termos de uso"],
        },
    ];
</script>

<main>
    <div
        class="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-orange-600"
    >
        <header class="container mx-auto px-4 py-6">
            <nav class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="h-8 w-8 text-white"></div>
                    <span class="text-2xl font-bold text-white">GYMO</span>
                </div>
                <div class="hidden md:flex items-center space-x-6">
                    <a
                        href="#features"
                        class="text-white/90 hover:text-white transition-colors"
                    >
                        Recursos
                    </a>
                    <a
                        href="#pricing"
                        class="text-white/90 hover:text-white transition-colors"
                    >
                        Planos
                    </a>
                    <a
                        href="#about"
                        class="text-white/90 hover:text-white transition-colors"
                    >
                        Sobre nós
                    </a>
                    <a
                        href="#contact"
                        class="text-white/90 hover:text-white transition-colors"
                    >
                        Contato
                    </a>
                </div>
                <div class="flex items-center gap-4">
                    <div class="btn">Entrar</div>
                    <div class="btn">Cadastrar</div>
                </div>
            </nav>
        </header>

        <section class="container mx-auto px-4 py-16 md:py-24">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div class="space-y-6">
                    <div
                        class="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-sm font-medium"
                    >
                        Revolucionando seu treino
                    </div>
                    <h1 class="text-5xl md:text-7xl font-bold text-white">
                        GYMO
                    </h1>
                    <p class="text-xl md:text-2xl text-white/90">
                        Treino e tecnologia juntos para transformar seu corpo e
                        sua vida
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 pt-4">
                        <div class="btn">Começar agora ></div>
                        <div class="btn btn-ghost">Conhecer planos</div>
                    </div>
                    <div class="flex items-center gap-4 pt-4">
                        <div class="flex -space-x-2">
                            <div class="flex -space-x-2">
                                {#each [1, 2, 3, 4] as i}
                                    <div
                                        class="w-8 h-8 rounded-full bg-orange-300 border-2 border-orange-800 flex items-center justify-center text-xs font-bold text-orange-800"
                                    >
                                        {i}
                                    </div>
                                {/each}
                            </div>
                        </div>
                        <p class="text-white/90">+2000 usuários ativos</p>
                    </div>
                </div>
                <div
                    class="relative h-[400px] md:h-[500px] flex items-center justify-center"
                >
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-700/20 rounded-2xl backdrop-blur-sm"
                    ></div>
                    <img
                        src="/sculpture.png"
                        alt="sculpture"
                        class="relative z-10 h-full w-full object-cover rounded-2xl"
                    />
                </div>
            </div>
        </section>

        <section id="features" class="container mx-auto px-4 py-16 md:py-24">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                    Por que escolher o GYMO?
                </h2>
                <p class="text-white/80 max-w-2xl mx-auto">
                    Nossa plataforma combina tecnologia avançada com
                    metodologias de treinamento comprovadas para oferecer
                    resultados excepcionais.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                {#each [{ title: "Treinos Personalizados", description: "Algoritmos inteligentes que adaptam seus treinos com base no seu progresso e objetivos." }, { title: "Comunidade Ativa", description: "Conecte-se com outros membros, compartilhe conquistas e mantenha-se motivado." }, { title: "Planejamento Inteligente", description: "Organize sua rotina de treinos e acompanhe seu progresso em tempo real." }] as feature, index}
                    <div
                        class="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors"
                    >
                        <div
                            class="bg-white/20 w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4"
                        ></div>
                        <h3 class="text-xl font-bold text-white mb-2">
                            {feature.title}
                        </h3>
                        <p class="text-white/80">{feature.description}</p>
                    </div>
                {/each}
            </div>
        </section>

        <section class="container mx-auto px-4 py-16 md:py-24">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                    Histórias de sucesso
                </h2>
                <p class="text-white/80 max-w-2xl mx-auto">
                    Veja o que nossos usuários estão dizendo sobre suas
                    transformações com o GYMO.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each [1, 2, 3] as i}
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                        <div class="flex items-center gap-4 mb-4">
                            <div
                                class="w-12 h-12 rounded-full bg-orange-300 flex items-center justify-center text-orange-800 font-bold"
                            >
                                {i}
                            </div>
                            <div>
                                <h4 class="text-white font-medium">
                                    Usuário {i}
                                </h4>
                                <p class="text-white/60 text-sm">
                                    Membro há {i}
                                    {i === 1 ? "ano" : "anos"}
                                </p>
                            </div>
                        </div>
                        <p class="text-white/80 mb-4">
                            "O GYMO transformou completamente minha abordagem de
                            fitness. Os treinos personalizados e o
                            acompanhamento constante fizeram toda a diferença
                            nos meus resultados."
                        </p>
                        <div class="flex items-center gap-1 text-yellow-400">
                            <div class="rating">
                                <div
                                    class="mask mask-star"
                                    aria-label="1 star"
                                ></div>
                                <div
                                    class="mask mask-star"
                                    aria-label="2 star"
                                ></div>
                                <div
                                    class="mask mask-star"
                                    aria-label="3 star"
                                ></div>
                                <div
                                    class="mask mask-star"
                                    aria-label="4 star"
                                ></div>
                                <div
                                    class="mask mask-star"
                                    aria-label="5 star"
                                    aria-current="true"
                                ></div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </section>

        <section id="pricing" class="container mx-auto px-4 py-16 md:py-24">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                    Planos que cabem no seu bolso
                </h2>
                <p class="text-white/80 max-w-2xl mx-auto">
                    Escolha o plano ideal para seus objetivos e comece sua
                    transformação hoje mesmo.
                </p>
            </div>

            <div
                class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
                {#each [{ name: "Básico", price: "R$29", features: ["Treinos básicos", "Acompanhamento semanal", "Acesso ao app"] }, { name: "Premium", price: "R$59", features: ["Treinos personalizados", "Acompanhamento diário", "Acesso ao app", "Suporte nutricional", "Comunidade VIP"], popular: true }, { name: "Pro", price: "R$99", features: ["Treinos avançados", "Coach dedicado", "Acesso ao app", "Plano nutricional completo", "Comunidade VIP", "Consultas exclusivas"] }] as plan, index}
                    <div
                        class={`rounded-xl p-6 ${
                            plan.popular
                                ? "bg-white text-orange-800 shadow-lg shadow-orange-900/20"
                                : "bg-white/10 backdrop-blur-sm text-white"
                        }`}
                    >
                        {#if plan.popular}
                            <div
                                class="bg-orange-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full inline-block mb-4"
                            >
                                Mais popular
                            </div>
                        {/if}
                        <h3
                            class={`text-2xl font-bold ${plan.popular ? "text-orange-800" : "text-white"} mb-2`}
                        >
                            {plan.name}
                        </h3>
                        <div class="flex items-end gap-1 mb-4">
                            <span
                                class={`text-3xl font-bold ${plan.popular ? "text-orange-800" : "text-white"}`}
                            >
                                {plan.price}
                            </span>
                            <span
                                class={`${plan.popular ? "text-orange-800/70" : "text-white/70"} mb-1`}
                            >
                                /mês
                            </span>
                        </div>
                        <ul class="space-y-3 mb-6">
                            {#each plan.features as feature, i}
                                <li class="flex items-center gap-2">
                                    <div
                                        class={`h-4 w-4 ${plan.popular ? "text-orange-600" : "text-white/60"}`}
                                    >
                                        >
                                    </div>
                                    <span
                                        class={plan.popular
                                            ? "text-orange-800/90"
                                            : "text-white/80"}
                                    >
                                        {feature}
                                    </span>
                                </li>
                            {/each}
                        </ul>
                        <div
                            class={`btn btn-block ${
                                plan.popular
                                    ? "bg-orange-600 text-white hover:bg-orange-700"
                                    : "bg-white/20 text-white hover:bg-white/30"
                            }`}
                        >
                            Começar agora
                        </div>
                    </div>
                {/each}
            </div>
        </section>

        <section class="container mx-auto px-4 py-16 md:py-24">
            <div
                class="bg-gradient-to-r from-orange-700 to-orange-600 rounded-2xl p-8 md:p-12"
            >
                <div class="max-w-3xl mx-auto text-center">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                        Pronto para transformar seu corpo?
                    </h2>
                    <p class="text-white/90 mb-8 text-lg">
                        Junte-se a milhares de pessoas que já estão alcançando
                        seus objetivos com o GYMO.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <div class="btn">Cadastrar agora ></div>
                        <div class="btn btn-outline">
                            Falar com um consultor
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer class="container mx-auto px-4 py-12 border-t border-white/10">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center gap-2 mb-4">
                        <span class="h-6 w-6 text-white">🏋️</span>
                        <span class="text-xl font-bold text-white">GYMO</span>
                    </div>
                    <p class="text-white/70">
                        Treino e tecnologia juntos para transformar seu corpo e
                        sua vida.
                    </p>
                </div>

                {#each columnData as column}
                    <div>
                        <h4 class="text-white font-bold mb-4">
                            {column.title}
                        </h4>
                        <ul class="space-y-2">
                            {#each column.links as link}
                                <li>
                                    <a
                                        href="/"
                                        class="text-white/70 hover:text-white transition-colors"
                                    >
                                        {link}
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>

            <div
                class="border-t border-white/10 mt-12 pt-8 text-center text-white/60"
            >
                <p>
                    © {new Date().getFullYear()} GYMO. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    </div>
</main>
