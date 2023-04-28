import { reactive, ref, readonly } from 'vue';
interface type {
    name: string,
    url: {
        front: string,
        back?: string
    }
}
const initTypes = [
    {
        name: 'V-Neck Tee',
        url: {
            front: '../assets/tshirt_front.png',
            back: '../assets/tshirt_back.png'
        }
    },
    {
        name: 'Full Sleves Tee',
        url: {
            front: '../assets/full_sleeve_front_new.png',
            back: ''
        }
    }
]
const initStyles = ['bg-white','bg-gray-400','bg-slate-950','bg-blue-600','bg-red-500', 'bg-indigo-950', 'bg-[#5f0202]', 'bg-[#ffef77]', 'bg-[#22607c]', 'bg-[#bdb0d0]', 'bg-[#f490b6]']
const selectedStyle = ref<string>(initStyles[0])
const selectedType = ref<type>(initTypes[0]) 
const typeView = ref<'front'|'back'>('front')
export default function useCustomTshirt() {
    const types = reactive<type[]>(initTypes)
    const styles = reactive<string[]>(initStyles)
    const setActiveStyle = (val: string) => {
        selectedStyle.value = val
    }
    const setActiveType = (val: type) => {
        setActiveStyle(initStyles[0])
        setTypeView('front')
        selectedType.value = val
    }
    const setTypeView = (val: 'front'|'back') => {
        typeView.value = val
    }
    return {
        types: readonly(types),
        styles: readonly(styles),
        selectedType: readonly(selectedType),
        selectedStyle: readonly(selectedStyle),
        typeView: readonly(typeView),
        setActiveStyle,
        setActiveType,
        setTypeView
    }
}