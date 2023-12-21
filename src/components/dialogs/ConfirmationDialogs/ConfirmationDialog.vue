<template>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
        <v-card class="p-8">
          <div class="mt-4">
            <v-row>
            <v-card-title class="text-h5 mx-6 mt-2">
            {{props.vTitle}}
          </v-card-title>
          <!-- Close buttons -->
          <div  class=" ml-auto  rounded-md p-2 cursor-pointer">
            <span  @click="close" class=" material-icons  mr-4 text-gray rounded-md p-2 cursor-pointer">
              close
                 
              </span>
          </div>


          </v-row>
            
          </div>


          <v-card-text class="m-2">
            {{props.vText}} 
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color = "red"
              variant="text"
              @click="accept()"
              :loading="processing"
            >
              Accept
            </v-btn>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="close()"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </template>
 

<script setup>
import { computed, ref, watch } from "vue";
 const props = defineProps(["showDialog","v-title", "v-text", "loading"]);
 const dialog = computed(() => {
   return props.showDialog;
 });

const showDialog = ref(false);
 
const processing = computed(() => {
  return props.loading;
});

// watch(dialog, (newVal, oldVal) => {
//   console.log("watching...");
//   showDialog.value = newVal;
// });

// const dialog = ref(props.showDialog);
// const props = defineProps({
//     dialog : Boolean
// });

const emit = defineEmits(['closeDialog', 'confirmAction'])

const close = () => {
  emit('closeDialog')
}

const accept = () => {
 
  emit('confirmAction')
}


</script>