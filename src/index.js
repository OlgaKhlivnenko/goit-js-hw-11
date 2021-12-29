import './css/styles.css';

import APIService from './api-service';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';


const formEl = document.querySelector('.search-form');
const btnLoadMore = document.querySelector('.load-more');
const galleryConteiner = document.querySelector('.gallery');
const apiService = new APIService;

formEl.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onLoadMore);
btnLoadMore.classList.add('.is-hidden');

function onSearch(evt) {
  evt.preventDefault();
  
  apiService.searchQuery = evt.target.elements.searchQuery.value;
  const valueInput = apiService.searchQuery.trim();
  if (valueInput === '') {
    return 
  }
 btnLoadMore.classList.add('.is-hidden');

  apiService.resetPage();
  apiService.fetchHits()
    .then(data => {
      const allFreeImg = data.totalHits;
      const perPage = 40;
      Notiflix.Notify.success(`Hooray! We found ${allFreeImg} images`);
      const endImg = allFreeImg / perPage
      if (endImg <= 1) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
        btnLoadMore.classList.add('.is-hidden');

      }
      galleryConteiner.innerHTML = '';
      const hits = data.hits;
      markupCards(hits);
    
     btnLoadMore.classList.remove('.is-hidden');
      
    }); 
 
}
function onLoadMore() {
  apiService.fetchHits().then(data => {
    markupCards(data.hits)
    lightbox.refresh()
  });
}

function markupCards(hits) {
   
  const markup = hits
        .map(({ largeImageURL, webformatURL, likes, views, comments, downloads, }) =>
        {
          return `
  <a class="gallery__item" href="${largeImageURL}">
  <div class="photo-card">      
  <img class="img-item" src="${webformatURL}" alt="#" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
    ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
    ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
    ${downloads}
    </p>
  </div>
</div>
</a>`;
        }).join('');
  galleryConteiner.insertAdjacentHTML('beforeend', markup);
  const lightbox = new SimpleLightbox('.gallery a');
};

