import random

##code to format .txt file into dictionary entries
##i can dump a title + a link and itll format it for me
##  Alien Alien, https://www.youtube.com/watch?v=2t1NMRse6aI
##if theres multiple singers/singer isnt miku i throw the names at the back
## Kami no Manimani, https://www.youtube.com/watch?v=2t1NMRse6aI, miku, rin, gumi

##creates song code/key with title
def titlecode(t):
    code = t.upper()[0:3] + str(random.randint(0,9)) + str(random.randint(0,9)) + str(random.randint(0,9)) + str(random.randint(0,9))
    code = '"'+code+'"'
    return code

##gets video code from url. works with youtu.be and www.youtube.com
def urlCode(url):
    r = ""
    urlist = url.split("/")
    if urlist[2] == "www.youtube.com":
        r = urlist[-1].split("?v=")[-1]
    else:
        r = urlist[-1]
    return(r)


##list of synths
##i usually update as i go but for some lesser used voices ill manually edit them in later
vslist = {
    "miku":"Hatsune Miku",
    "flower":"flower",
    "kafu":"KAFU",
    "gumi":"GUMI",
    "sekai":"SEKAI",
    "ia":"IA",
    "luka":"Megurine Luka",
    "yuki":"Kaai Yuki",
    "rin":"Kagamine Rin",
    "mayu":"MAYU",
    "rei":"Adachi Rei"
    }

##reads vslist and returns their proper name
def vsinger(sn):
    return vslist[sn]

##old formatter code for when producer used only miku
##before i figured out how to have a "default"
def formmiku(src, pd):
    title = ""
    singer = "Hatsune Miku"
    link = ""
    list = []
    
    for x in src:
        if x[0:4] == "http":
            link = urlCode(x)
        else:
            title = x
            
    printlist = titlecode(title)+":"+str([title, pd, singer, link]) +","
    print(printlist)


##current/main formatter
def formatter(src, pd):
    ##src should be an array
    ##pd is producer name string
    
    title = ""
    singlist = []
    link = ""
    
    ##iterates through every item in src
    ##checks if item is link, vsinger or neither
    for x in src:
        if x[0:4] == "http":
            link = urlCode(x)
        elif x in vslist:
            ##appends vsinger to a list to format later
            singlist.append(vsinger(x))
        else:
            title = x
    
    ##checks if singer list is empty
    ##if yes = default to miku. sometimes i change this to flower
    if len(singlist) == 0:
        singer = "Hatsune Miku"
    ##else, formats the list into a string
    else:
        singer = singlist[0]
        ii = 1
        while ii < len(singlist):
            ##this appends like ", Hatsune Miku"
            singer = singer+", "+singlist[ii]
            ii +=1
    
    ##formats it and then prints
    ##  
    printlist = titlecode(title)+":"+str([title, pd, singer, link]) +","
    print(printlist)


f = open("convert.txt", "r")

for x in f:
    ##if the line starts with // it just prints it out. useful for comments
    if x[0] == "/":
        print(x.strip())
    ##i add #s at the end so itll stop reading and not try and format blank lines
    elif x[0] == "#":
        break
    ##change producer as needed. i do this by producer so
    else:
        pd = "NayutalieN"
        formatter(x.strip().split(", "), pd)
        
print("=============END=================")