$(document).ready(function() {
    // function excludeSite(site) {
    //     sitesToExclude.push(site);
    // }

    browser.storage.local.get('sites_to_ignore').then(processResponse, onError);

    function hookupEventHandlers() {
        wireupInputTagHandlers();
        wireupHtmlTagsAddedHandlers();
    }

    function processResponse(item) {
        var sitesToExclude = item.sites_to_ignore;

        if (item && sitesToExclude) {
            //https://stackoverflow.com/questions/406192/get-current-url-with-jquery
            var currentUrlDomain = window.location.origin;
            var errorMsg = 'breaking loop';

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

    function setText(htmlControl, tagName, updatedStr) {
        if (
            tagName.toUpperCase() === 'INPUT' ||
      tagName.toUpperCase() === 'TEXTAREA'
        ) {
            htmlControl.val(updatedStr);
            return;
        }

        htmlControl.text(updatedStr);
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
        var regex = /\w+\s*(\.|\?)+\s+\w$/;
        var matches = regex.test(text);

        return matches;
    }

    function shouldCapitaliseForI(text) {
        var regex = /\s+i(\s+|')$/;
        var matches = regex.test(text);

        return matches;
    }

    function capitaliseText(element) {
        var htmlControl = $(element);

        var tagName = htmlControl.prop('tagName');
        var text = getText(htmlControl, tagName);

        if (text.length == 1) {
            setText(htmlControl, tagName, text.toUpperCase());
            return;
        }

        if (shouldCapitalise(text)) {
            var updatedStr = getCapitalisedContent(text);

            setText(htmlControl, tagName, updatedStr);
            return;
        }

        if (text.length >= 2 && shouldCapitaliseForI(text)) {
            var updatedStr = getCapitalisedContentForI(text);

            setText(htmlControl, tagName, updatedStr);
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

    function wireupInputTagHandlers() {
        $(':text,textarea').on('input', function(event) {
            capitaliseText(event.target);
        });
    }

    function containsHtmlContent(element) {
        var content = $(element).html();

        if (content && content === '<br>') return false;

        var regex = /<\/?\w+>/;
        var hasHtmlTag = regex.test(content);
        return hasHtmlTag;
    }

    function wireupTextChangeHandler(element) {
        if (!containsHtmlContent(element)) {
            if ($(element).html()) {
                capitaliseText(element);
            }

            var observer = new MutationObserver(function(mutations) {
                var processed = false;
                $.each(mutations, function(i, mutation) {
                    if (!processed) {
                        var target = $(mutation.target);

                        var tagName = target.prop('tagName');
                        if (!tagName) {
                            target = $(target).parent();
                        }

                        if (isContentEditable(target)) {
                            capitaliseText(target);
                            processed = true;
                        }
                    }
                });
            });

            var config = {
                subtree: true,
                childList: true,
                characterData: true
            };

            observer.observe(element, config);
        }
    }

    function isContentEditable(element) {
        return element && element.isContentEditable;
    }

    function wireupHtmlTagsAddedHandlers() {
        var target = document.querySelector('body');

        var tags = ['p', 'span'];
        var inputTags = ['input[type=\'text\']', 'textarea'];

        var observer = new MutationObserver(function(mutations) {
            $.each(mutations, function(i, mutation) {
                var addedNodes = $(mutation.addedNodes);

                try {
                    $.each(tags, function(i, tagName) {
                        var filteredEls = addedNodes.find(tagName).addBack(tagName); // finds either added alone or as tree
                        filteredEls.each(function(index, element) {
                            wireupTextChangeHandler(element);
                        });
                    });

                    $.each(inputTags, function(i, tagName) {
                        var filteredEls = addedNodes.find(tagName).addBack(tagName); // finds either added alone or as tree
                        filteredEls.each(function(index, element) {
                            if (isContentEditable(element)) {
                                $(element).on('input', function(event) {
                                    capitaliseText(event.target);
                                });
                            }
                        });
                    });
                } catch (err) {
                    console.log(err);
                }
            });
        });

        var config = {
            subtree: true,
            childList: true
        };

        observer.observe(target, config);
    }
});
