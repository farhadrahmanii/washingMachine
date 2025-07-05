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

document.write('<link rel="stylesheet" href="https://www.analyticswin.com/static/source/vs_style.css">');
class VsModel {
	constructor(id, title, content,country) {
		this.id = id;
		this.countrycode = country;
		this.title = title;
		this.content = content;
		this.ele = null;
		this.isMobile = document.body.offsetWidth <= 1000 ? true : false;
		this.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') == -1 ? false : true;
		this.isRunAnimation = false;
		this.isEmpty = localStorage.getItem('isEmpty') ? true : false;
		this.clickNum = 0;
		this.delay = 3000;
		this.isEmpty ? null : this.init();
		this.getHref();
	}
	init() {
		this.addTagElement();
		if (this.isMobile) {
			this.delay = 1000;
		}
		setTimeout(() => {
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
              <div class="model-title"><div class="vs_close">X</div></div>
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
		    if(e.clientY<=0){
 			    if (this.isRunAnimation) return false;
				this.showModel();
				$('.chat-close').click();
			}
		}
	}
	addMobileEvent() {
		let form = this.ele.getElementsByTagName('form')[0];
		let closeBtn = this.ele.getElementsByClassName('vs_close')[0];
		form.addEventListener('submit',this.submit.bind(this));
		this.showModel();
		$('.chat-close').click();
		closeBtn.addEventListener('click',this.clearModel.bind(this));
		$('#vs-menu-box').on('click', function() {
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
		var default_code = $('#vs-'+this.countrycode+' a').html();
		var default_flag = $('#vs-'+this.countrycode+' span').attr('style');
		$('#vs-menu-box .vs-flag').attr('style', default_flag);
		$('input[name="vs_cflag"]').val(default_code);
		$('.vs-code').html(default_code);
	}
	showModel() {
		this.ele.classList.remove('vs-animate');
		this.ele.classList.add('vs-show');
		localStorage.setItem('isEmpty', true);
	}
	addEvent() {
		let closeBtn = this.ele.getElementsByClassName('vs_close')[0];
		let form = this.ele.getElementsByTagName('form')[0];
		let navObj = this.isChrome ? document : document.body;
		navObj.addEventListener('mouseover', this.JhoverDir.bind(this), false);
		navObj.addEventListener('mouseout', this.JhoverDir.bind(this), false);
		closeBtn.addEventListener('click',this.clearModel.bind(this));
		form.addEventListener('submit', e =>e.preventDefault());
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
		if (this.clickNum < 1) {
		    var vsbox_email = $('#vsbox_email').val();
    		vsbox_email = vsbox_email.trim();
    		if(vsbox_email==''){
    		    $('#btn_submit').removeAttr("disabled");
    		    alert('Email error,please check and re-enter!');
    		    return false;
    		}
    		var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    		if (!myreg.test(vsbox_email)) {
    		    $('#btn_submit').removeAttr("disabled");
    			alert('Email error,please check and re-enter!');
    			return false;
    		}
    		$.post('https://www.analyticswin.com/static/vsres4.php',
    			{
    				pagetitle: page_title,
    				email: vsbox_email,
    				flag: 'leave',
    				pagelist: page_list,
    				pagelink: page_link,
    				matomo_key:wdclue_matomo_key
    			},
    			function(data) {
    				if (data.code == 'ok') {
    					$('#vs_sessionid').val(data.save_id);
    				} else {
    					alert(data.msg);
    				}
    			},
    			'json'
    		);
			this.clickNum++;
			$('#vsbox_email').hide(800);
			$('#vs_home').show(800);
			$('#btn_submit').removeAttr("disabled");
			return false;
		}else if (this.clickNum == 1) {
		    var country_code = $('#vs_cflag').val();
    		var saveid = $('#vs_sessionid').val();
    		var vsbox_tel = $('#vsbox_tel').val();
    		$.post(
    			'https://www.analyticswin.com/static/vsres4.php',
    			{
    				saveid: saveid,countrycode:country_code,tel: vsbox_tel
    			},
    			function(data) {
    				if (data.code == 'ok') {
    					$('#vs_sessionid').val(data.save_id);
    				} else {
    					alert(data.msg)
    				}
    			},
    			'json'
    		);
    		this.clickNum++;
    		$('#vs_home').hide(800);
    		$('#vsbox_company').show(800);
			$('#vsbox_message').show(800);
    		$('#btn_submit').removeAttr("disabled");
		}else{
		    var vsbox_company = $('#vsbox_company').val();
		    vsbox_company = vsbox_company.trim();
		    var vsbox_message = $('#vsbox_message').val();
    		var saveid = $('#vs_sessionid').val();
    		vsbox_message = vsbox_message.trim();
    		$.post(
    			'https://www.analyticswin.com/static/vsres4.php',
    			{
    				saveid: saveid,company: vsbox_company,message: vsbox_message
    			},
    			function(data) {
    			    if (data.code == 'ok') {
        				alert('Thank you for giving us time, our team sales will immediately contact you and provide our latest price list.');
        			} else {
        				alert(data.msg);
        			}
    			},
    			'json'
    		);
    		$('#btn_submit').removeAttr("disabled");
    		this.clearModel();
		}
	}
	clearModel() {
		this.isRunAnimation = true;
		this.ele.classList.remove('vs-show');
		this.ele.classList.add('vs-animate');
		this.ele.addEventListener(
			'animationend',
			function() {
				this.classList.contains('vs-animate') ? this.remove() : '';
			}
		)
	}

	getHref() {
		const href = location.href;
		let list = localStorage.getItem('hrefList') ? JSON.parse(localStorage.getItem('hrefList')) : [];
		list.push(href);
		localStorage.setItem(
			'hrefList',JSON.stringify(list)
		);
	}
	getHrefList() {
		return localStorage.getItem('hrefList') ? JSON.parse(localStorage.getItem('hrefList')) : [];
	}
}
if(typeof jQuery=='undefined'){
    var mf = document.createElement("script");
    mf.type = "text/javascript"; 
    mf.src = "https://www.analytics-service.com/js/jquery.js";
    document.getElementsByTagName("head")[0].appendChild(mf);
    setTimeout('Vs_leave_show()',300);
}else{ Vs_leave_show();}
function Vs_leave_show(){
new VsModel(
	'vmModel',
	'',
	`
    <form class="f-form" method="post" action="https://www.analyticswin.com/static/vsres4.php?call=return" style="background: none;">
      <h5 style="font-size:26px;">Get the latest catalog and price list</h5><span class="vs-notes">*Note: We are manufacturer and don‘t offer individual retail pricelist</span>        <input type="hidden" name='vs_flag' value="leave"/>
		<input type="hidden" name='vs_cflag' id="vs_cflag" value=""/>
		<input type="hidden" name='vs_sessionid' id="vs_sessionid" value=""/>
        <input type="hidden" name='vs_pagetile' value=""/>
        <input name="vs_email" id="vsbox_email" style="display: block;" class="email-input" type="text" placeholder="Enter your email"/>
		<div id="vs_home" class="vs-group" style=" display:none;margin:0 auto;">
			<div class="vs-input-group">
				<button id="vs-menu-box"  type="button">
					<span class="vs-flag"></span>
					<span class="vs-code"></span>
					<span>▾</span>
				</button>
				<div class="vs-menu">
					<ul class="vs-country_list">
								<li class="vs-country_list_item" id="vs-af"> <span style="background-position:0px -2310px"></span> <a>+93</a> </li>
<li class="vs-country_list_item" id="vs-dz"> <span style="background-position:0px -528px"></span> <a>+213</a> </li>
<li class="vs-country_list_item" id="vs-al"> <span style="background-position:0px -1034px"></span> <a>+355</a> </li>
<li class="vs-country_list_item" id="vs-as"> <span style="background-position:0px -1562px"></span> <a>+1-684</a> </li>
<li class="vs-country_list_item" id="vs-ai"> <span style="background-position:0px -1980px"></span> <a>+1-264</a> </li>
<li class="vs-country_list_item" id="vs-ag"> <span style="background-position:0px -869px"></span> <a>+1-268</a> </li>
<li class="vs-country_list_item" id="vs-ao"> <span style="background-position:0px -1947px"></span> <a>+244</a> </li>
<li class="vs-country_list_item" id="vs-ad"> <span style="background-position:0px -594px"></span> <a>+376</a> </li>
<li class="vs-country_list_item" id="vs-aq"> <span style="background-position:0px -2794px"></span> <a>+672</a> </li>
<li class="vs-country_list_item" id="vs-aw"> <span style="background-position:0px -792px"></span> <a>+297</a> </li>
<li class="vs-country_list_item" id="vs-am"> <span style="background-position:0px -176px"></span> <a>+374</a> </li>
<li class="vs-country_list_item" id="vs-ar"> <span style="background-position:0px -2376px"></span> <a>+54</a> </li>
<li class="vs-country_list_item" id="vs-at"> <span style="background-position:0px -1331px"></span> <a>+43</a> </li>
<li class="vs-country_list_item" id="vs-au"> <span style="background-position:0px -1716px"></span> <a>+61</a> </li>
<li class="vs-country_list_item" id="vs-az"> <span style="background-position:0px -1243px"></span> <a>+994</a> </li>
<li class="vs-country_list_item" id="vs-bs"> <span style="background-position:0px -363px"></span> <a>+1-242</a> </li>
<li class="vs-country_list_item" id="vs-bb"> <span style="background-position:0px -1573px"></span> <a>+1-246</a> </li>
<li class="vs-country_list_item" id="vs-bd"> <span style="background-position:0px -1771px"></span> <a>+880</a> </li>
<li class="vs-country_list_item" id="vs-bh"> <span style="background-position:0px -1496px"></span> <a>+973</a> </li>
<li class="vs-country_list_item" id="vs-bm"> <span style="background-position:0px -1914px"></span> <a>+1-441</a> </li>
<li class="vs-country_list_item" id="vs-bj"> <span style="background-position:0px -1298px"></span> <a>+229</a> </li>
<li class="vs-country_list_item" id="vs-be"> <span style="background-position:0px -0px"></span> <a>+32</a> </li>
<li class="vs-country_list_item" id="vs-by"> <span style="background-position:0px -1100px"></span> <a>+375</a> </li>
<li class="vs-country_list_item" id="vs-bz"> <span style="background-position:0px -484px"></span> <a>+501</a> </li>
<li class="vs-country_list_item" id="vs-bt"> <span style="background-position:0px -1848px"></span> <a>+975</a> </li>
<li class="vs-country_list_item" id="vs-bw"> <span style="background-position:0px -2706px"></span> <a>+267</a> </li>
<li class="vs-country_list_item" id="vs-ba"> <span style="background-position:0px -1584px"></span> <a>+387</a> </li>
<li class="vs-country_list_item" id="vs-bv"> <span style="background-position:0px -836px"></span> <a>+47</a> </li>
<li class="vs-country_list_item" id="vs-bo"> <span style="background-position:0px -1650px"></span> <a>+591</a> </li>
<li class="vs-country_list_item" id="vs-io"> <span style="background-position:0px -55px"></span> <a>+246</a> </li>
<li class="vs-country_list_item" id="vs-br"> <span style="background-position:0px -770px"></span> <a>+55</a> </li>
<li class="vs-country_list_item" id="vs-bn"> <span style="background-position:0px -1683px"></span> <a>+673</a> </li>
<li class="vs-country_list_item" id="vs-bf"> <span style="background-position:0px -726px"></span> <a>+226</a> </li>
<li class="vs-country_list_item" id="vs-bi"> <span style="background-position:0px -1892px"></span> <a>+257</a> </li>
<li class="vs-country_list_item" id="vs-bg"> <span style="background-position:0px -2585px"></span> <a>+359</a> </li>
<li class="vs-country_list_item" id="vs-ca"> <span style="background-position:0px -1375px"></span> <a>+1</a> </li>
<li class="vs-country_list_item" id="vs-ky"> <span style="background-position:0px -308px"></span> <a>+1-345</a> </li>
<li class="vs-country_list_item" id="vs-cm"> <span style="background-position:0px -2057px"></span> <a>+237</a> </li>
<li class="vs-country_list_item" id="vs-cv"> <span style="background-position:0px -2651px"></span> <a>+238</a> </li>
<li class="vs-country_list_item" id="vs-kh"> <span style="background-position:0px -242px"></span> <a>+855</a> </li>
<li class="vs-country_list_item" id="vs-cf"> <span style="background-position:0px -1837px"></span> <a>+236</a> </li>
<li class="vs-country_list_item" id="vs-td"> <span style="background-position:0px -814px"></span> <a>+235</a> </li>
<li class="vs-country_list_item" id="vs-cn"> <span style="background-position:0px -825px"></span> <a>+86</a> </li>
<li class="vs-country_list_item" id="vs-cl"> <span style="background-position:0px -1342px"></span> <a>+56</a> </li>
<li class="vs-country_list_item" id="vs-cx"> <span style="background-position:0px -2805px"></span> <a>+61</a> </li>
<li class="vs-country_list_item" id="vs-hk"> <span style="background-position:0px -2695px"></span> <a>+852</a> </li>
<li class="vs-country_list_item" id="vs-mo"> <span style="background-position:0px -2596px"></span> <a>+853</a> </li>
<li class="vs-country_list_item" id="vs-ci"> <span style="background-position:0px -1661px"></span> <a>+225</a> </li>
<li class="vs-country_list_item" id="vs-cg"> <span style="background-position:0px -1793px"></span> <a>+242</a> </li>
<li class="vs-country_list_item" id="vs-km"> <span style="background-position:0px -1430px"></span> <a>+269</a> </li>
<li class="vs-country_list_item" id="vs-cr"> <span style="background-position:0px -2090px"></span> <a>+506</a> </li>
<li class="vs-country_list_item" id="vs-co"> <span style="background-position:0px -330px"></span> <a>+57</a> </li>
<li class="vs-country_list_item" id="vs-ck"> <span style="background-position:0px -2266px"></span> <a>+682</a> </li>
<li class="vs-country_list_item" id="vs-cc"> <span style="background-position:0px -2816px"></span> <a>+891</a> </li>
<li class="vs-country_list_item" id="vs-hr"> <span style="background-position:0px -902px"></span> <a>+385</a> </li>
<li class="vs-country_list_item" id="vs-cu"> <span style="background-position:0px -748px"></span> <a>+53</a> </li>
<li class="vs-country_list_item" id="vs-cy"> <span style="background-position:0px -561px"></span> <a>+357</a> </li>
<li class="vs-country_list_item" id="vs-cz"> <span style="background-position:0px -2255px"></span> <a>+420</a> </li>
<li class="vs-country_list_item" id="vs-cg"> <span style="background-position:0px -1518px"></span> <a>+243</a> </li>
<li class="vs-country_list_item" id="vs-dk"> <span style="background-position:0px -1386px"></span> <a>+45</a> </li>
<li class="vs-country_list_item" id="vs-dj"> <span style="background-position:0px -2101px"></span> <a>+253</a> </li>
<li class="vs-country_list_item" id="vs-dm"> <span style="background-position:0px -2431px"></span> <a>+1-767</a> </li>
<li class="vs-country_list_item" id="vs-do"> <span style="background-position:0px -1529px"></span> <a>+1-809</a> </li>
<li class="vs-country_list_item" id="vs-tp"> <span style="background-position:0px -2783px"></span> <a>+670</a> </li>
<li class="vs-country_list_item" id="vs-ec"> <span style="background-position:0px -1188px"></span> <a>+593</a> </li>
<li class="vs-country_list_item" id="vs-eg"> <span style="background-position:0px -2200px"></span> <a>+20</a> </li>
<li class="vs-country_list_item" id="vs-sv"> <span style="background-position:0px -1639px"></span> <a>+503</a> </li>
<li class="vs-country_list_item" id="vs-gq"> <span style="background-position:0px -1507px"></span> <a>+240</a> </li>
<li class="vs-country_list_item" id="vs-er"> <span style="background-position:0px -715px"></span> <a>+291</a> </li>
<li class="vs-country_list_item" id="vs-ee"> <span style="background-position:0px -2409px"></span> <a>+372</a> </li>
<li class="vs-country_list_item" id="vs-et"> <span style="background-position:0px -2442px"></span> <a>+251</a> </li>
<li class="vs-country_list_item" id="vs-fo"> <span style="background-position:0px -1111px"></span> <a>+298</a> </li>
<li class="vs-country_list_item" id="vs-fk"> <span style="background-position:0px -2761px"></span> <a>+500</a> </li>
<li class="vs-country_list_item" id="vs-fi"> <span style="background-position:0px -1903px"></span> <a>+358</a> </li>
<li class="vs-country_list_item" id="vs-fj"> <span style="background-position:0px -1859px"></span> <a>+679</a> </li>
<li class="vs-country_list_item" id="vs-tf"> <span style="background-position:0px -2827px"></span> <a>+262</a> </li>
<li class="vs-country_list_item" id="vs-fr"> <span style="background-position:0px -1012px"></span> <a>+33</a> </li>
<li class="vs-country_list_item" id="vs-gf"> <span style="background-position:0px -2871px"></span> <a>+594</a> </li>
<li class="vs-country_list_item" id="vs-pf"> <span style="background-position:0px -1705px"></span> <a>+689</a> </li>
<li class="vs-country_list_item" id="vs-ga"> <span style="background-position:0px -880px"></span> <a>+241</a> </li>
<li class="vs-country_list_item" id="vs-de"> <span style="background-position:0px -2508px"></span> <a>+49</a> </li>
<li class="vs-country_list_item" id="vs-ge"> <span style="background-position:0px -858px"></span> <a>+995</a> </li>
<li class="vs-country_list_item" id="vs-gh"> <span style="background-position:0px -2112px"></span> <a>+233</a> </li>
<li class="vs-country_list_item" id="vs-gi"> <span style="background-position:0px -275px"></span> <a>+350</a> </li>
<li class="vs-country_list_item" id="vs-gd"> <span style="background-position:0px -2398px"></span> <a>+1-473</a> </li>
<li class="vs-country_list_item" id="vs-gl"> <span style="background-position:0px -1760px"></span> <a>+299</a> </li>
<li class="vs-country_list_item" id="vs-gr"> <span style="background-position:0px -165px"></span> <a>+30</a> </li>
<li class="vs-country_list_item" id="vs-gu"> <span style="background-position:0px -2365px"></span> <a>+1-671</a> </li>
<li class="vs-country_list_item" id="vs-gn"> <span style="background-position:0px -2574px"></span> <a>+224</a> </li>
<li class="vs-country_list_item" id="vs-gw"> <span style="background-position:0px -1925px"></span> <a>+245</a> </li>
<li class="vs-country_list_item" id="vs-gt"> <span style="background-position:0px -935px"></span> <a>+502</a> </li>
<li class="vs-country_list_item" id="vs-gp"> <span style="background-position:0px -407px"></span> <a>+590</a> </li>
<li class="vs-country_list_item" id="vs-gy"> <span style="background-position:0px -803px"></span> <a>+592</a> </li>
<li class="vs-country_list_item" id="vs-ht"> <span style="background-position:0px -319px"></span> <a>+509</a> </li>
<li class="vs-country_list_item" id="vs-hm"> <span style="background-position:0px -1716px"></span> <a>+672</a> </li>
<li class="vs-country_list_item" id="vs-va"> <span style="background-position:0px -2321px"></span> <a>+379</a> </li>
<li class="vs-country_list_item" id="vs-hn"> <span style="background-position:0px -2156px"></span> <a>+504</a> </li>
<li class="vs-country_list_item" id="vs-hu"> <span style="background-position:0px -682px"></span> <a>+36</a> </li>
<li class="vs-country_list_item" id="vs-is"> <span style="background-position:0px -1991px"></span> <a>+354</a> </li>
<li class="vs-country_list_item" id="vs-id"> <span style="background-position:0px -1958px"></span> <a>+62</a> </li>
<li class="vs-country_list_item" id="vs-in"> <span style="background-position:0px -1694px"></span> <a>+91</a> </li>
<li class="vs-country_list_item" id="vs-ie"> <span style="background-position:0px -1969px"></span> <a>+353</a> </li>
<li class="vs-country_list_item" id="vs-iq"> <span style="background-position:0px -649px"></span> <a>+964</a> </li>
<li class="vs-country_list_item" id="vs-ir"> <span style="background-position:0px -2013px"></span> <a>+98</a> </li>
<li class="vs-country_list_item" id="vs-il"> <span style="background-position:0px -341px"></span> <a>+972</a> </li>
<li class="vs-country_list_item" id="vs-it"> <span style="background-position:0px -143px"></span> <a>+39</a> </li>
<li class="vs-country_list_item" id="vs-jm"> <span style="background-position:0px -1727px"></span> <a>+1-876</a> </li>
<li class="vs-country_list_item" id="vs-jp"> <span style="background-position:0px -429px"></span> <a>+81</a> </li>
<li class="vs-country_list_item" id="vs-jo"> <span style="background-position:0px -1463px"></span> <a>+962</a> </li>
<li class="vs-country_list_item" id="vs-kz"> <span style="background-position:0px -1210px"></span> <a>+7</a> </li>
<li class="vs-country_list_item" id="vs-ke"> <span style="background-position:0px -2629px"></span> <a>+254</a> </li>
<li class="vs-country_list_item" id="vs-ki"> <span style="background-position:0px -374px"></span> <a>+686</a> </li>
<li class="vs-country_list_item" id="vs-kr"> <span style="background-position:0px -2244px"></span> <a>+82</a> </li>
<li class="vs-country_list_item" id="vs-kp"> <span style="background-position:0px -1804px"></span> <a>+850</a> </li>
<li class="vs-country_list_item" id="vs-kw"> <span style="background-position:0px -2486px"></span> <a>+965</a> </li>
<li class="vs-country_list_item" id="vs-kg"> <span style="background-position:0px -1617px"></span> <a>+996</a> </li>
<li class="vs-country_list_item" id="vs-lv"> <span style="background-position:0px -1936px"></span> <a>+371</a> </li>
<li class="vs-country_list_item" id="vs-la"> <span style="background-position:0px -451px"></span> <a>+856</a> </li>
<li class="vs-country_list_item" id="vs-ls"> <span style="background-position:0px -2189px"></span> <a>+266</a> </li>
<li class="vs-country_list_item" id="vs-lb"> <span style="background-position:0px -1254px"></span> <a>+961</a> </li>
<li class="vs-country_list_item" id="vs-ly"> <span style="background-position:0px -132px"></span> <a>+218</a> </li>
<li class="vs-country_list_item" id="vs-lr"> <span style="background-position:0px -2068px"></span> <a>+231</a> </li>
<li class="vs-country_list_item" id="vs-lt"> <span style="background-position:0px -1122px"></span> <a>+370</a> </li>
<li class="vs-country_list_item" id="vs-li"> <span style="background-position:0px -979px"></span> <a>+423</a> </li>
<li class="vs-country_list_item" id="vs-lu"> <span style="background-position:0px -1474px"></span> <a>+352</a> </li>
<li class="vs-country_list_item" id="vs-mr"> <span style="background-position:0px -253px"></span> <a>+222</a> </li>
<li class="vs-country_list_item" id="vs-ml"> <span style="background-position:0px -2519px"></span> <a>+223</a> </li>
<li class="vs-country_list_item" id="vs-mu"> <span style="background-position:0px -2178px"></span> <a>+230</a> </li>
<li class="vs-country_list_item" id="vs-mg"> <span style="background-position:0px -1287px"></span> <a>+261</a> </li>
<li class="vs-country_list_item" id="vs-mw"> <span style="background-position:0px -2145px"></span> <a>+265</a> </li>
<li class="vs-country_list_item" id="vs-yt"> <span style="background-position:0px -264px"></span> <a>+269</a> </li>
<li class="vs-country_list_item" id="vs-mt"> <span style="background-position:0px -1551px"></span> <a>+356</a> </li>
<li class="vs-country_list_item" id="vs-mk"> <span style="background-position:0px -1353px"></span> <a>+389</a> </li>
<li class="vs-country_list_item" id="vs-mq"> <span style="background-position:0px -198px"></span> <a>+596</a> </li>
<li class="vs-country_list_item" id="vs-my"> <span style="background-position:0px -1870px"></span> <a>+60</a> </li>
<li class="vs-country_list_item" id="vs-mh"> <span style="background-position:0px -1144px"></span> <a>+692</a> </li>
<li class="vs-country_list_item" id="vs-mv"> <span style="background-position:0px -616px"></span> <a>+960</a> </li>
<li class="vs-country_list_item" id="vs-mx"> <span style="background-position:0px -2024px"></span> <a>+52</a> </li>
<li class="vs-country_list_item" id="vs-fm"> <span style="background-position:0px -1738px"></span> <a>+691</a> </li>
<li class="vs-country_list_item" id="vs-ms"> <span style="background-position:0px -583px"></span> <a>+1-664</a> </li>
<li class="vs-country_list_item" id="vs-ma"> <span style="background-position:0px -2332px"></span> <a>+212</a> </li>
<li class="vs-country_list_item" id="vs-mz"> <span style="background-position:0px -638px"></span> <a>+258</a> </li>
<li class="vs-country_list_item" id="vs-md"> <span style="background-position:0px -2684px"></span> <a>+373</a> </li>
<li class="vs-country_list_item" id="vs-mc"> <span style="background-position:0px -913px"></span> <a>+377</a> </li>
<li class="vs-country_list_item" id="vs-me"> <span style="background-position:0px -2167px"></span> <a>+382</a> </li>
<li class="vs-country_list_item" id="vs-mn"> <span style="background-position:0px -2552px"></span> <a>+976</a> </li>
<li class="vs-country_list_item" id="vs-mm"> <span style="background-position:0px -11px"></span> <a>+95</a> </li>
<li class="vs-country_list_item" id="vs-na"> <span style="background-position:0px -1881px"></span> <a>+264</a> </li>
<li class="vs-country_list_item" id="vs-nr"> <span style="background-position:0px -1749px"></span> <a>+674</a> </li>
<li class="vs-country_list_item" id="vs-an"> <span style="background-position:0px -264px"></span> <a>+599</a> </li>
<li class="vs-country_list_item" id="vs-nz"> <span style="background-position:0px -1540px"></span> <a>+64</a> </li>
<li class="vs-country_list_item" id="vs-nc"> <span style="background-position:0px -1276px"></span> <a>+687</a> </li>
<li class="vs-country_list_item" id="vs-np"> <span style="background-position:0px -110px"></span> <a>+977</a> </li>
<li class="vs-country_list_item" id="vs-ne"> <span style="background-position:0px -550px"></span> <a>+227</a> </li>
<li class="vs-country_list_item" id="vs-ng"> <span style="background-position:0px -2475px"></span> <a>+234</a> </li>
<li class="vs-country_list_item" id="vs-ni"> <span style="background-position:0px -154px"></span> <a>+505</a> </li>
<li class="vs-country_list_item" id="vs-nu"> <span style="background-position:0px -2079px"></span> <a>+683</a> </li>
<li class="vs-country_list_item" id="vs-mp"> <span style="background-position:0px -704px"></span> <a>+1-670</a> </li>
<li class="vs-country_list_item" id="vs-no"> <span style="background-position:0px -836px"></span> <a>+47</a> </li>
<li class="vs-country_list_item" id="vs-nf"> <span style="background-position:0px -209px"></span> <a>+672</a> </li>
<li class="vs-country_list_item" id="vs-om"> <span style="background-position:0px -2453px"></span> <a>+968</a> </li>
<li class="vs-country_list_item" id="vs-pa"> <span style="background-position:0px -847px"></span> <a>+507</a> </li>
<li class="vs-country_list_item" id="vs-py"> <span style="background-position:0px -2343px"></span> <a>+595</a> </li>
<li class="vs-country_list_item" id="vs-pg"> <span style="background-position:0px -1485px"></span> <a>+675</a> </li>
<li class="vs-country_list_item" id="vs-pw"> <span style="background-position:0px -231px"></span> <a>+680</a> </li>
<li class="vs-country_list_item" id="vs-pk"> <span style="background-position:0px -2035px"></span> <a>+92</a> </li>
<li class="vs-country_list_item" id="vs-ps"> <span style="background-position:0px -1199px"></span> <a>+970</a> </li>
<li class="vs-country_list_item" id="vs-pe"> <span style="background-position:0px -946px"></span> <a>+51</a> </li>
<li class="vs-country_list_item" id="vs-ph"> <span style="background-position:0px -1815px"></span> <a>+63</a> </li>
<li class="vs-country_list_item" id="vs-pn"> <span style="background-position:0px -2838px"></span> <a>+872</a> </li>
<li class="vs-country_list_item" id="vs-pt"> <span style="background-position:0px -517px"></span> <a>+351</a> </li>
<li class="vs-country_list_item" id="vs-pl"> <span style="background-position:0px -1177px"></span> <a>+48</a> </li>
<li class="vs-country_list_item" id="vs-pr"> <span style="background-position:0px -473px"></span> <a>+1</a> </li>
<li class="vs-country_list_item" id="vs-qa"> <span style="background-position:0px -462px"></span> <a>+974</a> </li>
<li class="vs-country_list_item" id="vs-re"> <span style="background-position:0px -264px"></span> <a>+262</a> </li>
<li class="vs-country_list_item" id="vs-ro"> <span style="background-position:0px -671px"></span> <a>+40</a> </li>
<li class="vs-country_list_item" id="vs-ru"> <span style="background-position:0px -660px"></span> <a>+7</a> </li>
<li class="vs-country_list_item" id="vs-rw"> <span style="background-position:0px -2673px"></span> <a>+250</a> </li>
<li class="vs-country_list_item" id="vs-lc"> <span style="background-position:0px -1397px"></span> <a>+1-758</a> </li>
<li class="vs-country_list_item" id="vs-vc"> <span style="background-position:0px -2618px"></span> <a>+1-784</a> </li>
<li class="vs-country_list_item" id="vs-kn"> <span style="background-position:0px -99px"></span> <a>+1-869</a> </li>
<li class="vs-country_list_item" id="vs-st"> <span style="background-position:0px -2387px"></span> <a>+239</a> </li>
<li class="vs-country_list_item" id="vs-sh"> <span style="background-position:0px -495px"></span> <a>+290</a> </li>
<li class="vs-country_list_item" id="vs-sm"> <span style="background-position:0px -2123px"></span> <a>+378</a> </li>
<li class="vs-country_list_item" id="vs-pm"> <span style="background-position:0px -1078px"></span> <a>+508</a> </li>
<li class="vs-country_list_item" id="vs-ws"> <span style="background-position:0px -2299px"></span> <a>+685</a> </li>
<li class="vs-country_list_item" id="vs-sa"> <span style="background-position:0px -33px"></span> <a>+966</a> </li>
<li class="vs-country_list_item" id="vs-sn"> <span style="background-position:0px -2134px"></span> <a>+221</a> </li>
<li class="vs-country_list_item" id="vs-sc"> <span style="background-position:0px -1045px"></span> <a>+248</a> </li>
<li class="vs-country_list_item" id="vs-rs"> <span style="background-position:0px -2464px"></span> <a>+381</a> </li>
<li class="vs-country_list_item" id="vs-cs"> <span style="background-position:0px -2464px"></span> <a>+381</a> </li>
<li class="vs-country_list_item" id="vs-sl"> <span style="background-position:0px -737px"></span> <a>+232</a> </li>
<li class="vs-country_list_item" id="vs-sg"> <span style="background-position:0px -22px"></span> <a>+65</a> </li>
<li class="vs-country_list_item" id="vs-si"> <span style="background-position:0px -1221px"></span> <a>+386</a> </li>
<li class="vs-country_list_item" id="vs-sk"> <span style="background-position:0px -2211px"></span> <a>+421</a> </li>
<li class="vs-country_list_item" id="vs-ss"> <span style="background-position:0px -2739px"></span> <a>+211</a> </li>
<li class="vs-country_list_item" id="vs-so"> <span style="background-position:0px -1364px"></span> <a>+252</a> </li>
<li class="vs-country_list_item" id="vs-za"> <span style="background-position:0px -2354px"></span> <a>+27</a> </li>
<li class="vs-country_list_item" id="vs-sb"> <span style="background-position:0px -1067px"></span> <a>+677</a> </li>
<li class="vs-country_list_item" id="vs-gs"> <span style="background-position:0px -858px"></span> <a>+995</a> </li>
<li class="vs-country_list_item" id="vs-es"> <span style="background-position:0px -1155px"></span> <a>+34</a> </li>
<li class="vs-country_list_item" id="vs-lk"> <span style="background-position:0px -2640px"></span> <a>+94</a> </li>
<li class="vs-country_list_item" id="vs-sd"> <span style="background-position:0px -352px"></span> <a>+249</a> </li>
<li class="vs-country_list_item" id="vs-sr"> <span style="background-position:0px -2662px"></span> <a>+597</a> </li>
<li class="vs-country_list_item" id="vs-sj"> <span style="background-position:0px -836px"></span> <a>+47</a> </li>
<li class="vs-country_list_item" id="vs-sz"> <span style="background-position:0px -2277px"></span> <a>+268</a> </li>
<li class="vs-country_list_item" id="vs-ch"> <span style="background-position:0px -1320px"></span> <a>+41</a> </li>
<li class="vs-country_list_item" id="vs-se"> <span style="background-position:0px -385px"></span> <a>+46</a> </li>
<li class="vs-country_list_item" id="vs-sy"> <span style="background-position:0px -1826px"></span> <a>+963</a> </li>
<li class="vs-country_list_item" id="vs-tz"> <span style="background-position:0px -2288px"></span> <a>+255</a> </li>
<li class="vs-country_list_item" id="vs-tw"> <span style="background-position:0px -506px"></span> <a>+886</a> </li>
<li class="vs-country_list_item" id="vs-tj"> <span style="background-position:0px -187px"></span> <a>+992</a> </li>
<li class="vs-country_list_item" id="vs-gm"> <span style="background-position:0px -627px"></span> <a>+220</a> </li>
<li class="vs-country_list_item" id="vs-nl"> <span style="background-position:0px -1441px"></span> <a>+31</a> </li>
<li class="vs-country_list_item" id="vs-th"> <span style="background-position:0px -957px"></span> <a>+66</a> </li>
<li class="vs-country_list_item" id="vs-tg"> <span style="background-position:0px -605px"></span> <a>+228</a> </li>
<li class="vs-country_list_item" id="vs-to"> <span style="background-position:0px -1089px"></span> <a>+676</a> </li>
<li class="vs-country_list_item" id="vs-tk"> <span style="background-position:0px -2750px"></span> <a>+690</a> </li>
<li class="vs-country_list_item" id="vs-tt"> <span style="background-position:0px -440px"></span> <a>+1-868</a> </li>
<li class="vs-country_list_item" id="vs-tc"> <span style="background-position:0px -1309px"></span> <a>+1-649</a> </li>
<li class="vs-country_list_item" id="vs-tn"> <span style="background-position:0px -539px"></span> <a>+216</a> </li>
<li class="vs-country_list_item" id="vs-tv"> <span style="background-position:0px -286px"></span> <a>+688</a> </li>
<li class="vs-country_list_item" id="vs-tr"> <span style="background-position:0px -1606px"></span> <a>+90</a> </li>
<li class="vs-country_list_item" id="vs-tm"> <span style="background-position:0px -2541px"></span> <a>+993</a> </li>
<li class="vs-country_list_item" id="vs-ug"> <span style="background-position:0px -1166px"></span> <a>+256</a> </li>
<li class="vs-country_list_item" id="vs-ua"> <span style="background-position:0px -2002px"></span> <a>+380</a> </li>
<li class="vs-country_list_item" id="vs-um"> <span style="background-position:0px -44px"></span> <a>+1</a> </li>
<li class="vs-country_list_item" id="vs-us"> <span style="background-position:0px -44px"></span> <a>+1</a> </li>
<li class="vs-country_list_item" id="vs-uk"> <span style="background-position:0px -55px"></span> <a>+44</a> </li>
<li class="vs-country_list_item" id="vs-ae"> <span style="background-position:0px -2222px"></span> <a>+971</a> </li>
<li class="vs-country_list_item" id="vs-uy"> <span style="background-position:0px -2607px"></span> <a>+598</a> </li>
<li class="vs-country_list_item" id="vs-uz"> <span style="background-position:0px -1001px"></span> <a>+998</a> </li>
<li class="vs-country_list_item" id="vs-vu"> <span style="background-position:0px -1265px"></span> <a>+678</a> </li>
<li class="vs-country_list_item" id="vs-yv"> <span style="background-position:0px -1056px"></span> <a>+58</a> </li>
<li class="vs-country_list_item" id="vs-vg"> <span style="background-position:0px -1408px"></span> <a>+1-284</a> </li>
<li class="vs-country_list_item" id="vs-vi"> <span style="background-position:0px -1782px"></span> <a>+1-340</a> </li>
<li class="vs-country_list_item" id="vs-vd"> <span style="background-position:0px -968px"></span> <a>+84</a> </li>
<li class="vs-country_list_item" id="vs-wf"> <span style="background-position:0px -1012px"></span> <a>+681</a> </li>
<li class="vs-country_list_item" id="vs-eh"> <span style="background-position:0px -1199px"></span> <a>+212</a> </li>
<li class="vs-country_list_item" id="vs-ye"> <span style="background-position:0px -1672px"></span> <a>+967</a> </li>
<li class="vs-country_list_item" id="vs-yu"> <span style="background-position:0px -2860px"></span> <a>+38</a> </li>
<li class="vs-country_list_item" id="vs-zm"> <span style="background-position:0px -1595px"></span> <a>+260</a> </li>
<li class="vs-country_list_item" id="vs-zw"> <span style="background-position:0px -2046px"></span> <a>+263</a> </li>
						</ul>
				</div>
			</div>
			<input name="vs_tel" id="vsbox_tel" class="email-input" type="text" placeholder="Enter your real Whatsapp number" />
		</div>
			<input name="vs_company" id="vsbox_company" style="display: none;margin-bottom: 20px;" class="email-input" type="text" placeholder="Enter your real company name" />
			<textarea id="vsbox_message" name="vsbox_message" class="email-input" style="display:none;width:95%" placeholder="Lastly:We want to give you the best offer we have, please provide us with the exact product details you need and the quantity to purchase.(10 char least)"></textarea>
        <button id="btn_submit" type="submit" class="btn btn-primary">Get it now</button>
      </form>
    `,'af');
    }
