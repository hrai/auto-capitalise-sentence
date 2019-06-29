$(document).ready(function(){
    //change to text area
    $("textarea").keyup(function(event){
        var textBox =event.target;
        var text = $(textBox).val();

        var regex =/\w+\s*\.+\s*\w$/;
        var matches = regex.test(text);

        // console.log(matches);

        if(matches) {

            var lastChar = text.slice(-1);
            var updatedStr = text.substr(0, text.length-1) + lastChar.toUpperCase();

            textBox.value = (updatedStr);
        }

        // console.log(event);
    });
});
