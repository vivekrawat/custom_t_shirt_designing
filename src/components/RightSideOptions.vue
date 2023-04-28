<template>
    <div class="w-full max-w-[250px]">
        <select class="w-full px-3 py-2 rounded font-light hover:border-none mb-5" ref="select" @change="changingType()">
            <option v-for="type in types" :key="type.name"  class="font-light p-2" :value="type.name">{{type.name}}</option>
        </select>
        <div class="text-left w-[90%]">
            <button v-for="style in styles" :class="style" @click="setActiveStyle(style)" class="my-2 rounded-[50%] w-[30px] mx-[6px] h-[30px] hover:border-none hover:scale-110 outline outline-offset-2 outline-1">
            </button>
        </div>
        <div v-show="selectedType.url.back" class="flex my-3 align-left">
            <button @click="setTypeView('front')" :class="typeView === 'front'? 'bg-[#808080] text-white':''" class="uppercase px-3 rounded-md py-1 border-2 mr-1">Front</button>
            <button @click="setTypeView('back')" :class="typeView === 'back'? 'bg-[#808080] text-white':''" class="px-3 uppercase rounded-md py-1 border-2">Back</button>
        </div>
        <div class="my-6 flex align-left">
            <button @click="download()" class="bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded-lg font-semibold uppercase hover:scale-110 text-white">Download</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import useCustomTshirt from '../composables/index' 
const { types, styles, setActiveStyle, setActiveType, selectedType, typeView, setTypeView  } = useCustomTshirt()
const select= ref()
const changingType = () => {
    let val = types.find((type)=>type.name === select.value.value)
    if (val) {
        setActiveType(val)
    }
}
const emit = defineEmits(['download'])
const download = () => {
    emit('download')
}
</script>
