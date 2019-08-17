import * as utils from './utilities';

$(document).ready(function() {
    // function excludeSite(site) {
    //     sitesToExclude.push(site);
    // }

    var errorMsg = 'breaking loop';
    browser.storage.local.get('sites_to_ignore').then(processResponse, utils.onError);

    function hookupEventHandlers() {
        observeInputTags();
        observeHtmlBody();
    }

    function observeInputTags() {
        $(':text,textarea').on('input', function(event) {
            capitaliseText(event.target);
        });
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
                                var filteredEls = utils.getFilteredElements(addedNodes, tagName);

                                filteredEls.each(function(index, element) {
                                    if (utils.shouldCapitaliseContent(element)) {
                                        capitaliseText(element);
                                    }
                                });
                            });

                            $.each(inputTags, function(i, tagName) {
                                var filteredEls = utils.getFilteredElements(addedNodes, tagName);

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

    function capitaliseText(element) {
        utils.capitaliseText(element, utils.shouldCapitalise, utils.shouldCapitaliseForI,
            utils.getText , utils.setText);
    }
});

