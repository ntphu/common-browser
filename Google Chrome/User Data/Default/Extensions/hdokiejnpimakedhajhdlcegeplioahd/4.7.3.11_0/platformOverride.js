!function(e){e.getExtensionDropdownDelay=function(){return bg.LPPlatform.isMac()?50:-1};var n=function(){var e=$(document.getElementsByTagName("html")),n=function(n,o){bg.LPPlatform.isMac()?(setTimeout(function(){e.css({height:n+1,width:o})},50),setTimeout(function(){e.css({height:n,width:o})},100)):e.css({height:n,width:o})};return function(e,o){n(e,o)}}();e.setLoginPopoverSize=function(e,o){n(e,o)},e.setDropdownPopoverSize=function(e,o){n(e,o)},e.checkBrowserPasswordManager=function(e){chrome.privacy&&chrome.privacy.services&&chrome.privacy.services.passwordSavingEnabled&&chrome.privacy.services.passwordSavingEnabled.get({},function(n){n.value&&"controllable_by_this_extension"===n.levelOfControl&&e()})},e.setupDropdownImportMenu_single=e.setupDropdownImportMenu,e.setupDropdownImportMenu=function(n){bg.is_opera_chromium()||bg.is_firefox_webext()?e.setupDropdownImportMenu_single(n):($("#chromeImportMenuItem").bind("click",function(){bg.lpevent("m_igoo"),bg.openimportchrome()}),$("#importMenuItem").bind("click",function(){bg.lpevent("m_i"),bg.openimport()}))},e.canBackgroundOpenPopover=function(){return!1},e.getUnavailablePreferences=function(e){return function(){var n=e();return n.enablenewlogin=!bg.get("g_shownewloginoption"),n.hidecontextspan=void 0===chrome.contextMenus,n}}(e.getUnavailablePreferences),e.getPreferencesRequiringBinary=function(e){return function(){var n=e();return n.idleLogoffVal=void 0===chrome.idle,n}}(e.getPreferencesRequiringBinary),e.handlePreferenceChanges=function(e){return function(n){e(n),void 0!==n.hideContextMenus&&bg.createContextMenus(),!1===n.showmatchingbadge&&bg.clear_badge_text()}}(e.handlePreferenceChanges),e.openCreateAccount=function(){bg.LPPlatform.openTabDialog("createAccountSimple")},e.getImportHandler=function(){return!0===bg.get("g_one_minute_signup_enabled")?"addEmailSites":"importerHandler"},e.showDownloader=function(){return!0},e.optInToFamiliesDone=function(){Topics.get(Topics.REFRESH_DATA).publish(),e.closeTab()}}(LPPlatform);