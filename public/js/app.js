$("#scrape").on("click", function (event) {
    event.preventDefault();
    $.ajax("/scrape", { type: "GET" })
        .then(() => {
            display();
            alert("Scrape Complete");
        });
});

function display() {
    $.ajax("/articles").then(function (data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            $(".displayNews").append(
                `<div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${data[i].title}</h5>
                        <p class="card-text">${data[i].summary}</p>
                        <a href="${data[i].link}" class="btn btn-primary">Get more info</a>
                        
                            <button type="button" class="btn add-comment btn-primary" data-toggle="modal" data-target="#exampleModal${data[i]._id}" data-id="${data[i]._id}">
                                Add Comment
                            </button>

                            <!-- Modal -->
                            <div class="modal fade" id="exampleModal${data[i]._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel${data[i]._id}" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel${data[i]._id}">Comments</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <textarea class="comment-body" data-id="${data[i]._id}"></textarea>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn save btn-primary" data-id="${data[i]._id}">Save</button>
                                </div>
                                </div>
                            </div>
                            </div>

                    </div>
                </div>`);
        };

        // saving the note
        $(".add-comment").on("click", function() {
            // $(".comment-body").empty();
            let id = $(this).data("id");
            $.ajax("/articles/" + id, {type: "GET"})
                .then(function(data) {
                    console.log('t1');
                    console.log(data.comment.body);
                    //console.log("Notes:\n" + data.comments);
                    if(data.comment) {
                        $(`.comment-body[data-id="${id}"]`).val(data.comment.body);
                    }
                })
        });
        $(".save").on("click", function() {
            let id = $(this).data("id");
            $.ajax({
                method: "POST",
                url: "/articles/" + id,
                data: {
                    body: $(`.comment-body[data-id="${id}"]`).val().trim()
                }
            }).then(function(data) {
                console.log(data);
                $(".comment-body").empty();
            });
            $(".comment-body").val("");
        });
    });
}
display();
