<template>
    <div class="w-full max-w-[370px]">
        <FontFamilySelector :is-modal-open="fontFamilyModal" @closeModal="toggleModal" @set-font-family="setFontFamily"/>
        <div class="flex align-left font-extralight">
            <button @click="changeActiveSection('text')" :class="{'bg-gray-500 text-white' : activeSection==='text'}" class="border-2 rounded hover:scale-105 font-semibold px-4 py-2 mr-2">Add Text</button>
            <button @click="changeActiveSection('art')" :class="{'bg-gray-500 text-white' : activeSection==='art'}" class="px-4 py-2 rounded border-2 hover:scale-105 font-semibold">Browse Art</button>
        </div>
        <div class="mt-4">
            <button v-if="editMode" @click="closeEditMode()" class="w-full uppercase py-2 bg-red-400 text-white rounded-md hover:bg-red-500 hover:scale-105">
            done
            </button>
        </div>
        <div v-show="activeSection === 'text'">
            <div class="mt-4">
                <button v-if="!editMode" @click="addText()" class="w-full uppercase py-2 bg-red-400 text-white rounded-md hover:bg-red-500 hover:scale-105">Add Text</button>
                <input type="text" id="text" :value="text" @change="changeText($event)" placeholder="Write Your Own Text Here" class="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <div class="flex mt-4">
                    <input type="text" :value="colour" disabled class="h-[40px] disabled:bg-gray-200 disabled:text-gray-700 rounded-md bg-gray-50 text-sm p-2.5 border border-gray-300 text-gray-900">
                    <input type="color" id="head" name="head" @change="changeColour($event)" value="colour" class="rounded-lg cursor-pointer ml-[-15%] text-white h-8 my-1 text-left">
                    <button @click="toggleBold()" :class="bold ? 'text-white bg-black': ''" class="font-bold px-4 py-2 border-2 ml-3">B</button>
                    <button @click="toggleItalic()" :class="italic ? 'text-white bg-black': ''"  class="font-bold px-4 py-2 border-2 ml-3">/</button>
                </div>
                <div class="flex mt-4">
                    <label for="fontsize" class="pt-1">Select font Size:</label>
                    <select class="w-fit h-[40px] mr-2  ml-3 px-3 py-2 rounded font-light hover:border-none mb-5" name="fontsize" @change="changeFontSize($event)">
                        <option v-for="size in fontArray" :key="size"  class="font-light p-2" :value="size">{{size}} px</option>
                    </select>
                    <input type="text" placeholder="Font Family" :value="fontFamily" readonly @click="toggleModal(true)" :class="`font-${fontFamily}`" class="focus:outline-none h-[40px] cursor-pointer w-[110px] disabled:bg-gray-200 disabled:text-gray-700 rounded-md bg-gray-50 text-sm p-2.5 border border-gray-300 text-gray-900">
                </div>
                <div class="mt-1">
                    <p class="text-left font-bold">Padding and Background colour</p>
                    <div class="flex">
                        <select class="w-fit px-3 py-2.5 mr-2 rounded font-light hover:border-none mb-5" name="letter-spacing" @change="changePadding($event)">
                        <option v-for="padding in paddingArray" :key="padding"  class="font-light p-2" :value="padding">{{padding}} px</option>
                        </select>
                        <input type="text" :value="bgColour ? bgColour : 'None'" disabled class="disabled:bg-gray-200 h-[40px] disabled:text-gray-700 rounded-md bg-gray-50 text-sm p-2.5 border border-gray-300 text-gray-900">
                        <input type="color" id="head" name="head" @change="changeBgColour($event)" :value="bgColour" class="rounded-lg cursor-pointer ml-[-15%] text-white h-8 my-1 text-left">
                    </div>
                </div>
                <div class="flex mt-2">
                    <label for="letter-spacing" class="pt-1">Letter Spacing:</label>
                    <select class="w-fit ml-3 px-3 py-2 rounded font-light hover:border-none mb-5" name="letter-spacing" @change="changeLetterSpacing($event)">
                        <option v-for="spacing in letterSpacingArray" :key="spacing"  class="font-light p-2" :value="spacing">{{spacing}} px</option>
                    </select>
                </div>
            </div>
            <div v-if="editMode" class="text-left">
                <button @click="deleteElement()" class="bg-red-500 text-white hover:scale-105 py-2 px-4 rounded uppercase">Delete</button>
            </div>
        </div>
        <div v-show="activeSection === 'art'">
            <img v-show="image" id="image" class="h-[300px] object-contain w-[300px]" :src="image" alt="">
            <input class="mt-3 w-full" @change="changeImage($event)" type="file" accept="image/png, image/gif, image/jpeg">
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import FontFamilySelector from './FontFamilySelector.vue'

const activeSection = ref<'text'|'art'>('text')
const changeActiveSection = (val: 'text'|'art') => {
    activeSection.value = val
}

const image = ref()
const changeImage = (e:any) => {
    console.log('hit')
    console.log(e.target.files[0])
    let img  = window.document.getElementById('image')
    if(img) {
        // img.src = URL.createObjectURL(e.target.files[0]);
    }
    image.value = URL.createObjectURL(e.target.files[0])
}

const fontArray = [12,14,16,18,20,22,24,26,28,30,32,34,36,40,42,45,50,55,60,65,70,75,80]
const paddingArray = [1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18]
const letterSpacingArray = [1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18]
const props = defineProps(['editMode', 'selectedData'])
const emits = defineEmits(['sendData', 'delete', 'closeEditMode', 'sendEditData'])
const selectedData = ref(props.selectedData)
watch(()=>props.selectedData, ()=> {
    console.log('data changed')
    colour.value = props.selectedData.colour
    bgColour.value = props.selectedData.bgColour
    padding.value = props.selectedData.padding
    text.value = props.selectedData.text
    bold.value = props.selectedData.bold
    italic.value = props.selectedData.italic
    fontSize.value = props.selectedData.fontSize
    letterSpacing.value = props.selectedData.letterSpacing
    fontFamily.value = props.selectedData.fontFamily
    console.log(text.value)
})
const colour = ref('#fffff')
const bgColour = ref(null)
const padding = ref(null)
const text = ref('')
const bold = ref(false)
const italic = ref(false)
const fontSize = ref(12)
const letterSpacing = ref(1)
const fontFamily = ref<string|null>(null)

const fontFamilyModal = ref(false)

const changeColour = (e: any) => {
    colour.value = e.target.value
    if (props.editMode) {
        passData()
    }
}
const toggleBold = () => {
    bold.value = !bold.value
    if (props.editMode) {
        passData()
    }
}
const toggleItalic = () => {
    italic.value = !italic.value
    if (props.editMode) {
        passData()
    }
}
const changeFontSize = (e:any) => {
    fontSize.value = e.target.value
    if (props.editMode) {
        passData()
    }
}
const changeText = (e:any) => {
    text.value = e.target.value
    if (props.editMode) {
        passData()
    }
}
const changeLetterSpacing = (e:any) => {
    letterSpacing.value = e.target.value
    if (props.editMode) {
        passData()
    }
}
const changePadding = (e:any) => {
    padding.value  = e.target.value
    if (props.editMode) {
        passData()
    }
}
const changeBgColour = (e:any) => {
    bgColour.value = e.target.value
    if (props.editMode) {
        passData()
    }
}
const passData = () => {
    let obj = {
        text : text.value,
        bold: bold.value,
        italic: italic.value,
        fontSize: fontSize.value,
        colour: colour.value,
        letterSpacing: letterSpacing.value,
        padding: padding.value,
        bgColour: bgColour.value,
        fontFamily: fontFamily.value
    }
    emits('sendEditData', obj)
}
const addText  = () => {
    let obj = {
        text : text.value,
        bold: bold.value,
        italic: italic.value,
        fontSize: fontSize.value,
        colour: colour.value,
        letterSpacing: letterSpacing.value,
        padding: padding.value,
        bgColour: bgColour.value,
        fontFamily: fontFamily.value
    }
    emits('sendData', obj)
}
const toggleModal = (val: boolean) => {
    fontFamilyModal.value = val
}
const setFontFamily = (val: string|null) => {
    fontFamily.value = val
    toggleModal(false)
    if (props.editMode) {
        passData()
    }
}
const deleteElement = () => {
    emits('delete')
}
const closeEditMode = () => {
    emits('closeEditMode')
}
</script>
