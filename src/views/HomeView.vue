<template>
  <div class="bg-surface-0 dark:bg-surface-900 my-5">
    <div id="home" class="landing-wrapper overflow-hidden">
      <div id="hero" class="flex flex-col pt-6 px-6 lg:px-20 overflow-hidden"
        style="background: #E89207; clip-path: ellipse(150% 87% at 93% 13%);">
        <div class="mx-6 md:mx-20 mt-0 md:mt-6">
          <h1 class="text-6xl font-bold text-gray-900 leading-tight">Pesque Shop</h1><span
            class="text-2xl font-semibold text-gray-900">Sua loja de pesca online</span>
          <p class="font-normal text-xl leading-normal md:mt-4 text-gray-700">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus magnam optio eos fuga id asperiores
            officia delectus assumenda vel neque, voluptas pariatur similique quas sapiente modi odio enim vero dicta.
          </p>
        </div>
        <div class="flex justify-center md:justify-end">
          <img src="/src/assets/vetores/02.jpg" alt="Hero Image" class="w-9/12 md:w-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
