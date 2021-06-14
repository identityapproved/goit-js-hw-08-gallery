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
   window.addEventListener('keydown', onEscPress)
   window.addEventListener('keydown', swipeGallery)
   closeModalBtn.addEventListener('click', onModalClose)
   overlay.addEventListener('click', onModalClose)
}

function onModalClose() {
   window.removeEventListener('keydown', onEscPress)
   window.removeEventListener('keydown', swipeGallery)
   lightbox.classList.remove('is-open')
   lightboxImg.src = ''
}

function onEscPress(e) {
   if (e.key === "Escape") {
      onModalClose()
   }
}


function swipeGallery(e) {
   if (!lightbox.classList.contains('is-open')) {
      return
   }

const pastedImages = galleryList.querySelectorAll('.gallery__image')
const currentImage = [...pastedImages].find((img) => img.dataset.source === lightboxImg.src);
const currentImageIndex = Number(currentImage.dataset.index);

   if (e.key === "ArrowRight") {
      if (currentImageIndex + 1 === pastedImages.length) {
         return;
      }
      const nextImage = [...pastedImages].find(
         (arrayImage) => Number(arrayImage.dataset.index) === currentImageIndex + 1
         );
         lightboxImg.src = nextImage.dataset.source;
      } else if (e.key === "ArrowLeft") {
         if (currentImageIndex - 1 === -1) {
            return;
         }
         const prevImage = [...pastedImages].find(
            (arrayImage) => Number(arrayImage.dataset.index) === currentImageIndex - 1
            )
            lightboxImg.src = prevImage.dataset.source;
         }
}

galleryList.addEventListener('click', onModalOpen)