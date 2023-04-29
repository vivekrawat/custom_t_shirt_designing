<template>
  <div class="w-full flex justify-center container mx-auto">
    <div class="lg:flex w-full justify-center">
      <LeftOptions @send-data="addingElement" @sendEditData="updateElement" :editMode="editMode" :selectedData="selectedData" @delete="deleteElement" @closeEditMode="closeEditMode"/>

      <div id="dwimage" class="relative flex w-full lg:max-w-[450px] justify-center">
        <img
          :src="imagePath"
          alt=""
          :class="selectedStyle"
          class="object-contain w-full"
        />
        <div
          id="zone"
          class="absolute w-[40%] h-[50%] top-[20%] z-10 hover:border-2 overflow-hidden"
        ></div>
      </div>
      <RightSideOptions @download="downloadImage"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RightSideOptions from "./RightSideOptions.vue";
import LeftOptions from "./LeftOptions.vue";
import { computed, ref } from "vue";
import useCustomTshirt from "../composables";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg } from 'html-to-image';
const { selectedStyle, selectedType, typeView } = useCustomTshirt();
const imagePath = computed(() => {
  if (typeView.value === "front") {
    return new URL(selectedType.value.url.front, import.meta.url).href;
  } else {
    if (selectedType.value.url.back) {
      return new URL(selectedType.value.url.back, import.meta.url).href;
    } else return "";
  }
});
type inputData = {
  text: string;
  bold: boolean;
  italic: boolean;
  fontSize: number;
  colour: string;
  letterSpacing: number;
  padding: number | null;
  bgColour: string | null;
  fontFamily: string | null;
};
const sampleData  = {
  text: '',
  bold: false,
  italic: false,
  fontSize: 12,
  colour: '#fffff',
  letterSpacing: 1,
  padding: null,
  bgColour:null,
  fontFamily: null
}
const selectedData = ref<inputData>({...sampleData})
const selectedElement = ref<any>()
const editMode = ref<boolean>(false)

const updatingStyles = (e:any, data:inputData) => {
  e.style.position = "absolute";
  e.innerText = data.text;
  e.style.fontSize = data.fontSize + "px";
  e.style.color = data.colour;
  e.style.fontWeight = data.bold ? "800" : "400";
  e.style.fontStyle = data.italic ? "italic" : "";
  e.style.letterSpacing = data.letterSpacing + "px";
  e.style.padding = data.padding ? data.padding + "px" : "0px";
  if (data.bgColour) {
    e.style.backgroundColor = data.bgColour;
  }
  if (data.fontFamily) {
    e.className = `font-${data.fontFamily}`;
  }
}
const addingElement = (data: inputData) => {
  // console.log(data);
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var zone = document.getElementById("zone");
  console.log("testing");
  const text = document.createElement("div");
  zone?.appendChild(text);
  updatingStyles(text, data)

  text.addEventListener("mouseover", () => {
    text.style.cursor = "move";
  });
  text.onmousedown = dragMouseDown;
  text.onclick = clickItem
  //function 1
  function dragMouseDown(e: any) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }
  //function 2
  function elementDrag(e: any) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    text.style.top = text.offsetTop - pos2 + "px";
    text.style.left = text.offsetLeft - pos1 + "px";
    // const childBound = text.getBoundingClientRect() 
  }
  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
  console.log('reached here')
  selectedData.value = {...sampleData}
};
const rgbToHex= (color: string) =>  {
  if (color[0] === '#') {
    return color
  }
  color = color.slice(4,-1)
  return '#'+color?.split(',').map(function(x){
        x = parseInt(x).toString(16);
        return (x.length==1) ? "0"+x : x;
    }).join("");
  }
  
const clickItem = (e:any) => {
  selectedElement.value = e.target
  console.log(selectedElement.value)
  editMode.value = true
  let data:inputData = {...sampleData}
  data.text = e.target.innerText
  data.bold = e.target.style.fontWeight == 800
  data.italic = e.target.style.fontStyle === 'italic'
  data.fontSize = parseInt(e.target.style.fontSize.slice(0,-2))
  data.colour = e.target.style.color ? rgbToHex(e.target.style.color) : '#fffff'
  data.letterSpacing = parseInt(e.target.style.letterSpacing.slice(0,-2))
  data.padding = parseInt(e.target.style.padding.slice(0,-2))
  data.bgColour = e.target.style.backgroundColor ? rgbToHex(e.target.style.backgroundColor) : null
  data.fontFamily =  e.target.className.slice(5)
  selectedData.value = data
  console.log(selectedData.value)
}
const closeEditMode = () => {
  selectedElement.value = null
  selectedData.value = {...sampleData}
  editMode.value = false
}
const deleteElement = () => {
  if (editMode.value) {
    selectedElement.value.remove()
    closeEditMode()
  }
}
const updateElement = (data: inputData) => {
  updatingStyles(selectedElement.value,data)
}
const downloadImage = () => {
  const img = document.getElementById('dwimage')
  if (img) {
    htmlToImage.toJpeg(img)
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'design.jpeg';
      link.href = dataUrl;
      link.click();
    });
  }
}
</script>
