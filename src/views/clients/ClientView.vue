<template>
    <div class="my-5">
        <div class="flex flex-wrap align-items-center justify-content-between my-2">
            <span class="text-xl text-900 font-bold">{{ cliente.nomeCompleto }}</span>
            <Button icon="pi pi-arrow-left" rounded raised @click="router.push({ name: 'clients' })" />
        </div>
        <TabView>
            <TabPanel header="Dados Pessoais">
                <Panel :header="'#' + id">
                    <ClientPersonalInfo :cliente="cliente" />
                </Panel>
            </TabPanel>
        </TabView>
    </div>
</template>

<script setup lang="ts">
import apiClient from '@/helpers/axios';
import { ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ClientPersonalInfo from './components/ClientPersonalInfo.vue';

const router = useRouter();
const route = useRoute();

const id = ref(route.params.id);

const cliente = ref({
    nomeCompleto: String,
    genero: String,
    email: String,
    cpf: String,
    dataNascimento: Date(),
    telefone: String,
    tipoTelefone: String
});

function adjustToTimezone(dateString: String) {
    const date = new Date(dateString);
    const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    return adjustedDate.toLocaleDateString('pt-BR');
}

const getCliente = async () => {
    const response = await apiClient.get(`/clientes/${id.value}`);
    cliente.value = response.data;
    cliente.value.dataNascimento = adjustToTimezone(cliente.value.dataNascimento);
}

onBeforeMount(() => {
    getCliente();
})

</script>