var nam = document.getElementById('input');
var url = document.getElementById('input2');
var alert1 = document.getElementById('alert1');
var alert2 = document.getElementById('alert2');
var btn = document.getElementById('bt');
var arr;




// local storage;
(function () {
    if (localStorage.getItem('book') == null) {
        arr = [];        

        document.getElementById('eslam').innerHTML+=        `
        <label class="me-4" for="search" style="display: none;"><i  class="  fa-solid fa-magnifying-glass-plus"></i> </label>
        <input type="text" style="display: none;" id="search" class="form-control w-75 bg-light border-3 border-info" onkeyup="search(this.value)"  placeholder="Search">
        `;
    }
    else {
        arr = JSON.parse(localStorage.getItem('book'));
        disblay(arr)
        document.getElementById('eslam').innerHTML+=  
        `
        <label class="me-4" for="search"><i  class="  fa-solid fa-magnifying-glass-plus"></i> </label>
        <input type="text" style=" id="search" class="form-control w-75 bg-light border-3 border-info" onkeyup="search(this.value)"  placeholder="Search">
        `;
    }
})()
 



// add
function add() {
    if (nameRegex(nam.value, alert1)  & nameRegex(url.value,alert2 ))
    
    {

        
    var bookMark = {
        siteName: nam.value ,
        siteUrl: url.value

    }
    arr.push(bookMark)
    localStorage.setItem('book', JSON.stringify(arr))
    disblay(arr)
    clear()
    
    
}
}


// clear
function clear() {
    nam.value = ''
    url.value = ''
}



// delete
function delet(i) {

    arr.splice(i, 1)
    disblay(arr)
    localStorage.setItem('book', JSON.stringify(arr))
   
}


// update
var global;
function update(i) {
    global = i;
    document.getElementById('input').value = arr[i].siteName
    document.getElementById('input2').value = arr[i].siteUrl
    btn.innerHTML = 'Update'

}

function change() {
    arr[global].siteName = document.getElementById('input').value;
    arr[global].siteUrl = document.getElementById('input2').value;
    btn.innerHTML = 'Submit'
    localStorage.setItem('book', JSON.stringify(arr))

    disblay(arr)
}





// disblay
function disblay(arr) {
    var box = ``;
    for (let index = 0; index < arr.length; index++) {
        box += `   
       <div class="re"> 
       <div  class="pt-3 d-flex flex-row bg-gradient justify-content-between w-75 pb-5">

       <p class="fw-bold fs-4 ms-3 heighLight" >${arr[index].siteName}</p> 
    
    
   <div> <a href="${arr[index].siteUrl}" target="_blank" class="btn btn-success me-3">Visit</a>
    
    
   <button type="button" onclick="delet(${index})" class="btn btn-danger me-3">Delete</button>
   <button type="button" onclick="update(${index})" class="btn btn-info">Update</button>
   </div> </div> </div> 
    `


    }
    document.getElementById('result').innerHTML = box;
}
// click
btn.onclick = function () {
    if (btn.innerHTML == 'Update') {
        change()
        clear()

    } else {
        add()
    }
}








// search
function search(term) {
    var searchArr = [];
    for (let index = 0; index < arr.length; index++) {
        if (arr[index].siteName.toLowerCase().includes(term.toLowerCase()) == true) {

            searchArr.push(arr[index])
            disblay(searchArr)

        }

    }

    var heighLight = document.querySelectorAll('.heighLight')
    for (let index = 0; index < heighLight.length; index++) {
        heighLight[index].innerHTML=        heighLight[index].innerHTML.toLowerCase()
        heighLight[index].innerHTML = heighLight[index].innerHTML.replace(term.toLowerCase(),`<span>${term}</span>`)

    }
}      




// regex
function nameRegex(vocab,alert) 
{
    var regex=/[a-z]/;
    if(regex.test(vocab)==true){
        alert.innerHTML='';
        return true;

    }
    else{
        alert.innerHTML='this field is required'

        return false;
    }
}