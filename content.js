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

    function capitaliseText(htmlControl) {
        var text = $(htmlControl).val();

        if(text.length == 1) {
            htmlControl.value = text.toUpperCase();
            return;
        }

        var regex =/\w+\s*(\.|\?)+\s+\w$/;
        var matches = regex.test(text);

        if(matches) {
            var lastChar = text.slice(-1);
            var updatedStr = text.substr(0, text.length-1) + lastChar.toUpperCase();

            htmlControl.value = updatedStr;
        }

        // console.log(event);
    }

    function hookupEventHandlers() {
        $(":text,textarea").keydown(function(event){
            capitaliseText(event.target);
        });

        wireupPtagHandlers();
    }

    function wireupPtagHandlers() {
        var target = document.querySelector("p");

        var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
              if (mutation.type=="childList" ) {
                  capitaliseText(mutation.target);
                  //console.log(mutation.target.innerHTML);
              }
          });
        });

        var config = {
          childList: true,
          subtree: true,
          characterData: true
        };

        observer.observe(target, config);
    }
});
