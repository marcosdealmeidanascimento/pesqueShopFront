<template>
    <Card class="my-5">
        <template #content>
            <div class="border-1 surface-border border-round surface-ground font-medium p-3 flex flex-auto flex-column">
                <div class="flex justify-content-end align-items-center">
                    <span class="font-bold mx-2">Editar</span>
                    <Button class="my-2 mr-5" icon="pi pi-pencil" @click="[visible = true, readonly = false]"
                        id="editarCartao"></Button>
                    <span class="font-bold mx-2">Excluir</span>
                    <Button severity="danger" class="my-2" icon="pi pi-trash" @click="deleteCartao(cartaoID)"></Button>
                </div>
                <div class="my-2">
                    <h1 class="font-bold text-2xl my-5">{{ cartao.apelidoCartao }}</h1>
                </div>
                <div class="my-2">
                    Cartão de Crédito
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-credit-card"></i>
                        </InputGroupAddon>
                        <InputText placeholder="9999 9999 9999 9999" class="w-full" v-model="cartao.numero" type="text"
                            maxlength="16" @input="validarNumero" required :readonly="readonly" />
                        <InputGroupAddon>
                            <InputText v-model="cartao.bandeira" class="w-full" readonly />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <div class="my-2 w-full">
                    <p class="text-center">
                        Código de Segurança
                    </p>
                    <InputOtp :length="3" class="w-full flex justify-content-center" integerOnly mask required
                        :readonly="readonly" v-model="cartao.cvv" />
                </div>
                <div class="my-2">
                    <div>
                        Nome do Titular
                        <InputText placeholder="Nome do Titular" class="w-full" required :readonly="readonly"
                            v-model="cartao.nomeImpresso" />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Validade
                        <Calendar class="w-full" v-model="cartao.validade" dateFormat="mm/yy" view="month" required
                            :readonly="readonly" />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Apelido do Cartão
                        <InputText placeholder="Apelido do Cartão" class="w-full" v-model="cartao.apelidoCartao"
                            required :readonly="readonly" />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Favorito
                        <InputSwitch class="ml-2" v-model="cartao.favorito" required :readonly="readonly" />
                    </div>
                </div>
            </div>
        </template>
    </Card>

    <Dialog v-model:visible="visible" modal :pt="{
        root: 'border-none',
        mask: {
            style: 'backdrop-filter: blur(8px)'
        }
    }">
        <template #container>
            <div class="border-1 surface-border border-round surface-ground font-medium p-3 flex flex-auto flex-column">
                <div class="my-2">
                    Cartão de Crédito
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-credit-card"></i>
                        </InputGroupAddon>
                        <InputText placeholder="9999 9999 9999 9999" class="w-full" v-model="cartao.numero" type="text" id="numeroCartao"
                            maxlength="16" @input="validarNumero" required />
                        <InputGroupAddon>
                            <Dropdown :options="bandeiras" optionLabel="label" optionValue="value" required id="bandeira"
                                v-model="cartao.bandeira">
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
                        v-model="cartao.cvv" />
                </div>
                <div class="my-2">
                    <div>
                        Nome do Titular
                        <InputText placeholder="Nome do Titular" class="w-full" required id="nomeImpresso"
                            v-model="cartao.nomeImpresso" />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Validade
                        <Calendar class="w-full" v-model="cartao.validade" dateFormat="mm/yy" view="month" required id="validade"
                        />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Apelido do Cartão
                        <InputText placeholder="Apelido do Cartão" class="w-full" v-model="cartao.apelidoCartao" id="apelidoCartao"
                            required />
                    </div>
                </div>
                <div class="my-2">
                    <div>
                        Favorito
                        <InputSwitch class="ml-2" v-model="cartao.favorito" required id="favorito" 
                        />
                    </div>
                </div>
                <div class="flex justify-content-between align-items-center my-5">
                    <Button class="my-2" icon="pi pi-x" @click="[visible = false, readonly = true, getCartao()]"
                        severity="danger" label="Cancelar"></Button>
                    <Button class="my-2" icon="pi pi-check" @click="salvarCartao" label="Salvar" id="salvarCartaoBtn"
                    ></Button>
                </div>
            </div>
        </template>
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
    cartao: Object
});

const route = useRoute();
const toast = useToast();
const confirm = useConfirm();

const visible = ref(false);
const readonly = ref(true);
const disabledCep = ref(false);
const cep = ref('');

const clienteId = ref(route.params.id);
const cartaoID = ref(slotProps.cartao.id);

const cartao = ref(Object)

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

const getCartao = async () => {
    const { data } = await apiClient.get(`/cartoes/${cartaoID.value}`);
    cartao.value = data;
    cartao.value.validade = adjustToTimezone(cartao.value.validade);
}

const salvarCartao = async () => {
    const dataCartao = {
        numero: cartao.value.numero,
        cvv: cartao.value.cvv,
        nomeImpresso: cartao.value.nomeImpresso,
        validade: convertMonthYearToDate(cartao.value.validade),
        bandeira: cartao.value.bandeira,
        apelidoCartao: cartao.value.apelidoCartao,
        favorito: cartao.value.favorito,
        cliente: { id: clienteId.value }
    }

    const responseCartao = await apiClient.put(`/cartoes/${cartaoID.value}`, dataCartao).catch((error) => {
        for (const key in error.response.data) {
            if (key === 'cartao' || key === 'id') {
                delete error.response.data[key];
            } else {
                toast.add({ severity: 'error', summary: 'Erro', detail: error.response.data[key], life: 3000 });
            }
        }
        return;
    });

    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cartão salvo com sucesso', life: 3000 });
    visible.value = false;
    readonly.value = true;
    getCartao();
}

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

function adjustToTimezone(dateString: String) {
    const date = new Date(dateString);
    const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    return adjustedDate.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit' });
}

function convertMonthYearToDate(monthYear: string): string {
    const [month, year] = monthYear.split('/');
    return `${year}-${month.padStart(2, '0')}-01`;
}

onBeforeMount(() => {
    getCartao();
});


</script>