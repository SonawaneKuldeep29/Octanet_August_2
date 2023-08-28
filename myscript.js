
      

        
  var arr=[];
  var pro;
  var undo=[];
  var it;
  
  
  LoadData();
  taskprogress();




  function AddTask()
  {  
    
      var tnm = document.getElementById('tn').value;
      var lab = document.getElementById('lab').value;
      var dl = document.getElementById('dl').value;
      var pri = document.getElementById('pri').value;
      var des = document.getElementById('des').value;
       
      var x = document.getElementsByClassName('tasks');
     
      var i=x.length;
    

      var labv= `<select onclick="updateselect()"><option>Add Label</option><option>Content</option><option>Design</option><option>Research</option><option>Meeting</option></select>`;
       var table = document.getElementById('section2').innerHTML;
       var t = `<div id ='${i}' class='tasks'>
     <br> <span id='sp1'>#${tnm}</span> <br> <span id='sp2'>Deadline: ${dl}</span> <span id='sp3'>Priority: ${pri}</span> <span id='sp4'>Label: ${labv}</span><span id='sp5'>${lab}</span> <span id='st'><span id='dte'></span></span><br>
      <br><div>${des}</div><span id='bt'><button id = 'comp' onclick='completeTasks(${i})'>Completed</button><button id='del' onclick='deleteTasks(${i})'>Delete</button></span>
      </div>`;
    
      
     
      table = t + table;
      document.getElementById('section2').innerHTML=table;

      for(let j=0;j<x.length;j++)
      {
        x[j].querySelector('select').value=x[j].querySelector('#sp5').innerHTML;
      }
  

      while(undo.length>0)
      {
          let index= undo[undo.length-1];
          undo.pop();
      }
      document.getElementById('ud').disabled = true;
                   
       document.getElementById('tn').value = '';
       document.getElementById('lab').value = 'Add Label';
       document.getElementById('dl').value = '';
       document.getElementById('pri').value = 'High';
       document.getElementById('des').value = '';            

     

  
       taskprogress();
      calc(x);

    
  }  

  function updateselect()
  {
    var x = document.getElementsByClassName('tasks');
    for(let j=0;j<x.length;j++){
      x[j].querySelector('#sp5').innerHTML=x[j].querySelector('select').value;
    } 
    storeData();
  }
  
  function LoadData()
  {
     var k=localStorage.getItem('data');
     k=JSON.parse(k);
     var x = document.getElementsByClassName('tasks');
     var table = "";
  for(let j=0;j<k.length;j++)
    { var t = `<div id ='${j}' class='tasks'>`+ k[j][0]+ '</div>';

      table=table+t;
    }
     document.getElementById('section2').innerHTML=table;

    for(let j=k.length-1;j>=0;j--)
    {
      
      x[j].querySelector("select").value=x[j].querySelector("#sp5").innerHTML;
      x[j].querySelector("#bt").innerHTML= `<button id = 'comp' onclick='completeTasks(${j})'>Completed</button><button id='del' onclick='deleteTasks(${j})'>Delete</button>`;
      if(k[j][1]==1)
      { 
      x[j].style.backgroundColor='yellowgreen';
      x[j].querySelector('div').style.backgroundColor='azure';
      x[j].querySelector('#comp').disabled = true;
      }
      console.log(k[j][1])
    }
   
     calc(k);
  
  
  }

  function storeData()
  {
 
    var x = document.getElementsByClassName('tasks');
      
    var L_arr=[];
  for(let j=0;j<x.length;j++)
  { 
    if(x[j].style.backgroundColor=='yellowgreen' && x[j].hidden!=true )
    {
      L_arr.push([x[j].innerHTML,1]);
    } 
   else if(x[j].hidden!=true)
    {
      L_arr.push([x[j].innerHTML,0]);
    }
  }
    console.log(L_arr);
    var key=JSON.stringify(L_arr);
    localStorage.setItem('data',key);
     
  }

  function calc(e)
  {  
    var x = document.getElementsByClassName('tasks');

      clearInterval(it);
      it = setInterval(()=> {

      for(let j=0;j<e.length;j++)
      {var y=x[j].querySelector('#sp2').innerHTML;
         console.log(y);
      var dl = new Date(y);
      var CurrTime = new Date();
      var diffD = Math.floor(dl-CurrTime);
      var diffD = Math.ceil(diffD / (1000 * 60 * 60 * 24));
   
      console.log(diffD);
      try{
      if(diffD>1)
      {
      document.getElementById(j).querySelector('#dte').innerHTML='Time Remaining: '+diffD +" Day(s)";
     }
     else if(diffD==1)
     {
      let H = CurrTime.getHours();
      let M = CurrTime.getMinutes();
      let S = CurrTime.getSeconds(); 

      document.getElementById(j).querySelector('#dte').innerHTML= 'Time Remaining: '+ (23-H)+':'+(59-M)+':'+(59-S) ;            
     }
     else if(diffD==0)
     {
      let H = CurrTime.getHours();
      let M = CurrTime.getMinutes();
      let S = CurrTime.getSeconds(); 

      document.getElementById(j).querySelector('#dte').innerHTML= 'Delayed By: - ' + H+':'+M+':'+S ;  

      document.getElementById(j).querySelector('#sp1').style.backgroundColor='rgb(244, 100, 100)';
     }
     else{
      document.getElementById(j).querySelector('#dte').innerHTML= 'Delayed By: '+diffD +" Day(s)";
      
      document.getElementById(j).querySelector('#sp1').style.backgroundColor='rgb(202, 44, 44)'; 
     }
       } catch(error)
       {
          console.log(error)
       }
     }
  },1000);
  }
  function completeTasks(e)
  { 
    document.getElementById('ud').disabled = false;
    undo.push(document.getElementById('section2').innerHTML);
    var x=document.getElementById(e);
      x.style.backgroundColor='yellowgreen';
      x.querySelector('div').style.backgroundColor='azure';
      x.querySelector('#st').innerHTML=x.querySelector('#dte').innerHTML;


      taskprogress();

     
  }

  function deleteTasks(e)
  {   
      document.getElementById('ud').disabled = false;
    
     
      undo.push(document.getElementById('section2').innerHTML);
      document.getElementById(e).hidden=true;
      taskprogress();
  
    

  }

   var pro;

  function taskprogress()
  {
    
      var s=document.getElementById('span1');
      var x = document.getElementsByClassName('tasks');
      let y=0,z=0;
    for(let j=0;j<x.length;j++)
    { 
      if(x[j].style.backgroundColor=='yellowgreen' && x[j].hidden!=true )
      {
          y++;
      }
     if(x[j].hidden!=true)
      {
        z++;
      }
    }
   var t= 100 * (y/z);
  var k=document.getElementById('meter').value;
   if(k>t)
   {
      clearInterval(pro);
       pro= setInterval(()=>{
          if(k<=t)
          {
              clearInterval(pro);
          }
          document.getElementById('meter').value=k;
          s.innerHTML=k+'% Completed';
          k--;
      },10)
      
   }
   else if(k<=t)
   {
      clearInterval(pro);
       pro= setInterval(()=>{
          if(k>=t)
          {
              clearInterval(pro);
          }
          document.getElementById('meter').value=k;
          s.innerHTML=k+'% Completed';
          k++;
      },10 )
      
   }
  
    storeData();
    LoadData();
  }

  function callundo()
  {
     document.getElementById('section2').innerHTML=undo[undo.length-1];
     var x=document.getElementsByClassName('tasks');
     
      for(let j=0;j<x.length;j++)
      {
        x[j].querySelector('select').value=x[j].querySelector('#sp5').innerHTML;
      }
      undo.pop();
  
      if(undo.length==0)
      {
          document.getElementById('ud').disabled = true;
      }
  
      taskprogress();
       
    }
        
       
       