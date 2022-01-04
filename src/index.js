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
btnLoadMore.classList.add('is-hidden');

function onSearch(evt) {
  evt.preventDefault();
  
  apiService.searchQuery = evt.target.elements.searchQuery.value;
  const valueInput = apiService.searchQuery.trim();
  if (valueInput === '') {
    return 
  }
 btnLoadMore.classList.add('is-hidden');

  apiService.resetPage();
  apiService.fetchHits()
    .then(data => {
      console.log(data)
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
      endFreeImg(data)
      galleryConteiner.innerHTML = '';
      markupCards(data.hits);
    }); 
 
}

function onLoadMore() {
  apiService.fetchHits().then(data => {
    endFreeImg(data)
    markupCards(data.hits)
    lightbox.refresh()
  });
}
function endFreeImg(data) {
 
  const allFreeImg = data.totalHits;
  const perPage = 40 * apiService.page;
      const endImg = allFreeImg / perPage
      console.log(endImg)
      if (endImg <= 0.5125) {
        btnLoadMore.classList.add('is-hidden');
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
      }
      if (endImg > 0.5125) {
      btnLoadMore.classList.remove('is-hidden');
      btnLoadMore.classList.add('.load-more');
      }
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

