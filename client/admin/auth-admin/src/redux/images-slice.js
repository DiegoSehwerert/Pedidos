import { createSlice } from '@reduxjs/toolkit'

export const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    imageGallery: null,
    showedImages: [],
    selectedImages: []
  },
  reducers: {
    setImageGallery: (state, action) => {
      state.imageGallery = action.payload
    },
    showImage: (state, action) => {
      if (!state.showedImages.some(image =>
        image.name === action.payload.name &&
        image.filename === action.payload.filename)) {
        state.showedImages.push(action.payload)
      }
    },
    showImages: (state, action) => {
      if (!state.showedImages.some(image =>
        image.name === action.payload.name &&
        image.filename === action.payload.filename)) {
        state.showedImages.push(action.payload)
      }
      state.showedImages = action.payload.map(image => ({
        name: image.name,
        filename: image.filename,
        title: image.title,
        alt: image.alt
      }))
    },
    addImage: (state, action) => {
      if (!state.selectedImages.some(image =>
        image.name === action.payload.name &&
        image.filename === action.payload.filename)) {
        state.selectedImages.push(action.payload)
      }
    },
    removeImage: (state, action) => {
      const selectedImage = state.selectedImages.findIndex(image =>
        image.filename === action.payload.filename &&
        // image.languageAlias === action.payload.languageAlias &&
        image.name === action.payload.name
      )
      if (selectedImage !== -1) {
        state.selectedImages.splice(selectedImage, 1)
      }
      const showedImage = state.showedImages.findIndex(image =>
        image.filename === action.payload.filename &&
        // image.languageAlias === action.payload.languageAlias &&
        image.name === action.payload.name
      )
      if (showedImage !== -1) {
        state.showedImages.splice(showedImage, 1)
      }
    },
    removeImages: (state, action) => {
    }
  }
})

export const { setImageGallery, showImage, showImages, addImage, removeImage, removeImages } = imagesSlice.actions

export default imagesSlice.reducer
