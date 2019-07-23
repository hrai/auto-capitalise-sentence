$(document).ready(function(){

    browser.storage.local.get('sites_to_ignore').then(processResponse, onError);

    function processResponse(item) {
        $('#sites').val(item.sites_to_ignore);
    }

    function onError(error) {
        console.log(error);
    }

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

});

