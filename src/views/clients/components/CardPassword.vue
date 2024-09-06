<template>
    <Card class="my-5">
        <template #content>
            <div class="border-1 surface-border border-round surface-ground font-medium p-3 grid">
                <div class="my-2 col-6 p-6">
                    <div>
                        Senha
                        <Password v-model="senha" :invalid="invalidPass" toggleMask id="senha"
                        />
                    </div>
                </div>
                <div class="my-2 col-6 p-6">
                    <div>
                        Confirmar Senha
                        <Password v-model="confirmarSenha" :invalid="invalidPass" toggleMask id="confSenha"
                        />
                    </div>
                </div>
            </div>
            <div class="flex pt-4 justify-content-between">
                <Button label="Cancelar" severity="secondary" icon="pi pi-times"
                    @click="[senha = '', confirmarSenha = '']" />
                <Button label="Alterar Senha" type="submit" icon="pi pi-check" iconPos="right" :disabled="disabled" id="salvarSenhaBtn"
                    @click="salvarCliente" />
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import apiClient from '@/helpers/axios';

const toast = useToast();

const route = useRoute();

const visible = ref(false);
const disabled = ref(true);
const invalidPass = ref(false);

const clienteId = ref(route.params.id);

const cliente = ref(Object);

const senha = ref(String(""));
const confirmarSenha = ref(String(""));

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
        status: cliente.value.status,
        senha: senha.value
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

    senha.value = '';
    confirmarSenha.value = '';

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

watch([senha, confirmarSenha], ([senha, confirmarSenha]) => {
    if (senha === confirmarSenha && senha.length > 7) {
        invalidPass.value = false;
        disabled.value = false;
    } else {
        invalidPass.value = true;
        disabled.value = true;
    }
});


onBeforeMount(() => {
    getCliente();
});


</script>