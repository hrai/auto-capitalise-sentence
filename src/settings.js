import browser from 'webextension-polyfill';

browser.storage.local.get('sites_to_ignore').then(updateSiteIgnoreList, onError);

function updateSiteIgnoreList(item) {
  var sitesToExclude = item.sites_to_ignore;
  if (sitesToExclude) {
    $('#sites').val(sitesToExclude.join('\n'));
  }
}

function onError(error) {
  console.log(error);
}

function getUrlDomain(data) {
  var a = document.createElement('a');
  a.href = data;
  return a.hostname;
}

$(document).on('click', '#ignoreSiteButton', function() {
  browser.tabs.query({ currentWindow: true, active: true }).then(tabs => {
    var hostname = getUrlDomain(tabs[0].url);
    var sites = getSites();
    sites.push(hostname);

    browser.storage.local.set({
      sites_to_ignore: sites,
    });

    $('#sites').val(sites.join('\n'));
    $(this).prop('disabled', true);
    $(this).val('Site added to ignore list');
  });
});

$(document).on('click', '#submitButton', function() {
  var sites = getSites();

  browser.storage.local.set({
    sites_to_ignore: sites,
  });

  $(this).prop('disabled', true);
  $(this).val('Saved');
});

$(document).on('change', '#shouldCapitaliseI', function(event) {
  if ($(event.target).prop('checked')) {
    browser.storage.local.set({
      should_capitalise_i: true,
    });
  } else {
    browser.storage.local.set({
      should_capitalise_i: false,
    });
  }
  browser.storage.local.get('should_capitalise_i', items => {
    console.log(items.should_capitalise_i); // -> {name:"Mog", eats:"mice"}
  });
});

function getSites() {
  var sitesBoxVal = $('#sites').val();

  if (sitesBoxVal) {
    var sites = sitesBoxVal.split('\n');
    return sites;
  }

  return [];
}
