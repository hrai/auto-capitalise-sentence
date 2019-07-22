$(document).ready(function(){
    // var sitesToExclude = [];

    $('#submitButton').click(function() {
        var sites = getSites();
        console.log(sites);

        browser.storage.local.set(
            {
                'sites_to_ignore': sites
            });

        function getSites() {
            var sitesBox = $('#sites');
            var sites = sitesBox.val().split('\n');
            return sites;
        }
    });


});

