LPServer.sharing=LPServer.sharing||{},LPServer.sharing.individual=function(){var e=function(){var e={noemailspecified:function(e,r){r.error(LPServer.ext.translate("Please enter at least one email and try again."))},usernameisnotvalidemail:function(e,r){var a=LPServer.getRecordsFromResponse(e,"email",LPServer.getAttrInt(e,"numinvalid",0));r.error(LPServer.ext.translate("The following emails are invalid: %1",a.join(", ")))},toomanyemails:function(e,r){var a=LPServer.getAttrInt(e,"numexcess");"1"===a?r.error(LPServer.ext.translate("You are trying to share with too many people.  Please remove at least %1 email and try again.",a)):r.error(LPServer.ext.translate("You are trying to share with too many people.  Please remove at least %1 emails and try again.",a))},cantsharewithself:function(e,r){r.error(LPServer.ext.translate("You can not share with yourself."))}},r=function(e,r,a){this.email=e,this.pubkey=r,this.encpass=a},a=function(e,r){this.aid=e.getAttribute("aid"),this.username=LPServer.ext.decrypt(e.getAttribute("username"),r),this.password=LPServer.ext.decrypt(e.getAttribute("password"),r),this.name=LPServer.ext.decrypt(e.getAttribute("name"),r),this.grouping=LPServer.ext.decrypt(e.getAttribute("grouping"),r),this.extra=LPServer.ext.decrypt(e.getAttribute("extra"),r),this.attachkey=LPServer.ext.decrypt(e.getAttribute("attachkey"),r),this.afids=this.parseFields(e.getAttribute("afids"),r),this.otherafids=this.parseFields(e.getAttribute("otherafids"),r),this.accts_notes=this.parseFields(e.getAttribute("accts_notes"),r),this.accts_usernames=this.parseFields(e.getAttribute("accts_usernames"),r),this.accts_passwords=this.parseFields(e.getAttribute("accts_passwords"),r),this.template=e.getAttribute("template")};a.prototype.parseFields=function(e,r){var a=[];if(e){e=e.split("^");for(var t=0,s=e.length;t<s;++t){var n=e[t];""!==n&&(n=e[t].split("&"),a.push({name:n[0],value:LPServer.ext.decrypt(n[1],r)}))}}return a},a.prototype.encrypt=function(){var e=function(e,r){return e?LPServer.ext.encryptCBC(e,r):""},r=function(r,a){for(var t=JSON.parse(JSON.stringify(r)),s=0,n=t.length;s<n;++s)t[s].value=e(t[s].value,a);return t};return function(a){return{username:e(this.username,a),password:e(this.password,a),name:e(this.name,a),grouping:e(this.grouping,a),extra:e(this.extra,a),attachkey:e(this.attachkey,a),afids:r(this.afids,a),otherafids:r(this.otherafids,a),accts_notes:r(this.accts_notes,a),accts_usernames:r(this.accts_usernames,a),accts_passwords:r(this.accts_passwords,a)}}}();var t=function(e,r,a,t){for(var s=0,n=a.length;s<n;++s)e[r+t+s+"name"]=a[s].name,e[r+t+s+"value"]=a[s].value;e[r+"num"+t]=a.length},s=function(e,r){var a=LPServer.getAttrInt(e,"numemails",0);1===a?r.success(LPServer.ext.translate("Share sent to %1.",LPServer.getAttr(e,"email0",""))):r.success(LPServer.ext.translate("Share sent to %1 recipients.",a))},n=function(e,r,a){for(var n={cmd:"share",sharemessage:"",giveshare:a.params.giveshare?1:0,numemails:e.length,numaids:r.length,fromrole:0,sharesyncpush:0,shareautopull:0,reportname:[]},i=0,c=e.length;i<c;++i){var o=e[i],l=LPServer.ext.createRandomHexString(64),u=LPServer.ext.hex2bin(l),m=new LPServer.ext.RSAKey;LPServer.ext.parsePublicKey(m,o.pubkey);var p=m.encrypt(u),h="email"+i;n[h]=o.email,n["sharekeyenchex"+i]=p,n["sharekeyenchexsig"+i]="",o.encpass&&(n["encpass"+i]=o.encpass);for(var v=0;v<r.length;++v){var d=r[v],g=d.encrypt(u);1==a.params.logname&&n.reportname.push({aid:d.aid,name:d.name});var S=h+"aid"+v;n[S]=d.aid,n[S+"username"]=g.username,n[S+"password"]=g.password,n[S+"name"]=g.name,n[S+"grouping"]=g.grouping,n[S+"extra"]=g.extra,n[S+"attachkey"]=g.attachkey,n[S+"template"]=d.template,t(n,S,g.afids,"afid"),t(n,S,g.otherafids,"otherafid"),t(n,S,g.accts_notes,"accts_notes"),t(n,S,g.accts_usernames,"accts_usernames"),t(n,S,g.accts_passwords,"accts_passwords")}}LPServer.xmlRequest({url:"showshare.php",data:n,callbacks:{shareok:s},userSupplied:a})},i=function(e,r){for(var t=[],s=LPServer.getNodes(e,"encdata"),n=0,i=s.length;n<i;++n)t.push(new a(s[n],r));return t},c=function(e,r){for(var a=[],t=0,s=e.length;t<s;++t){var n=e[t];n&&a.push({email:n,reason:r})}return a},o=function(e,a){var t=LPServer.getAttrInt(e,"numsharesok",0);if(t>0){for(var s=[],o=0;o<t;++o){var l=LPServer.getAttr(e,"emailok"+o,""),u=LPServer.getAttr(e,"emailokpubkeyhex"+o,""),m=LPServer.getAttr(e,"emailencp"+o,"");s.push(new r(l,u,m))}n(s,i(e,a.params.key),a)}var p=LPServer.getAttrInt(e,"numsharesdne",0);p>0&&a.callbacks&&a.callbacks.invite&&a.callbacks.invite({emails:LPServer.getRecordsFromResponse(e,"emaildne",p)});var h=LPServer.getAttr(e,"sharingwithself",""),v=LPServer.getAttrInt(e,"numsharesinv",0),d=LPServer.getAttrInt(e,"numsharesuns",0),g=LPServer.getAttrInt(e,"numsharesspa",0),S=LPServer.getAttrInt(e,"numsharesres",0);if((h||v>0||d>0||g>0||S>0)&&a.callbacks&&a.callbacks.problems){var f=c([h],LPServer.ext.translate("You can not share with yourself."));f=f.concat(c(LPServer.getRecordsFromResponse(e,"emailinv",v),LPServer.ext.translate("Invalid email address."))),f=f.concat(c(LPServer.getRecordsFromResponse(e,"emailuns",d),LPServer.ext.translate("The user must login to LastPass at least once to permit sharing."))),f=f.concat(c(LPServer.getRecordsFromResponse(e,"emailspa",g),LPServer.ext.translate("The user does not want to receive emails from LastPass."))),f=f.concat(c(LPServer.getRecordsFromResponse(e,"emailres",S),LPServer.ext.translate("Sharing is restricted by a LastPass Enterprise policy."))),a.callbacks.problems(f)}0===t&&a.error()};return function(r){r.callbacks=LPServer.extend(r.callbacks,e);for(var a={cmd:"getclientdata",shareeusername:r.params.emails,numaids:r.params.aids.length},t=0,s=r.params.aids.length;t<s;++t)a["aid"+t]=r.params.aids[t];LPServer.xmlRequest({url:"showshare.php",data:a,callbacks:{getclientdataack:o},userSupplied:r})}}(),r=function(){var e=function(e,r){r.success(LPServer.ext.translate("Share revoked from %1",r.params.email))};return function(r){LPServer.xmlRequest({url:"showshare.php",data:{cmd:"unshare",aid:r.params.id,username:r.params.email},callbacks:{unshareok:e},userSupplied:r})}}(),a=function(){var e=function(e,r){r.success(LPServer.ext.translate("Share accepted."))},r=function(e,r,a){var t=LPServer.ext.decrypt(e,r);return t?LPServer.ext.encryptCBC(t,a):""},a=function(a){var t=a.params.key,s=a.params.pendingShareKey,n=a.params.pendingShare,i={cmd:"acceptshare",msgtosharer:"",aid:n.id,newgroup:LPServer.ext.encryptCBC(a.params.group,t),name:r(n.sharename,s,t),grouping:r(n.sharegroup,s,t),username:r(n.username,s,t),password:r(n.password,s,t),extra:r(n.extra,s,t),attachkey:r(n.attachkey,s,t)};i.newname=a.params.name?LPServer.ext.encryptCBC(a.params.name,t):i.name;var c=n.save_all?"otherafid":"afid";for(var o in n.shareafids){var l=n.shareafids[o];l&&(l=r(l,s,t)),i[c+o]=l}LPServer.xmlRequest({url:"showacceptshare.php",data:i,callbacks:{acceptshareok:e},userSupplied:a})};return function(e){e.params.pendingShare?a(e):e.params.id&&i(LPServer.extend({},e,{params:{id:e.params.id},success:function(r){e.params.pendingShare=r.pendingShare;var t=new LPServer.ext.RSAKey;LPServer.ext.parsePrivateKey(t,LPServer.ext.extractPrivateKey(r.privateKey,e.params.key)),e.params.pendingShareKey=t.decrypt(e.params.pendingShare.sharekeyenchex),a(e)}}))}}(),t=function(){var e=function(e,r){r.success(LPServer.ext.translate("Share rejected."))};return function(r){LPServer.xmlRequest({url:"showacceptshare.php",data:{cmd:"rejectshare",aid:r.params.id},callbacks:{rejectshareok:e},userSupplied:r})}}(),s=function(){var e=function(e,r){if(r.callbacks&&r.callbacks.problems){var a=[],t=LPServer.getAttrInt(e,"numalready",0);if(t>0){var s=LPServer.getRecordsFromResponse(e,"emailalready",t).join(", ");a.push(LPServer.ext.translate("You have already invited the following friends: %1. Please send them a reminder using your personal email as the email invitation sent by LastPass might not have reached them.",s))}var n=LPServer.getAttrInt(e,"numspam",0);if(n>0){var i=LPServer.getRecordsFromResponse(e,"emailspam",n).join(", ");a.push(LPServer.ext.translate("The following friends have marked your invitations as spam: %1.",i))}a.length>0&&r.callbacks.problems(a)}var c=LPServer.getAttrInt(e,"numsent",0);1===c?r.success(LPServer.ext.translate("%1 was invited. We will send you a notification email when they join LastPass so you can retry sharing your data with them.",LPServer.getAttr(e,"emailsent0",""))):c>1?r.success(LPServer.ext.translate("%1 friends were invited. We will send you a notification email when any of them join LastPass so you can retry sharing your data with them.",c)):r.error()};return function(r){for(var a={cmd:"invite",numemails:r.params.emails.length},t=0,s=r.params.emails.length;t<s;++t)a["email"+t]=r.params.emails[t];LPServer.xmlRequest({url:"showshare.php",data:a,callbacks:{inviteack:e},userSupplied:r})}}(),n=function(e){LPServer.jsonRequest({url:"getSentShareInfo.php",data:e.params&&e.params.id?{aid:e.params.id}:null,userSupplied:e})},i=function(e){var r=e.params&&e.params.id?{aid:e.params.id}:{};e.params.url&&c(e.params.url)&&(r.from="acceptshare",r.confirm_token=o(e.params.url)),LPServer.jsonRequest({url:"getReceivedShareInfo.php",data:r,userSupplied:e})},c=function(e){return!!e.match(/acceptshare=/gi)},o=function(e){var r=e.match(/confirm_token=[^&]*/gi);return r?r[0].split("=")[1]:""};return{shareItems:e,unshareItem:r,acceptShare:a,rejectShare:t,inviteFriends:s,getSentShareData:n,getReceivedShareData:i}}();