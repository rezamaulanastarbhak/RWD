
const apiKey = '25206a61d9f144148165196e69f4f370';
const newsContainer = document.getElementById('news-container');
const pageNumber = document.getElementById('page-number');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');

let currentPage = 1;
let articles = [];
const articlesPerPage = 6;

async function fetchNews(query = 'technology') {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.articles) {
        articles = data.articles;
        currentPage = 1;
        displayNews();
    }
}

function displayNews() {
    newsContainer.innerHTML = '';
    const start = (currentPage - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    const paginatedArticles = articles.slice(start, end);

    paginatedArticles.forEach(article => {
        newsContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card news-card">
                    <img src="${article.urlToImage || 'https://via.placeholder.com/400'}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p>${article.author}</p>
                        <p>${article.description || 'Tidak ada deskripsi.'}</p>
                        <a href="${article.url}" class="btn btn-primary">Baca Selengkapnya</a>
                    </div>
                </div>
            </div>
        `;
    });

    updatePagination();
}

function searchNews() {
    const query = document.getElementById('search-input').value;
    if (query.length > 2) {
        fetchNews(query);
    }
}

function changePage(offset) {
    currentPage += offset;
    displayNews();
}

// Fetch berita awal
fetchNews();

