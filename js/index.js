var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var inputList = [];


if(localStorage.length != 0){
    
    inputList = JSON.parse(localStorage.getItem("siteDetails"))
    displaySite();
}
else{
    inputList = [];
}


function updatedSite(idx){
    
}


function deleteSite(indx){
    inputList.splice( indx,1);
    localStorage.setItem("siteDetails", JSON.stringify(inputList))
    displaySite();
}


function clearSite(){
    siteName.value = null;
    siteUrl.value= null;
}

function displaySite(){
    var content = ``;
    
    for(var i = 0; i < inputList.length;i++){
        content += `<tr class="d-flex text-center border-top fw-semibold">
        <td class="w-25 p-2 bg-white d-flex justify-content-center align-items-center">${inputList[i].siteNickName}</td>
        <td class="w-25 p-2 bg-white d-flex justify-content-center align-items-center "> <button class="btn btn-success "> <a target="_blank" href="${inputList[i].siteURL}" class="text-decoration-none text-white" > <i class="fa-solid fa-eye"></i> Visit</a> </button> </td>
        <td class="w-25 p-2 bg-white d-flex justify-content-center align-items-center"> <button onclick=" deleteSite(${i})" class="btn btn-danger">  <i class="fa-solid fa-trash"></i> Delete </button> </td>
        <td class="w-25 p-2 bg-white d-flex justify-content-center align-items-center"> <button onclick="updatedSite(${i})" class="btn btn-warning text-white">  <i class="fa-solid fa-pen-to-square"></i> Edit </button> </td>
    </tr>`
    }
    document.getElementById("contentShow").innerHTML = content;
}

function addSite(){

    var inputDetails = 
    {
        siteNickName: siteName.value,
        siteURL : siteUrl.value
    }
    inputList.push(inputDetails);
    localStorage.setItem("siteDetails", JSON.stringify(inputList))
    
    clearSite()
    displaySite()
}

