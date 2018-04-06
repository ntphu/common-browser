LPRequest={},function(e){var t,s,r={},i=function(){for(var e in r)clearTimeout(r[e]);r={}};Topics.get(Topics.REFRESH_DATA).subscribe(i),Topics.get(Topics.CLEAR_DATA).subscribe(i),e.getNewRequestID=(t=0,function(){return++t}),e.makeRequest=(s=function(e,t){return function(){for(var s=0,r=e.length;s<r;++s)e[s].unlock();t&&t.apply(window,arguments)}},function(t,i){if(i.confirm){var o=i.confirm;return delete i.confirm,o.handler=function(){e.makeRequest(t,i)},void Topics.get(Topics.CONFIRM).publish(o)}i.requestID=e.getNewRequestID();var n,a,c=null;if(LPTools.getOption(i,"showTimeWarning",!0)&&(c=setTimeout(function(){h(Strings.translateString("Sorry, this request is taking longer than normal."))},3e4),r[i.requestID]=c),i.items&&LPTools.getOption(i,"lockItems",!1)){var l=i.items;l instanceof Array||(l=[l]),n=l,a=t,t=function(){for(var e=0,t=n.length;e<t;++e)n[e].lockForUpdate();a.apply(window,arguments)},i.success=s(l,i.success),i.error=s(l,i.error),i.confirm&&(i.confirm.closeHandler=s(l))}var u,p,g,f,m,d,S,T,R=(p=c,g=function(e){try{Topics.get(Topics.REQUEST_SUCCESS).publish(u),p&&(clearTimeout(p),delete r[u.requestID]),e&&Topics.get(Topics.SUCCESS).publish(e)}catch(e){LPPlatform.logException(e)}},(u=i)&&u.success?function(){var e=arguments,t=u.successMessage;e.length>0&&"string"==typeof e[0]&&(t=void 0===t?e[0]:t,e=Array.prototype.slice.call(e,1));try{u.success.apply(window,e)}catch(e){LPPlatform.logException(e)}g(t)}:g),h=(m=c,d=function(e){try{switch(e){case"notoken":e=Strings.translateString("No token was provided. Request could not be completed.");break;case"session_expired":e=Strings.translateString("ErrorSessionMsg");break;case"not_allowed":e=Strings.translateString("Your Shared Folder action failed. Please check your permissions before trying again");break;case"invalidxml":e=Strings.translateString("Invalid XML response.");break;case"invalidjson":e=Strings.translateString("Invalid JSON response.");break;case"offline":e=Strings.translateString("This request cannot be completed because you are currently offline.");break;case"1_to_1_restricted_for_free":LPVault.closeShareDialog(),e=LPVault.openRestrictedSharingDialog();break;case"policy":e=Strings.translateString("Sorry, this operation is not allowed by a policy.");break;case"shouldverifyemail":dialogs.verifyEmail.open({email:bg.get("g_username")}),e=null;break;case void 0:e=Strings.Vault.UNEXPECTED_ERROR}Topics.get(Topics.ERROR).publish(e),Topics.get(Topics.REQUEST_ERROR).publish(f),m&&(clearTimeout(m),delete r[f.requestID])}catch(e){LPPlatform.logException(e)}},(f=i)&&f.error?f.shouldverifyemail?void dialogs.verifyEmail.open({email:bg.get("g_username")}):function(e){d(e),f.error()}:d);i.params?S=[{params:i.params,requestArgs:i.requestArgs,success:R,error:h,status:i.status?(T=i,function(e){Topics.get(Topics.REQUEST_STATUS).publish(e,T)}):null}]:((S=LPTools.getOption(i,"parameters",[]))instanceof Array||(S=[S]),S.push(R),S.push(h)),Topics.get(Topics.REQUEST_START).publish(i);try{t.apply(window,S)}catch(e){LPPlatform.logException(e),h(Strings.Vault.UNEXPECTED_ERROR)}}),e.makeDataRequest=function(t,s){e.makeRequest(t,$.extend(!0,s,{dialogRequest:!1}))},e.makeUpdateRequest=function(t,s){e.makeRequest(t,$.extend(!0,s,{requestSuccessOptions:{incrementAccountsVersion:!0}}))},e.makeLockItemUpdateRequest=function(e,t){this.makeUpdateRequest(e,$.extend(t,{lockItems:!0}))}}(LPRequest);
//# sourceMappingURL=sourcemaps/request.js.map
