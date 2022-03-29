// https://github.com/rizdaprasetya/docsify-fix-pageload-scroll (MIT License)
; (function (win) {
  function create(param) {
    var isParamExist = (typeof param === 'object');

    return function (hook, vm) {
      hook.ready(function () {
        // true = show debug log
        var dd = isParamExist && param.isDebug || false;
        var TARGET_QUERY = isParamExist && param.targetParam || 'id';
        var SCROLL_DELAY = isParamExist && param.scrollDelay || 1000; // in milisecond
        var location = window.location;

        dd && console.log('custom scroll plugin called');
        var currentUrlWithoutHash = new URL(
          location.origin + location.pathname +
          location.search + location.hash.substring(1)
        )
        var urlQueryParam = currentUrlWithoutHash.searchParams;
        var isUrlHasIdQuery = urlQueryParam.has(TARGET_QUERY);
        if (isUrlHasIdQuery) {
          dd && console.log('url has id, will scroll to element');
          var urlId = urlQueryParam.get(TARGET_QUERY);
          // run delayed, to make sure everything loaded
          setTimeout(function () {
            dd && console.log('will scroll now!');
            try {
              document.querySelector('#' + urlId).scrollIntoView();
            } catch (e) { dd && console.log('custom scroll failed', e) }
          }, SCROLL_DELAY);
        }
      })
    }
  }
  win.DocsifyPageloadScrollPlugin = {};
  win.DocsifyPageloadScrollPlugin.create = create;
  if (typeof win.$docsify === 'object') {
    win.$docsify.plugins = [].concat(create(), $docsify.plugins);
  }
})(window);