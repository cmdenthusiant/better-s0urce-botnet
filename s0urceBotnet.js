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
var comment = ".-.";
var botsOnline = 0;
var SuccessfulHacks = 0;
var EnteredWords = 0;
var statusLoop = false;
var HackedBt = 0;
var hashword = {
    "0c129fc504a7235bd7533cb8be13e34a":"add","b0e367e6eb9413e5ca0c2cc973deca7f":"anon","d3f137f5665501f40b58b798b5c4b65d":"bit","03766fe66c894e135f34e4817adcc445":"buffer","b90e0668218d0bd9c8e986f9bfb5fffb":"bytes","17848cf2b3c29258bf7b4fe72885f0ed":"call","176482bf629d8d6758e4b5efcd0c96de":"client","5e9a81ea3e3ee16de099224ccc105cb6":"com","7c1e97f204892722ddbaada9526092ae":"cookies","ce1a19c462bac5aa9d7f70e557696acb":"count","6e4532894d8173b6dafd48ae75e72a57":"data","68f61d61a1a00a45ac38f9b65d0cbc51":"delete","9d648dd2047b63782bcb071a355ad920":"dir","714879b0ce6d6f9ef4ff533b19d40d16":"domain","9a919cb291d0394a14154088d8bd53ec":"emit","bdfcba5ecc25b89e7466bff717fe30a7":"event","f3d27d00d4b60c198cbbb1e498fe56d1":"file","919d71d49f4b54d435cab7a07953fbc5":"get","da5dfe020a8b53dbf4793615432eee16":"ghost","131b794f4faee20352841c9234908fd1":"global","6c65f9eb81a2cb98eebe0019569b50c6":"handle","eb3fbeb71a325e28f7205768b113894f":"host","9d8fdb42a1a2ac092a81b6c4ad76551a":"http","e759e5eee642b4fe0d770f44cb76534e":"info","1c56cb8b96c2fcd274666b542aa285ef":"init","1297519371d5eaf6ceccdbfe770b0594":"intel","39d82ec961c6a3053d179b60554eed6e":"join","635e1598550f992569188169353062e5":"key","39b8a0150fd284cde2e815833b1e14bd":"left","650a2e8ac217c1685a61d2bf2da556a6":"list","4c13d55be3b70d0d6bba777924ea889d":"load","7a8ea444dc3c542dae86e927f77a86a9":"log","75da2673ec4e90e2b73104258f3ac99c":"loop","5c8596b0b8242caab4b588a68ea2bec7":"net","4360a51f8786468809a4a2b8315a0014":"num","2a2fcc4c8a9a08d2178cf0e79bcd1602":"part","f0821a72f7fd1bb93cd174ce86d2a615":"pass","1828be0b799aa35a0b7e4a9e7c84e63c":"ping","dc2dabd29466842632e595f318a071ca":"point","bbbdb7fffc2951abff968a6102e72735":"poly","500835f3ddef813783837074cff034e9":"port","f971893d31b4f29da62fe2cc43323137":"remove","09bb05a8dff4cbba53ebbaf23117ee5c":"reset","583462fd92e52efac8aa13ba5ffbd8a8":"right","0ff4d83bb8c2d377ef2a5fb106ca397f":"root","3f2b934a6d4c4f84d52fb1f3d8d958b2":"send","ed0191d7eee264a696753caed36bdb82":"set","97902dbcee35b3b5374c10cee9981a53":"signal","f41a7f67eb9bfa6865b048fae028e87c":"size","77b2fd0c9dd99233e016333938422754":"socket","f5ad73d8c4d172323bcf5fd173cd4ffb":"stat","13bf57924dec62e9471eadf23443dbee":"status","fdb82bdd38793248fde74f0d0effa064":"system","d09bed9265c2b4181c42fa6352cf6f4d":"temp","00cbcc49a38c3e006801f1ba2b733062":"type","508d58bcf968d378d360fa29b30f37b1":"upload","21db84d3423eb02e7b22c5439f36180f":"url","4b77ccf85264c34e203c17d7dd14fa81":"user","d3f88f5a7e95b65a42d927fa958bbd8b":"val","3bc69c17b60e005beb22e0d479ad6ff0":"write","4b5e4e7f2b7b887edad94a96f9f98dea":"xml","599e550eaede5816f536a0f3ff75ceec":"account","c2a17266003a1bec63ed26b287c5342f":"accountname","59c5764c4da1fbb7c775663eb487cd85":"channel","d273db76582898ad279ddc916d580f24":"command","8750047d1fb8b493547c9d0bdad166d9":"config","c0c984850e68d6fd4d3a6d0e7d2b69b1":"connect","ef09cd3de0e22e349d2a63a4aa7ce9d3":"constructor","7ff27fa6a319ad5944ef0f0705a20f1f":"datatype","c2934cfd514592adecb7cf23510fb2d6":"decrypt","8839774e66404e197c5e201ae3435165":"decryptfile","75b62d012a0c91f18041a41f2cd361bf":"disconnect","b0be15d18a861e56197822e5feceb2af":"download","7743a63dae2bc5d77680ec6f29b1121c":"encode","d8ebac615855d4630206073099f219e5":"encrypt","89907aa34395513e63272687fc987413":"encryptfile","f738270f9f777ff64c8fa321b9bf1a8c":"eventtype","eb380ee70bc0ebefe5fbf4e8aaffe621":"export","c25304fa6c882380a016f080f30c76ee":"filedir","b9525d0b47b293c8aad8000dfd59ea8c":"filetype","1322c8cc0ed84f80270052ebabb01c66":"fillgrid","aef0c2e3947e6067ef6c6ca9cd10f7a0":"findpackage","5f27edcf873d7415b4b4e1bcd44c1985":"generate","11c51150aa2b0513f2f8387dfacf326c":"getfile","d516479c7f5b6211fa967ce5228051ad":"getid","d029bb87ca1d7f1f5e85e15455461450":"getinfo","2868de88eabf74a7a2864d080d677a2b":"getkey","3ba883e7bd2b80a819e269c8ba263c58":"getlog","5e7b782f27b8bb2b9c7795e1bf6d45cd":"getpass","4645195ca995e87ec7c0b33b7e8b70ab":"getping","441333fe1da405980ce4f4c96d956a16":"gridheight","f5c52a647592f388cae2a0f190eb1738":"gridwidth","a94277548a523f854dd6ec4710338388":"hexagon","d56b37a0aaf25e5c87b1976ab9d113b9":"hostserver","cb8f0637d779760e4ba7263f268332e1":"length","9e09228d0c9c62d72f492f20adca71b6":"listconfig","79d66ce006f86c469053f74cb1fdcc98":"loadbytes","2202d274d11fbdbd627b48fac002248a":"module","08005a180c3bafc2fccc7c306669c59d":"mysql","1b8666224bbc6cb6e72873bff3be5247":"newhost","be5509fa9b005caf93e0fdc9ce71554a":"newline","6f064e7073dd138b29754e31a7306fb6":"newserver","8552e6d7d7a40ed0017587e64d9c4df7":"number","f35c70b6606ee1321457b7fe3403e590":"package","3c46ecdb1ee31734089b65ef8f51a216":"password","4d81cd01f140000e260fec15a94b5339":"process","5bf5335ae3c0d6340dd5cf1cb58a4ec1":"protocol","beb9143c413c3bd88f8c36b6d0077807":"proxy","162abae0f24ad00c68b01e74fc6e7f5d":"responder","9193a4e8dc1901371b7a21e1a04f28a8":"response","3da0c84d81037995bc4022710555980f":"server","9365c061ea222b302e28761204720f94":"serverproxy","2cf69218240efaf85a182c298fc1151f":"setcookie","ace69a4f904481e8026d8eb8e0ec20b0":"setnewid","f79d9ac962efeb4274c74f0b136cba0d":"setping","dd979e7fc33ac1c998ea776e2daf9346":"setport","539ca7aec263e4290746a70f32fce505":"setstats","52a668de8012faf29cd93ee9095e4814":"sizeof","4ad7c0a40664c32439d713cb037ca000":"syscall","16eed3bc6e50dec827961e86304ef833":"thread","ad3e41feff5116e4ff11c482a604f68f":"threat","fcb86a77dffcd0d4e01b230e9126f3f7":"urlcheck","84a09fabd86be7fc1626e6c15c203767":"userid","94d610495fa8b14d47a45f750a8bc2b3":"username","de43f98e56db9d8593be2b90d789a47f":"userport","02201017cedae660ff25b90975679c02":"vector","644c0ab87adca4955faaef16da818cde":"writefile","ec8f6f20e392708631b78178615684c3":"batchallfiles","36135d7fb55be568c7bf2df15fcb9bf7":"blockthreat","1386302c93ffd6bd250aa03eaacc7f59":"bufferpingset","564928aaa801f93d7553300ed08263ff":"callmodule","d70665c9a5d240e881cf97a9825e8258":"changepassword","3b235f7b31ae6472aef939a09aa2e413":"changeusername","9aa9681e57d3090461bf7d9b40484f34":"channelsetpackage","93859a5926a774940036f5ab9a70a04d":"checkhttptype","0b281e39246ce021c11ab785db5eacf8":"create2axisvector","f98e8f2a5c419a3eb289b37ee6de8b08":"create3axisvector","8f396a6836a1f0a745deb6ab04c26df2":"createfilethread","9bd27a841e84b44459f9ac5b730899b0":"createnewpackage","9ac8c96ba1f87a6da0db77c5d7b202a1":"createnewsocket","e0544644811a1d4e7e64665f075a3c84":"decryptdatabatch","811b844a499e47830dd4ee8e3b4b31a2":"deleteallids","0940e711d15a687a976c62452c0d67fc":"destroybatch","f7327b90267471324febd77e1a03044b":"disconnectchannel","78bbfcad233d2d4a8e8873f15c2f8779":"disconnectserver","833e854d8fe340552c3395be22279a51":"dodecahedron","a41bcbc792f79120f19d3f77fcccb1d7":"emitconfiglist","bca1d30d8c9168b92c40518b1ba8d8ff":"encodenewfolder","1e76da7131e9187ee643a5e100814726":"encryptunpackedbatch","176d36218a56263b289b3db3819fa01d":"eventlistdir","37c4160932da1157d8724762be81f9b3":"exportconfigpackage","2e8bbe859f462dfff05d812902b1f706":"fileexpresslog","284363d1811c03e2d1fe8ae355e6e0e1":"generatecodepack","69a37ca449e5013ea41e085d3a1ff66c":"getdatapassword","49a4ab7cdfa978cfb2ce29f2b3af2ff2":"getfirewallchannel","f4fe24216d04e453fd45b1057b49fe49":"getmysqldomain","24c9fd00f095639dc51a4745ff699f2f":"getpartoffile","ba65a1eb00561d1581a60e5882ad2b68":"getxmlprotocol","3ce2d36ee08b3e6457c7ad5fd649ee12":"ghostfilesystem","9e82cc12241d7c090765f7951f7784b2":"hostnewserver","baf1cf875fe2b58ddb782b0f08e62894":"httpbuffersize","fdcc898624a3eb8b6d0e16c723548e1d":"includedirectory","fd69bda442958308e4d4c48aabbd19f1":"joinnetworkclient","54321bb10113808547e485232e7df9f1":"loadaltevent","3dcebaf21c839dadc80b2410c28ff2aa":"loadloggedpassword","dbcfdbf132d1b06f9dae1ec9b72ee361":"loadregisterlist","a5c108a85e718526c76d8f4921c01c5a":"mergesocket","c82f0e45ac8ca65d3b6f69a873e0e31e":"patcheventlog","d4d5ba85c5a7eda5f43e745f516a3a76":"removenewcookie","07379e52880d8397f165b76dcac2d1f8":"removeoldcookie","007321ee510d9fdb2d5b1c2c30a5a64b":"respondertimeout","3f37e708d1dcc9e094c7761a3831dba2":"rootcookieset","9934b13aa38033081cc5d88b85dcec11":"sendintelpass","ee7bcc5c79d99468eba1b45c7a1a7a95":"setnewproxy","4b5f9f33b8e482f5e3ced660fdde8916":"sizeofhexagon","a54166dad8fdefe2cbcdbbeb9fc94427":"statusofprocess","ee26761fe835ef5626fe570c3cc4ab98":"systemgridtype","24169d3db38b4d781891c1f745ea573e":"systemportkey","38480f87709fc9c7c17febdc86cb7025":"tempdatapass","e50d87c89c9bac927b89d45b5bd7b258":"unpacktmpfile","29bd3683d8884dfc8852e6c3c2fba911":"uploaduserstats","a23cc99d4abe37ffbe167c689ca5d946":"wordcounter"
};
var wordsNum = {};
const randRange=(min,max)=>Math.round(Math.random()*(max-min)+min);

class bot {
    constructor(){
        this.socket=new webSocket();
        this.botSid=null;
        this.conn=null;
        this.online=false;
        this.targetId=targetId;
        console.log(this.targetId)
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
