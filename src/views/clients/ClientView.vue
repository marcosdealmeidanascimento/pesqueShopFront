<template>
    <div class="my-5">
        <div class="flex flex-wrap align-items-center justify-content-between my-2">
            <span></span>
            <Button icon="pi pi-arrow-left" rounded raised @click="router.push({ name: 'clients' })" />
        </div>
        <TabView class="tabview-custom">
            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2 mr-4">
                        <Button icon="pi pi-user"></Button>
                        <span class="font-bold white-space-nowrap">Dados Pessoais</span>
                    </div>
                </template>
                <ClientPersonalInfo />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2 mr-4">
                        <Button icon="pi pi-home"></Button>
                        <span class="font-bold white-space-nowrap">Endereço</span>
                    </div>
                </template>
                <div class="flex justify-content-end align-items-center mb-4">
                    <h3 class="mr-5">Adicionar Endereço</h3>
                    <Button icon="pi pi-plus" @click="router.push({ name: 'client-address', params: {id: clienteId} })" />
                </div>
                <CardAddress v-for="endereco in enderecos" class="mb-5" :endereco="endereco" />
            </TabPanel>
        </TabView>
        <ConfirmDialog></ConfirmDialog>
    </div>
</template>

<script setup lang="ts">
import CardAddress from './components/CardAddress.vue';
import ClientPersonalInfo from './components/ClientPersonalInfo.vue';

import apiClient from '@/helpers/axios';
import { ref, onBeforeMount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

import { useConfirm } from "primevue/useconfirm";

const toast = useToast();
const confirm = useConfirm();

const router = useRouter();
const route = useRoute();

const clienteId = ref(route.params.id);

const enderecos = ref([]);
const cartoes = ref([]);

const getClienteEnderecos = async () => {
    const response = await apiClient.get(`/enderecos/cliente/${clienteId.value}`);
    enderecos.value = response.data;
}

onBeforeMount(() => {
    getClienteEnderecos();
})

</script>