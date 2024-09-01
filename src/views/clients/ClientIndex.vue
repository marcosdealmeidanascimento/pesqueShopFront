<template>
    <div class="my-5">
        <DataTable :value="clients">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">Clientes</span>
                    <Button icon="pi pi-plus" rounded raised @click="router.push({ name: 'client' })" />
                </div>
            </template>
            <Column field="nomeCompleto" header="Nome"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="telefone" header="Telefone"></Column>
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
import { useRoute, useRouter } from 'vue-router';

import { useToast } from 'primevue/usetoast';
import { useConfirm } from "primevue/useconfirm";


const router = useRouter();
const toast = useToast();
const confirm = useConfirm();

const clients = ref([])

const getClients = async () => {
    const { data } = await apiClient.get('/clientes/?limit=0&offset=0');
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
            apiClient.delete(`/clientes/${id}`).finally(() => getClients());
            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Dado excluído com sucesso', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Recusado', detail: 'Dado não foi exculúido', life: 3000 });
        }
    });
};

onBeforeMount(() => {
    getClients();
})

</script>