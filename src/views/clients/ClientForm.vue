<template>
    <form @submit.prevent="" class="my-5">
        <div class="card flex justify-content-center">
            <Stepper>
                <StepperPanel header="Dados Pessoais">
                    <template #content="{ nextCallback }">
                        <div class="flex flex-column h-12rem">
                            <div
                                class="border-1 surface-border border-round surface-ground font-medium p-3 flex flex-auto flex-column">
                                <div class="my-2">
                                    <div>
                                        Nome completo
                                        <InputText placeholder="Nome completo" class="w-full" v-model="nomeCompleto"
                                            required />
                                    </div>
                                </div>
                                <div class="my-2">
                                    <div>
                                        Gênero
                                        <Dropdown class="w-full" v-model="genero" :options="generos" optionLabel="label"
                                            optionValue="value" placeholder="Selecione um gênero" required />
                                    </div>
                                </div>
                                <div class="my-2">
                                    <div>
                                        Email
                                        <InputText placeholder="Email" class="w-full" v-model="email" type="email"
                                            required />
                                    </div>
                                </div>
                                <div class="my-2">
                                    <div>
                                        CPF
                                        <InputMask mask="999.999.999-99" placeholder="999.999.999-99" class="w-full"
                                            v-model="cpf" required />
                                    </div>
                                </div>
                                <div class="my-2">
                                    <div>
                                        Data de Nascimento
                                        <Calendar class="w-full" v-model="dataNascimento" dateFormat="dd/mm/yy"
                                            required />
                                    </div>
                                </div>
                                <div class="my-2">
                                    <div>
                                        Telefone
                                        <InputMask mask="(99) 99999-9999" placeholder="(99) 99999-9999" class="w-full"
                                            v-model="telefone" required />
                                    </div>
                                </div>
                                <div class="my-2">
                                    <div>
                                        Tipo de Telefone
                                        <Dropdown placeholder="Tipo de Telefone" class="w-full" :options="tiposTelefone"
                                            v-model="tipoTelefone" optionValue="value" optionLabel="label" required />
                                    </div>
                                </div>
                            </div>
                            <div class="flex pt-4 justify-content-between">
                                <Button label="Voltar" severity="secondary" icon="pi pi-arrow-left"
                                    @click=router.go(-1) />
                                <Button label="Avançar" icon="pi pi-arrow-right" iconPos="right"
                                    @click="nextCallback" />
                            </div>
                        </div>
                    </template>
                </StepperPanel>
                <StepperPanel header="Dados de Endereço">
                    <template #content="{ prevCallback, nextCallback }">
                        <div class="flex flex-column h-12rem">
                            <div
                                class="border-1 surface-border border-round surface-ground font-medium p-3 flex flex-auto flex-column">
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
                                    <Dropdown placeholder="Tipo de Logradouro" class="w-full" optionLabel="label"
                                        optionValue="value" :options="tiposLogradouro" filter v-model="tipoLogradouro"
                                        required />
                                </div>
                                <div class="my-2">
                                    <div>
                                        Logradouro
                                        <InputText placeholder="Endereço" class="w-full" v-model="logradouro"
                                            required />
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
                                        optionLabel="label" optionValue="value" filter v-model="tipoResidencia"
                                        required />
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
                                        <Textarea placeholder="Observações" class="w-full" v-model="observacao"
                                            auto-resize />
                                    </div>
                                </div>
                            </div>
                            <div class="flex pt-4 justify-content-between">
                                <Button label="Voltar" severity="secondary" icon="pi pi-arrow-left"
                                    @click="prevCallback" />
                                <Button label="Avançar" icon="pi pi-arrow-right" iconPos="right"
                                    @click="nextCallback" />
                            </div>
                        </div>
                    </template>
                </StepperPanel>
                <StepperPanel header="Dados Bancários">
                    <template #content="{ prevCallback, nextCallback }">
                        <div class="flex flex-column h-12rem">
                            <div
                                class="border-1 surface-border border-round surface-ground font-medium p-3 flex flex-auto flex-column">
                                <div class="my-2">
                                    Cartão de Crédito
                                    <InputGroup>
                                        <InputGroupAddon>
                                            <i class="pi pi-credit-card"></i>
                                        </InputGroupAddon>
                                        <InputText placeholder="9999 9999 9999 9999" class="w-full"
                                            v-model="numeroCartao" type="text" maxlength="16" @input="validarNumero"
                                            required />
                                        <InputGroupAddon>
                                            <Dropdown :options="bandeiras" optionLabel="label" optionValue="value"
                                                required v-model="bandeira">
                                                <template #option="{ option }">
                                                    <span>{{ option.label }}</span>
                                                </template>
                                            </Dropdown>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </div>
                                <div class="my-2 w-full">
                                    <p class="text-center">
                                        Código de Segurança
                                    </p>
                                    <InputOtp :length="3" class="w-full flex justify-content-center" integerOnly mask
                                        required v-model="cvv" />
                                </div>
                                <div class="my-2">
                                    <div>
                                        Nome do Titular
                                        <InputText placeholder="Nome do Titular" class="w-full" required
                                            v-model="nomeImpresso" />
                                    </div>
                                </div>
                                <div class="my-2">
                                    <div>
                                        Validade
                                        <Calendar class="w-full" v-model="validade" dateFormat="mm/yy" view="month"
                                            required />
                                    </div>
                                </div>
                                <div class="my-2">
                                    <div>
                                        Apelido do Cartão
                                        <InputText placeholder="Apelido do Cartão" class="w-full"
                                            v-model="apelidoCartao" required />
                                    </div>
                                </div>
                            </div>
                            <div class="flex pt-4 justify-content-between">
                                <Button label="Voltar" severity="secondary" icon="pi pi-arrow-left"
                                    @click="prevCallback" />
                                <Button label="Avançar" icon="pi pi-arrow-right" iconPos="right"
                                    @click="nextCallback" />
                            </div>
                        </div>
                    </template>
                </StepperPanel>
                <StepperPanel header="Senha">
                    <template #content="{ prevCallback }">
                        <div class="flex flex-column h-12rem">
                            <div class="border-1 surface-border border-round surface-ground font-medium p-3 grid">
                                <div class="my-2 col-6 p-6">
                                    <div>
                                        Senha
                                        <Password v-model="senha" :invalid="invalidPass" toggleMask />
                                    </div>
                                </div>
                                <div class="my-2 col-6 p-6">
                                    <div>
                                        Confirmar Senha
                                        <Password v-model="confirmarSenha" :invalid="invalidPass" toggleMask />
                                    </div>
                                </div>
                            </div>
                            <div class="flex pt-4 justify-content-between">
                                <Button label="Voltar" severity="secondary" icon="pi pi-arrow-left"
                                    @click="prevCallback" />
                                <Button label="Salvar" type="submit" icon="pi pi-check" iconPos="right"
                                    :disabled="disabled" @click="submitData" />
                            </div>
                        </div>
                    </template>
                </StepperPanel>
            </Stepper>
        </div>
    </form>
    <Toast />
</template>

<script setup lang="ts">
import axios from 'axios'
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import apiClient from '@/helpers/axios';

const route = useRoute()
const router = useRouter()

const toast = useToast()

const invalidPass = ref(false)
const disabled = ref(true)
const disabledCep = ref(false)

const clienteId = ref();
const enderecoId = ref();
const cartaoId = ref();

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

const nomeCompleto = ref(String(""));
const genero = ref(String(""));
const generos = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Outro', value: 'Outro' }
];
const email = ref(String(""));
const cpf = ref(String(""));
const dataNascimento = ref(new Date());
const telefone = ref(String(""));
const tipoTelefone = ref(String(""));
const tiposTelefone = [
    { label: 'Celular', value: 'Celular' },
    { label: 'Fixo', value: 'Fixo' }
];

const senha = ref(String(""));
const confirmarSenha = ref(String(""));

const numeroCartao = ref(String(""));
const cvv = ref(String(""));
const nomeImpresso = ref(String(""));
const validade = ref(new Date());
const bandeira = ref(String(""));
const bandeiras = [
    { label: 'Visa', value: 'Visa' },
    { label: 'Mastercard', value: 'Mastercard' },
    { label: 'American Express', value: 'American' },
    { label: 'Elo', value: 'Elo' },
    { label: 'Hipercard', value: 'Hipercard' },
    { label: 'Diners Club', value: 'Diners Club' },
    { label: 'Discover', value: 'Discover' },
    { label: 'JCB', value: 'JCB' },
    { label: 'Aura', value: 'Aura' },
    { label: 'Hiper', value: 'Hiper' },
    { label: 'Maestro', value: 'Maestro' },
    { label: 'Banescard', value: 'Banescard' },
    { label: 'Sorocred', value: 'Sorocred' },
    { label: 'Cabal', value: 'Cabal' },
    { label: 'Credz', value: 'Credz' },
    { label: 'Banri Compras', value: 'Banri Compras' },
    { label: 'Valecard', value: 'Valecard' },
    { label: 'Ticket', value: 'Ticket' }
];
const apelidoCartao = ref(String(""));

const salvarCliente = (async () => {
    const dataDadosPessoais = {
        nomeCompleto: nomeCompleto.value,
        genero: genero.value,
        cpf: cpf.value,
        email: email.value,
        telefoneDDD: telefone.value.substring(1, 3),
        telefone: telefone.value,
        tipoTelefone: tipoTelefone.value,
        senha: senha.value,
        dataNascimento: new Date(dataNascimento.value),
        status: true
    }

    if (clienteId.value == undefined) {
        const responseDadosPessoais = await apiClient.post('/clientes/', dataDadosPessoais).catch((error) => {
            for (const key in error.response.data) {
                if (key === 'cliente' || key === 'id') {
                    delete error.response.data[key];
                } else {
                    toast.add({ severity: 'error', summary: 'Erro', detail: error.response.data[key], life: 3000 });
                }
            }
            return;
        });

        if (responseDadosPessoais != undefined) {
            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Dados Pessoais salvos com sucesso', life: 3000 });
            clienteId.value = responseDadosPessoais.data.id;
        }
        return;
    }

    if (clienteId.value != undefined) {
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

        if (responseDadosPessoais != undefined) {
            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Dados Pessoais salvos com sucesso', life: 3000 });
        }
    }

    return;

})

const salvarEndereco = (async (clientId: Number) => {
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
        favorito: true,
        apelidoEndereco: apelido.value,
        cobranca: true,
        cliente: {
            id: clientId
        },
        observacao: observacao.value
    }

    if (enderecoId.value == undefined) {
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


        if (responseEndereco != undefined) {
            enderecoId.value = responseEndereco.data.id;
            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Endereço salvo com sucesso', life: 3000 });
        }

        return;
    }

    if (enderecoId.value != undefined) {
        const responseEndereco = await apiClient.put(`/enderecos/${enderecoId.value}`, dataEndereco).catch((error) => {
            for (const key in error.response.data) {
                if (key === 'cliente') {
                    delete error.response.data[key];
                } else {
                    toast.add({ severity: 'error', summary: 'Erro', detail: error.response.data[key], life: 3000 });
                }
            }
            return;
        });

        if (responseEndereco != undefined) {
            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Endereço salvo com sucesso', life: 3000 });
        }
    }

    return;
})

const salvarCartao = (async (clientId: Number) => {
    let dataCartao = {
        numero: numeroCartao.value,
        nomeImpresso: nomeImpresso.value,
        cvv: cvv.value,
        bandeira: bandeira.value,
        validade: validade.value,
        favorito: true,
        apelidoCartao: apelidoCartao.value,
        cliente: {
            id: clientId
        }
    }

    if (cartaoId.value == undefined) {
        const responseCartao = await apiClient.post('/cartoes/', dataCartao).catch((error) => {
            for (const key in error.response.data) {
                if (key === 'cliente') {
                    delete error.response.data[key];
                } else {
                    toast.add({ severity: 'error', summary: 'Erro', detail: error.response.data[key], life: 3000 });
                }
            }
            return;
        });

        if (responseCartao != undefined) {
            cartaoId.value = responseCartao.data.id;
            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cartão salvo com sucesso', life: 3000 });
        }
        return;
    }

    if (cartaoId.value != undefined) {
        const responseCartao = await apiClient.put(`/cartoes/${cartaoId.value}`, dataCartao).catch((error) => {
            for (const key in error.response.data) {
                if (key === 'cliente') {
                    delete error.response.data[key];
                } else {
                    toast.add({ severity: 'error', summary: 'Erro', detail: error.response.data[key], life: 3000 });
                }
            }
            return;
        });

        if (responseCartao != undefined) {
            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cartão salvo com sucesso', life: 3000 });
        }
    }

    setTimeout(() => {
        router.push({ name: 'clients' });
    }, 3000);

    return;

})

const submitData = async () => {
    await salvarCliente();
    if (clienteId.value == undefined) {
        return;
    }
    await salvarEndereco(clienteId.value);
    await salvarCartao(clienteId.value);
}

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


watch([senha, confirmarSenha], ([senha, confirmarSenha]) => {
    if (senha === confirmarSenha && senha.length > 7) {
        invalidPass.value = false;
        disabled.value = false;
    } else {
        invalidPass.value = true;
        disabled.value = true;
    }
});

const validarNumero = (event) => {
    const value = event.target.value;
    event.target.value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    numeroCartao.value = event.target.value;
}

onBeforeMount(() => {
})

</script>

<style scoped>
.p-stepper {
    flex-basis: 50rem;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>
