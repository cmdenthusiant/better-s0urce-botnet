const webSocket = require('websocket').client;
const crypto = require('crypto');
const request = require('request');
const rl = require('readline').createInterface({
    input:process.stdin,
    output:process.stdout
})
var botName = 'Botnet';
var botClose = true;
var reHackms = 2000;
var targetId = "";
var botAmount = 30;
var comment = "";
var desc = "no description";
var botsOnline = 0;
var SuccessfulHacks = 0;
var EnteredWords = 0;
var statusLoop = false;
var HackedBt = 0;
var lastMessage = "";
var hashword;
request('https://raw.githubusercontent.com/cmdenthusiant/better-s0urce-botnet/main/words.json',(e,r,b)=>hashword=JSON.parse(b))
var wordsNum = {};
const randRange=(min,max)=>Math.round(Math.random()*(max-min)+min);
const shuffleArr=(arr)=>{
    let arrc=arr.concat();
    for(let i=arrc.length-1;i>0;i--) {
        let j=Math.floor(Math.random()*(i+1));
        let t=arrc[i];
        arrc[i]=arrc[j];
        arrc[j]=t;
    }
    return arrc;
}
class bot {
    constructor(){
        this.socket=new webSocket();
        this.botSid=null;
        this.conn=null;
        this.online=false;
        this.targetId=targetId;
        this.botName=botName;
        this.desc='no description';
        this.closeConnTO=null;
        this.login();
        botClose=false;
    }
    Disconnect(){
        this.desc='no description';
        return this.conn.close();
    }
    destroy(){
        delete this;
    }
    login(){
        this.socket=new webSocket();
        request('http://s0urce.io/socket.io/?EIO=3&transport=polling&t=N_9akpJ',(e,r,b)=>{
            if(!b)return setTimeout(()=>this.login(),3000);
            this.botSid = JSON.parse(b.slice(5)).sid;
            this.socket.connect('ws://s0urce.io/socket.io/?EIO=3&transport=websocket&sid='+this.botSid);
            this.socket.on('connect',conn=>{
                this.conn = conn;
                conn.send('2probe');
                conn.send('5');
                conn.send('42'+JSON.stringify(['signIn',{name:botName}]));
                this.setUp();
                setTimeout(()=>this.startHack(),reHackms);
                conn.on('close',()=>{
                    if(this.online){this.online=false;botsOnline--;}
                    this.socket?.removeAllListeners();
                    if(!botClose)setTimeout(()=>this.login(),2000);
                    else this.destroy();
                });
                setTimeout(()=>this.reloadCloseTO(),3000);
                setInterval(()=>{conn.send('2')},randRange(1000,1300));
            })
            this.socket.on('connectFailed',()=>this.login());
        })
    }
    reloadCloseTO(){
        clearTimeout(this.closeConnTO);
        this.closeConnTO=setTimeout(()=>this.Disconnect(),6000);
    }
    setUp(){
        this.conn.on('message',msg=>{
            if(botClose){this.Disconnect();this.destroy();};
            if(this.botName!=botName){this.botName=botName;return this.Disconnect();}
            if(msg.utf8Data.startsWith('42'))JSON.parse(msg.utf8Data.slice(2)||{})[1].unique?.forEach(c=>{
                if(c.task == 2008){
                    if(this.desc!=desc)this.changeDesc();
                    if(!this.online){this.online=true;botsOnline++;}
                    if(this.targetId!='autoTarget')return;
                    c.data=shuffleArr(c.data);
                    for(let d in c.data){
                        if(c.data[d]?.name!=botName)return this.targetId=c.data[d].id;
                    }
                }
                if(c.task == 333){
                    this.reloadCloseTO();
                    if(c.opt==0)return this.startHack();
                    if(c.url){
                        return this.Hack(c.url.i,c.url.t);
                    }
                }
                if(c.task==2003){
                    if(c.text?.includes('Hacking successful')){
                        this.targetId=targetId;
                        SuccessfulHacks++
                        HackedBt+=c.extra?.overlay?.value||0;
                        if(comment)this.conn.send('42'+JSON.stringify(['playerRequest',{task:106,text:comment}]));
                    };
                    this.reloadCloseTO();
                    setTimeout(()=>this.startHack(),reHackms);
                }
                if(c.task==2006){
                    lastMessage="From "+c.name+": "+c.message;
                }
            })
        })
    }
    startHack(){
        if(this.targetId!='autoTarget'){return this.conn.send('42'+JSON.stringify(['playerRequest',{task:100,id:this.targetId,port:randRange(0,2)}]));}
        setTimeout(()=>this.startHack(),reHackms);
    }
    Hack(num,t){
        EnteredWords++;
        let w = wordsNum[num];
        if(w)return this.conn.send('42'+JSON.stringify(['playerRequest',{task:777,word:w}]));
        let hash = crypto.createHash('md5');
        hash.once('finish',()=>{
            hash.end();
            w = hashword[hash.digest('hex')];
            wordsNum[num]=w;
            this.conn.send('42'+JSON.stringify(['playerRequest',{task:777,word:w}]));
            hash.destroy();
        })
        request('http://s0urce.io/client/img/word/'+t+'/'+num).pipe(hash);
    }
    changeDesc(){
        this.desc=desc;
        this.conn.send('42'+JSON.stringify(['playerRequest',{task:104,desc:this.desc}]));
    }
}
function createBot(){
    for(let i=0;i<botAmount;i++){
        setTimeout(()=>new bot(),i*randRange(0,350));
    }
}
function genStatus(){
    console.clear();
    console.log(`
--------------------------Commands--------------------------
    attack <Target ID> : Generate bots to attack target.
    autotarget : let bots AutoTarget others.
    stop : Stop attacks.
    name <name> : Set bots name.
    amount <number> : Set number of bots.
    comm <comment> : Set comment afted hacking.
    desc <description> : Set Description.
    reset : Reset Status(Not ALL).
    stat : Status Mode, Press any to Exit.
---------------------------Status---------------------------
    Bots Name: ${botName}
    Bot Amount: ${botAmount}
    Comment: ${comment||null}
    Description: ${desc}
    Bots online: ${botsOnline}
    Target ID: ${targetId||null}
    Successful Hacks: ${SuccessfulHacks}
    Entered Words: ${EnteredWords}
    Hacked BTcoins: ${(''+HackedBt).split('.')[0]+'.'+((''+HackedBt).split('.')[1]?.slice(0,4)||0)} BT
    Last Message: ${lastMessage||null}
------------------------------------------------------------
`);}
setInterval(()=>{if(statusLoop)genStatus();},500);
(function main(){
    genStatus();
    rl.question('>',ans=>{
        statusLoop=false;
        let args = ans.split(' ').slice(1);
        if(ans.toLowerCase()=='stop')botClose=true;
        if(ans.toLowerCase()=='reset'){
            SuccessfulHacks=0;
            EnteredWords=0;
            HackedBt=0;
            lastMessage='';
        }
        if(ans.toLowerCase()=='autotarget'){
            targetId='autoTarget';
            if(botClose)createBot();
        }
        if(ans.toLowerCase().startsWith('stat'))statusLoop=true;
        if(ans.toLowerCase().startsWith('comm'))comment=args.join(' ')||'';
        if(ans.toLowerCase().startsWith('desc'))desc=args.join(' ')||'no description';
        if(args[0]){
            if(ans.toLowerCase().startsWith('attack')){
                targetId = args[0];
                if(botClose)createBot();
            }
            if(ans.toLowerCase().startsWith('name'))botName=args.join(' ');
            if(ans.toLowerCase().startsWith('amount')){
                botAmount=+args[0]||50;
                if(!botClose){
                    botClose=true;
                    setTimeout(()=>createBot(),1500);
                }
            }
            
        }
        main();
    })
})()
