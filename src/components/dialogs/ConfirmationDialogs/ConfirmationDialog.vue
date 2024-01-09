<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card class="p-8">
      <div class="mt-4">
        <v-row>
          <v-card-title class="text-h5 mx-6 mt-2">
            {{ props.vTitle }}
          </v-card-title>
          <!-- Close buttons -->
          <div class="ml-auto rounded-md p-2 cursor-pointer">
            <span
              @click="close"
              class="material-icons mr-4 text-gray rounded-md p-2 cursor-pointer"
            >
              close
            </span>
          </div>
        </v-row>
      </div>
      <v-card-text class="m-2">
        {{ props.vText }}
      </v-card-text>
      <div class="mx-8" v-if="confirmAction">
        <div class="mb-2">
          To confirm please type:
          <span class="text-red-500 font-semibold">"I confirm"</span>
        </div>
        <v-text-field
          v-model="confirmText"
          label="Type here..."
          outlined
          clearable
          @click.right.prevent
          @paste="onPaste"
        >
        </v-text-field>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red"
          variant="text"
          @click="accept()"
          :loading="processing"
          :disabled="confirmText !== 'I confirm' && confirmAction == true"
        >
          Accept
        </v-btn>
        <v-btn color="green-darken-1" variant="text" @click="close()">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref, watch } from "vue";
const props = defineProps([
  "showDialog",
  "v-title",
  "v-text",
  "loading",
  "confirmAction",
]);
const dialog = computed(() => {
  return props.showDialog;
});

const processing = computed(() => {
  return props.loading;
});

const emit = defineEmits(["closeDialog", "confirmAction"]);

const close = () => {
  emit("closeDialog");
};

const accept = () => {
  emit("confirmAction");
};

const confirmText = ref("");
const onPaste = (e) => {
  e.preventDefault();
};
</script>
