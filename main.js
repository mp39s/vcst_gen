//for the funnctions used in both the generator and the songlist
//should be loaded after songdat.js but before everything else

//returns a random item from list
function returnRand(list) {
        x = list[Math.floor(Math.random() * list.length)];
        return x
    }

//allPDs = Object.keys(songdata);

//generates a list of all the producers from the songdat keys
function getAllPDs(){
    return Object.keys(songdata);
}

//creates a songlist based on an array of producers passed through
function newSonglist(pdlist) {
    ret = {}
    for (pd in pdlist){ 
        keys = Object.keys(songdata[pdlist[pd]]);
        for(i in keys){
            ret[keys[i]]=songdata[pdlist[pd]][keys[i]];
        }
    }
    return ret;

    //it makes a new list and appends each song entry one by one
    //not very efficient but shrugs
}

//makes a songlist with all of the songs
allsongs = newSonglist(getAllPDs());
//sets counters for all the songs
document.getElementById("songcount").innerHTML = Object.keys(allsongs).length;

//the generated songlist is different from songdat bc
//the songs arent further grouped into dictionaries sorted by producer

