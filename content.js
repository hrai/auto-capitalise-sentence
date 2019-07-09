$(document).ready(function(){
  var sitesToExclude = [];

  function excludeSite(site) {
    sitesToExclude.push(site);
  }

  //https://stackoverflow.com/questions/406192/get-current-url-with-jquery
  var currentUrlDomain = window.location.origin;

  var totalSites =sitesToExclude.length;
  if(totalSites ==0) {
    hookupEventHandlers();
    return;
  }

  if(totalSites !=0) {
    try {
      sitesToExclude.forEach(function(siteToExclude) {
        if(!siteToExclude.includes(currentUrlDomain)) {
          hookupEventHandlers();
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

  function setText(htmlControl, tagName, updatedStr) {
    if(tagName.toUpperCase()==='INPUT' || tagName.toUpperCase()==='TEXTAREA') {
      htmlControl.val(updatedStr);
    }

    htmlControl.html(updatedStr);
  }

  function getText(htmlControl, tagName) {
    if(tagName.toUpperCase()==='INPUT' || tagName.toUpperCase()==='TEXTAREA') {
      return htmlControl.val();
    }

    return htmlControl.html();
  }

  function capitaliseText(element) {
    var htmlControl = $(element);

    var tagName = htmlControl.prop('tagName');
    var text = getText(htmlControl, tagName);

    if(text.length == 1) {
      htmlControl.value = text.toUpperCase();
      return;
    }

    var regex =/\w+\s*(\.|\?)+\s+\w$/;
    var matches = regex.test(text);

    if(matches) {
      var lastChar = text.slice(-1);
      var updatedStr = text.substr(0, text.length-1) + lastChar.toUpperCase();

      setText(htmlControl, tagName, updatedStr)
    }

    // console.log(event);
  }

  function hookupEventHandlers() {
    $(":text,textarea").keydown(function(event){
      capitaliseText(event.target);
    });

    wireupPtagHandlers();
  }

  function wireupPtagHandlers() {
    var target = document.querySelector("div");

    var observe = new MutationObserver(function(mutations, observer) {
      $.each(mutations, function (i, mutation) {
        var addedNodes = $(mutation.addedNodes);
        var selector = "p"
        var filteredEls = addedNodes.find(selector).addBack(selector); // finds either added alone or as tree
        filteredEls.each(function(index, item) {
          capitaliseText(item);
        });
      });
    });


    var config = {
      childList: true,
      subtree: true,
      characterData: true
    };

    observe.observe(target, config);
  }
});
