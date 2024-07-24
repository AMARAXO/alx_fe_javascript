document.addEventListener('DOMContentLoaded', () => {
    let quotes = [];

    function loadQuotes() {
        const storedQuotes = localStorage.getItem('quotes');
        if (storedQuotes) {
            quotes = JSON.parse(storedQuotes);
        } else {
            quotes = [
                { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
                { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", category: "Motivation" },
                // Add more initial quotes as needed
            ];
            saveQuotes();
        }
    }

    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
    }

    function loadLastViewedQuote() {
        const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
        if (lastViewedQuote) {
            const quote = JSON.parse(lastViewedQuote);
            const quoteDisplay = document.getElementById('quoteDisplay');
            quoteDisplay.textContent = `"${quote.text}" - ${quote.category}`;
        }
    }

    function createAddQuoteForm() {
        const form = document.getElementById('add-quote-form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const quoteText = document.getElementById('quote-text').value;
            const quoteCategory = document.getElementById('quote-category').value;
            const newQuote = { text: quoteText, category: quoteCategory };
            quotes.push(newQuote);
            saveQuotes();
            form.reset();
        });
    }
    function exportQuotesToJson() {
        const jsonQuotes = JSON.stringify(quotes, null, 2);
        const blob = new Blob([jsonQuotes], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function importQuotesFromJson(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedQuotes = JSON.parse(e.target.result);
                    quotes = importedQuotes;
                    saveQuotes();
                    alert('Quotes imported successfully!');
                } catch (error) {
                    alert('Error importing quotes. Please ensure the file is in the correct format.');
                }
            };
            reader.readAsText(file);
        }
    }

    document.getElementById('newQuote').addEventListener('click', displayRandomQuote);
    document.getElementById('exportButton').addEventListener('click', exportQuotesToJson);
            document.getElementById('importFile').addEventListener('change', importQuotesFromJson);

    loadQuotes();
    loadLastViewedQuote();
    createAddQuoteForm();
});
