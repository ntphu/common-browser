function LP_floating_icon_exists(e,i){return!(!e&&!(e=LP_derive_doc()))&&null!=LP_getElementByIdOrName(e,LP_compute_floating_iconcontainer_id(e,i))}function do_icon_mouseover(e,i,t){if(null==e||null==i||!t)return!1;var n=LP_pickFieldName(e,t),_=LP_compute_floating_icon_id(e,n),o=e.getElementById(_);if(is_your_popup_showing(e))return null!=o&&(o.style.opacity="1",o.style.filter="alpha(opacity=100)"),!1;if(null!=o){var l=!0;if(null!=e.getElementById(i)){var r=!1,a=getIconState(e,n);a&&(r=a.fillhint),"formfills"==r?(LP_has_highdef_display(s)?LP_set_image_src(o,g_40_icons["FormFill_dark@2x"]):LP_set_image_src(o,g_40_icons.FormFill_dark),l=!1):"offersave"==r?l=!1:"generate"==r&&(LP_has_highdef_display(s)?LP_set_image_src(o,g_40_icons["Generate_dark@2x"]):LP_set_image_src(o,g_40_icons.Generate_dark),l=!1)}if(l){var s=e.defaultView;s||(s=window),LP_has_highdef_display(s)?LP_set_image_src(o,g_40_icons["16x16_dark@2x"]):LP_set_image_src(o,g_40_icons["16x16"])}o.style.opacity="1",o.style.filter="alpha(opacity=100)"}if(g_do_icon_number_hint){var d=LP_compute_floating_number_id(e,n),c=e.getElementById(d);null!=c&&g_icon_shading&&(c.style.backgroundColor="#CCFF99")}}function do_icon_mouseout(e,i,t){if(null==e||null==i||!t)return!1;var n=LP_pickFieldName(e,t),_=LP_compute_floating_icon_id(e,n),o=e.getElementById(_);if(is_your_popup_showing(e))return null!=o&&(o.style.opacity="0.6"),!1;if(null!=o){if(null==e.getElementById(i))return!1;var l=e.defaultView;l||(l=window);var r=!1,a=getIconState(e,n);a&&(r=a.fillhint),(!r||"sites"!==r&&"formfills"!==r&&"generate"!==r&&"offersave"!==r)&&(r="default"),"default"==r||"sites"==r?(LP_has_highdef_display(l)?LP_set_image_src(o,g_40_icons["16x16_dark@2x"]):LP_set_image_src(o,g_40_icons["16x16"]),o.style.opacity="0.6",o.style.filter="alpha(opacity=60)"):"formfills"==r?(LP_has_highdef_display(l)?LP_set_image_src(o,g_40_icons["FormFill_dark@2x"]):LP_set_image_src(o,g_40_icons.FormFill_dark),o.style.opacity="0.6",o.style.filter="alpha(opacity=60)"):"generate"==r&&(LP_has_highdef_display(l)?LP_set_image_src(o,g_40_icons["Generate_dark@2x"]):LP_set_image_src(o,g_40_icons.Generate_dark),o.style.opacity="0.6",o.style.filter="alpha(opacity=60)")}if(g_do_icon_number_hint){var s=LP_compute_floating_number_id(e,n),d=e.getElementById(s);null!=d&&(g_icon_shading?d.style.backgroundColor="#FFFFFF":r&&g_icon_numbers&&g_icon_numbers[r]>1?d.style.display="block":d.style.display="none")}}function change_clickable_icon_to_cancel(e,i,t){if(!e&&!(e=LP_derive_doc()))return!1;var n=e.defaultView;n||(n=window);var _=LP_compute_floating_icon_id(e,t),o=e.getElementById(_);if(null!=o){if(null==e.getElementById(i))return!1;LP_has_highdef_display(n)?LP_set_image_src(o,g_40_icons["IF_Close@2x"]):LP_set_image_src(o,g_40_icons.IF_Close),o.style.opacity="0.6",o.style.filter="alpha(opacity=60)"}return!0}function shouldCreateFloatingIcon(e,i,t){if(!e&&!(e=LP_derive_doc()))return!1;if(!e||!i)return!1;if("stripe.com"==t)return!0;if("dominos.com"==t)return!1;if("metlife.com"==t&&-1!=e.location.href.indexOf("mybenefits.metlife.com"))return!0;var n=LP_get_live_style(i);return n&&n.backgroundImage&&"none"!=n.backgroundImage&&!inputHasLPBackground(i)?!(n.backgroundImage.indexOf("blank")>=0):!(!g_trial_bg_expt||function(e){if(!e)return!1;e.style.backgroundImage="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=)";var t=LP_get_live_style(i);return!(!t||"none"==t.backgroundImage||!t.backgroundImage)&&(!g_stylesheet_grubbing||!LP_input_has_bg_style_override(e.ownerDocument))}(i))}function LP_create_floating_icon(e,i,t,n){if(!e&&!(e=LP_derive_doc()))return!1;if(!i)return!1;var _=e.defaultView;_||(_=window);var o,l,r=e.getElementsByTagName("body")[0],a=LP_pickFieldName(e,i),s=getIconState(e,a);s&&s.fillhint;var d=LP_compute_floating_iconcontainer_id(e,a);if(LP_floating_icon_exists(e,a))return!1;l=e.createElement("div"),l.id=d,"undefined"!=typeof g_isfirefox&&g_isfirefox?(null==e.g_popup_divs&&(e.g_popup_divs={}),e.g_popup_divs[l.id]=l.id):g_popup_divs[l.id]=l.id,o=e.createElement("img"),i.offsetHeight<LPICON_WIDTH&&(o.height=i.offsetHeight,o.width=o.height),o.id=l.id+"_icon";var c=!0;if(null!=t&&("formfills"==t?(LP_has_highdef_display(_)?LP_set_image_src(o,g_40_icons["FormFill_dark@2x"]):LP_set_image_src(o,g_40_icons.FormFill_dark),o.style.opacity="0.6",o.style.filter="alpha(opacity=60)",c=!1):"generate"==t&&(LP_has_highdef_display(_)?LP_set_image_src(o,g_40_icons["Generate_dark@2x"]):LP_set_image_src(o,g_40_icons.Generate_dark),o.style.opacity="0.6",o.style.filter="alpha(opacity=60)",c=!1)),c&&(LP_has_highdef_display(_)?LP_set_image_src(o,g_40_icons["16x16_dark@2x"]):LP_set_image_src(o,g_40_icons["16x16"]),o.style.opacity="0.6",o.style.filter="alpha(opacity=60)"),l.appendChild(o),"sites"==t){!LP_getloggedin()||g_isfirefox||g_isie||i.setAttribute("autocomplete","off")}return g_do_icon_number_hint&&LP_create_floating_icon_hint(e,l.id,t,n)&&LP_set_floating_icon_hint(e,l.id,t,n),r.appendChild(l),l.style.maxHeight=LPICON_WIDTH+"px",l.style.verticalAlign="top",o.style.verticalAlign="top","undefined"!=typeof g_docnum&&verbose_log("["+g_docnum+"] setting up click listener on icon for "+LP_pickFieldName(e,i)),g_icon_hover&&(LP_addEventHandler(l,"mouseover",function(t){return do_icon_mouseover(e,l.id,i),LP_stopEventPropagation(t),!1}),LP_addEventHandler(l,"mouseout",function(t){return do_icon_mouseout(e,l.id,i),LP_stopEventPropagation(t),!1})),g_icon_parent_hover&&(LP_addEventHandler(i,"mouseover",function(t){return do_icon_mouseover(e,l.id,i),LP_stopEventPropagation(t),!1}),LP_addEventHandler(i,"mouseout",function(t){return do_icon_mouseout(e,l.id,i),LP_stopEventPropagation(t),!1})),LP_addEventHandler(r,"DOMsubtreemodified",function(){return popupfill_resize(e),!1},!1),LP_addEventHandler(r,"resize",function(){return popupfill_resize(e),!1},!1),r.onresize=onresize_handler,setprops_floating_icon(e,i,l,t,n),!0}function move_floating_icon(e,i,t,n){if(e||(e=LP_derive_doc()),!e||!i)return!1;var _,o=(e.getElementsByTagName("body")[0],LP_pickFieldName(e,i,LP_GETNAME_FAVOR_ID_OVER_NAME));if(!t){var l=getIconState(e,o);l&&(t=l.fillhint)}var _=LP_getElementByIdOrName(e,LP_compute_floating_iconcontainer_id(e,o));return _&&(g_do_icon_number_hint&&(LP_getloggedin()?LP_set_floating_icon_hint(e,_.id,t,n):LP_delete_floating_icon_hint(e,_.id)),setprops_floating_icon(e,i,_,t,n)),!0}function setprops_floating_icon(e,i,t,n,_){function o(e,i){if(!e||!i)return!1;var t=!1,n=e.getElementsByTagName("body")[0],_=i.parentNode;return _&&_!=n&&n&&(_.removeChild(i),n.appendChild(i),t=!0),t}if(e&&i&&t){var l=LP_pickFieldName(e,i),r=getIconState(e,l);if(r){o(e,t),"absolute"!=t.style.position&&(t.style.position="absolute");var a=LP_getAbsolutePos(e,i);if(null!=a){if(i.offsetHeight>LPICON_WIDTH){var s=a.top+(i.offsetHeight-LPICON_WIDTH)/2+"px";t.style.top!=s&&(t.style.top=s)}else t.style.top!=a.top+"px"&&(t.style.top=a.top+"px");if(0==r.text_direction)var d=a.left+2+"px";else var d=a.left+i.offsetWidth-LPICON_WIDTH-2+"px";if(t.style.left!=d&&(t.style.left=d),g_do_icon_number_hint){var c;null==E&&(E=e.getElementById(t.id+"_icon"));var f=parseInt(t.style.left),g=parseInt(t.style.top),u=e.getElementById(t.id+"_numspan");if(null!=u)if(o(e,u),null!=n&&null!=_&&null!=_[n]&&_[n]>1){var p=_[n];_[n]>0&&_[n]<9&&(p=" "+_[n]);var m=LP_measureText(e,p,null,"font-size: 9px;font-family: Helvetica,Arial,sans-serif;font-weight:bold;line-height:11px;");if(null!=m){var h,P;h=void 0===E.width||0==E.width?LPICON_WIDTH:E.width,P=void 0===E.height||0==E.height?LPICON_HEIGHT:E.height;var v=f+h-m.width+2+"px",L=g+P-m.height+6+"px",y=L,x=v,I="position:absolute !important; visibility:visible !important; border:0px !important; font-size:9px !important; font-family: Helvetica Neue,Helvetica,Arial,sans-serif; top:"+y+" !important; left:"+x+" !important; background-color: #808080; padding: 1px 2px !important; font-weight: bold !important; color:#ffffff !important; cursor: default; line-height:11px !important; max-width: 10px !important; ",b="undefined"!=typeof window&&window?window:e.defaultView,c=LP_getComputedStyle(b,u),w=c.zIndex;""!==w&&"auto"!=w&&(I=I+"z-index:"+w+" !important;"),"absolute"==c.position&&"visible"==c.visibility&&"9px"==c.fontSize&&"1px 2px"==c.padding&&"11px"==c.lineHeight&&c.top==y&&c.left==x||(u.style.cssText=I)}else I="display:none;",u.style.cssText=I}else I="display:none;",u.style.cssText=I}}else verbose_log("ERROR: unable to relocate clickable icon");var k=getZIndex(e,i,0,0);if(null!=k?k++:k=CLICKABLE_ICON_ZINDEX,t.style.zIndex!=k&&(t.style.zIndex=k),g_do_icon_number_hint&&null!=u){I=I+"z-index:"+(k+1)+" !important;";var b="undefined"!=typeof window&&window?window:e.defaultView;c=LP_getComputedStyle(b,u),c&&"absolute"==c.position&&"visible"==c.visibility&&"9px"==c.fontSize&&"1px 2px"==c.padding&&"11px"==c.lineHeight&&c.top==y&&c.left==x&&c.zIndex==k+1||(u.style.cssText=I)}checkIsDisplayed(e,i,0)?t.style.display="":t.style.display="none";var E=t.childNodes[0];parseInt(i.offsetHeight)<LPICON_WIDTH?(i.offsetHeight!=E.height&&(E.height=parseInt(i.offsetHeight)),i.offsetHeight!=E.height&&(E.width=E.height)):(E.height!=LPICON_WIDTH&&(E.height=LPICON_WIDTH),E.width!=LPICON_WIDTH&&(E.width=LPICON_WIDTH))}}}function refresh_floating_icon_number_hints(e){if(null==e&&(e=document),null!=e){LP_get_icon_divs(e);if(LP_getloggedin())for(i in iconidhash);else for(var i in iconidhash){var t=e.getElementById(iconidhash[i]+"_numspan");t&&(t.parentNode.removeChild(t),verbose_log("deleting icon number for "+iconidhash[i]))}}}function LP_reset_icon_divs(e){return!(!e&&!(e=LP_derive_doc()))&&("undefined"!=typeof g_isfirefox&&g_isfirefox?e.g_popup_divs={}:g_popup_divs={},!0)}function LP_store_icon_div(e,i){return!(!e&&!(e=LP_derive_doc()))&&("undefined"!=typeof g_isfirefox&&g_isfirefox?(null==e.g_popup_divs&&(e.g_popup_divs={}),e.g_popup_divs[i]=i):g_popup_divs[i]=i,!0)}function LP_delete_icon_div(e,i){return"undefined"!=typeof g_isfirefox&&g_isfirefox?e&&delete e.g_popup_divs[i]:delete g_popup_divs[i],!0}function LP_get_icon_divs(e){return e||(e=LP_derive_doc())?"undefined"!=typeof g_isfirefox&&g_isfirefox?null==e.g_popup_divs?{}:e.g_popup_divs:null==g_popup_divs?{}:g_popup_divs:{}}function LP_set_floating_icon_hint(e,i,t,n){if(!e&&!(e=LP_derive_doc()))return!1;if(LP_getloggedin()){var _=e.getElementById(i+"_numspan");if(null!=_){var o="",l=LP_elt_get_text(_);null!=t&&null!=n&&null!=n[t]&&n[t]>0?"formfills"!=t&&"generate"!=t||!1!==g_show_icon_number_for_formfills?(o=n[t]<9?" "+n[t]:n[t]>9?"9+":" "+n[t],l!=o&&LP_elt_set_text(_,o)):""!=l&&LP_elt_set_text(_,""):LP_elt_set_text(_,"")}else LP_create_floating_icon_hint(e,i,t,n);return!0}}function LP_create_floating_icon_hint(e,i,t,n){if(!e&&!(e=LP_derive_doc()))return!1;if(!i)return!1;var _=e.getElementsByTagName("body")[0],o=i+"_numspan";if(e.getElementById(o))return!1;if(("formfills"==t||"generate"==t)&&!1===g_show_icon_number_for_formfills)return!1;var l=e.createElement("div");return l.id=i+"_numspan",l.style.position="absolute",l.style.top="-1000px",l.style.left="-1000px",_.appendChild(l),g_defensive&&LP_addEventHandler(l,"mousedown",function(e){return LP_stopEventPropagation(e),!1}),!0}function LP_delete_floating_icon_hint(e,i){if(!e&&!(e=LP_derive_doc()))return!1;var t=e.getElementById(i+"_numspan");return null!=t&&(t.parentNode.removeChild(t),!0)}function LP_delete_floating_icon(e,i){if(!e&&!(e=LP_derive_doc()))return!1;var t=e.getElementById(i);return null!=t&&(t.parentNode.removeChild(t),!0)}function relocate_popupfill_clickables(e){if(!e&&!(e=LP_derive_doc()))return null;if("function"==typeof e.getElementsByName){g_isfirefox&&verbose_log("relocate_popupfill_clickables doc is "+get_doc_location_href(e));var i=LP_get_icon_divs(e);if(isEmptyObject(i))return null;try{var t,n=0;for(t in i)if(i.hasOwnProperty(t)){var _=i[t].substr(LPMAGIC.length);if(null!=_&&_.length>0){var o=_,l=LP_getElementByIdOrName(e,o);if(null!=l||g_double_password_hack||g_double_secret_password_hack)if(g_do_icon_number_hint){var r=e.getElementById(i[t]);if(null!=r){var a="",s=getIconState(e,o);s&&(a=s.fillhint),null!=a&&"sites"!=a&&(a=null);var d={};g_isfirefox?d[a]=s.fillhintnumber:(g_icon_number_overrides.sites>0?d.sites=g_icon_number_overrides.sites:d.sites=g_icon_numbers.sites,g_icon_number_overrides.formfills>0?d.formfills=g_icon_number_overrides.formfills:d.formfills=g_icon_numbers.formfills),move_floating_icon(e,l,a,d)}}else move_floating_icon(e,l);else LP_delete_floating_icon(e,i[t])&&(verbose_log("relocate: deleting orphaned icon container for "+_),n++),g_do_icon_number_hint&&LP_delete_floating_icon_hint(e,i[t])&&(verbose_log("relocate: deleting orphaned icon number for "+_),n++),delete i[t]}}}catch(i){verbose_log("relocate_popupfill_clickables caught error:"+i.message),g_isfirefox&&end_weasel(e)}if(n>0)if(g_isfirefox){var c=lpGetBrowserForDocument(e);setTimeout(function(){LP.checkShouldRecheck(c)},500)}else setTimeout(function(){if(g_pending_recheck)verbose_log("skipped 1 recheck, 1 is already queued up, #7");else{var i=LP_get_last_url_history(e),t={href:i.href,href_hash:i.href_hash};checkShouldRecheck(t)}},500)}}function reset_floating_icon(e,i,t){if(!e&&!(e=LP_derive_doc()))return!1;var n=e.defaultView;n||(n=window);var _=LP_pickFieldName(e,i),o=getIconState(e,_);!t&&o&&(t=o.fillhint);var l=LP_getElementByIdOrName(e,LP_compute_floating_iconcontainer_id(e,_)),r=LP_getElementByIdOrName(e,LPMAGIC+_+"_icon");return!(!l||!r)&&("formfills"==t?LP_has_highdef_display(n)?LP_set_image_src(r,g_40_icons["FormFill_dark@2x"]):LP_set_image_src(r,g_40_icons.FormFill_dark):"generate"==t?LP_has_highdef_display(n)?LP_set_image_src(r,g_40_icons["Generate_dark@2x"]):LP_set_image_src(r,g_40_icons.Generate_dark):LP_has_highdef_display(n)?LP_set_image_src(r,g_40_icons["16x16_dark@2x"]):LP_set_image_src(r,g_40_icons["16x16"]),r.style.opacity="0.6",r.style.filter="alpha(opacity=60)",!0)}function getZIndex(e,i,t,n){LPCTR("getzindex");if(null==e)return null;if(i==e.body||null==i||t>50)return null;var _=0,o="undefined"!=typeof window&&window?window:e.defaultView,l=LP_getComputedStyle(o,i);return null==l?null:"absolute"==l.position||"relative"==l.position||"fixed"==l.position?"auto"==l.zIndex||""===l.zIndex?(_=getZIndex(e,i.parentNode,t+1,n+1),null==_?0:parse_zindex(_)):(_=getZIndex(e,i.parentNode,t+1,parse_zindex(l.zIndex)),null==_?parse_zindex(l.zIndex)+1:parse_zindex(_)+1):"auto"==l.zIndex||""==l.zIndex?(_=getZIndex(e,i.parentNode,t+1,n+1),null==_?n+1:parse_zindex(_)+1):(_=getZIndex(e,i.parentNode,t+1,parse_zindex(l.zIndex)),null==_?parse_zindex(l.zIndex):parse_zindex(_)+1)}function end_weasel(e){if(do_experimental_popupfill&&(e||(e=document||LP.getBrowser().contentDocument),e)){var i;i=e&&null!=e.g_weasel_id?e.g_weasel_id:g_weasel_id,null!=i&&clearTimeout(i),g_isfirefox?e&&(e.g_weasel_id=null,e.g_weaseled=!1):(g_weasel_id=null,g_weaseled=!1)}}function LP_compute_floating_iconcontainer_id(e,i){return e||(e=LP_derive_doc()),e&&i?LPMAGIC+i:""}function LP_compute_floating_icon_id(e,i){return e||(e=LP_derive_doc()),e&&i?LP_compute_floating_iconcontainer_id(e,i)+"_icon":""}function LP_compute_floating_number_id(e,i){return e||(e=LP_derive_doc()),e&&i?LP_compute_floating_iconcontainer_id(e,i)+"_numspan":""}