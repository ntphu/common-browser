
document.addEvent('domready', function(){

  // Fade in

  var optionsFx = new Fx.Morph('options', {duration: 250});
  if(chrome.i18n.getMessage("@@bidi_dir") == 'rtl' && chrome.i18n.getMessage("@@ui_locale") !== 'en'){
    var oo = {
      'margin-right': [150, 180],
      'opacity': [0, 1]
    };
  }else{
    var oo = {
      'margin-left': [150, 180],
      'opacity': [0, 1]
    };
  }
  optionsFx.start(oo);

  // URL Vars

  var vars = getUrlVars();

  if(vars['p'] == undefined){
    $('tab-options-content').setStyle('display', 'block');
    $('tab-options').addClass('tab-current');
  }else{
    $('tab-'+vars['p']+'-content').setStyle('display', 'block');
    $('tab-'+vars['p']).addClass('tab-current');
  }

  // Options tabs

  $$('.tab').addEvent('click', function(e){
    e.stop();
    $$('.tab-content').setStyle('display', 'none');
    $$('.tab').removeClass('tab-current');
    $(this.get('id')+'-content').setStyle('display', 'block');
    this.addClass('tab-current');
  });
  
  // Load translated text
  
  loadOptionsLang();
  
  // Load saved options
  
  loadOptions();
  
  // Save options
  
  $('save').addEvent('click', function(){
    saveOptions();
  });
  
  // Sliders
  
  loadSlider('rhitemsno', 0, 30, 'rh-itemsno');
  loadSlider('rctitemsno', 0, 30, 'rct-itemsno');
  loadSlider('mvitemsno', 0, 30, 'mv-itemsno');
  loadSlider('rbitemsno', 0, 30, 'rb-itemsno');
  loadSlider('rhwidth', 225, 800, 'rh-width');
  
  // Load translations iframe
  //$('translations-iframe').set('html', '<iframe onerror="$(\'translations-iframe\').set(\'text\', \'Currently Unavailable\');" src="http://www.indezinez.com/api/recenthistory/translations.php?l='+chrome.i18n.getMessage("@@ui_locale")+'" frameborder="0" scrolling="no"></iframe>');
  //$('translations-iframe').set('html', '<a target="_blank" href="http://www.indezinez.com/api/ext/recenthistory/?l='+chrome.i18n.getMessage("@@ui_locale")+'">Click here to view form</a> (opens external link in new window)');

  // Assign events

  $('flist-add-b').addEvent('click', function(){ addFilteredItem(); });
  $('flist-add-i').addEvent('keyup', function(event){ if(event.keyCode == 13){addFilteredItem();} });
  $('advance-options').addEvent('submit', function(){ return false; });

});
