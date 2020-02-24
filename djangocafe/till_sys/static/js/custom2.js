function hide_op(){
  // hides all previously shown options
  var prior = document.querySelectorAll('.ob');
  for (var i = 0; i < prior.length; i++){
    prior[i].classList.add('secret');
    prior[i].classList.remove('active');
  }

  var rem = document.querySelectorAll('.f');
  for (var i = 0; i < rem.length; i++){
    rem[i].classList.add('secret');
  }
}

function uncheck(){
  // unselect all checkbox
  var ch = document.querySelectorAll('.ch');
  for (var i = 0; i < ch.length; i++){
    ch[i].checked = false;
  }
}

function no_active(){
  var prior_mains = document.querySelectorAll('.mn')
  for (var i = 0; i < prior_mains.length; i++){
    prior_mains[i].classList.remove('active');
  }
}

function show_items(id){
  // setting any previously active sidenav buttons to inactive
  var selection = document.querySelectorAll('.sn')
  for ( var i = 0; i < selection.length; i++ ){
    selection[i].classList.remove('active');
  }

  // setting the pressed button as active
  document.getElementById('tp_id_' + id).classList.add('active');

  var hide = document.querySelectorAll('.main_btn');
  for ( var i = 0; i < hide.length; i++ ){
    hide[i].classList.add('secret2');
  }

  // showing the matching buttons
  document.getElementById('m_' + id).classList.remove('secret2');
  uncheck();
  hide_op();
  no_active();
}

function show_opt(id){
  hide_op();
  uncheck();
  no_active();

  // shows only related option buttons
  var show = document.querySelectorAll('.it' + id);
  for (var i = 0; i < show.length; i++){
    show[i].classList.remove('secret');
  }

  var rem = document.querySelectorAll('.f');
  for (var i = 0; i < rem.length; i++){
    rem[i].classList.remove('secret');
  }

  // adds the active class to the button that was just pressed
  document.getElementById('m2_' + id).classList.add('active');

  // select the item from the secret hidden dropdown
  var selection = document.getElementById('seitem');
  selection.value = id

}

function select2(name){
  // This was for testing, change colour to make sure it was selected successfully
  var elem = document.getElementById(name);
  elem.classList.toggle("active")

  // checks / unchecks the associated checkboxes
  var ch = document.getElementById('ch' + name);
  if (ch.checked == false){
    ch.checked = true;
  } else {
    ch.checked = false;
  }
}

function show_types(id, id2){
  // hides options, unchecks options
  hide_op();
  uncheck();

  // hides the left-side nav buttons
  var tpCtrl = document.querySelectorAll('.tp-ctrl');
  for ( var i = 0; i < tpCtrl.length; i++ ){
    tpCtrl[i].classList.add('secret2');
  }

  // removes side nav active
  var sd_nav = document.querySelectorAll('.sn');
  for (var i = 0; i < sd_nav.length; i++ ){
    sd_nav[i].classList.remove('active');
  }

  // hides main menu Items
  var hide = document.querySelectorAll('.main_btn');
  for ( var i = 0; i < hide.length; i++ ){
    hide[i].classList.add('secret2');
  }

  // shows only the related left-hand nav buttons
  var show = document.getElementById(id);
  show.classList.remove('secret2');

  // removes active from non-selected buttons
  var mt = document.querySelectorAll('.menu-type');
  for ( var i = 0; i < mt.length; i++ ){
    mt[i].classList.remove('active');
  }

  // adds active to the selected button
  var t = document.getElementById(id2);
  t.classList.add('active');
}
