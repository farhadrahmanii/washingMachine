var wdclue_matomo_key = '';

let Cluemid_timerId = setInterval(() => {
wdclue_matomo_key = localStorage.getItem('sformmid') ? localStorage.getItem('sformmid') : '';
if(!wdclue_matomo_key){
if (typeof _paq !== 'undefined') {
_paq.push([function() {
wdclue_matomo_key = this.getVisitorId();
}]);
localStorage.setItem('sformmid', wdclue_matomo_key);
}
}
console.log('Cookie key is2:'+wdclue_matomo_key);
if(wdclue_matomo_key){
clearInterval(Cluemid_timerId);
}
}, 1200);

document.write('
<link rel="stylesheet" href="https://www.analyticswin.com/static/source/vs_style.css">');
class VsModel {
constructor(id, title, content,country) {
this.id = id;
this.countrycode = country;
this.title = title;
this.content = content;
this.ele = null;
this.isMobile = document.body.offsetWidth <= 1000 ? true : false;
    this.isChrome=navigator.userAgent.toLowerCase().indexOf('chrome')==-1 ? false : true; this.isRunAnimation=false;
    this.isEmpty=localStorage.getItem('isEmpty') ? true : false; this.clickNum=0; this.delay=3000; this.isEmpty ? null :
    this.init(); this.getHref(); } init() { this.addTagElement(); if (this.isMobile) { this.delay=1000; }
    setTimeout(()=> {
    this.isMobile ? this.addMobileEvent() : this.addEvent();
    }, this.delay);
    }
    addTagElement() {
    let div = document.createElement('div');
    div.className = 'vs-model';
    div.id = 'ccc';
    div.setAttribute('id', this.id);
    let html = `
    <div class="vs-content">
        <div class="model-header">
            <div class="model-title">
                <div class="vs_close">X</div>
            </div>
        </div>
        <div class="model-content">
            <div class="model-form">${this.content}</div>
        </div>
    </div>
    `;
    div.innerHTML = html;
    document.body.appendChild(div);
    this.ele = document.getElementById(this.id);
    var default_code = $('#vs-'+this.countrycode+' a').html();
    var default_flag = $('#vs-'+this.countrycode+' span').attr('style');
    $('#vs-menu-box .vs-flag').attr('style', default_flag);
    $('input[name="vs_cflag"]').val(default_code);
    $('.vs-code').html(default_code);
    }
    JhoverDir(e) {
    if (e.type != 'mouseover' && e.type != 'mouseenter') {
    if(e.clientY<=0){ if (this.isRunAnimation) return false; this.showModel(); $('.chat-close').click(); } } }
        addMobileEvent() { let form=this.ele.getElementsByTagName('form')[0]; let
        closeBtn=this.ele.getElementsByClassName('vs_close')[0]; form.addEventListener('submit',this.submit.bind(this));
        this.showModel(); $('.chat-close').click(); closeBtn.addEventListener('click',this.clearModel.bind(this));
        $('#vs-menu-box').on('click', function() { $('.vs-menu').toggleClass('active'); });
        $('body').on('click', '.vs-menu li' , function(e) { e.stopPropagation(); let code=$(this).children('a').html();
        let span=$(this).children('span').attr('style'); $('.vs-code').html(code); $('#vs-menu-box
        .vs-flag').attr('style', span); $('input[name="vs_cflag" ]').val(code); $('.vs-menu').removeClass('active'); });
        var default_code=$('#vs-'+this.countrycode+' a').html(); var default_flag=$('#vs-'+this.countrycode+'
        span').attr('style'); $('#vs-menu-box .vs-flag').attr('style', default_flag); $('input[name="vs_cflag"
        ]').val(default_code); $('.vs-code').html(default_code); } showModel() {
        this.ele.classList.remove('vs-animate'); this.ele.classList.add('vs-show'); localStorage.setItem('isEmpty',
        true); } addEvent() { let closeBtn=this.ele.getElementsByClassName('vs_close')[0]; let
        form=this.ele.getElementsByTagName('form')[0]; let navObj=this.isChrome ? document : document.body;
        navObj.addEventListener('mouseover', this.JhoverDir.bind(this), false); navObj.addEventListener('mouseout',
        this.JhoverDir.bind(this), false); closeBtn.addEventListener('click',this.clearModel.bind(this));
        form.addEventListener('submit', e=>e.preventDefault());
        btn_submit.addEventListener('click',this.submit.bind(this));
        $('#vs-menu-box').on('click', function(e) {
        e.stopPropagation();
        $('.vs-menu').toggleClass('active');
        });
        $('body').on('click', '.vs-menu li', function(e) {
        e.stopPropagation();
        let code = $(this).children('a').html();
        let span = $(this).children('span').attr('style');
        $('.vs-code').html(code);
        $('#vs-menu-box .vs-flag').attr('style', span);
        $('input[name="vs_cflag"]').val(code);
        $('.vs-menu').removeClass('active');
        });
        $(window).on('click', e => {
        let id = $(e.target).attr('id');
        if (id && id == 'vs-menu-box') return false;
        $('.vs-menu').removeClass('active');
        });
        }
        submit() {
        event.preventDefault();
        var page_title = document.title;
        var page_link = location.href;
        var page_list = JSON.stringify(this.getHrefList());

        $('#btn_submit').attr("disabled","disabled");
        if (this.clickNum < 1) { var vsbox_email=$('#vsbox_email').val(); vsbox_email=vsbox_email.trim();
            if(vsbox_email=='' ){ $('#btn_submit').removeAttr("disabled"); alert('Email error,please check and
            re-enter!'); return false; } var
            myreg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; if
            (!myreg.test(vsbox_email)) { $('#btn_submit').removeAttr("disabled"); alert('Email error,please check and
            re-enter!'); return false; } $.post('https://www.analyticswin.com/static/vsres4.php', { pagetitle:
            page_title, email: vsbox_email, flag: 'leave' , pagelist: page_list, pagelink: page_link,
            matomo_key:wdclue_matomo_key }, function(data) { if (data.code=='ok' ) {
            $('#vs_sessionid').val(data.save_id); } else { alert(data.msg); } }, 'json' ); this.clickNum++;
            $('#vsbox_email').hide(800); $('#vs_home').show(800); $('#btn_submit').removeAttr("disabled"); return false;
            }else if (this.clickNum==1) { var country_code=$('#vs_cflag').val(); var saveid=$('#vs_sessionid').val();
            var vsbox_tel=$('#vsbox_tel').val(); $.post( 'https://www.analyticswin.com/static/vsres4.php' , { saveid:
            saveid,countrycode:country_code,tel: vsbox_tel }, function(data) { if (data.code=='ok' ) {
            $('#vs_sessionid').val(data.save_id); } else { alert(data.msg) } }, 'json' ); this.clickNum++;
            $('#vs_home').hide(800); $('#vsbox_company').show(800); $('#vsbox_message').show(800);
            $('#btn_submit').removeAttr("disabled"); }else{ var vsbox_company=$('#vsbox_company').val();
            vsbox_company=vsbox_company.trim(); var vsbox_message=$('#vsbox_message').val(); var
            saveid=$('#vs_sessionid').val(); vsbox_message=vsbox_message.trim();
            $.post( 'https://www.analyticswin.com/static/vsres4.php' , { saveid: saveid,company: vsbox_company,message:
            vsbox_message }, function(data) { if (data.code=='ok' ) { alert('Thank you for giving us time, our team
            sales will immediately contact you and provide our latest price list.'); } else { alert(data.msg); }
            }, 'json' ); $('#btn_submit').removeAttr("disabled"); this.clearModel(); } } clearModel() {
            this.isRunAnimation=true; this.ele.classList.remove('vs-show'); this.ele.classList.add('vs-animate');
            this.ele.addEventListener( 'animationend' , function() { this.classList.contains('vs-animate') ?
            this.remove() : '' ; } ) } getHref() { const href=location.href; let list=localStorage.getItem('hrefList') ?
            JSON.parse(localStorage.getItem('hrefList')) : []; list.push(href); localStorage.setItem( 'hrefList'
            ,JSON.stringify(list) ); } getHrefList() { return localStorage.getItem('hrefList') ?
            JSON.parse(localStorage.getItem('hrefList')) : []; } } if(typeof jQuery=='undefined' ){ var
            mf=document.createElement("script"); mf.type="text/javascript" ;
            mf.src="https://www.analytics-service.com/js/jquery.js" ;
            document.getElementsByTagName("head")[0].appendChild(mf); setTimeout('Vs_leave_show()',300); }else{
            Vs_leave_show();} function Vs_leave_show(){ new VsModel( 'vmModel' , '' , ` `,'af'); }