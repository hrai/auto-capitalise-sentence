$(document).ready(function(){
    var sitesToExclude = [];

    function excludeSite(site) {
        sitesToExclude.push(site);
    }

    //https://stackoverflow.com/questions/406192/get-current-url-with-jquery
    var currentUrlDomain = window.location.origin;

    var totalSites =sitesToExclude.length;
    if(totalSites ==0) {
        hookupEventHandlers();
        return;
    }

    if(totalSites !=0) {
        try {
            sitesToExclude.forEach(function(siteToExclude) {
                if(!siteToExclude.includes(currentUrlDomain)) {
                    hookupEventHandlers();
                    throw BreakException;
                }
            });
        }
        catch (e) {
            if (e !== BreakException) {
                throw e;
            }
        }
    }

    function hookupEventHandlers() {
        $(":text,textarea").keydown(function(event){
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
    }
});
