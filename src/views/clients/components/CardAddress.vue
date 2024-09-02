<template>
    <Card class="my-5">
        <template #content>
            <div class="border-1 surface-border border-round surface-ground font-medium p-3 flex flex-auto flex-column">
                <div class="flex justify-content-end align-items-center">
                    <span class="font-bold mx-2">Editar</span>
                    <Button class="my-2 mr-5" icon="pi pi-pencil"
                        @click="[visible = true, readonly = false, disabledCep = false]"></Button>
                    <span class="font-bold mx-2">Excluir</span>
                    <Button severity="danger" class="my-2" icon="pi pi-trash"
                        @click="deleteEndereco(enderecoId)"></Button>
                </div>
                <div class="my-2">
                    <h1 class="font-bold text-2xl my-5">{{ endereco.apelidoEndereco }}</h1>
                </div>
                <div class="my-2">
                    <div>
                        CEP
                        <InputText type="number" placeholder="99999999" class="w-full" v-model="endereco.cep" required
                            :readonly="readonly" />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Logradouro
                        <InputText placeholder="Endereço" class="w-full" v-model="endereco.logradouro" required
                            :readonly="readonly" />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Número
                        <InputText placeholder="Número" class="w-full" v-model="endereco.numero" required
                            :readonly="readonly" />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Bairro
                        <InputText placeholder="Bairro" class="w-full" v-model="endereco.bairro" required
                            :readonly="readonly" />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Cidade
                        <InputText placeholder="Cidade" class="w-full" v-model="endereco.cidade" required
                            :readonly="readonly" />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Estado
                        <InputText placeholder="Estado" class="w-full" v-model="endereco.estado" required
                            :readonly="readonly" />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Favorito
                        <InputSwitch class="ml-2" v-model="endereco.favorito" required :readonly="readonly" />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Endereço de Cobrança
                        <InputSwitch class="ml-2" v-model="endereco.cobranca" required :readonly="readonly" />
                    </div>
                </div>
            </div>
        </template>
    </Card>
    <Dialog v-model:visible="visible" :draggable="false" :closable="false" modal :maximizable="true" :pt="{
        root: 'border-none',
        mask: {
            style: 'backdrop-filter: blur(8px)'
        },
    }">
        <div class="border-1 surface-border border-round surface-ground font-medium p-3 flex flex-auto flex-column">
            <h1 class="font-bold text-2xl my-5">Editar Dados do Endereço</h1>
            <div class="my-2">
                <div>
                    CEP
                    <InputText type="number" placeholder="99999999" class="w-full" v-model="cep" :disabled="disabledCep"
                        required />
                </div>
            </div>
            <div class="my-2">
                <div>
                    Tipo de Logradouro
                </div>
                <Dropdown placeholder="Tipo de Logradouro" class="w-full" optionLabel="label" optionValue="value"
                    :options="tiposLogradouro" filter v-model="endereco.tipoLogradouro" required />
            </div>
            <div class="my-2">
                <div>
                    Logradouro
                    <InputText placeholder="Endereço" class="w-full" v-model="endereco.logradouro" required />
                </div>
            </div>
            <div class="my-2">
                <div>
                    Número
                    <InputText placeholder="Número" class="w-full" v-model="endereco.numero" required />
                </div>
            </div>
            <div class="my-2">
                <div>
                    Bairro
                    <InputText placeholder="Bairro" class="w-full" v-model="endereco.bairro" required />
                </div>
            </div>
            <div class="my-2">
                <div>
                    Tipo de Residência
                </div>
                <Dropdown placeholder="Tipo de Residência" class="w-full" :options="tiposResidencia" optionLabel="label"
                    optionValue="value" filter v-model="endereco.tipoResidencia" required />
            </div>
            <div class="my-2">
                <div>
                    Complemento
                    <InputText placeholder="Complemento" class="w-full" v-model="endereco.complemento" />
                </div>
            </div>
            <div class="my-2">
                <div>
                    Cidade
                    <InputText placeholder="Cidade" class="w-full" v-model="endereco.cidade" required />
                </div>
            </div>
            <div class="my-2">
                <div>
                    Estado
                    <InputText placeholder="Estado" class="w-full" v-model="endereco.estado" required />
                </div>
            </div>
            <div class="my-2">
                <div>
                    País
                    <InputText placeholder="País" class="w-full" v-model="endereco.pais" required />
                </div>
            </div>
            <div class="my-2">
                <div>
                    Apelido
                    <InputText placeholder="Apelido" class="w-full" v-model="endereco.apelidoEndereco" required />
                </div>
            </div>
            <div class="my-2">
                <div>
                    Observações
                    <Textarea placeholder="Observações" class="w-full" v-model="endereco.observacao" auto-resize />
                </div>
            </div>
            <div class="my-2">
                <div>
                    Favorito
                    <InputSwitch class="ml-2" v-model="endereco.favorito" required />
                </div>
            </div>
            <div class="my-2">
                <div>
                    Endereço de Cobrança
                    <InputSwitch class="ml-2" v-model="endereco.cobranca" required />
                </div>
            </div>
            <div class="flex justify-content-between align-items-center my-5">
                <Button class="my-2" icon="pi pi-x"
                    @click="[visible = false, readonly = true, disabledCep = true, getEndereco()]" severity="danger"
                    label="Cancelar"></Button>
                <Button class="my-2" icon="pi pi-check" @click="salvarEndereco" label="Salvar"></Button>
            </div>
        </div>
    </Dialog>
    <Toast />
</template>

<script setup lang="ts">
import apiClient from '@/helpers/axios';
import axios from 'axios';
import { ref, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from "primevue/useconfirm";

const slotProps = defineProps({
    endereco: Object
});

const route = useRoute();
const toast = useToast();
const confirm = useConfirm();

const visible = ref(false);
const readonly = ref(true);
const disabledCep = ref(false);
const cep = ref('');

const clienteId = ref(route.params.id);
const enderecoId = ref(slotProps.endereco.id);

const endereco = ref(Object);

const tiposLogradouro = ref([
    { label: 'Rua', value: 'Rua' },
    { label: 'Avenida', value: 'Avenida' },
    { label: 'Travessa', value: 'Travessa' },
    { label: 'Praça', value: 'Praça' },
    { label: 'Alameda', value: 'Alameda' },
    { label: 'Rodovia', value: 'Rodovia' },
    { label: 'Estrada', value: 'Estrada' },
    { label: 'Largo', value: 'Largo' },
    { label: 'Viela', value: 'Viela' },
    { label: 'Passarela', value: 'Passarela' },
    { label: 'Outro', value: 'Outro' }
]);
const tiposResidencia = [
    { label: 'Casa', value: 'Casa' },
    { label: 'Apartamento', value: 'Apartamento' },
    { label: 'Sobrado', value: 'Sobrado' },
    { label: 'Kitnet', value: 'Kitnet' },
    { label: 'Chácara', value: 'Chácara' },
    { label: 'Sítio', value: 'Sítio' },
    { label: 'Fazenda', value: 'Fazenda' },
    { label: 'Outro', value: 'Outro' }
];

const getEndereco = (async () => {
    const response = await apiClient.get(`/enderecos/${enderecoId.value}`);
    endereco.value = response.data;
})

const salvarEndereco = (async () => {
    const dataEndereco = {
        cep: !cep.value ? endereco.value.cep : cep.value,
        tipoLogradouro: endereco.value.tipoLogradouro,
        logradouro: endereco.value.logradouro,
        numero: endereco.value.numero,
        bairro: endereco.value.bairro,
        tipoResidencia: endereco.value.tipoResidencia,
        complemento: endereco.value.complemento,
        cidade: endereco.value.cidade,
        estado: endereco.value.estado,
        pais: endereco.value.pais,
        observacao: endereco.value.observacao,
        favorito: endereco.value.favorito,
        cobranca: endereco.value.cobranca,
        apelidoEndereco: endereco.value.apelidoEndereco,
        cliente: { id: clienteId.value }
    }

    const responseEndereco = await apiClient.put(`/enderecos/${enderecoId.value}`, dataEndereco).catch((error) => {
        for (const key in error.response.data) {
            if (key === 'endereco' || key === 'id') {
                delete error.response.data[key];
            } else {
                toast.add({ severity: 'error', summary: 'Erro', detail: error.response.data[key], life: 3000 });
            }
        }
        return;
    });

    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Endereço salvo com sucesso', life: 3000 });
    visible.value = false;
})

const consultarCEP = async (cep: String) => {
    try {
        const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


watch(() => cep.value, async (cep) => {
    if (cep.length === 8) {
        const response = await consultarCEP(cep);
        endereco.value.logradouro = response.street;
        endereco.value.bairro = response.neighborhood;
        endereco.value.cidade = response.city;
        endereco.value.estado = response.state;
        endereco.value.pais = 'Brasil';
    }
})


const deleteEndereco = (id: Number) => {
    confirm.require({
        message: 'Você quer excluir esse dado?',
        header: 'Ação de exclusão',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Excluir',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await apiClient.delete(`/enderecos/${id}`);
            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Dado excluído com sucesso', life: 3000 });
            window.location.reload();
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Recusado', detail: 'Dado não foi exculúido', life: 3000 });
        }
    });
};

onBeforeMount(() => {
    getEndereco();
})
</script>