//i think it starts getting a bit messy here. sorry. 
//this is why you plan first

//code for the main generator
//should be loaded after songdat.js and main.js in that order

//name of the localstorage i use so i dont have to keep typing it out and risk typoes
//uses local storage as like. a memory for what the user filtered for producers
//so they dont have to keep redoing filters
localstoragekey = "vcgen_producers"

//list of characters and sets chrimg
charlist = ['adot', 'aish', 'arna', 'chmo', 'eite', 'hash', 'hiam', 'hiao', 'hime', 'hito', 'hohi', 'ibsa', 'izse', 'jusa', 'kaha', 'kash', 'keha', 'koog', 'koou', 'kuku', 'lets', 'maay', 'mais', 'mami', 'mayu', 'mika', 'mita', 'mite', 'nani', 'nara', 'nasa', 'nish', 'resa', 'riam', 'risa', 'shit', 'shse', 'soha', 'soka', 'suak', 'taka', 'tena', 'tohi', 'toma', 'tsao', 'tssu', 'wahi', 'yuao', 'yufu']
function setChar(){
    y = "chrimg/"+returnRand(charlist)+".png";
    document.getElementById("chr-img").src = y;
}


//forms a list based on array of producers passed
function setSong(pds){
    slist = newSonglist(pds);

    songkey = returnRand(Object.keys(slist));
    song = slist[songkey];

    //sets the title, producer and singers
    document.getElementById("sng-title").innerHTML = song[0];
    document.getElementById("sng-pd").innerHTML = song[1];
    document.getElementById("sng-vc").innerHTML = song[2];

    //sets the embed
    document.getElementById("sng-player").src = "https://youtube.com/embed/"+song[3];
}

//does both of the above
//getOK() is coded in later below
function setNew(){
    setChar();
    setSong(getOK());
}

// filtering functions

//OK = filtered list of producers
//checks to see if theres an existing list in webstorage
function getOK(){
    x = localStorage.getItem(localstoragekey);
    //if yes, formats the string into array and returns
    if (x != null){
        return x.split(",");
    }
    //if no, sets an array of all the producers and returns allpds
    else{
        localStorage.setItem(localstoragekey, (getAllPDs()));
        return getAllPDs();
    }
}

//debugging function to clear localstorage filters
function clearOK(){
    return localStorage.removeItem(localstoragekey);
}


//the box that contains the filters is hardcoded but the checkboxes arent
//this code generates the checkboxes
function addFilters(){
    allpds = getAllPDs();
    okpds = getOK();
    checkboxParent = document.getElementById("pdcheckboxes")

    //working with appendchild is blacking out for an hour
    //and coming back to dynamically generated html
    for (pdid in allpds){
        pd = allpds[pdid];
        
        cbh = document.createElement('div');
        cbh.className = "checkboxhome";

        cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.id = pd+"CB";
        cb.name = 'okPDs';
        cb.value = pd;
        cb.addEventListener("change", checkForAll)
        
        cblabel = document.createElement('label');
        cblabel.htmlFor =  pd;
        cblabel.appendChild(document.createTextNode(pd));

        //does memory thing so user's last used settings are there
        if(okpds.includes(pd)){
            cb.checked = true;
        }

        cbh.appendChild(cb);
        cbh.appendChild(cblabel);
        checkboxParent.appendChild(cbh);
    }
}

//gets all of the checked producer boxes and returns the array
function getChecked(){
    newPDlist = [];
    cereal = document.getElementsByName("okPDs");

    for (i in cereal){
        
        if (cereal[i].checked && cereal[i].value != null){
            
            newPDlist.push(cereal[i].value);
        }
    }  
    return newPDlist
} 

//gets checked boxes and sets localstorage item
function updateOK(){
    localStorage.setItem(localstoragekey, getChecked());
}


//checks if all of the boxes are ticked so selectall will auto check/uncheck
function checkForAll(){
    selectall = document.getElementById("allCB")
    if (getOK().length == getAllPDs().length){
        selectall.checked = true;
    }
    else {selectall.checked = false};
}

//makes selectall actually selectall
function changeAll(){
    selectall = document.getElementById("allCB");
    cbs = document.getElementsByName("okPDs");

    for (i in cbs){
        cbs[i].checked = selectall.checked;
    }
}

//handles opening/closing of pd filter box
function opcl(){
    target = document.getElementById("filtercont");
    if (target.style.display == "none"){
        this.className = "bi bi-caret-down-fill";
        target.style.display = "";
    }
    else {
        this.className = "bi bi-caret-right-fill";
        target.style.display = "none";
    }
}

//sets functions to appropriate buttons etc etc

document.getElementById("chr-btn").addEventListener('click',setChar);
document.getElementById("sng-btn").addEventListener('click',function(){setSong(getOK())});
document.getElementById("new-btn").addEventListener('click',setNew);
document.onload = setNew()

document.onload = addFilters();

document.getElementById("filtercont").style.display="none";
document.getElementById("filteropen").addEventListener("click", opcl)
document.getElementById("allCB").addEventListener("change", changeAll)
document.getElementById("update_btn").addEventListener("click", updateOK)

document.onload = checkForAll();