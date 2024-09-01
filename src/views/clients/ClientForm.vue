<template>
    <form @submit.prevent="saveClient" class="my-5">
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
                                        <InputText placeholder="Tipo de Telefone" class="w-full" v-model="tipoTelefone"
                                            required />
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
                                        <InputText placeholder="99999999" class="w-full" v-model="cep"
                                            :disabled="disabledCep" required />
                                    </div>
                                </div>
                                <div class="my-2">
                                    <div>
                                        Tipo de Logradouro
                                    </div>
                                    <InputText placeholder="Tipo de Logradouro" class="w-full" v-model="tipoLogradouro"
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
                                    <InputText placeholder="Tipo de Residência" class="w-full" v-model="tipoResidencia"
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
                                        <InputMask mask="9999 9999 9999 9999" placeholder="9999 9999 9999 9999"
                                            class="w-full" v-model="cartaoCredito" required />
                                        <InputGroupAddon>
                                            <Dropdown :options="bandeiras" optionLabel="label" optionValue="value"
                                                v-model="bandeira" required>
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
                                        <Password v-model="senha" :invalid="invalidPass" toggleMask required />
                                    </div>
                                </div>
                                <div class="my-2 col-6 p-6">
                                    <div>
                                        Confirmar Senha
                                        <Password v-model="confirmarSenha" :invalid="invalidPass" toggleMask required />
                                    </div>
                                </div>
                            </div>
                            <div class="flex pt-4 justify-content-between">
                                <Button label="Voltar" severity="secondary" icon="pi pi-arrow-left"
                                    @click="prevCallback" />
                                <Button label="Submit" type="submit" icon="pi pi-check" iconPos="right"
                                    :disabled="disabled" />
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

const route = useRoute()
const router = useRouter()

const toast = useToast()

const invalidPass = ref(false)
const disabled = ref(false)
const disabledCep = ref(false)

const cep = ref(String(""));
const tipoLogradouro = ref(String(""));
const logradouro = ref(String(""));
const numero = ref(String(""));
const bairro = ref(String(""));
const tipoResidencia = ref(String(""));
const complemento = ref(String(""));
const cidade = ref(String(""));
const estado = ref(String(""));
const pais = ref(String(""));

const nomeCompleto = ref(String(""));
const genero = ref(String(""));
const generos = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
    { label: 'Outro', value: 'O' }
];
const email = ref(String(""));
const cpf = ref(String(""));
const dataNascimento = ref(new Date());
const telefone = ref(String(""));
const tipoTelefone = ref(String(""));
const telefoneDDD = ref(String(""));

const senha = ref(String(""));
const confirmarSenha = ref(String(""));


const cartaoCredito = ref(String(""));
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

const saveClient = (() => {
    telefoneDDD.value = telefone.value.substring(1, 3);
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
        const response = await consultarCEP(cep.value);
        logradouro.value = response.street;
        bairro.value = response.neighborhood;
        cidade.value = response.city;
        estado.value = response.state;

        setTimeout(() => {
            disabledCep.value = false;
        }, 4000);
    }
});

onBeforeMount(() => {
})

</script>

<style scoped>
.p-stepper {
    flex-basis: 50rem;
}
</style>
