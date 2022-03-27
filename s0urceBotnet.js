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
var botAmount = 50;
var comment = "";
var botsOnline = 0;
var SuccessfulHacks = 0;
var EnteredWords = 0;
var statusLoop = false;
var HackedBt = 0;
var hashword;
request('https://raw.githubusercontent.com/cmdenthusiant/better-s0urce-botnet/main/words.json',(e,r,b)=>hashword=JSON.parse(b))
var wordsNum = {};
const randRange=(min,max)=>Math.round(Math.random()*(max-min)+min);

class bot {
    constructor(){
        this.socket=new webSocket();
        this.botSid=null;
        this.conn=null;
        this.online=false;
        this.targetId=targetId;
        this.botName=botName;
        this.closeConnTO=null;
        this.login();
        botClose=false;
    }
    Disconnect(){
        return this.conn.close();
    }
    destroy(){
        delete this;
    }
    login(){
        this.socket=new webSocket();
        request('http://s0urce.io/socket.io/?EIO=3&transport=polling&t=N_9akpJ',(e,r,b)=>{
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
                    if(!botClose)setTimeout(()=>this.login(),3000);
                    else this.destroy();
                });
                this.reloadCloseTO();
                setInterval(()=>{conn.send('2')},randRange(1000,1300));
            })
            this.socket.on('connectFailed',()=>this.login());
        })
    }
    reloadCloseTO(){
        clearTimeout(this.closeConnTO);
        this.closeConnTO=setTimeout(()=>this.Disconnect(),5000);
    }
    setUp(){
        this.conn.on('message',msg=>{
            if(botClose){this.Disconnect();this.destroy();};
            if(this.botName!=botName){this.botName=botName;return this.Disconnect();}
            if(msg.utf8Data.startsWith('42'))JSON.parse(msg.utf8Data.slice(2)||{})[1].unique?.forEach(c=>{
                if(c.task == 2008){
                    if(!this.online){this.online=true;botsOnline++;}
                    if(this.targetId!='autoTarget')return;
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
                    };
                    this.reloadCloseTO();
                    this.conn.send('42'+JSON.stringify(['playerRequest',{task:106,text:comment}]));
                    setTimeout(()=>this.startHack(),reHackms);
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
}
function createBot(){
    for(let i=0;i<botAmount;i++){
        setTimeout(()=>new bot(),randRange(0,3000));
    }
}
function genStatus(){
    console.clear();
    console.log(`
--------------------------Commands--------------------------
    attack <Target ID> : Generate bots to attack target.
    autotarget : let bots AutoTarget others.
    stop : Stop attacks.
    botname <name> : Set bots name.
    botamount <number> : Set number of bots.
    comment <comment> : Set comment afted hacking.
    reset : Reset Status(Not ALL).
    status : Status Mode, Press any to Exit.
---------------------------Status---------------------------
    Bots Name: ${botName}
    Bot Amount: ${botAmount}
    Comment: ${comment||null}
    Bots online: ${botsOnline}
    Target ID: ${targetId||null}
    Successful Hacks: ${SuccessfulHacks}
    Entered Words: ${EnteredWords}
    Hacked BTcoins: ${(''+HackedBt).split('.')[0]+'.'+((''+HackedBt).split('.')[1]?.slice(0,4)||0)} BT
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
        }
        if(ans.toLowerCase()=='autotarget'){
            targetId='autoTarget';
            if(botClose)createBot();
        }
        if(ans.toLowerCase()=='status')statusLoop=true;
        if(ans.toLowerCase().startsWith('comment'))comment=args[0]||'';
        if(args[0]){
            if(ans.toLowerCase().startsWith('attack')){
                targetId = args[0];
                if(botClose)createBot();
            }
            if(ans.toLowerCase().startsWith('botname'))botName=args.join(' ');
            if(ans.toLowerCase().startsWith('botamount')){
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
