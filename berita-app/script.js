
const apiKey = '25206a61d9f144148165196e69f4f370'; // Ganti dengan API Key dari https://newsapi.org/
const newsContainer = document.getElementById('news-container');

async function fetchNews(query = 'technology') {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    displayNews(data.articles);
}

function displayNews(articles) {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const newsHTML = `
            <div class="col-md-4">
                <div class="card news-card">
                    <img src="${article.urlToImage || 'https://via.placeholder.com/400'}" class="card-img-top" alt="Gambar Berita">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description || 'Tidak ada deskripsi.'}</p>
                        <a href="${article.url}" target="_blank" class="btn btn-primary">Baca Selengkapnya</a>
                    </div>
                </div>
            </div>
        `;
        newsContainer.innerHTML += newsHTML;
    });
}

function searchNews() {
    const query = document.getElementById('search-input').value;
    if (query.length > 2) {
        fetchNews(query);
    }
}

// Fetch berita awal
fetchNews();