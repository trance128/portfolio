h6 = `Please pay remaining balance:<br>£`

function showoptions(pk){
  // hide all options not associated with this item
  var elems = document.querySelectorAll('.optionButton');
  for (var i = 0; i < elems.length; i++){
    elems[i].classList.add('secret');

    elems[i].classList.remove('checked');
  }

  // unselect all checkbox
  var ch = document.querySelectorAll('.ch');
  for (var i = 0; i < ch.length; i++){
    ch[i].checked = false;
  }

  // make visible the options associated with the item
  var my_elems = document.querySelectorAll('.it' + pk);
  for (var i=0; i < my_elems.length; i++){
    my_elems[i].classList.remove('secret');
  }

  // select the item from the secret hidden dropdown -- TO DO
  var selection = document.getElementById('seitem');
  selection.value = pk

  // adds the checked class to current menu item, and removes from all others
  var pr = document.querySelectorAll('.pr')
  var current = document.getElementById('btn' + pk)
  for ( var k = 0; k < pr.length; k++ ){
    if(pr[k] === current){
      pr[k].classList.add('checked');
    } else{
      pr[k].classList.remove('checked');
    }
  }
}

function showcash(){
  document.querySelector('#hide1').classList.add('secret2');
  document.querySelector('#hide4').classList.add('secret2');
  document.querySelector('#hide5').classList.add('secret2');
  document.querySelector('#hide6').classList.add('secret2');
  document.querySelector('#balance').innerHTML = h6;

  document.querySelector('#hide2').classList.remove('secret2');
}

function selectp(id){
  var selection = document.querySelector('#pm_method');
  selection.value = "cash";

  var total = document.querySelector('#total').textContent;
  var change = Number(id) - Number(total);

  // hides previous buttons, tells user how much change to give
  document.querySelector('#hide2').classList.add('secret2');
  document.querySelector('#hide3').classList.add('secret2');

  if (change < 0){
    // new section that asks for more money
    balance = 0 - change;
    document.querySelector('#hide6').classList.remove('secret2');
    document.querySelector('#balance').innerHTML += balance.toFixed(2);
    document.querySelector('#total').textContent = balance;
    return false;
  }

  // shows us how much change is owed
  document.querySelector('#hide4').classList.remove('secret2');
  document.getElementById("change").innerHTML += (change).toFixed(2);
}

// run if user gives a custom cash amount
function other(){
  document.querySelector('#hide2').classList.add('secret2');

  document.querySelector('#hide3').classList.remove('secret2');
}

// calculates change required if user gave custom cash amount
function change(){
  var paid = document.getElementById('idamount').value;
  if( paid == "" ){
    alert("Enter the amount of cash customer has given");
    document.querySelector('#idamount').focus;
    return false;
  }

  // form validation -- making sure the input is numeric
  if (isNaN(paid) || paid < 1){
    alert("You must enter a number");
    document.querySelector('#idamount').focus;
    return false;
  }

  var total = document.querySelector('#total').textContent;
  var change = Number(paid) - Number(total);

  // hides previous menu
  document.querySelector('#hide3').classList.add('secret2');

  if (change < 0){
    // new section that asks for more money
    balance = 0 - change;
    document.querySelector('#hide6').classList.remove('secret2');
    document.querySelector('#balance').innerHTML += balance.toFixed(2);
    document.querySelector('#total').textContent = balance.toFixed(2);
    return false;
  }

  // shows us how much change is needed
  document.querySelector('#hide4').classList.remove('secret2');
  document.getElementById("change").innerHTML += (change).toFixed(2);

  return true;
}


// when an option is selected
function select(id){
  // This was for testing, change colour to make sure it was selected successfully
  var elem = document.getElementById(id);
  elem.classList.toggle("active")

  // checks / unchecks the associated checkboxes
  var ch = document.getElementById('ch' + id);
  if (ch.checked == false){
    ch.checked = true;
  } else {
    ch.checked = false;
  }
}

function selectcard(){
  // selects card as payment method
  var selection = document.querySelector('#pm_method');
  selection.value = "card";

  // hides all unneeded buttons and menus
  document.querySelector('#hide1').classList.add('secret2');
  document.querySelector('#hide6').classList.add('secret2');
  document.querySelector('#balance').innerHTML = h6;

  // show further instructions
  document.querySelector('#hide5').classList.remove('secret2');
}

// select from the table
function selectt(id){
  var t = document.getElementById('td' + id);
  t.classList.toggle("t-light");

  var ch = document.getElementById('ch' + id);
  if (ch.checked == false){
    ch.checked = true;
  } else{
    ch.checked = false;
  }
}

function selectall(){
  var elems = document.getElementsByClassName('ch')
  for (var i =0; i < elems.length; i++){
    elems[i].checked = true;
  }
  document.editform.submit();
}

function sub(id){
  var k = document.getElementById(id);
  k.submit();
}

function process(id){
  document.querySelector('#pm_method').value = id;
  sub('pay_method');
}

function verify_sub(a, b){
  // transfers notes from pretty text to secret form text
  var nt = document.querySelector('#nt').value;
  document.querySelector('#nts').value = nt;

  // checks to see if no item was selected.  Assuming this is not the case, the form is submitted
  var v = document.getElementById(a).value;
  if (v == "empty"){
    return false;
  }
  else{
    document.getElementById(b).submit();
  }
}

function show(hd, sh){
  document.getElementById(hd).classList.add('secret2');
  document.getElementById(sh).classList.remove('secret2');
}

function dt(a){
  document.getElementById("dt_type").value = a;
  document.getElementById("date").submit();
}

function dt2(a){
  document.getElementById("dt_type").value = a;
}
