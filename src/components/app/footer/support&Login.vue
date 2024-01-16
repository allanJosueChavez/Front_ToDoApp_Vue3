<script setup>

</script>

<template>
    <div class="w-full flex flex-col justify-center bottom-12 fixed">
        <button class="text-blue-900 px-4 py-2 font-semibold underline hover:text-blue-800" type="submit"
            @click="$router.push('/login')">
            <span class="text-md"> Go back to login </span>
        </button>
        <div class="flex justify-center mt-2">

            <span class="text-md font-semibold text-center text-blue-950 ">
                If you need help, please contact us at
                <a class="cursor-pointer text-lime-500 font-bold" href="mailto:support@todohub.com">
                    support@todohub.com
                </a>
            </span>
        </div>
    </div>
</template>
