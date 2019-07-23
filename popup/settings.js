$(document).ready(function(){

    browser.storage.local.get('sites_to_ignore').then(processResponse, onError);

    function processResponse(item) {
        var sitesToExclude =item.sites_to_ignore;
        if(sitesToExclude) {
            $('#sites').val(sitesToExclude.join('\n'));
        }
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

        $(this).prop('disabled', true);
        $(this).val('Saved');
    });

    function getSites() {
        var sitesBoxVal = $('#sites').val();

        if(sitesBoxVal) {
            var sites = sitesBoxVal.split('\n');
            return sites;
        }

        return '';
    }

});

