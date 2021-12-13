// import '../css/styles.css';
import Notiflix from 'notiflix';
import axios from "axios";
import APIService from './api-service';
// Your API key: 24781056-75ab6f95c382245b51e5e78bf
// Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');

const formEl = document.querySelector('.search-form');
const btnSearch = document.querySelector('[type="submit"]');
const btnLoadMore = document.querySelector('.load-more');
const galleryConteiner = document.querySelector('.gallery');
const apiService = new APIService;

formEl.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onLoadMore);
btnLoadMore.setAttribute(`disabled`, true);

function onSearch(evt) {
  evt.preventDefault();
  
  apiService.searchQuery = evt.target.elements.searchQuery.value;
  if (apiService.searchQuery === '') {
    return
  }
  btnLoadMore.setAttribute(`disabled`, true);

  apiService.resetPage();
  apiService.fetchHits()
    .then(hits => {
    galleryConteiner.innerHTML = '';
    markupCards(hits);
    btnLoadMore.removeAttribute(`disabled`, true);
    })
    // .catch(error => {
    //             Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
    //             console.log(error);
    //         });
    
 
}
function onLoadMore() {
  apiService.fetchHits().then(markupCards);
}

function markupCards(hits) {
   
   galleryConteiner.innerHTML = hits
        .map(({ webformatURL, largeImageURL, likes, views, comments, downloads, }) =>
            `<div class="photo-card">
  <img src="${webformatURL}" alt="" loading="lazy" />
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
</div>`).join('');
};
