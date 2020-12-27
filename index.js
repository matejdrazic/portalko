//triba učitat prvo index.html inače se neće ovo ispisat
window.onload = async function() {
  var table = document.getElementById("table");
  var counter = 0;
  var cell1;
  var cell2;
  var cell3;
  var cell4;
  var row;
  
  var naslov = document.getElementById("naslov");
  naslov.innerHTML = 'Portalko';

  try {
    const promise = await hello()
    promise.forEach(function (arrayItem) {
      row = table.insertRow(counter);
  
      cell1 = row.insertCell(0);
      cell2 = row.insertCell(1);
      cell3 = row.insertCell(2);
      cell4 = row.insertCell(3);
        
      cell1.innerHTML = arrayItem.title;
      cell2.innerHTML = arrayItem.guid;
      cell3.innerHTML = arrayItem.categories;
      cell1.innerHTML = arrayItem.content;
  
      counter++;
  });
  } catch (error) {
    console.log("Error: " + error)
  }
}