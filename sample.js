var list = document.querySelector('#list'),
        form = document.querySelector('form'),  
        task3 = document.querySelector("#sub"),
        check = document.querySelector('.check'),
        desc1 = document.getElementById('desc'),
        tags1 = document.getElementById('tags'),
        mtags = document.getElementById('mtags');
        // elem = document.getElementById('li')
        // closelist = document.getElementsByClassName('close');
    var a=[];
    // var desc = document.getElementById('desc').value;

    var itemobject = {
        // "id": "",
        "title": item,
        // "desc": desc,
        "tag": []     
    };
    var localobject = JSON.parse(localStorage.getItem("items"));
    task3.addEventListener("click", function(e){
        
      var item = document.getElementById('item').value,
      tags = document.getElementsByClassName('tag-container');
      let randomId = Math.floor((Math.random() * 100) + 1);
      itemobject.id = randomId;
      itemobject.title = item;
    let newobject = JSON.parse(localStorage.getItem("items"));
    //let newobject = localStorage.getItem("items");
    //   console.log("new object"+newobject);
    //   e.preventDefault();
      list.innerHTML += `<li class = "displayd">
     <div class ="paragraph" contenteditable = "true"> <p>${item} </p></div> 
     <div class="inputs"><input type="text"  name="item" class = "desctxt" id="desc" placeholder="Add Description" /> 
     <main>  <div class = "tag-container" contenteditable ="true"> <input class ="taginput" />
     <input type ="hidden" value = ${randomId} /> </div> 
     <input type="text"  name="item"  id="tags" placeholder="Add tags"/>   </main></div></li> 
     <i id="paper" class="fa-solid fa-paperclip"></i>
     <i id="comment" class="fa-solid fa-comment"> 
     <button class ="close" onclick ="deltask()">X</button>`

      console.log(itemobject)
      
      if(newobject !== null){
        newobject.push(itemobject);
        localStorage.setItem("items",JSON.stringify(newobject)); 
          
      }else
      {
        a.push(itemobject);
        console.log(a);
        localStorage.setItem("items",JSON.stringify(a)); 
            
      }
     
  })
  getValues();  
    function getValues(){
        var storedValues = localStorage.getItem("items");
        var arItems = JSON.parse(storedValues);     
          arItems.forEach((a) => {
              var tagsElement = "";
              console.log(a.tag);
              a.tag.forEach((t) => {
                  tagsElement += "<div class='tag'><span>" + t + "</span><i class = material-icons>X</i></div>"
              })
            console.log(arItems.indexOf(a));
            list.innerHTML += `<li class = "displayd">
            <div class ="paragraph" contenteditable = "true"> <p>${a.title} </p> </div>
            <div class ="inputs"><input type="text"  name="item"  class = "desctxt" id="desc" placeholder="Add Description" /> 
            <main><div class = "tag-container" contenteditable ="true">${tagsElement} <input class="taginput"/> 
            <input type ="hidden" value = ${arItems.indexOf(a)} /></div> 
            <input type="text"  name="item" id="tags" placeholder="Add tags" /> </main> </div></li>
            <i id="paper" class="fa-solid fa-paperclip"></i>
            <i id="comment" class="fa-solid fa-comment">
            <button class ="close" onclick ="deltask()">X</button>`
          });
         

    }

    var par = document.getElementsByClassName("paragraph");
    Array.prototype.forEach.call(par, function(item,index){
      item.addEventListener("dblclick",function(e){
      
        displayInput(this);
      });
    });
    function displayInput(elem){
      elem.nextElementSibling.style.display = "block";

    }




    const tagContainer = document.querySelector('.tag-container');
    const input = document.querySelectorAll('.taginput');
    
    let tags = [];
    
    function createTag(label) {
      const div = document.createElement('div');
      div.setAttribute('class', 'tag');
      const span = document.createElement('span');
      span.innerHTML = label;
      const closeIcon = document.createElement('i');
      closeIcon.innerHTML = 'X';
      closeIcon.setAttribute('class', 'material-icons');
      closeIcon.setAttribute('data-item', label);
      div.appendChild(span);
      div.appendChild(closeIcon);
      return div;
    }   
    function clearTags() {
      document.querySelectorAll('.tag').forEach(tag =>{
        tag.parentElement.removeChild(tag);
      });
    }   
    function addTags() {
      clearTags();
      tags.slice().reverse().forEach(tag => {
        tagContainer.prepend(createTag(tag));
      });
    }
    console.log(input);
    input.forEach (element =>{
        element.addEventListener('keyup', (e) => {
            let id = element.nextElementSibling.value;
            console.log(localobject[id].tag);
            if (e.key === 'Enter') {
              e.target.value.split(',').forEach(tagname => {
                input.appendChild(element);
                tags.push(tagname);  
                localobject[id].tag.push(tagname);
                console.log(localobject);
                localStorage.setItem("items",JSON.stringify(localobject)); 
              });
              addTags();            
              element.value = '';
            }
        })
    });
    document.addEventListener('click', (e) => {
      console.log(e.target.tagName);
      if (e.target.tagName === 'I') {
        const tagLabel = e.target.getAttribute('data-item');
        const index = tags.indexOf(tagLabel);
        tags = [...tags.slice(0, index), ...tags.slice(index+1)];
        addTags();  
      }
    })   
    input.focus();
    
    

    






    
    