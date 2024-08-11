// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Delegate event listener to the document or a parent element

    document.addEventListener('click', function(event) {
        const listItem = event.target.closest('.horizontal-menu li[data-href]');

        if (listItem) {
            const url = listItem.getAttribute('data-href');
            console.log("heello"); // Check if this appears
            if (url) {
                window.location.href = url;
            }
        }
    });
});



// This is the ID where the navigation will be inserted
const navPlaceholderId = 'nav-placeholder';

// Check if the navigation content is already cached in localStorage
let cachedNavContent = localStorage.getItem('navContent');

document.addEventListener('DOMContentLoaded', function() {
    // If cached content exists, use it
    if (cachedNavContent) {
        document.getElementById(navPlaceholderId).innerHTML = cachedNavContent;
    } else {
        // If no cached content, fetch it from the server
        fetch('nav.html')
            .then(response => {
                return response.text();
            })
            .then(data => {
                // Cache the fetched content
                localStorage.setItem('navContent', data); // here, this is big

                // Insert the fetched content into the DOM
                document.getElementById(navPlaceholderId).innerHTML = data;
            })
            .catch(error => console.error('Error loading navigation:', error));
    }
});


/*
fetch('nav.html')
    .then(response => {
        if (response.ok) {
            console.log("hello");
        } else {
            console.error('Network response was not ok.');
        }
        // Return the promise to be handled by the next .then()
        return response.text();
    })
    .then(data => {
        document.getElementById('nav-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading navigation:', error));*/

function navigateToYouTube() {
    window.open('https://drive.google.com/drive/u/0/folders/1ar5vfCSWHvVJBhvR-f2cgLfDBPVwW0Fc', '_blank');
}
