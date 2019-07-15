$(document).ready(function(){
    var sitesToExclude = [];
    var elementsWithModifiedContents = [];

    // function excludeSite(site) {
    //     sitesToExclude.push(site);
    // }

    //https://stackoverflow.com/questions/406192/get-current-url-with-jquery
    var currentUrlDomain = window.location.origin;

    var totalSites =sitesToExclude.length;
    if(totalSites ==0) {
        hookupEventHandler();

        return;
    }

    if(totalSites !=0) {
        try {
            sitesToExclude.forEach(function(siteToExclude) {
                if(!siteToExclude.includes(currentUrlDomain)) {
                    hookupEventHandler();

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

    function getText(htmlControl, tagName) {
        if(tagName.toUpperCase()==='INPUT' || tagName.toUpperCase()==='TEXTAREA') {
            return htmlControl.val();
        }

        return htmlControl.html();
    }

    function setText(htmlControl, tagName, updatedStr) {
        if(tagName.toUpperCase()==='INPUT' || tagName.toUpperCase()==='TEXTAREA') {
            htmlControl.val(updatedStr);
            return;
        }

        htmlControl.prop('contenteditable', true);
        htmlControl.text(updatedStr);
        setEndOfContenteditable(htmlControl[0]);

        elementsWithModifiedContents.push(htmlControl.html());
    }

    function setEndOfContenteditable(contentEditableElement)
    {
        var range,selection;
        if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
        {
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
        }
        else if(document.selection)//IE 8 and lower
        {
            range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
            range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            range.select();//Select the range (make it the visible selection
        }
    }

    function shouldCapitalise(text) {
        var regex =/\w+\s*(\.|\?)+\s+\w$/;
        var matches = regex.test(text);
        return matches;
    }

    function capitaliseTextForInputTags(element) {
        var htmlControl = $(element);

        var tagName = htmlControl.prop('tagName');
        var text = getText(htmlControl, tagName);

        if(text.length == 1) {
            setText(htmlControl, tagName, text.toUpperCase());
            return;
        }

        if(shouldCapitalise(text)) {
            var updatedStr = getCapitalisedContent(text);

            setText(htmlControl, tagName, updatedStr);
        }
    }

    function capitaliseTextForContentEditableElements(targetEl) {
        var htmlControl = $(targetEl.parent());

        var tagName = htmlControl.prop('tagName');
        var text = targetEl.text();
        if(elementsWithModifiedContents.indexOf(text) >= 0)
            return;

        if(text.length == 1) {
            setText(htmlControl, tagName, text.toUpperCase());
            return;
        }

        if(shouldCapitalise(text)) {
            var updatedStr = getCapitalisedContent(text);

            setText(htmlControl, tagName, updatedStr);
        }
    }

    function getCapitalisedContent(text) {
        var lastChar = text.slice(-1);
        var updatedStr = text.substr(0, text.length-1) + lastChar.toUpperCase();

        return updatedStr;
    }

    function hookupEventHandler() {
        $(':text,textarea').keydown(function(event){
            capitaliseTextForInputTags(event.target);
        });

        wireupHtmlTagHandlers('p');
        wireupHtmlTagHandlers('div');
    }

    function hookupHtmlChangeEventHandler(element) {
        var processed = false;
        var observer = new MutationObserver(function(mutations) {
            $.each(mutations, function (i, mutation) {
                if(!processed) {
                    var target = $(mutation.target);

                    capitaliseTextForContentEditableElements(target);
                    processed = true;
                }
            });
        });

        var config = {
            childList: true,
            characterData: true
        };

        observer.observe(element, config);
    }

    function wireupHtmlTagHandlers(tagName) {
        var target = document.querySelector('div');

        var observer = new MutationObserver(function(mutations, observer) {
            $.each(mutations, function (i, mutation) {
                var addedNodes = $(mutation.addedNodes);

                var filteredEls = addedNodes.find(tagName).addBack(tagName); // finds either added alone or as tree
                filteredEls.each(function(index, element) {
                    hookupHtmlChangeEventHandler(element);
                });
            });
        });

        var config = {
            subtree: true,
            childList: true,
            characterData: true
        };

        observer.observe(target, config);
    }
});
