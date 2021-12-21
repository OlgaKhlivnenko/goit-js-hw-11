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
btnLoadMore.setAttribute(`disabled`, true);

function onSearch(evt) {
  evt.preventDefault();
  
  apiService.searchQuery = evt.target.elements.searchQuery.value;
  const valueInput = apiService.searchQuery.trim();
  if (valueInput === '') {
    return 
  }
  btnLoadMore.setAttribute(`disabled`, true);

  apiService.resetPage();
  apiService.fetchHits()
    .then(data => {
       const allFreeImg = data.totalHits;
    Notiflix.Notify.success(`Hooray! We found ${allFreeImg} images`);
      galleryConteiner.innerHTML = '';
      const hits = data.hits;
      markupCards(hits);
      btnLoadMore.removeAttribute(`disabled`, true);
      
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
};
const lightbox = new SimpleLightbox('.gallery a');
