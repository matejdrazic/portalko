//triba učitat prvo index.html inače se neće ovo ispisat
window.onload = async function() {              //async - sluzi za obiljezavanje funkcija koje sadrze pozive s await
  let table = document.getElementById("table");
  let counter = 0;
  let cell1;
  let cell2;
  let cell3;
  let cell4;
  let row;
  
  try {                                           // u bloku try navodi se kod koji potencijalno dovodi do iznimke
    const promise = await hello()                 // await - koristi se za funkcije koje mogu trajati dugo
    //console.log(promise);
    promise.forEach(function (arrayItem) {        // ako ne dode do oznimke u bloku try  ne izvodi se kod u bloku catch
      row = table.insertRow(counter);
  
      cell1 = row.insertCell(0);
      cell2 = row.insertCell(1);
      cell3 = row.insertCell(2);
      cell4 = row.insertCell(3);
        
      cell1.innerHTML = arrayItem.title;
      cell2.innerHTML = arrayItem.link;
      cell3.innerHTML = arrayItem.category;
      cell4.innerHTML = arrayItem.content;
  
      counter++;
    });
  } catch (error) {                               //ako dode do iznimke u bloku try, preskače se ostatak bloka try i prelazi u blok catch
    console.log("Error: " + error)
  }
}