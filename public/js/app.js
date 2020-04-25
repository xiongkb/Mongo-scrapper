$("#scrape").on("click", function(event) {
    event.preventDefault();
    $.ajax("/scrape", {type: "GET"})
        .then(display());
});

function display() {
    $.ajax("/articles").then(function(data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            $(".displayNews").append(
                `<div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${data[i].title}</h5>
                        <p class="card-text">${data[i].summary}</p>
                        <a href="${data[i].link}" class="btn btn-primary">Get more info</a>
                    </div>
                </div>`);
        }
    });
}
display();