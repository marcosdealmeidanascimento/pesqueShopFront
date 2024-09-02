<template>
    <div class="my-5">
        <DataTable :value="clients">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">Clientes</span>
                    <Button icon="pi pi-plus" rounded raised @click="router.push({ name: 'client' })" />
                </div>
                <div class="flex flex-wrap justify-around gap-5 mt-5">
                    <span>
                        Nome
                        <InputText placeholder="Nome" v-model="nomeFiltro" />
                    </span>
                    <span>
                        CPF
                        <InputMask mask="999.999.999-99" placeholder="CPF" v-model="cpfFiltro" />
                    </span>
                    <span>
                        Genero
                        <Dropdown :options="generos" optionLabel="label" placeholder="Gênero" v-model="generoFiltro" />
                    </span>
                    <span>
                        Email
                        <InputText placeholder="Email" type="email" v-model="emailFiltro" />
                    </span>
                    <span>
                        Tipo de Telefone
                        <Dropdown :options="tiposTelefone" placeholder="Tipo de Telefone" v-model="tipoTelefoneFiltro"
                            optionLabel="label" />
                    </span>
                    <span>
                        Telefone DDD
                        <InputText placeholder="Telefone DDD" v-model="telefoneDDDFiltro" />
                    </span>
                    <span>
                        Telefone
                        <InputMask mask="(99) 99999-9999" placeholder="Telefone" v-model="telefoneFiltro" />
                    </span>
                    <span>
                        Status
                        <InputSwitch v-model="statusFiltro" />
                    </span>
                </div>
                <div class="flex flex-wrap justify-around gap-5 mt-5">
                    <Button label="Filtrar" icon="pi pi-search" @click="getClients(limit, 0)" />
                    <Button label="Limpar" icon="pi pi-times" @click="limparFiltro()" />
                </div>
            </template>
            <Column field="nomeCompleto" header="Nome"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="telefone" header="Telefone"></Column>
            <Column field="status" header="Status">
                <template #body="slotProps">
                    <span :class="slotProps.data.status ? 'p-tag p-tag-success' : 'p-tag p-tag-danger'">
                        {{ slotProps.data.status ? 'Ativo' : 'Inativo' }}
                    </span>
                </template>
            </Column>
            <Column header="Actions">
                <template #body="slotProps">
                    <Button icon="pi pi-eye" class="p-button-rounded p-button-success mr-2"
                        @click="router.push({ name: 'client-view', params: { id: slotProps.data.id } })" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                        @click="deleteClient(slotProps.data.id)" />
                </template>
            </Column>
        </DataTable>
    </div>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
</template>

<script setup lang="ts">
import apiClient from '@/helpers/axios';
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

import { useToast } from 'primevue/usetoast';
import { useConfirm } from "primevue/useconfirm";


const router = useRouter();
const toast = useToast();
const confirm = useConfirm();

const clients = ref([])
const clientFiltro = ref({});
const limit = ref(10);

const nomeFiltro = ref(String(""));
const cpfFiltro = ref(String(""));
const generoFiltro = ref(String(""));
const emailFiltro = ref(String(""));
const tipoTelefoneFiltro = ref(String(""));
const telefoneDDDFiltro = ref(String(""));
const telefoneFiltro = ref(String(""));
const statusFiltro = ref(true);
const generos = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Outro', value: 'Outro' }
];
const tiposTelefone = [
    { label: 'Celular', value: 'Celular' },
    { label: 'Fixo', value: 'Fixo' }
];

const getClients = async (limit: Number, offset: Number) => {
    clientFiltro.value = {
        nomeCompleto: nomeFiltro.value,
        cpf: cpfFiltro.value,
        genero: generoFiltro.value.value,
        email: emailFiltro.value,
        tipoTelefone: tipoTelefoneFiltro.value.value,
        telefoneDDD: telefoneDDDFiltro.value,
        telefone: telefoneFiltro.value,
        status: statusFiltro.value,
        dataNascimento: null
    }
    const { data } = await apiClient.post(`/clientes/filter?limit=${limit}&offset=${offset}`, clientFiltro.value);
    clients.value = data;
}

const deleteClient = (id: Number) => {
    confirm.require({
        message: 'Você quer excluir esse dado?',
        header: 'Ação de exclusão',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Excluir',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            apiClient.delete(`/clientes/${id}`).finally(() => getClients(limit.value, 0));
            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Dado excluído com sucesso', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Recusado', detail: 'Dado não foi exculúido', life: 3000 });
        }
    });
};

const limparFiltro = () => {
    nomeFiltro.value = "";
    cpfFiltro.value = "";
    generoFiltro.value = "";
    emailFiltro.value = "";
    tipoTelefoneFiltro.value = "";
    telefoneDDDFiltro.value = "";
    telefoneFiltro.value = "";
    statusFiltro.value = true;
    getClients(limit.value, 0);
}

onBeforeMount(() => {
    getClients(limit.value, 0);
})

</script>