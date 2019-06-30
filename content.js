$(document).ready(function(){
    $("textarea").keydown(function(event){
        var textBox =event.target;
        var text = $(textBox).val();

        if(text.length == 1) {
            textBox.value = text.toUpperCase();
            return;
        }

        var regex =/\w+\.+\s+\w$/;
        var matches = regex.test(text);

        if(matches) {
            var lastChar = text.slice(-1);
            var updatedStr = text.substr(0, text.length-1) + lastChar.toUpperCase();

            textBox.value = updatedStr;
        }

        // console.log(event);
    });
});
