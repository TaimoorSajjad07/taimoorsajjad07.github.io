// Names the missing address on the 404 page. Kept out of 404.html so its CSP can forbid inline scripts.
document.getElementById('path').textContent = location.pathname;
