var g_lpws=null,g_lpws_state=0,g_lpws_timer=null,g_lpws_clientId="",g_lpws_window=window;function push_server_log(e){"undefined"!=typeof console&&console.log(e)}function push_server_interval(e,n,s){Date.now();g_lpws_window.clearTimeout(g_lpws_timer),0==g_lpws_state?push_server_connect(e,n,s):g_lpws_timer=g_lpws_window.setTimeout(function(){push_server_interval(e,n,s)},6e4)}function push_server_disconnect(){push_server_log("push_server_disconnect!"),g_lpws_window.clearTimeout(g_lpws_timer),g_lpws&&(g_lpws.onclose=g_lpws.onerror=null,delete g_lpws,g_lpws_state=0,g_lpws_clientId="")}function push_server_connect(e,n,s){push_server_log("connecting to "+e+" chan: "+n),e=e.replace(/^http(s?):/gi,"ws$1:"),g_lpws="undefined"!=typeof WebSocket?new WebSocket(e):"undefined"!=typeof MozWebSocket?new MozWebSocket(e):g_lpws_window.WebSocket(e),g_lpws_timer=g_lpws_window.setTimeout(function(){push_server_interval(e,n,s)},6e4),g_lpws.onopen=function(){g_lpws.send('{"channel":"/meta/handshake","version":"1.0","supportedConnectionTypes":["callback-polling"]}'),g_lpws_state=Date.now()},g_lpws.onclose=function(t){g_lpws_state=0,g_lpws_window.clearTimeout(g_lpws_timer);var o=1e3*(10+Math.floor(60*Math.random()));push_server_log("push_server retrying in "+o+"ms onclose: "+t.code+" "+t.reason),g_lpws_timer=g_lpws_window.setTimeout(function(){push_server_interval(e,n,s)},o)},g_lpws.onmessage=function(e){try{g_lpws_state=Date.now();var t=JSON.parse(e.data)[0];"/ping"==t.channel||("/meta/connect"==t.channel?g_lpws.send(JSON.stringify({clientId:t.clientId,connectionType:"websocket",channel:"/meta/connect"})):"/meta/handshake"==t.channel?t.successful&&(g_lpws.send(JSON.stringify({clientId:t.clientId,connectionType:"websocket",channel:"/meta/connect"})),g_lpws.send(JSON.stringify({clientId:t.clientId,subscription:n,channel:"/meta/subscribe"}))):"/meta/subscribe"==t.channel?t.successful:n==t.channel&&void 0!==t.data.av_update&&s())}catch(e){push_server_log("Caught error "+e)}}}
//# sourceMappingURL=sourcemaps/push_client.js.map
