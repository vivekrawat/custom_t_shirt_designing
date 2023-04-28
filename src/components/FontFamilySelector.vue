<template>
   <TransitionRoot
    :show="isModalOpen"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
  <div v-if="isModalOpen" class="fixed top-[0px] left-[0px] w-screen h-screen bg-gray-200 z-20 opacity-[50%]"></div>
  <Dialog :open="isModalOpen" @close="closeModal()" class="fixed w-screen top-[0px] h-screen z-50 flex">
    <DialogPanel class="opacity-[100%] p-3 bg-white mx-auto z-20 my-auto max-w-[500px] rounded-xl">
      <DialogTitle class="text-xl uppercase font-bold">Choose Font</DialogTitle>
      <DialogDescription>
        <select class="w-full mt-4 min-w-[430px] h-[40px] uppercase px-3 py-2 rounded font-light hover:border-none mb-5"  @change="changeFontType($event)">
          <option v-for="fontType in fontTypeArray" :key="fontType"  class="uppercase p-2" :value="fontType">{{fontType}}</option>
        </select>
        <ul class="mx-3 text-2xl capitalize" v-if="activeFontType === 'display'">
          <!-- <li v-for="item in displayTypeArray">
          <button class="uppercase my-2" :class="`font-${item}`">{{item}}</button>
          </li> -->
          <li @click="setFontFamily('sedgwick')" class="font-sedgwick cursor-pointer mt-1 hover:bg-gray-500 hover:text-white p-2 rounded">sedgwick</li>
          <li @click="setFontFamily('notoSerif')" class="font-notoSerif cursor-pointer mt-1 hover:bg-gray-500 hover:text-white p-2 rounded">notoSerif</li>
          <li @click="setFontFamily('ruslan')" class="font-ruslan cursor-pointer mt-1 hover:bg-gray-500 hover:text-white p-2 rounded">rulsan</li>
          <li @click="setFontFamily('majorMono')" class="font-majorMono cursor-pointer mt-1 hover:bg-gray-500 hover:text-white p-2 rounded">majorMono</li>
          <li @click="setFontFamily('bigShoulders')" class="font-bigShoulders cursor-pointer mt-1 hover:bg-gray-500 hover:text-white p-2 rounded">bigShoulders</li>
          <li @click="setFontFamily('almendra')" class="font-almendra cursor-pointer mt-1 hover:bg-gray-500 hover:text-white p-2 rounded">almendra</li>
          <li @click="setFontFamily('monoton')" class="font-monoton cursor-pointer mt-1 hover:bg-gray-500 hover:text-white p-2 rounded">monoton</li>
          <li @click="setFontFamily('nosifer')" class="font-nosifer cursor-pointer mt-1 hover:bg-gray-500 hover:text-white p-2 rounded">nosifer</li>
          <li @click="setFontFamily('fasterOne')" class="font-fasterOne cursor-pointer mt-1 hover:bg-gray-500 hover:text-white p-2 rounded">fasterOne</li>
          
        </ul>
        <ul class="mx-3 text-2xl capitalize" v-if="activeFontType === 'handwriting'">
          <!-- <li v-for="item in handwritingTypeArray">
          <button class="uppercase my-2" :class="`font-${item}`">{{item}}</button>
          </li> -->
          <li @click="setFontFamily('delicious')" class="font-delicious cursor-pointer mt-1 hover:bg-gray-500 hover:text-white p-2 rounded">delicious</li>
          <li @click="setFontFamily('freehand')" class="font-freehand cursor-pointer mt-1 hover:bg-gray-500 hover:text-white p-2 rounded">freehand</li>
          <li @click="setFontFamily('alkatra')" class="font-alkatra cursor-pointer mt-1 hover:bg-gray-500 hover:text-white p-2 rounded">alkatra</li>
          <li @click="setFontFamily('handlee')" class="font-handlee cursor-pointer mt-1 hover:bg-gray-500 hover:text-white p-2 rounded">handlee</li>
          <li @click="setFontFamily('gochi')" class="font-gochi cursor-pointer mt-1 hover:bg-gray-500 hover:text-white p-2 rounded">gochi</li>
        </ul>
      </DialogDescription>
      <hr/>
      <div class="w-full flex flex-row-reverse">
        <button class="border-2 block text-right mt-3 bg-red-500 text-white py-2 px-3 font-bold rounded-lg uppercase" @click="closeModal()">Close</button>
      </div>
    </DialogPanel>
  </Dialog>
  </TransitionRoot>
</template>
<script lang="ts" setup>
import {ref} from "vue"
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot
} from "@headlessui/vue";

defineProps(["isModalOpen"]);
const emits = defineEmits(["closeModal", "setFontFamily"]);
const activeFontType = ref('display')
const fontTypeArray = ref(['display','handwriting'])
const displayTypeArray = ref(['sedgwick', 'notoSerif', 'ruslan', 'majorMono','bigShoulders','almendra','monoton','nosifer','fasterOne'])
const handwritingTypeArray = ref(['delicious','freehand','alkatra','handlee','gochi'])
const changeFontType = (e:any) => {
  activeFontType.value = e.target.value
}
const setFontFamily = (val: string) => {
  emits('setFontFamily', val)
}

const closeModal = () => {
  emits("closeModal", false);
};
</script>
