

console.log("hi");


function changing(data){
  console.log("is the ajax not running?");
  var theSelections= data;
  //sort by score
  function compare(a,b)
 {
         if (a.score > b.score) {
               return -1;
         } else   if (a.score < b.score)  {
               return 1;
         } else {
               return 0;
          }
  }

  theSelections.sort(compare);


  console.log(theSelections);



  var table = document.createElement('table');
  table.setAttribute("id", "table");

  for (var i = 0; i < 10 /*theSelections.length*/; i++){
      //console.log(theSelections.score);

      var trlong = document.createElement('tr');
      trlong.setAttribute("id", "trlong");

      var tdRank = document.createElement('td');
      var tdModel = document.createElement('td');

      var rank = document.createTextNode(i+1);

      var model = document.createTextNode(theSelections[i].model);
      //var text3 = document.createTextNode('Text3');

      tdRank.appendChild(rank);
      tdRank.setAttribute("id", "tdRank");
      tdModel.appendChild(model);
      tdModel.setAttribute("id", "tdModel");

      trlong.appendChild(tdRank);
      trlong.appendChild(tdModel);


      table.appendChild(trlong);


      var tr = document.createElement('tr');
      tr.setAttribute("id", "tr");


      var td1 = document.createElement('td');
      var td2 = document.createElement('td');
      var td3 = document.createElement('td');

      var pic = document.createElement("IMG");

      var imgName= theSelections[i].imgName //"nexus5x.jpeg";
      pic.setAttribute("src", "./images/"+imgName);
      pic.setAttribute("id", "pic");
      pic.width= "200"
      //pic.setAttribute("width", "30px");

//<a href="http://maps.google.com" target="_blank">.dkjlsdjsdk..</a>

      var review = document.createElement("form");
      review.setAttribute("action", theSelections[i].review);
      review.setAttribute("target", "_blank");

      var theButton= document.createElement("input");
      theButton.setAttribute("type","submit");
      theButton.setAttribute("value","See in Deph Review");
      theButton.setAttribute("class","ghost-button");
      theButton.setAttribute("target","_blank");

      review.appendChild(theButton);

      var link = document.createElement("form");
      link.setAttribute("action", theSelections[i].link);
      link.setAttribute("target", "_blank");

      var theButton= document.createElement("input");
      theButton.setAttribute("type","submit");
      theButton.setAttribute("value","Find on Amazon");
      theButton.setAttribute("class","ghost-button");
      theButton.setAttribute("target","_blank");


      link.appendChild(theButton);


      td1.appendChild(pic);
      td2.appendChild(review);
      td2.setAttribute("width","22%");
      td2.appendChild(link);
      td2.setAttribute("width","18%");

      tr.appendChild(td1);
      tr.appendChild(td2);
      //tr.appendChild(td3);

      table.appendChild(tr);
  }
  document.getElementById("theTitle").appendChild(table);
  //document.body.appendChild(table);
}

$( document ).ready(function() {
  $.ajax({
    method: 'post',
    url: '/selections',
    //data: 'current_check_string='+$('#check_in_sting').val(),
    success: changing
  });
});
