<template>
    <Card class="my-5">
        <template #content>
            <div class="border-1 surface-border border-round surface-ground font-medium p-3 flex flex-auto flex-column">
                <h1 class="font-bold text-2xl my-5">Adicionar Dados do Cartão</h1>
                <div class="my-2">
                    Cartão de Crédito
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-credit-card"></i>
                        </InputGroupAddon>
                        <InputText placeholder="9999 9999 9999 9999" class="w-full" v-model="numeroCartao" type="text" id="numeroCartao"
                            maxlength="16" @input="validarNumero" required />
                        <InputGroupAddon>
                            <Dropdown :options="bandeiras" optionLabel="label" optionValue="value" required id="bandeira"
                                v-model="bandeira">
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
                    <InputOtp :length="3" class="w-full flex justify-content-center" integerOnly mask required id="cvv"
                        v-model="cvv" />
                </div>
                <div class="my-2">
                    <div>
                        Nome do Titular
                        <InputText placeholder="Nome do Titular" class="w-full" required v-model="nomeImpresso" id="nomeImpresso"
                        />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Validade
                        <Calendar class="w-full" v-model="validade" dateFormat="mm/yy" view="month" required id="validade"
                        />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Apelido do Cartão
                        <InputText placeholder="Apelido do Cartão" class="w-full" v-model="apelidoCartao" required id="apelidoCartao"
                        />
                    </div>
                </div>
                <div class="flex justify-content-between align-items-center my-5">
                    <Button class="my-2" icon="pi pi-x" @click="router.go(-1)" severity="danger"
                        label="Cancelar"></Button>
                    <Button class="my-2" icon="pi pi-check" @click="salvarCartao" label="Salvar" id="salvarCartaoBtn"
                    ></Button>
                </div>
            </div>

        </template>
    </Card>

    <Toast />
</template>

<script setup lang="ts">
import apiClient from '@/helpers/axios';
import { ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from "primevue/useconfirm";


const route = useRoute();
const router = useRouter();

const toast = useToast();
const confirm = useConfirm();

const visible = ref(false);
const readonly = ref(true);

const clienteId = ref(route.params.id);

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

const deleteCartao = (id: Number) => {
    confirm.require({
        message: 'Você quer excluir esse cartão?',
        header: 'Ação de exclusão',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Excluir',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            apiClient.delete(`/cartoes/${id}`);
            toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cartão excluído com sucesso', life: 3000 });
            window.location.reload();
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Recusado', detail: 'Cartão não foi excluído', life: 3000 });
        }
    });
};

const salvarCartao = (async () => {
    let dataCartao = {
        numero: numeroCartao.value,
        nomeImpresso: nomeImpresso.value,
        cvv: cvv.value,
        bandeira: bandeira.value,
        validade: validade.value,
        favorito: false,
        apelidoCartao: apelidoCartao.value,
        cliente: {
            id: clienteId.value
        }
    }

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

    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cartão salvo com sucesso', life: 3000 });
    setTimeout(() => {
        router.go(-1);
    }, 3000);

    return;
})

const validarNumero = (event) => {
    const value = event.target.value;
    event.target.value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    numeroCartao.value = event.target.value;
}

onBeforeMount(() => {
});


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
