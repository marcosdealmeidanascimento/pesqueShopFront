<template>
    <div class="border-1 surface-border border-round surface-ground font-medium p-3 flex flex-auto flex-column">
        <div class="flex justify-content-end align-items-center">
            <span class="font-bold mx-2">Editar</span>
            <Button id="editarDadosPessoais" class="my-2" icon="pi pi-pencil"
                @click="[visible = true, readonly = false]"></Button>
        </div>
        <div class="my-2">
            <div>
                Nome completo
                <InputText placeholder="Nome completo" class="w-full" v-model="cliente.nomeCompleto" required
                    :readonly="readonly" />
            </div>
        </div>
        <div class="my-2">
            <div>
                Gênero
                <InputText class="w-full" v-model="cliente.genero" placeholder="Selecione um gênero" required
                    :readonly="readonly" />
            </div>
        </div>
        <div class="my-2">
            <div>
                Email
                <InputText placeholder="Email" class="w-full" v-model="cliente.email" type="email" required
                    :readonly="readonly" />
            </div>
        </div>
        <div class="my-2">
            <div>
                CPF
                <InputText placeholder="999.999.999-99" class="w-full" v-model="cliente.cpf"
                    required :readonly="readonly" />
            </div>
        </div>
        <div class="my-2">
            <div>
                Data de Nascimento
                <Calendar class="w-full" v-model="cliente.dataNascimento" dateFormat="dd/mm/yy" required
                    :readonly="readonly" />
            </div>
        </div>
        <div class="my-2">
            <div>
                Telefone
                <InputMask mask="(99) 99999-9999" placeholder="(99) 99999-9999" class="w-full"
                    v-model="cliente.telefone" required :readonly="readonly" />
            </div>
        </div>
        <div class="my-2">
            <div>
                Tipo de Telefone
                <InputText placeholder="Tipo de Telefone" class="w-full" v-model="cliente.tipoTelefone" required
                    :readonly="readonly" />
            </div>
        </div>
        <div class="my-2">
            <div class="flex align-items-center">
                Status
                <InputSwitch class="ml-2" v-model="cliente.status" required :readonly="readonly" />
            </div>
        </div>
    </div>

    <Dialog v-model:visible="visible" modal :pt="{
        root: 'border-none',
        mask: {
            style: 'backdrop-filter: blur(8px)'
        }
    }">
        <template #container>
            <div class="border-1 surface-border border-round surface-ground font-medium p-3 flex flex-auto flex-column">
                <h1 class="font-bold text-2xl my-5">Editar Dados Pessoais</h1>
                <div class="my-2">
                    <div>
                        Nome completo
                        <InputText placeholder="Nome completo" class="w-full" v-model="cliente.nomeCompleto" required
                            id="nomeCompleto" />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Gênero
                        <Dropdown class="w-full" v-model="cliente.genero" :options="generos" optionLabel="label"
                            id="genero" optionValue="value" placeholder="Selecione um gênero" required />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Email
                        <InputText placeholder="Email" class="w-full" v-model="cliente.email" type="email" required
                            id="email" />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        CPF
                        <InputMask mask="999.999.999-99" placeholder="999.999.999-99" class="w-full" id="cpf"
                            v-model="cliente.cpf" required />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Data de Nascimento
                        <Calendar class="w-full" v-model="cliente.dataNascimento" dateFormat="dd/mm/yy" required id="dataNascimento"
                        />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Telefone
                        <InputMask mask="(99) 99999-9999" placeholder="(99) 99999-9999" class="w-full" id="telefone"
                            v-model="cliente.telefone" required />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Tipo de Telefone
                        <Dropdown placeholder="Tipo de Telefone" class="w-full" :options="tiposTelefone" id="tipoTelefone"
                            v-model="cliente.tipoTelefone" optionValue="value" optionLabel="label" required />
                    </div>
                </div>
                <div class="my-2">
                    <div class="flex align-items-center">
                        Status
                        <InputSwitch class="ml-2" v-model="cliente.status" required :readonly="readonly" id="status" />
                    </div>
                </div>
                <div class="flex justify-content-between align-items-center my-5">
                    <Button class="my-2" icon="pi pi-x" @click="[visible = false, readonly = true, getCliente()]"
                        severity="danger" label="Cancelar"></Button>
                    <Button class="my-2" icon="pi pi-check" @click="salvarCliente" label="Salvar" id="salvarDadosPessoaisBtn"></Button>
                </div>
            </div>
        </template>
    </Dialog>
    <Toast />
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import apiClient from '@/helpers/axios';

const toast = useToast();

const readonly = ref(true);

const route = useRoute();

const visible = ref(false);

const clienteId = ref(route.params.id);

const cliente = ref(Object);

const generos = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Outro', value: 'Outro' }
];
const tiposTelefone = [
    { label: 'Celular', value: 'Celular' },
    { label: 'Fixo', value: 'Fixo' }
];

const salvarCliente = (async () => {
    const dataDadosPessoais = {
        nomeCompleto: cliente.value.nomeCompleto,
        genero: cliente.value.genero,
        cpf: cliente.value.cpf,
        email: cliente.value.email,
        telefoneDDD: cliente.value.telefone.substring(1, 3),
        telefone: cliente.value.telefone,
        tipoTelefone: cliente.value.tipoTelefone,
        dataNascimento: new Date(cliente.value.dataNascimento),
        status: cliente.value.status
    }

    const responseDadosPessoais = await apiClient.put(`/clientes/${clienteId.value}`, dataDadosPessoais).catch((error) => {
        for (const key in error.response.data) {
            if (key === 'cliente' || key === 'id') {
                delete error.response.data[key];
            } else {
                toast.add({ severity: 'error', summary: 'Erro', detail: error.response.data[key], life: 3000 });
            }
        }
        return;
    });

    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Dados Pessoais salvos com sucesso', life: 3000 });
    visible.value = false;
})

function adjustToTimezone(dateString: String) {
    const date = new Date(dateString);
    const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    return adjustedDate.toLocaleDateString('pt-BR');
}

const getCliente = async () => {
    const response = await apiClient.get(`/clientes/${clienteId.value}`);
    cliente.value = response.data;
    cliente.value.dataNascimento = adjustToTimezone(cliente.value.dataNascimento);
}

onBeforeMount(() => {
    getCliente();
});


</script>