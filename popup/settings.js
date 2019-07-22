$(document).ready(function(){
    // var sitesToExclude = [];

    var a=document.getElementById('submitButton');
    console.log(a);
    console.log($('#submitButton').val());


    $(document).on('click', '#submitButton', function() {
    // $('#submitButton').click(function() {
        var sites = getSites();
        console.log(sites);

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

    debugger
    var sites = getSites();
    console.log(sites);

    browser.storage.local.set(
        {
            'sites_to_ignore': 'testing'
        });
    console.log(browser.storage.local.get('sites_to_ignore').then(processResponse, onError));

    function processResponse(item) {
        console.log(item);
    }

    function onError(error) {
        console.log(error)
    }

});

