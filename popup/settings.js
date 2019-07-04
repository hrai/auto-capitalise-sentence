
$(document).ready(function(){
    var sitesToExclude = [];

 document
        .getElementById("submitButton")
        .addEventListener("click", function() {
            alert('test');
        });
    $('#submitButton').click(function() {
        var sitesBox = $('#sites');
        console.log(sitesBox.val());
    });
});


