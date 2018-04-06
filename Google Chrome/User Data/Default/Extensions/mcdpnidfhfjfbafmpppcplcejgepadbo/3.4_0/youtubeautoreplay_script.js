(function ($) {
    
	var PLATFORM = 'chrome';
	var VERSION_CODE = '3.4';
	
	var browser = browser || chrome,
		m_replayEnabled = false,
		m_ytPlayerInterval = null,
		m_checkRewindInterval = null,
		m_ytarOptionsPanel = null,
		m_ytautoreplay_btn = null,
		m_ytplayer = null,
		m_buttons_div = null,
		m_panelsSuperContainer = null,
		m_shareLinkElement = null,
		m_fbLikeFrame = null,
		m_googlePlusFrame = null,
		m_shareBaseUrl = "http://www.ezlooper.com",
		m_loopFrom = 0,
		m_loopTo = 0,
		m_loopMethod = 0, // 0 = whole movie; 1 = specific loop time;
		m_browserName = getBrowserName("addon"),
		m_shareLink = refreshShareUrl(),
		m_replay = false,
		m_youtubeUiVersion = 1,
		m_youtubeUiObject = {ids: null, classes: null},
		m_ytElementIds = [
			{
				buttonsDiv: "watch-actions",
				panelsSuperContainer: "watch-actions-area-container",
				panelsContainer: "watch-actions-area",
				shareBtn: "watch-share"
			},
			{
				buttonsDiv: "watch7-secondary-actions",
				panelsSuperContainer: "watch7-action-panels",
				panelsContainer: "watch7-action-panels"
			},
			{
				buttonsDiv: "watch8-secondary-actions",
				panelsSuperContainer: "watch-action-panels",
				panelsContainer: "watch-action-panels"
			},
			{
				buttonsDiv: "menu-container",
				panelsSuperContainer: "info-contents",
				panelsContainer: "info-contents"
			}
		],
		m_ytClassNames = [
			{
				actionPanel: "watch-actions-panel"
			},
			{
				actionPanel: "action-panel-content",
				actionPanelButtons: "action-panel-trigger"
			},
			{
				actionPanel: "action-panel-content",
				actionPanelButtons: "action-panel-trigger"
			},
			{
			}
		],
		m_ytPageLoadedInterval = null,
		m_reloadMsgId = "" + Math.floor((Math.random() * 1000) + 1) + ((new Date()).getTime());

	function initPageData() {
	
		m_ytplayer = getPlayerObject();

		var uiVersions = m_ytElementIds.length;
		for (var i = 0; i < uiVersions; i++) {
			var btnsDiv = document.getElementById(m_ytElementIds[i].buttonsDiv);
			if (btnsDiv != null) {
				m_youtubeUiObject.ids = m_ytElementIds[i];
				m_youtubeUiObject.classes = m_ytClassNames[i];
				m_youtubeUiVersion = i;
				m_buttons_div = btnsDiv;
			}
		}

		// unknown version
		if (m_buttons_div == null) {
			return;
		}

		m_panelsSuperContainer = document.getElementById(m_youtubeUiObject.ids.panelsSuperContainer);
	}
	
	function isPageLoaded() {
		
		return (m_ytplayer != null) && (m_buttons_div != null) && ($(m_buttons_div).children().length > 0) && (m_panelsSuperContainer != null) && (getDuration() > 0);
		
	}
	
	function addOptionsPanelDiv() {

		if (m_youtubeUiVersion == 0) {

			m_ytarOptionsPanel = document.createElement('div');
			m_ytarOptionsPanel.setAttribute("id", "watch-actions-replay");
			m_ytarOptionsPanel.setAttribute("class", m_youtubeUiObject.classes.actionPanel + " hid");
			document.getElementById(m_youtubeUiObject.ids.panelsContainer).appendChild(m_ytarOptionsPanel);

		} else if (m_youtubeUiVersion == 1) {

			var replayOptionsPanel = null;
			var panelsContainer = document.getElementById(m_youtubeUiObject.ids.panelsSuperContainer);
			var templatePanel = getNextSibling(getFirstChild(panelsContainer));
			replayOptionsPanel = templatePanel.cloneNode(true);
			replayOptionsPanel.setAttribute("id", "action-panel-replay");
			var loadingPanel = getFirstChild(replayOptionsPanel);
			loadingPanel.setAttribute("id", "watch-panel-replay-loading");
			loadingPanel.innerHTML = "";
			var optionsContent = getNextSibling(loadingPanel);
			optionsContent.setAttribute("id", "watch-panel-replay-panel");
			optionsContent.innerHTML = "";
			panelsContainer.insertBefore(replayOptionsPanel, templatePanel);

			m_ytarOptionsPanel = replayOptionsPanel;

		/*	m_ytarOptionsPanel = document.createElement('div');
			m_ytarOptionsPanel.setAttribute("id", "watch-actions-replay");
			m_ytarOptionsPanel.setAttribute("class", m_youtubeUiObject.classes.actionPanel + " hid");

			document.getElementById(m_youtubeUiObject.ids.panelsContainer).appendChild(m_ytarOptionsPanel);*/
		} else if (m_youtubeUiVersion == 2) {

			var replayOptionsPanel = null;
			var panelsContainer = $("#" + m_youtubeUiObject.ids.panelsSuperContainer)[0];
			var templatePanel = getFirstChild(panelsContainer);
			replayOptionsPanel = templatePanel.cloneNode(true);
			replayOptionsPanel.setAttribute("id", "action-panel-replay");
			replayOptionsPanel.setAttribute("data-panel-loaded", "true");
			var loadingPanel = getFirstChild(replayOptionsPanel);
			loadingPanel.setAttribute("id", "watch-panel-replay-loading");
			loadingPanel.innerHTML = "";
			var optionsContent = getNextSibling(loadingPanel);
			optionsContent.setAttribute("id", "watch-panel-replay-panel");
			optionsContent.innerHTML = "";
			panelsContainer.insertBefore(replayOptionsPanel, templatePanel);

			m_ytarOptionsPanel = replayOptionsPanel;

		/*	m_ytarOptionsPanel = document.createElement('div');
			m_ytarOptionsPanel.setAttribute("id", "watch-actions-replay");
			m_ytarOptionsPanel.setAttribute("class", m_youtubeUiObject.classes.actionPanel + " hid");

			document.getElementById(m_youtubeUiObject.ids.panelsContainer).appendChild(m_ytarOptionsPanel);*/
		} else if (m_youtubeUiVersion == 3) {

			var replayOptionsPanel = null;
			var panelsContainer = $("#" + m_youtubeUiObject.ids.panelsSuperContainer)[0];
			var templatePanel = getFirstChild(panelsContainer);
			replayOptionsPanel = $('<div id="action-panel-replay"></div>')[0];
			panelsContainer.appendChild(replayOptionsPanel, templatePanel.parentElement);
			$("#action-panel-replay").hide();

			m_ytarOptionsPanel = replayOptionsPanel;

		/*	m_ytarOptionsPanel = document.createElement('div');
			m_ytarOptionsPanel.setAttribute("id", "watch-actions-replay");
			m_ytarOptionsPanel.setAttribute("class", m_youtubeUiObject.classes.actionPanel + " hid");

			document.getElementById(m_youtubeUiObject.ids.panelsContainer).appendChild(m_ytarOptionsPanel);*/
		}

	}

	function getFirstChild(parent) {

		var child = parent.firstChild;
		while (child != null && child.nodeType == 3){ // skip TextNodes
			child = child.nextSibling;
		}
		return child;
	}

	function getNextSibling(node) {

		var sibling = node.nextSibling;
		while (sibling != null && sibling.nodeType == 3){ // skip TextNodes
			sibling = sibling.nextSibling;
		}
		return sibling;
	}

	function putytAutoReplayOptionsBtn() {

		var ytautoreplay_span = null;

		if (m_youtubeUiVersion == 0) {

			ytautoreplay_span = document.createElement("span");
			ytautoreplay_span.id = "youtube_replay";

			var shareBtn = document.getElementById(m_youtubeUiObject.ids.shareBtn);
			var optionsBtn = shareBtn.cloneNode(true);

			optionsBtn.setAttribute('id', 					'ytautoreplay_btn');
			optionsBtn.setAttribute('data-tooltip-title', 	'"YouTube Auto Replay" Addon Options');
			optionsBtn.setAttribute('data-tooltip', 		'"YouTube Auto Replay" Addon Options');
			optionsBtn.setAttribute('title', 				'"YouTube Auto Replay" Addon Options');
			optionsBtn.setAttribute('data-button-action', 	'');

			optionsBtn.addEventListener("click", onReplayBtnClick, false);

			var optionsBtnCaption = optionsBtn.firstChild;
			if (optionsBtnCaption == null)
			{
				optionsBtnCaption = document.createElement("span");
				optionsBtn.appendChild(optionsBtnCaption);
			}

			optionsBtnCaption.innerHTML = " Replay "

			ytautoreplay_span.appendChild(optionsBtn);

			var target_div = shareBtn.parentNode;

			target_div.appendChild(ytautoreplay_span);
			m_ytautoreplay_btn = document.getElementById("ytautoreplay_btn");

		} else if (m_youtubeUiVersion == 1) {
			// listen to action panel triggering buttons
			forEachElementWithClass(m_youtubeUiObject.classes.actionPanelButtons, function(element) {
				element.addEventListener("click", function() {
					hideYTAROptionsPanel();
				}, false);
			});
			
			var buttonContainerTemplate = getNextSibling(getFirstChild(m_buttons_div));
			var buttonContainer = buttonContainerTemplate.cloneNode(true);
			var replayBtn = getFirstChild(buttonContainer);
			var innerSpans = replayBtn.getElementsByTagName("span");
			
			var captionSpan = replayBtn;
			if (innerSpans.length > 0) {
				captionSpan = innerSpans[0];
			}
			
			captionSpan.innerHTML = " Replay ";
			replayBtn.setAttribute("data-trigger-for", "action-panel-replay");
			replayBtn.addEventListener("click", onReplayBtnClick, false);
			m_buttons_div.insertBefore(buttonContainer, buttonContainerTemplate.previousSibling);

			m_ytautoreplay_btn = replayBtn;
		} else if (m_youtubeUiVersion == 2) {
			// listen to action panel triggering buttons
			$("." + m_youtubeUiObject.classes.actionPanelButtons).click(function(element) {
				hideYTAROptionsPanel();
			});
			
			var shareBtnContainer = getNextSibling(getFirstChild(m_buttons_div));
			
			var replayBtnContainer = shareBtnContainer.cloneNode(true);
			
			var replayBtn = replayBtnContainer;
			$(".yt-uix-button-icon-wrapper", replayBtn).hide();
			
			// var innerSpans = replayBtn.getElementsByTagName("span");
			
			var captionSpan = $(".yt-uix-button-content", replayBtnContainer)[0];
			captionSpan.innerHTML = '<span style="font-size: 23px; line-height: 0; position: relative; top: 5px; right: 5px; font-weight: bold; ">&#8634;</span> Replay ';
			
			replayBtn.setAttribute("data-trigger-for", "action-panel-replay");
			replayBtn.setAttribute("data-tooltip-text", "Auto-Replay options");
			replayBtn.setAttribute("title", "Auto-Replay");
			replayBtn.className = replayBtn.className.replace("yt-uix-button-has-icon", "");
			replayBtn.addEventListener("click", onReplayBtnClick, false);
			
			m_buttons_div.insertBefore(replayBtnContainer, shareBtnContainer.previousSibling);

			m_ytautoreplay_btn = replayBtn;
		} else if (m_youtubeUiVersion == 3) {

			$("#action-panel-replay").hide();
			m_replayEnabled = false;

			var shareBtnContainer = $('*:contains(Share)', m_buttons_div).filter(function() {
				return $(this).text().toLowerCase() === 'share';
			}).closest('ytd-button-renderer')[0];
			
			var replayBtnContainer = $.parseHTML(shareBtnContainer.outerHTML
				.replace(/ytd-button-renderer/g, 'div')
				.replace(/yt-formatted-string/g, 'yt-formatted-string_')
			)[0];
			$(replayBtnContainer)
				.css('padding', '8px')
				.css('background-color', 'red')
				.css('cursor', 'pointer')
				.css('border-radius', '2px')
				.attr('id', 'yt-replay-btn');
			
			var replayBtn = replayBtnContainer;
			$(".yt-uix-button-icon-wrapper", replayBtn).hide();
			
			// var innerSpans = replayBtn.getElementsByTagName("span");
			
			$('*:contains(Share)', replayBtnContainer).filter(function() {
				return $(this).text().toLowerCase() === 'share';
			}).remove();
			var iconSpan = $('yt-icon-button', replayBtnContainer)[0];
			iconSpan.innerHTML = '<span style="color: white; font-size: 25px; font-weight: bold; cursor: pointer; user-select: none;">&#8634;</span>';
			$(iconSpan).closest('a').css('outline', 'none');

			replayBtn.setAttribute("title", "Auto-Replay");
			replayBtn.className = replayBtn.className.replace("yt-uix-button-has-icon", "");
			replayBtn.addEventListener("click", onReplayBtnClick, false);
			
			shareBtnContainer.parentElement.insertBefore(replayBtnContainer, shareBtnContainer.nextSibling);
			
			m_ytautoreplay_btn = replayBtn;
		}

	}

	function hideYTAROptionsPanel() {
		if (m_ytarOptionsPanel.className.indexOf("hid") < 0) {
			m_ytarOptionsPanel.className += " hid";
		}
	}

	function showytAutoReplayOptions(show) {

		if ($("#action-panel-replay").is(":visible")) {
		
			$("#action-panel-replay").hide();
			return;
		
		}
	
		if (show) {
			$("#action-panel-replay").removeClass("hid").show();
		}
		
		if (m_youtubeUiVersion == 0) {
			if (m_panelsSuperContainer != null) {
				m_panelsSuperContainer.className = "";
				m_panelsSuperContainer.setAttribute("style","");
			}
		}

		if (m_ytarOptionsPanel != null) {
	
			// m_ytarOptionsPanel.setAttribute("class", m_youtubeUiObject.classes.actionPanel);
			m_ytarOptionsPanel.setAttribute("style", "font-size: 16px; padding: 3em; background-color: rgb(245, 245, 245);");
	
			m_ytarOptionsPanel.innerHTML = '\
				<div style="position: relative;"> \
					<input type=\"radio\" name=\"loopOption\" id=\"loopOption1\" value=\"wholeMovie\" style="margin-bottom: 10px;">Loop entire video<br/> \
					<input type=\"radio\" name=\"loopOption\" id=\"loopOption2\" value=\"partialMovie\">Loop \
				&nbsp; \
					<input type=\"button\" id=\"ytautoreplayfrom_btn\" class=\"yt-uix-button yt-uix-button-default yt-uix-tooltip\" data-button-action=\"\" title=\"Use current time as \'From\' position\" type=\"button\" value=\" From '
						+ getMinutes(m_loopFrom) + ":"
						+ getSeconds(m_loopFrom) +
				' \"/> \
				&nbsp; \
					<input type=\"button\" id=\"ytautoreplayto_btn\" class=\"yt-uix-button yt-uix-button-default yt-uix-tooltip\" data-button-action=\"\" title=\"Use current time as \'To\' position\" type=\"button\" value=\" To '
						+ getMinutes(m_loopTo) + ":"
						+ getSeconds(m_loopTo) +
				' \" /> \
					<div style="margin-top: 20px;" > \
						<input type=\"button\" id=\"ytautoreplayStart_btn\" class=\"yt-uix-button yt-uix-button-default yt-uix-tooltip\" data-button-action=\"\" title=\"\" type=\"button\" value=\" Loop it! \" /> \
						<input type="button" id="ytautoreplayStop_btn" class="yt-uix-button yt-uix-button-default yt-uix-tooltip" data-button-action="" title="" value=" Stop it! " disabled=""> \
						&nbsp;  &nbsp; \
						<!--button id="ytar-ezlooper-btn" onclick="return false;" title="Edit on EZLooper.com" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" data-tooltip-text="Edit on EZLooper.com"><img class="yt-uix-button-icon" src="https://i.imgur.com/qQx0EJV.jpg" alt="Edit on EZLooper.com"></button--> \
					</div> \
					<!--div id="ytar-like-section" style="height: 0; visibility:hidden; "> \
						<a id="ytar-share-link" href></a> \
						<span><iframe id="ytar-plus-frame" style="width: 75px; margin-top: 20px; border-style: none; height: 24px; " src="https://plusone.google.com/_/+1/fastbutton?bsv=pr&url=http%3A%2F%2Fwww.ezlooper.com&size=standard&count=true&hl=en-US&jsh=m%3B%2F_%2Fapps-static%2F_%2Fjs%2Fgapi%2F__features__%2Frt%3Dj%2Fver%3DHrbac2B7wPs.en.%2Fsv%3D1%2Fam%3D!gFuVl93svF6I1poz5g%2Fd%3D1%2Frs%3DAItRSTO9Vm3UWk_Xm5K-dhsSuubKOkOgzw#_methods=onPlusOne%2C_ready%2C_close%2C_open%2C_resizeMe%2C_renderstart&id=I3_1338065223931&parent=http%3A%2F%2Fwww.ezlooper.com" allowtransparency="true" frameborder="0" hspace="0" marginheight="0" marginwidth="0" scrolling="no" tabindex="0" vspace="0" width="100%" id="I3_1338065223931" name="I3_1338065223931" title="+1"></iframe></span> \
						<span><iframe id="ytar-fb-like-frame" style="height: 25px; margin-bottom: -1px;" src="https://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.ezlooper.com&amp;send=true&amp;layout=button_count&amp;width=600&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=trebuchet+ms&amp;height=35">&amp;amp;amp;amp;amp;amp;lt;/div&amp;amp;amp;amp;amp;amp;gt;&amp;amp;amp;lt;/iframe1&amp;amp;amp;gt;</iframe></span> \
					</div--> \
				</div>\
			';

			document.getElementById('loopOption1').addEventListener("click", onLoopOption1, false);
			document.getElementById('loopOption2').addEventListener("click", onLoopOption2, false);
			document.getElementById('ytautoreplayfrom_btn').addEventListener("click", onFromBtn, false);
			document.getElementById('ytautoreplayto_btn').addEventListener("click", onToBtn, false);
			document.getElementById('ytautoreplayStart_btn').addEventListener("click", onStartBtn, false);
			document.getElementById('ytautoreplayStop_btn').addEventListener("click", onStopBtn, false);
			document.getElementById('ytar-ezlooper-btn').addEventListener("click", onEZLooperBtn, false);
			
			document.getElementById('ytar-fb-like-frame').onload = function() {
				document.getElementById("ytar-like-section").style.visibility = "";
				document.getElementById("ytar-like-section").style.height = "";
			};
			
			m_shareLinkElement = document.getElementById('ytar-share-link');
			m_fbLikeFrame = document.getElementById('ytar-fb-like-frame');
			m_googlePlusFrame = document.getElementById('ytar-plus-frame');
			
			updateytGUI();
		}

	}

	function onReplayBtnClick() {
		showytAutoReplayOptions(!m_replayEnabled);
		refreshShareUrl();
		return false;
	}
	
	function onStartBtn() {
	
		startytLoop();
		return false;
		
	}

	function onEZLooperBtn() {
	
		window.open(refreshShareUrl(), "_blank"); 
		return false;
		
	}
	
	function onStopBtn() {
	
		stopytLoop();
		return false;
		
	}
	
	function onToBtn() {
	
		var curTime = getCurrentTime();
		curTime = Math.round(curTime * 100) / 100; // round "original" to two decimals
		if (m_loopMethod != 1) {
			stopytLoop();
			m_loopMethod = 1;
			updateytGUI();
		}
		
		if (curTime > m_loopFrom) {
			document.getElementById('ytautoreplayto_btn').value = 'To ' + getTimeAsString(curTime);
			m_loopTo = curTime;
		} else {
			alert ('End time should be bigger than start time')
		}
		
		refreshShareUrl();
		
		return false; 
	}

	function onFromBtn() {
	
		var curTime = getCurrentTime();
		curTime = Math.round(curTime * 100) / 100; // round "original" to two decimals
		if (m_loopMethod != 1) {
			stopytLoop();
			m_loopMethod = 1;
			updateytGUI();
		}
		if (curTime < m_loopTo) {
			document.getElementById('ytautoreplayfrom_btn').value = ' From ' + getTimeAsString(curTime);
			m_loopFrom = curTime;
		} else {
			alert ('Start time should be smaller than start time')
		}
		
		refreshShareUrl();
		
		return false; 
	}
	
	function onLikeFrameLoad() {
		document.getElementById("ytar-like-section").style.visibility = "hidden";
		document.getElementById("ytar-like-section").style.height = "0";
	}
	
	function onLoopOption1() {
		if (m_loopMethod != 0) {
			stopytLoop();
			m_loopMethod = 0;
			updateytGUI();
		}
		
		refreshShareUrl();
	}
	
	function onLoopOption2() {
		if (m_loopMethod != 1) {
			stopytLoop();
			m_loopMethod = 1;
			updateytGUI();
		}
		
		refreshShareUrl();
	}
	
	function getTimeAsString(time) {
		return getMinutes(time) + ":" + getSeconds(time);
	}

	function checkYouTubePlayerReady() {

		var checkWentFine = false;

		try
		{
			if (m_ytplayer == null) {
				m_ytplayer = getPlayerObject();
			}
			
			if (window.onYouTubePlayerReady != undefined) {
				window.onYouTubePlayerReady();
			}
		
			// ahha! no crash! off we go...

			checkWentFine = true;
			if (m_ytplayer != null) {
				clearInterval(m_ytPlayerInterval);
				m_ytPlayerInterval = null;
				
				m_loopTo = getDuration();
				
				if ($('#yt-replay-btn').length === 0) {
					putytAutoReplayOptionsBtn();
					addOptionsPanelDiv();
				}

			}
		} catch(err) {

			// hmm... I guess the player isn't ready
			
		} finally {

			if (checkWentFine == false) {
				// reset the timer
				clearInterval(m_ytPlayerInterval);
				m_ytPlayerInterval = setInterval(checkYouTubePlayerReady, 500);
			}

		}

	}

	function getSeconds(fullTimeInSeconds) {

		fullTimeInSeconds = Math.ceil(fullTimeInSeconds);
		var output = ((fullTimeInSeconds) % 60).toFixed();
		return (output < 10 ? '0' : '') + output;

	}

	function getMinutes(fullTimeInSeconds) {
		return Math.floor((fullTimeInSeconds) / 60);
	}

	function startytLoop() {

		m_replayEnabled = true;
		
		if (m_checkRewindInterval != null) {
			clearInterval(m_checkRewindInterval);
			m_checkRewindInterval = null;
		}

		if (m_loopMethod == 0) {
			// nothing special
		} else if (m_loopMethod <= 1) {
			seekTo(m_loopFrom, true);
		}
		m_checkRewindInterval = setInterval(checkIfRewindIsNeeded, 100);

		playVideo();
		
		updateytGUI();
	}
	
	function stopytLoop() {

		if (m_replayEnabled == true) {
		
			m_replayEnabled = false;

			if (m_checkRewindInterval != null) {
				clearInterval(m_checkRewindInterval);
				m_checkRewindInterval = null;
			}
			
			updateytGUI();
		}
	}

	function updateytGUI() {

		document.getElementById('ytautoreplayStart_btn').disabled = m_replayEnabled;
		document.getElementById('ytautoreplayStop_btn').disabled = !m_replayEnabled;
				
		if (m_loopMethod == 0) {
			document.getElementById('loopOption1').checked = true;
			document.getElementById('loopOption2').checked = false;		
		} else if (m_loopMethod == 1) {
			document.getElementById('loopOption1').checked = false;
			document.getElementById('loopOption2').checked = true;		
		}
		
	}

	function checkIfRewindIsNeeded() {

		if (m_replay == true) {
			m_replay = false;
			playVideo();
		}
	
		var currentPos = getCurrentTime();
		if ((m_loopMethod == 1) && ((currentPos >= m_loopTo) || (getPlayerState() == 0))) {
		
			seekTo(m_loopFrom, true);
			playVideo();
			
		} else if (	(m_loopMethod == 0) &&
					(m_replayEnabled == true) &&
					((getPlayerState() == 0) || (getDuration() - currentPos) <= 0.2)) {
		
			var timeoutID = window.setTimeout(function () {
				m_replay = true;
				seekTo(0, true);
				playVideo();
				window.clearTimeout(timeoutID);
			}, 0)
			
		}
		
	}

	function getElementsByClassName(node,classname) {
	  if (node.getElementsByClassName) { // use native implementation if available
		return node.getElementsByClassName(classname);
	  } else {
		return (function getElementsByClass(searchClass,node) {
			if ( node == null )
			  node = document;
			var classElements = [],
				els = node.getElementsByTagName("*"),
				elsLen = els.length,
				pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

			for (i = 0, j = 0; i < elsLen; i++) {
			  if ( pattern.test(els[i].className) ) {
				  classElements[j] = els[i];
				  j++;
			  }
			}
			return classElements;
		})(classname, node);
	  }
	}

	function forEachElementWithClass(className, callback) {
		var elements = getElementsByClassName(document, className);
		var n = elements.length;
		for (var i = 0; i < n; i++) {
			var e = elements[i];
			callback(e);
		}
	}

	function refreshShareUrl() {
	
		var url = "" + m_shareBaseUrl;
		
		try {
		
			url += '/watch?v=';
			url += getVideoIdFromUrl(getVideoUrl());
			
			if (m_loopMethod == 1) {
				if (m_loopFrom > 0) {
					url += '&from=' + m_loopFrom;
				}
				if (m_loopTo < getDuration()) {
					url += '&to=' + m_loopTo;
				}
			}
			url += '&ref=' + m_browserName;
		}
		catch(err)
		{
			url = m_shareBaseUrl + '?ref=' + m_browserName;
		}
		
		m_shareLink = url;
		if (m_shareLinkElement != null) {
			m_shareLinkElement.setAttribute("href", url);
		}
		if (m_fbLikeFrame != null) {
			m_fbLikeFrame.setAttribute("src", "https://www.facebook.com/plugins/like.php?href=" + encodeURIComponent(url) + "&amp;send=true&amp;layout=button_count&amp;width=600&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=trebuchet+ms&amp;height=35");
			onLikeFrameLoad();
		}
		if (m_googlePlusFrame != null) {
			m_googlePlusFrame.setAttribute("src", "https://plusone.google.com/_/+1/fastbutton?bsv=pr&url=" + encodeURIComponent(url) + "&size=standard&count=true&hl=en-US&jsh=m%3B%2F_%2Fapps-static%2F_%2Fjs%2Fgapi%2F__features__%2Frt%3Dj%2Fver%3DHrbac2B7wPs.en.%2Fsv%3D1%2Fam%3D!gFuVl93svF6I1poz5g%2Fd%3D1%2Frs%3DAItRSTO9Vm3UWk_Xm5K-dhsSuubKOkOgzw#_methods=onPlusOne%2C_ready%2C_close%2C_open%2C_resizeMe%2C_renderstart&id=I3_1338065223931&parent=http%3A%2F%2Fwww.ezlooper.com");
			onLikeFrameLoad();
		}
		
		return url;
	}
	
	function getVideoIdFromUrl(url) {
		var video_id = url.split('v=')[1];
		var ampPos = video_id.indexOf('&');
		if(ampPos != -1) {
		  video_id = video_id.substring(0, ampPos);
		}
		return video_id;
	}
	
	function getBrowserName(defaultName) {
		
		var userAgent = navigator.userAgent.toLowerCase();
	
		if (userAgent.indexOf('firefox') != -1) {
			return 'addon-ff';
		}
		
		if (userAgent.indexOf('chrome') != -1) {
			return 'addon-chrome';
		}
	
		return defaultName;
	}
	
	function getPlayerObject() {
			
		m_ytplayer = document.getElementById("movie_player") || document.getElementById("movie_player-html5");
	
		return m_ytplayer;
	}
	
	function objToStr(o) {
    
		var parse = function(_o) {
		
			var a = [], t;
			for (var p in _o){
			
				if(_o.hasOwnProperty(p)) {
					t = _o[p];
					if (t == null) {
						a[a.length] = [ p + ": null" ];
					} else if (t && typeof t == "object") {
						a[a.length]= p + ":{ " + arguments.callee(t).join(", ") + "}";
					} else if(typeof t == "string") {
							a[a.length] = [ p + ": \"" + t.toString() + "\"" ];
					} else {
						a[a.length] = [ p + ": " + t.toString()];
					}
				}
			}
			
			return a;
		}
		
		return "{" + parse(o).join(", ") + "}";
		
	}
	
	function executePageScript(fn, params) {
		
	   // returned value container
	   var val = document.createElement("div");
	   val.id = "" + Math.floor((Math.random() * 100) + 1) + ((new Date()).getTime());
	   val.innerHTML = ""; 
	   document.body.appendChild(val); 
	   
	   var script = document.createElement('script');
	   script.setAttribute("type", "application/javascript");
	   script.textContent = ((params != null) ? ('var params = ' + objToStr(params) + ';') : "") + 
							'document.getElementById("' + val.id + '").innerHTML=(' + fn + ')();';
	   document.documentElement.appendChild(script); // run the script
	   var returnedVal = document.getElementById(val.id).innerHTML;
	   document.documentElement.removeChild(script); // clean up
	   document.body.removeChild(val); 
	   
	   return returnedVal;
	}
	
	function runPlayerCmd(cmdName, params) {
		
		if (!params) {
			params = {};
		}
		
		params.ytplayerName = m_ytplayer.id;
		params.cmdName = cmdName;
		var val = executePageScript(function(){
			
			var ytPlayerObj = document.getElementById(params.ytplayerName);
			if ((ytPlayerObj != null) && (ytPlayerObj[params.cmdName] != null)) {
				return ytPlayerObj[params.cmdName]();
			}
			
			return null;
		}, params);
		
		return val;
		
	}
	
	function playVideo() {
		
		return runPlayerCmd("playVideo");
		
	}
	
	function getVideoUrl() {
		
		return runPlayerCmd("getVideoUrl");
		
	}
	
	function getPlayerState() {
		
		return parseInt(runPlayerCmd("getPlayerState"));
		
	}
	
	function getDuration() {
		
		return parseFloat(runPlayerCmd("getDuration"));
		
	}
	
	function getCurrentTime() {
		
		return parseFloat(runPlayerCmd("getCurrentTime"));
		
	}
	
	function seekTo(dest, seekAhead) {
		
		var val = executePageScript(function(){
			
			var ytPlayerObj = document.getElementById(params.ytplayerName);
			if (ytPlayerObj != null) {
				return ytPlayerObj.seekTo(params.dest, params.seekAhead);
			}
			
			return null;
		}, {
			ytplayerName: m_ytplayer.id,
			dest: dest,
			seekAhead: seekAhead
		});
		
		return val;
	}

	function initMovieLoadListener(dest, seekAhead) {

		monitorReloads();
	
		var val = executePageScript(function(){

			var _params = params;
			
			var proto = XMLHttpRequest.prototype;
			var _open = proto.open;
			proto.open = function(method, url, async, user, password) {
			
				// console.log(url);
			
				if (url.indexOf('youtube.com/watch?v=') >= 0) {
				
					postMessage({ type: "" + _params.reloadMsgId, args: null }, document.location.href);
					
				}
			
			   return _open.apply(this, arguments);
			}
			
		}, {
			reloadMsgId: m_reloadMsgId
		});
		
		return val;
	}

	function monitorReloads() {
		
		var selfOrigin = window.location.protocol + "//" + window.location.host;
		if (window.location.port.length > 0 && window.location.port != "80") {
			selfOrigin += ":" + window.location.port;
		}

		window.addEventListener("message", function receiveMessage(event) {
		
			if (event.origin !== selfOrigin) {
				return;
			}

			if (event.data.type && (event.data.type == m_reloadMsgId)) {

				stopytLoop();

				m_ytautoreplay_btn = null;
				
				setTimeout(function() {
					if (m_ytautoreplay_btn == null) {
						init();
					}
				}, 1000);

			}

		}, false);
	}

	function showExtensionUpgradeMessage() {
	
		browser.storage.local.get(function(item) {
			var version = item['version'],
				lastReminderTime = item['last-reminder-time'] || 0;
			
			if (((Date.now() - lastReminderTime) > (60 * 24 * 60 * 60 * 1000)) || version !== VERSION_CODE) {
				browser.runtime.sendMessage({
					code: 'open-tab',
					url: ('http://youtube-auto-replay.wzmn.net?version=' + VERSION_CODE + '&platform=' + PLATFORM)
				});
				browser.storage.local.set({
					'version': VERSION_CODE,
					'last-reminder-time': Date.now()
				});
			}
		});
	}
    
    function isInIncognito() {
        var incognito = false;
        
        try {
            incognito = browser.extension.inIncognitoContext;
        } catch (ignore) {}
            
        return incognito;
    }
	
	function init() {
	
		if (m_ytPageLoadedInterval != null) {
			clearInterval(m_ytPageLoadedInterval);
		}

		// Wait for the page to be loaded completely
		m_ytPageLoadedInterval = setInterval(function() {

			initPageData();
			if (isPageLoaded()) {
				clearInterval(m_ytPageLoadedInterval);
				if (m_buttons_div != null) {
					m_ytPlayerInterval = setInterval(checkYouTubePlayerReady, 250);
				}
			}
		}, 200);

        if (!isInIncognito()) {
            showExtensionUpgradeMessage();
        }
		
	}

	init();
	initMovieLoadListener();

})(jQuery.noConflict(true));