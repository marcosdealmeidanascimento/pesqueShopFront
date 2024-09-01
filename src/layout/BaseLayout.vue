<template>
    <Toolbar style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem">
        <template #start>
            <div class="flex align-items-center gap-2">
                <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="100" height="60">
                    <!-- Corpo do Peixe-Gato -->
                    <path d="M20 30C20 20 30 10 50 10C70 10 80 20 80 30C80 40 70 50 50 50C30 50 20 40 20 30Z"
                        fill="var(--primary-color)" />
                    <!-- Barbatana Caudal -->
                    <path d="M80 30L90 40L80 50L70 40L80 30Z" fill="var(--primary-color)" />
                    <!-- Barbatana Dorsal -->
                    <path d="M50 10L55 0L60 10L55 15L50 10Z" fill="var(--primary-color)" />
                    <!-- Barbatana Peitoral Esquerda -->
                    <path d="M20 30L10 35L20 40L25 35L20 30Z" fill="var(--primary-color)" />
                    <!-- Barbatana Peitoral Direita -->
                    <path d="M80 30L90 35L80 40L75 35L80 30Z" fill="var(--primary-color)" />
                    <!-- Barbilhões -->
                    <path d="M25 30L20 25L15 30" stroke="var(--primary-color)" stroke-width="2" />
                    <path d="M25 30L20 35L15 30" stroke="var(--primary-color)" stroke-width="2" />
                    <path d="M75 30L80 25L85 30" stroke="var(--primary-color)" stroke-width="2" />
                    <path d="M75 30L80 35L85 30" stroke="var(--primary-color)" stroke-width="2" />
                </svg>
                <Button label="Home" text plain @click="router.push({ name: 'home' })" />
                <Button label="Clientes" text plain @click="router.push({ name: 'clients' })" />
            </div>
        </template>

        <!-- <template #end>
            <div class="flex align-items-center gap-2">
                <Button label="Share" severity="contrast" size="small" />
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                    style="width: 32px; height: 32px" />
            </div>
        </template> -->
    </Toolbar>

    <RouterView />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const visible = ref(false)

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
            router.push({ name: 'home' })
        }
    },
    {
        label: 'Clientes',
        icon: 'pi pi-users',
        command: () => {
            
        }
    }
])
</script>