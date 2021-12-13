export default class APIService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchHits(){
        return fetch(`https://pixabay.com/api/?key=24781056-75ab6f95c382245b51e5e78bf&q=${this.searchQuery}&per_page=3&page=${this.page}&orientation=horizontal&safesearch=true&image_type=photo`)
            .then(response => response.json())
            .then(data => {
                this.page += 1;
                console.log(data);
                return data.hits;
            })
            .catch(error => {
                Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
                console.log(error);
            });
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        searchQuery = newQuery;
    }
}
