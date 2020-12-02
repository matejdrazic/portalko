
let val = hello();

console.log(val);
//triba učitat prvo index.html inače se neće ovo ispisat
/*window.onload = function(){
  var table = document.getElementById("table");
  var counter = 0;
  var cell1;
  var cell2;
  var cell3;
  var cell4;
  var row;
  
  var naslov = document.getElementById("naslov");
  naslov.innerHTML = 'Portalko';

  hello().forEach(function (arrayItem) {
    
    console.log(arrayItem);
    row = table.insertRow(counter);

    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);
    cell4 = row.insertCell(3);

    /*console.log(arrayItem.naslov);
    
    cell1.innerHTML = arrayItem.naslov;
    cell2.innerHTML = arrayItem.slika;
    cell3.innerHTML = arrayItem.link;

    counter++;
});
}*/