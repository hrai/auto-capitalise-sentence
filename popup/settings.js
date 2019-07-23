$(document).ready(function(){
    // var sitesToExclude = [];

    browser.storage.local.get('sites_to_ignore').then(processResponse, onError);

    $(document).on('click', '#submitButton', function() {
        var sites = getSites();

        browser.storage.local.set(
            {
                'sites_to_ignore': sites
            });
    });

    function getSites() {
        var sitesBoxVal = $('#sites').val();

        if( sitesBoxVal) {
            var sites = sitesBoxVal.split('\n');
            return sites;
        }

        return '';
    }

    function processResponse(item) {
        console.log(item);
    }

    function onError(error) {
        console.log(error);
    }

});

