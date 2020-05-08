(function() {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');



    form.addEventListener('submit', function(e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        const unsplashRequest = new XMLHttpRequest();

        // Sending the API call using XMLHttpRequest object
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID UjqBQ666NXqAr6GCu5Zwh4nTqso64vH26_pMRhGtk-g');
        unsplashRequest.send();

        function addImage() {
            let htmlContent = '';
            const data = JSON.parse(this.responseText);
            console.log('this is unsplash data', data);
            const firstImage = data.results[0];

            if (data && data.results && data.results[0]) {
                htmlContent = `<figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`

                responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

                const articleRequest = new XMLHttpRequest();
                articleRequest.onload = addArticles;
                articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=DVbAzrrAMGj0QYkt0qlyJ69OsbsogZuB`);
                articleRequest.send();

                function addArticles() {
                    let htmlContent = '';
                    // console.log('called');
                    htmlContent = '';
                    const articleData = JSON.parse(this.responseText);
                    // console.log('this is article data', articleData);
                    if (articleData && articleData.response.docs && articleData.response.docs.length > 1) {
                        htmlContent = '<ul>' + articleData.response.docs.map(article => `<li class="article">
                        <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                        <p>${article.snippet}</p>
                        </li>`).join('') + '</ul>';
                    } else {
                        htmlContent = '<div class="error-no-articles">No articles available</div>';
                    }

                    responseContainer.insertAdjacentHTML('beforeend', htmlContent);

                }

            }

        }

    });
})();