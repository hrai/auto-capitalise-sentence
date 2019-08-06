$(document).ready(function() {
    // function excludeSite(site) {
    //     sitesToExclude.push(site);
    // }

    var errorMsg = 'breaking loop';
    browser.storage.local.get('sites_to_ignore').then(processResponse, onError);

    function hookupEventHandlers() {
        observeInputTags();
        observeHtmlBody();
    }

    function processResponse(item) {
        var sitesToExclude = item.sites_to_ignore;

        if (item && sitesToExclude) {
            //https://stackoverflow.com/questions/406192/get-current-url-with-jquery
            var currentUrlDomain = window.location.origin;

            try {
                var shouldEnableCapitalisingOnCurrentSite = true;

                $.each(sitesToExclude, function(i, siteToExclude) {
                    if (currentUrlDomain.includes(siteToExclude)) {
                        shouldEnableCapitalisingOnCurrentSite = false;
                    }
                });

                if (shouldEnableCapitalisingOnCurrentSite) {
                    hookupEventHandlers();

                    throw new Error(errorMsg);
                }
            } catch (e) {
                if (e.message !== errorMsg) {
                    throw e;
                }
            }
        } else {
            hookupEventHandlers();
        }
    }

    function onError(error) {
        console.log(error);
    }

    function getText(htmlControl, tagName) {
        if (
            tagName.toUpperCase() === 'INPUT' ||
      tagName.toUpperCase() === 'TEXTAREA'
        ) {
            return htmlControl.val();
        }

        return htmlControl.html();
    }

    function setText(htmlControl, tagName, updatedStr, shouldAppendBr) {
        if (
            tagName.toUpperCase() === 'INPUT' ||
      tagName.toUpperCase() === 'TEXTAREA'
        ) {
            htmlControl.val(updatedStr);
            return;
        }

        if (shouldAppendBr) {
            updatedStr += '<br>';
        }

        htmlControl.html(updatedStr);
        setEndOfContenteditable(htmlControl[0]);
    }

    function setEndOfContenteditable(contentEditableElement) {
        var range, selection;
        if (document.createRange) {
            //Firefox, Chrome, Opera, Safari, IE 9+
            range = document.createRange(); //Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
            range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection(); //get the selection object (allows you to change selection)
            selection.removeAllRanges(); //remove any selections already made
            selection.addRange(range); //make the range you have just created the visible selection
        } else if (document.selection) {
            //IE 8 and lower
            range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
            range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
            range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
            range.select(); //Select the range (make it the visible selection
        }
    }

    function shouldCapitalise(text) {
        var multilineRegex = /\s*\n+\s*\w$/;
        var matches = multilineRegex.test(text);

        if (matches) return true;

        var sentenceRegex = /\w+\s*(\.|\?)+\s+\w$/;
        matches = sentenceRegex.test(text);

        if (!matches) {
            return text.length == 1;
        }

        return matches;
    }

    function shouldCapitaliseForI(text) {
        var regex = /\s+i(\s+|')$/;
        var matches = regex.test(text);

        return matches;
    }

    function capitaliseText(element) {
        if(!element)
            return;

        var htmlControl = $(element);
        var tagName = htmlControl.prop('tagName');

        if (!element.isContentEditable && tagName.toUpperCase() !== 'TEXTAREA') {
            return;
        }

        var text = getText(htmlControl, tagName);

        //support for jira's comment section's p tags
        var lastChar = text.trim().slice(-1);
        if (lastChar.match(/[a-z]/i) && lastChar.toUpperCase() === lastChar) {
            return;
        }

        var shouldAppendBr = false;
        if (text.length >= 4 && text.slice(-4) === '<br>') {
            text = text.slice(0, -4);
            shouldAppendBr = true;
        }

        if (shouldCapitalise(text)) {
            var updatedStr = getCapitalisedContent(text);

            setText(htmlControl, tagName, updatedStr, shouldAppendBr);
            return;
        }

        if (text.length >= 2 && shouldCapitaliseForI(text)) {
            var updatedStr = getCapitalisedContentForI(text);

            setText(htmlControl, tagName, updatedStr, shouldAppendBr);
            return;
        }
    }

    function getCapitalisedContentForI(text) {
        var lastTwoChars = text.slice(-2);
        var updatedStr =
      text.substr(0, text.length - 2) + lastTwoChars.toUpperCase();
        return updatedStr;
    }

    function getCapitalisedContent(text) {
        var lastChar = text.slice(-1);
        var updatedStr = text.substr(0, text.length - 1) + lastChar.toUpperCase();
        return updatedStr;
    }

    function observeInputTags() {
        $(':text,textarea').on('input', function(event) {
            capitaliseText(event.target);
        });
    }

    function containsHtmlContent(element) {
        var content = $(element).html();

        var brRegex = /\s*<br>/;
        if (content && brRegex.test(content)) return false;

        var regex = /<\/?\w+>/;
        var hasHtmlTag = regex.test(content);
        return hasHtmlTag;
    }

    function isContentEditable(element) {
        return element && element.isContentEditable;
    }

    function getFilteredElements(addedNodes, tagName) {
        return $(addedNodes)
            .find(tagName)
            .addBack(tagName); // finds either added alone or as tree
    }

    /*eslint no-debugger: "error"*/
    function observeHtmlBody() {
        var target = document.querySelector('body');

        // var tags = ['p', 'span', 'div'];
        var tags = ['p', 'span'];
        var inputTags = ['input[type=\'text\']', 'textarea'];

        var observer = new MutationObserver(function(mutations) {
            // console.log(mutations);

            $.each(mutations, function(i, mutation) {
                try {
                    if (mutation.type === 'childList') {
                        // add support for div block in gmail and outlook
                        // if (['P','DIV'].includes(mutation.target.nodeName )) {
                        if (['P'].includes(mutation.target.nodeName)) {
                            capitaliseText(mutation.target);
                            throw new Error(errorMsg);
                        }

                        var addedNodes = mutation.addedNodes;
                        if (addedNodes && addedNodes.length > 0) {
                            $.each(tags, function(i, tagName) {
                                var filteredEls = getFilteredElements(addedNodes, tagName);

                                filteredEls.each(function(index, element) {
                                    if (shouldCapitaliseContent(element)) {
                                        capitaliseText(element);
                                    }
                                });
                            });

                            $.each(inputTags, function(i, tagName) {
                                var filteredEls = getFilteredElements(addedNodes, tagName);

                                filteredEls.each(function(index, element) {
                                    $(element).on('input', function(event) {
                                        capitaliseText(event.target);
                                    });
                                });
                            });
                        }
                    } else if (mutation.type === 'characterData') {
                        capitaliseText(mutation.target.parentNode);
                    }
                } catch (err) {
                    if (err.message !== errorMsg) {
                        console.log(err);
                    }
                }
            });
        });

        var config = {
            subtree: true,
            childList: true,
            characterData: true
        };

        observer.observe(target, config);
    }

    function shouldCapitaliseContent(element) {
        return isContentEditable(element) && !containsHtmlContent(element);
    }
});
