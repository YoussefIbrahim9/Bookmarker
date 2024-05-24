var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

var oldSiteName = document.getElementById("oldSiteName");
var oldSiteUrl = document.getElementById("oldSiteUrl");

var newSiteName = document.getElementById("newSiteName");
var newSiteUrl = document.getElementById("newSiteUrl");

var inputList = [];


if(localStorage.length != 0){
    
    inputList = JSON.parse(localStorage.getItem("siteDetails"))
    displaySite();
}
else{
    inputList = [];
}


function validation(element){
    var regex = {
        siteName:/^[A-Z]\w{2,}/,
        siteUrl: /^https:/ 
    }

    element.classList.remove("is-valid");
    element.classList.remove("is-invalid");

    if(regex[element.id].test(element.value)){
        element.classList.add("is-valid");
    }
    else{
         element.classList.add("is-invalid");
    }
}




function editSite(){
    var obj = {
        oldsitename: oldSiteName.value,
        oldsiturl: oldSiteUrl.value,
        newsitename: newSiteName.value,
        newsiteurl: newSiteUrl.value
    }
    
    for(var i = 0; i < inputList.length ;i++)
        {
            if(inputList[i].siteNickName == obj.oldsitename && inputList[i].siteURL == obj.oldsiturl ){

                inputList[i].siteNickName = obj.newsitename;
                inputList[i].siteURL = obj.newsiteurl;
                break
            }
            else if(inputList[i].siteNickName == obj.oldsitename){

                inputList[i].siteNickName = obj.newsitename;
                break
            }
            else if(inputList[i].siteURL == obj.oldsiturl){
                inputList[i].siteURL = obj.newsiteurl;
                break
            }
        }
    oldSiteName.value = null;
    oldSiteUrl.value = null;
    newSiteName.value = null;
    newSiteUrl.value = null;

    localStorage.setItem("siteDetails", JSON.stringify(inputList))
    displaySite();

}


function deleteSite(indx){
    inputList.splice( indx,1);
    localStorage.setItem("siteDetails", JSON.stringify(inputList))
    
    if(inputList.length==0){
        localStorage.clear();
    }
    displaySite();
}


function clearSite(){
    siteName.value = null;
    siteUrl.value= null;
    siteName.classList.remove("is-valid","is-invalid");
    siteUrl.classList.remove("is-valid","is-invalid");
}

function displaySite(){
    var content = ``;
    
    for(var i = 0; i < inputList.length;i++){
        content += `<tr class="d-flex text-center border-top fw-semibold">
        <td class="w-25 p-2 bg-white d-flex justify-content-center align-items-center">${inputList[i].siteNickName}</td>
        <td class="w-25 p-2 bg-white d-flex justify-content-center align-items-center "> <button class="btn btn-success "> <a target="_blank" href="${inputList[i].siteURL}" class="text-decoration-none text-white" > <i class="fa-solid fa-eye"></i> Visit</a> </button> </td>
        <td class="w-25 p-2 bg-white d-flex justify-content-center align-items-center"> <button onclick=" deleteSite(${i})" class="btn btn-danger">  <i class="fa-solid fa-trash"></i> Delete </button> </td>
        <td class="w-25 p-2 bg-white d-flex justify-content-center align-items-center"> <button class="btn btn-warning text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">  <i class="fa-solid fa-pen-to-square"></i> Edit </button> </td>
    </tr>` 
    }
    document.getElementById("contentShow").innerHTML = content;
}

function addSite(){

    if(siteName.classList.contains("is-valid") && siteUrl.classList.contains("is-valid")){
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
    else{
        window.alert("Please insert a valid input");
    }


}

