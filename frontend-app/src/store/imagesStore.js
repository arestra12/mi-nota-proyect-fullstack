import { create } from "zustand"

export const imagesStore = create(() => ({
  images: [
    {
      id: 1,
      name: "Perro",
      url1: "https://ehhvujkvmapimeocgikt.supabase.co/storage/v1/object/public/pets/imgPerroMini.webp",
      url2: "https://ehhvujkvmapimeocgikt.supabase.co/storage/v1/object/public/pets/imgPerroDurmiendoMini.webp"
    },
    {
      id: 2,
      name: "Gato",
      url1: "https://ehhvujkvmapimeocgikt.supabase.co/storage/v1/object/public/pets/imgGatoMini.webp",
      url2: "https://ehhvujkvmapimeocgikt.supabase.co/storage/v1/object/public/pets/imgGatoDurmiendoMini.webp"
    },
    {
      id: 3,
      name: "Conejo",
      url1: "https://ehhvujkvmapimeocgikt.supabase.co/storage/v1/object/public/pets/imgConejoMini.webp",
      url2: "https://ehhvujkvmapimeocgikt.supabase.co/storage/v1/object/public/pets/imgConejoDurmiendoMini.webp"
    },
    {
      id: 4,
      name: "Dragón",
      url1: "https://ehhvujkvmapimeocgikt.supabase.co/storage/v1/object/public/pets/imgDragonMini.webp",
      url2: "https://ehhvujkvmapimeocgikt.supabase.co/storage/v1/object/public/pets/imgDragonDurmiendoMini.webp"
    },
    {
      id: 5,
      name: "Oso",
      url1: "https://ehhvujkvmapimeocgikt.supabase.co/storage/v1/object/public/pets/imgOsoMini.webp",
      url2: "https://ehhvujkvmapimeocgikt.supabase.co/storage/v1/object/public/pets/imgOsoDurmiendoMini.webp"
    }
  ]
}))