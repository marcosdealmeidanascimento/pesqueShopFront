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
                        <span id="dadosPessoais" class="font-bold white-space-nowrap">Dados Pessoais</span>
                    </div>
                </template>
                <ClientPersonalInfo />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2 mr-4">
                        <Button icon="pi pi-home"></Button>
                        <span id="dadosEndereco" class="font-bold white-space-nowrap">Endereço</span>
                    </div>
                </template>
                <div class="flex justify-content-end align-items-center mb-4">
                    <h3 class="mr-5">Adicionar Endereço</h3>
                    <Button icon="pi pi-plus" id="addenderecoBtn"
                        @click="router.push({ name: 'client-address', params: { id: clienteId } })" />
                </div>
                <CardAddress v-for="endereco in enderecos" :endereco="endereco" />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2 mr-4">
                        <Button icon="pi pi-credit-card"></Button>
                        <span id="dadosCartao" class="font-bold white-space-nowrap">Cartões</span>
                    </div>
                </template>
                <div class="flex justify-content-end align-items-center mb-4">
                    <h3 class="mr-5">Adicionar Cartão</h3>
                    <Button icon="pi pi-plus" id="addcartaoBtn"
                        @click="router.push({ name: 'client-credit-card', params: { id: clienteId } })" />
                </div>
                <CardCreditCard v-for="cartao in cartoes" :cartao="cartao" />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2 mr-4">
                        <Button icon="pi pi-lock"></Button>
                        <span id="dadosSenha" class="font-bold white-space-nowrap">Senha</span>
                    </div>
                </template>
                <CardPassword />
            </TabPanel>
        </TabView>
        <ConfirmDialog></ConfirmDialog>
    </div>
</template>

<script setup lang="ts">
import CardAddress from './components/CardAddress.vue';
import ClientPersonalInfo from './components/ClientPersonalInfo.vue';
import CardCreditCard from './components/CardCreditCard.vue';

import apiClient from '@/helpers/axios';
import { ref, onBeforeMount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

import { useConfirm } from "primevue/useconfirm";
import CardPassword from './components/CardPassword.vue';

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

const getClienteCartoes = async () => {
    const response = await apiClient.get(`/cartoes/cliente/${clienteId.value}`);
    cartoes.value = response.data;
}

onBeforeMount(() => {
    getClienteEnderecos();
    getClienteCartoes();
})

</script>