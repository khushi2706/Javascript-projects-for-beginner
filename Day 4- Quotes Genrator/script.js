const api = "https://type.fit/api/quotes";
let formatedData = [];
const quote = document.getElementById("quote");
const author = document.getElementById("author")
const tweetme = document.getElementById("tweetme");
let quoteData= ""
const getQuotes = async() =>{
    try {
        const data = await fetch(api);
        formatedData = await data.json();
        getNewQuotes();       
    } catch (error) {
    }
}

const getNewQuotes = () =>{
  
    let rnum = Math.floor((Math.random() * 100));
    quoteData = formatedData[rnum];
    quote.innerText = quoteData.text;
    author.innerText = quoteData.author?quoteData.author:"unknown";
}

const tweetNow = ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?${quoteData.text}`;
    window.open(tweetUrl)
}

tweetme.addEventListener('click', tweetNow);

getQuotes();


