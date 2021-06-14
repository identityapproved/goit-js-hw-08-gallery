import galleryItems from "./gallery-items.js"

const galleryList = document.querySelector('.js-gallery')
const lightbox = document.querySelector('.lightbox')
const overlay = document.querySelector(".lightbox__overlay")
const closeModalBtn = document.querySelector('.lightbox__button')
const lightboxImg = document.querySelector('.lightbox__image')

const createGalleryMarkup = galleryItems.map(({ preview, original, description }, index) => {
      return `<li class="gallery__item">
          <a
            class="gallery__link"
            href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              data-index="${index}"
              alt="${description}"
            />
          </a>
        </li>`
   })
   .join('')

galleryList.insertAdjacentHTML('beforeend', createGalleryMarkup)

function onModalOpen(e) {
   e.preventDefault()
   
   if (e.target.nodeName !== "IMG") {
      return
   }
   lightbox.classList.add('is-open')
   lightboxImg.src = e.target.dataset.source
   currentIndex = Number(e.target.dataset.index)
   window.addEventListener('keydown', onEscPress)
   window.addEventListener('keydown', onArrowLeft)
   window.addEventListener('keydown', onArrowRight)
   closeModalBtn.addEventListener('click', onModalClose)
   overlay.addEventListener('click', onModalClose)
}

function onModalClose() {
   window.removeEventListener('keydown', onEscPress)
   window.removeEventListener('keydown', onArrowLeft)
   window.removeEventListener('keydown', onArrowRight)
   lightbox.classList.remove('is-open')
   lightboxImg.src = ''
}

function onEscPress(e) {
   if (e.key === "Escape") {
      onModalClose()
   }
}

galleryList.addEventListener('click', onModalOpen)

// const pastedImages = galleryList.querySelectorAll('.gallery__image')
// const currentImage = [...pastedImages].find((img) => img.dataset.source === lightboxImg.src);
// const currentImageIndex = Number(currentImage.dataset.index);

function onArrowLeft(e) {
   if (e.key === "ArrowLeft") {

   }
}

function onArrowRight(e) {
   if (e.key === "ArrowRight") {

   }
}
