<template>
    <div class="border-1 surface-border border-round surface-ground font-medium p-3 flex flex-auto flex-column">
        <div class="my-2">
            <div>
                Nome completo
                <InputText placeholder="Nome completo" class="w-full" v-model="slotProps.cliente.nomeCompleto" required readonly />
            </div>
        </div>
        <div class="my-2">
            <div>
                Gênero
                <InputText class="w-full" v-model="slotProps.cliente.genero" placeholder="Selecione um gênero" required readonly />
            </div>
        </div>
        <div class="my-2">
            <div>
                Email
                <InputText placeholder="Email" class="w-full" v-model="slotProps.cliente.email" type="email" required readonly />
            </div>
        </div>
        <div class="my-2">
            <div>
                CPF
                <InputMask mask="999.999.999-99" placeholder="999.999.999-99" class="w-full" v-model="slotProps.cliente.cpf" required
                    readonly />
            </div>
        </div>
        <div class="my-2">
            <div>
                Data de Nascimento
                <Calendar class="w-full" v-model="slotProps.cliente.dataNascimento" dateFormat="dd/mm/yy" required readonly />
            </div>
        </div>
        <div class="my-2">
            <div>
                Telefone
                <InputMask mask="(99) 99999-9999" placeholder="(99) 99999-9999" class="w-full" v-model="slotProps.cliente.telefone"
                    required readonly />
            </div>
        </div>
        <div class="my-2">
            <div>
                Tipo de Telefone
                <InputText placeholder="Tipo de Telefone" class="w-full" v-model="slotProps.cliente.tipoTelefone" required readonly />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';

const slotProps = defineProps({
    cliente: Object
});

onBeforeMount(() => {
});


</script>