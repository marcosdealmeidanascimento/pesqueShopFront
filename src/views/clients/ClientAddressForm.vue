<template>
    <Card class="my-5">
        <template #content>
            <div class="border-1 surface-border border-round surface-ground font-medium p-3 flex flex-auto flex-column">
                <h1 class="font-bold text-2xl my-5">Adicionar Dados do Endereço</h1>
                <div class="my-2">
                    <div>
                        CEP
                        <InputText type="number" placeholder="99999999" class="w-full" v-model="cep"
                            :disabled="disabledCep" required />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Tipo de Logradouro
                    </div>
                    <Dropdown placeholder="Tipo de Logradouro" class="w-full" optionLabel="label" optionValue="value"
                        :options="tiposLogradouro" filter v-model="tipoLogradouro" required />
                </div>
                <div class="my-2">
                    <div>
                        Logradouro
                        <InputText placeholder="Endereço" class="w-full" v-model="logradouro" required />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Número
                        <InputText placeholder="Número" class="w-full" v-model="numero" required />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Bairro
                        <InputText placeholder="Bairro" class="w-full" v-model="bairro" required />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Tipo de Residência
                    </div>
                    <Dropdown placeholder="Tipo de Residência" class="w-full" :options="tiposResidencia"
                        optionLabel="label" optionValue="value" filter v-model="tipoResidencia" required />
                </div>
                <div class="my-2">
                    <div>
                        Complemento
                        <InputText placeholder="Complemento" class="w-full" v-model="complemento" />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Cidade
                        <InputText placeholder="Cidade" class="w-full" v-model="cidade" required />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Estado
                        <InputText placeholder="Estado" class="w-full" v-model="estado" required />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        País
                        <InputText placeholder="País" class="w-full" v-model="pais" required />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Apelido
                        <InputText placeholder="Apelido" class="w-full" v-model="apelido" required />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Observações
                        <Textarea placeholder="Observações" class="w-full" v-model="observacao" auto-resize />
                    </div>
                </div>
                <div class="flex justify-content-between align-items-center my-5">
                    <Button class="my-2" icon="pi pi-x"
                        @click="router.go(-1)" severity="danger"
                        label="Cancelar"></Button>
                    <Button class="my-2" icon="pi pi-check" @click="salvarEndereco" label="Salvar"></Button>
                </div>
            </div>
        </template>
    </Card>
    <Toast />
</template>

<script setup lang="ts">
import apiClient from '@/helpers/axios';
import axios from 'axios';
import { ref, onBeforeMount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const disabledCep = ref(false);

const clienteId = ref(route.params.id);

const cep = ref(String(""));
const tipoLogradouro = ref(String(""));
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
const logradouro = ref(String(""));
const numero = ref(String(""));
const bairro = ref(String(""));
const tipoResidencia = ref(String(""));
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
const complemento = ref(String(""));
const cidade = ref(String(""));
const estado = ref(String(""));
const pais = ref(String(""));
const observacao = ref(String(""));
const apelido = ref(String(""));

const salvarEndereco = (async () => {
    let dataEndereco = {
        cep: cep.value,
        tipoResidencia: tipoResidencia.value,
        logradouro: logradouro.value,
        tipoLogradouro: tipoLogradouro.value,
        numero: numero.value,
        bairro: bairro.value,
        cidade: cidade.value,
        estado: estado.value,
        pais: pais.value,
        complemento: complemento.value,
        favorito: false,
        apelidoEndereco: apelido.value,
        cobranca: false,
        cliente: {
            id: clienteId.value
        },
        observacao: observacao.value
    }

    const responseEndereco = await apiClient.post('/enderecos/', dataEndereco).catch((error) => {
        for (const key in error.response.data) {
            if (key === 'cliente') {
                delete error.response.data[key];
            } else {
                toast.add({ severity: 'error', summary: 'Erro', detail: error.response.data[key], life: 3000 });
            }
        }
        return;
    });

    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Endereço salvo com sucesso', life: 3000 });
    setTimeout(() => {
        router.go(-1);
    }, 3000);
    return;
})

const consultarCEP = async (cep: String) => {
    try {
        const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

watch(cep, async (newValue) => {
    if (cep.value.length === 8) {
        disabledCep.value = true;
        setTimeout(() => {
            disabledCep.value = false;
        }, 4000);
        const response = await consultarCEP(cep.value);
        logradouro.value = response.street;
        bairro.value = response.neighborhood;
        cidade.value = response.city;
        estado.value = response.state;
    }
});


onBeforeMount(() => {
})
</script>