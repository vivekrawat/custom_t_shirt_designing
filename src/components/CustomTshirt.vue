<template>
  <div class="w-full flex justify-center container mx-auto">
    <div class="lg:flex w-full justify-center">
      <LeftOptions
        @send-data="addingTextElement"
        @sendImage="addingImageElement"
        @sendEditData="updateElement"
        :editMode="editMode"
        :selectedData="selectedData"
        @delete="deleteElement"
        @closeEditMode="closeEditMode"
      />

      <div
        id="dwimage"
        class="relative flex w-full lg:max-w-[450px] justify-center"
      >
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
      <RightSideOptions @download="downloadImage" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import RightSideOptions from "./RightSideOptions.vue";
import LeftOptions from "./LeftOptions.vue";
import { computed, ref } from "vue";
import useCustomTshirt from "../composables";
import * as htmlToImage from "html-to-image";
import Konva from "konva";
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
const sampleData = {
  text: "",
  bold: false,
  italic: false,
  fontSize: 12,
  colour: "#fffff",
  letterSpacing: 1,
  padding: null,
  bgColour: null,
  fontFamily: null,
};
const selectedData = ref<inputData>({ ...sampleData });
const selectedElement = ref<any>();
const editMode = ref<boolean>(false);

const updatingTextStyles = (e: any, data: inputData) => {
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
};
const addingTextElement = (data: inputData) => {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var zone = document.getElementById("zone");
  const text = document.createElement("div");
  text.style.zIndex = "20";
  zone?.appendChild(text);
  updatingTextStyles(text, data);

  text.addEventListener("mouseover", () => {
    text.style.cursor = "move";
  });
  text.onmousedown = dragMouseDown;
  text.onclick = clickItem;
  function dragMouseDown(e: any) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e: any) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    text.style.top = text.offsetTop - pos2 + "px";
    text.style.left = text.offsetLeft - pos1 + "px";
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
  selectedData.value = { ...sampleData };
};
const rgbToHex = (color: string) => {
  if (color[0] === "#") {
    return color;
  }
  color = color.slice(4, -1);
  return (
    "#" +
    color
      ?.split(",")
      .map(function (x) {
        x = parseInt(x).toString(16);
        return x.length == 1 ? "0" + x : x;
      })
      .join("")
  );
};
const clickItem = (e: any) => {
  selectedElement.value = e.target;
  console.log(selectedElement.value);
  editMode.value = true;
  let data: inputData = { ...sampleData };
  data.text = e.target.innerText;
  data.bold = e.target.style.fontWeight == 800;
  data.italic = e.target.style.fontStyle === "italic";
  data.fontSize = parseInt(e.target.style.fontSize.slice(0, -2));
  data.colour = e.target.style.color
    ? rgbToHex(e.target.style.color)
    : "#fffff";
  data.letterSpacing = parseInt(e.target.style.letterSpacing.slice(0, -2));
  data.padding = parseInt(e.target.style.padding.slice(0, -2));
  data.bgColour = e.target.style.backgroundColor
    ? rgbToHex(e.target.style.backgroundColor)
    : null;
  data.fontFamily = e.target.className.slice(5);
  selectedData.value = data;
  console.log(selectedData.value);
};
const closeEditMode = () => {
  selectedElement.value = null;
  selectedData.value = { ...sampleData };
  editMode.value = false;
};
const deleteElement = () => {
  if (editMode.value) {
    selectedElement.value.remove();
    closeEditMode();
  }
};
const updateElement = (data: inputData) => {
  updatingTextStyles(selectedElement.value, data);
};
//image element
const addingImageElement = (data: any) => {
  function update(activeAnchor: any) {
    var group = activeAnchor.getParent();

    var topLeft = group.findOne(".topLeft");
    var topRight = group.findOne(".topRight");
    var bottomRight = group.findOne(".bottomRight");
    var bottomLeft = group.findOne(".bottomLeft");
    var image = group.findOne("Image");

    var anchorX = activeAnchor.x();
    var anchorY = activeAnchor.y();

    // update anchor positions
    switch (activeAnchor.getName()) {
      case "topLeft":
        topRight.y(anchorY);
        bottomLeft.x(anchorX);
        break;
      case "topRight":
        topLeft.y(anchorY);
        bottomRight.x(anchorX);
        break;
      case "bottomRight":
        bottomLeft.y(anchorY);
        topRight.x(anchorX);
        break;
      case "bottomLeft":
        bottomRight.y(anchorY);
        topLeft.x(anchorX);
        break;
    }

    image.position(topLeft.position());

    var width = topRight.x() - topLeft.x();
    var height = bottomLeft.y() - topLeft.y();
    if (width && height) {
      image.width(width);
      image.height(height);
    }
  }
  function addAnchor(group: any, x: number, y: number, name: string) {
    // var stage = group.getStage();
    // var layer = group.getLayer();

    var anchor = new Konva.Circle({
      x: x,
      y: y,
      stroke: "#666",
      // fill: "#ffff",
      strokeWidth: 0,
      radius: 8,
      name: name,
      draggable: true,
      dragOnTop: false,
    });

    anchor.on("dragmove", function () {
      update(this);
    });
    anchor.on("mousedown touchstart", function () {
      group.draggable(false);
      this.moveToTop();
    });
    anchor.on("dragend", function () {
      group.draggable(true);
    });
    // add hover styling
    anchor.on("mouseover", function () {
      // var layer = this.getLayer();
      document.body.style.cursor = "pointer";
      this.strokeWidth(4);
      
    });
    anchor.on("mouseout", function () {
      // var layer = this.getLayer();
      document.body.style.cursor = "default";
      this.strokeWidth(0);
    });

    group.add(anchor);
  }

  console.log(data);
  // let pos1 = 0,
  //   pos2 = 0,
  //   pos3 = 0,
  //   pos4 = 0;
  var zone = document.getElementById("zone");
  const container = document.createElement("div");
  container.id = "container";
  zone?.appendChild(container);

  let width = zone?.clientWidth;
  let height = zone?.clientHeight;

  var stage = new Konva.Stage({
    container: "container",
    width: width,
    height: height,
  });

  var layer = new Konva.Layer();
  stage.add(layer);

  var imageObj = new Image();
  var imageGroup = new Konva.Group({
    x: 0,
    y: 0,
    draggable: true,
  });
  layer.add(imageGroup);
  imageObj.src = URL.createObjectURL(data);
  imageObj.onload = function () {
    let img = new Konva.Image({
      x: 0,
      y: 0,
      image: imageObj,
      width: 100,
      height: 100,
      // draggable: true
    });
    // add the shape to the layer
    // layer.add(img);
    imageGroup.add(img);
  };

  // imageGroup.add(imageObj);
  addAnchor(imageGroup, 0, 0, "topLeft");
  addAnchor(imageGroup, 100, 0, "topRight");
  addAnchor(imageGroup, 100, 100, "bottomRight");
  addAnchor(imageGroup, 0, 100, "bottomLeft");
};

const downloadImage = () => {
  const img = document.getElementById("dwimage");
  if (img) {
    htmlToImage.toJpeg(img).then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "design.jpeg";
      link.href = dataUrl;
      link.click();
    });
  }
};
</script>
