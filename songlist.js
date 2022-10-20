//code for generating songlist
//should be loaded after songdat.js and main.js in that order

//dynamicall generates songlist. just a bunch of appendchild funny business
function listpd(){
    pdlist = getAllPDs()
    parent = document.getElementById("main") 
    for (pd in pdlist){

        pdname = pdlist[pd];
        
        //overall container
        songcont = document.createElement("div");
        songcont.className = "songcont";
        
        //header
        pdheader = document.createElement("div");
        pdheader.className = "pdname"
        pdnamenode = document.createTextNode(" "+pdname);

        pdsongcount = document.createElement("span");
        pdsongcount.className = "subtxt";
        countnode = document.createTextNode(" ("+Object.keys(songdata[pdname]).length+" songs)");
        pdsongcount.appendChild(countnode)

        caret = document.createElement("i");
        caret.className = "bi bi-caret-right-fill";
        caret.id = pdname;

        pdheader.appendChild(caret);
        pdheader.appendChild(pdnamenode);
        pdheader.appendChild(pdsongcount);

        songcont.appendChild(pdheader);

        //song list node
        songul = document.createElement("ul");
        songul.id = pdname+"LIST";
        songul.style.display ="none";

        //add songs
        pdsongs = songdata[pdname];
        pdsongkeys = Object.keys(pdsongs);
        for (song in pdsongkeys){
            key = pdsongkeys[song];

            linode = document.createElement("li");
            //songlink
            anchor = document.createElement("a");
            node2 = document.createTextNode(pdsongs[key][0]);
            anchor.appendChild(node2);
            ytlink = "https://youtu.be/"+pdsongs[key][3]
            anchor.setAttribute("href", ytlink);

            txtnode = " - ft."+pdsongs[key][2]
            node1 = document.createTextNode(txtnode);

            linode.appendChild(anchor);
            linode.appendChild(node1);

            songul.appendChild(linode);
        }

        songcont.appendChild(songul);
        parent.appendChild(songcont);

        document.getElementById(pdname).addEventListener("click", opcl);
    }

}

//handles opening/closing of the boxes
function opcl(){
    target = document.getElementById(this.id+"LIST");
    if (target.style.display == "none"){
        this.className = "bi bi-caret-down-fill";
        target.style.display = "";
    }
    else {
        this.className = "bi bi-caret-right-fill";
        target.style.display = "none";
    }
}



document.onload = listpd();  
