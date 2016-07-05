var style = function() {/*
<style>
  .no-scroll {
    overflow: hidden;
  }
  .no-scroll body {
    overflow: hidden;
  }
  #nmlist {
    position: fixed;
    right: 100%;
    width: 100%;
    bottom: 0;
    top: 0;
    z-index: 102;
    margin-right: 3px;
    background: #FFF;
    transition: right 0.3s;
  }
  #nmlist h2 {
    line-height: 40px;
    text-align: center;
    font-size: 24px;
    background: #FFF;
    margin-top: 10px;
    box-shadow: 0 3px 3px #dfdfdf;
    position: relative;
    z-index: 1;
  }
  #nmlist ul {
    position: absolute;
    left: 0;
    right: 0;
    top: 40px;
    bottom: 0;
    padding: 20px;
    overflow: scroll;
  }
  #nmlist li {
    float: left;
    width: 140px;
    height: 140px;
    position: relative;
    margin-right: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    transition: all 0.3s;
    overflow:hidden;
    background: #FAFAFA;
  }
  #nmlist li:after {
    font-family: "iconfont";
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -15px;
    margin-top: -15px;
    height: 30px;
    line-height: 30px;
    width: 30px;
    text-align: center;
    font-size: 32px;
    color: rgba(255, 68, 0, 0.6);
    opacity: 0;
    content: attr(data-start);
  }
  #nmlist li:hover:after {
    opacity: 1;
    color: rgb(255, 68, 0);
  }
  #nmlist li.on:after {
    opacity: 1;
    color: rgb(255, 68, 0);
    content: attr(data-pause);
  }
  #nmlist li.play:after {
    opacity: 1;
    color: rgb(255, 68, 0);
    content: attr(data-start);
  }
  #nmlist li.loading:after {
    opacity: 1;
    color: #f40;
    content: '加载中...';
    font-size: 16px;
    left: 0;
    right: 0;
    width: auto;
    margin: 0;
    margin-top: -20px;
    font-weight: normal;
    background: rgba(255,255,255,0.4);
  }
  #nmlist li img {
    width: 140px;
    height: 140px;
    background: #EEE;
    line-height: 140px;
    overflow: hidden;
    font-size: 12px;
    text-align: center;
  }
  #nmlist li:hover img {
    font-weight: bold;
  }
  #nmlist li span {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -50px;
    max-height: 40px;
    overflow: hidden;
    line-height: 20px;
    font-size: 12px;
    background: rgba(0,0,0,.5);
    color: #FFF;
    padding: 5px 8px;
    transition: bottom 0.3s;
  }
  #nmlist li:hover span, #nmlist li.on span, #nmlist li.loading span, #nmlist li.play span {
    bottom: 0;
    transition: bottom 0.3s;
  }
  #nmlist li:hover b, #nmlist li.on b, #nmlist li.loading b, #nmlist li.play b {
    transition: background 0.3s;
    background: rgba(0,0,0,.5);
  }
  #nmlist li b {
    transition: background 0.3s;
    position: absolute;
    font-size: 12px;
    color: #fff;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: rgba(0,0,0,.3);
    top: 0;
    right: 0;
  }
  #nmlist i {
    position: absolute;
    right: -36px;
    top: 50%;
    margin-top: -18px;
    height: 36px;
    width: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 6px;
    color: #666;
    font-size: 18px;
    transition: all 0.3s;
    cursor: pointer;
    z-index: 104;
  }
  #nmlist i:after {
    content: attr(data-start);
  }
  #nmlist i:hover {
    color: #000;
    transition: color 0.3s;
  }
  #nmlist.nmlist-opened {
    right: 0;
    margin-right: 0;
    transition: right 0.3s;
  }
  #nmlist.nmlist-opened i {
    right: 10px;
    transition: all 0.3s;
  }
  #nmlist.nmlist-opened i:after {
    content: attr(data-pause);
  }
  #nmPlayer {
    position: fixed;
    top: 100%;
    left: 0;
    margin-top: -126px;
    margin-left: 60px;
    z-index: 83;
    cursor: move;
    background: rgba(250, 250, 250, 0.8);
    min-width: 300px;
  }
  @media screen and (max-width: 800px) {
    #nmPlayer {
      top: auto !important;
      bottom: 0 !important;
      left: 0 !important;
      margin: 0 !important;
      min-width: 66px;
    }
    .aplayer-info, .aplayer-controller, .aplayer-list {
      display: none;
    }
    #nmlist li span {
      bottom: 0;
    }
  }
</style>
*/}.toString().replace(/^[\s\S]*?\/\*|\*\/\}[\s\S]*$/gmi, '');

var nmlist = {
  "250819": {
    "id": "250819",
    "title": "50首历史上最伟大的摇滚歌曲",
    "author": "霍克",
    "count": 46,
    "cover": "http://p4.music.126.net/SRIuNGqyxuEDDRsrF6hePQ==/2079176488137101.jpg"
  },
  "837456": {
    "id": "837456",
    "title": "听一句就会喜欢上的英文歌",
    "author": "山北大洋",
    "count": 116,
    "cover": "http://p4.music.126.net/4VASY7gX3rXv4ZNycMtaag==/3114916441497858.jpg"
  },
  "2535961": {
    "id": "2535961",
    "title": "李宗盛30年（上）",
    "author": "小石榴不错哟",
    "count": 200,
    "cover": "http://p4.music.126.net/mvOIUyknh0SjF7D56QKEwg==/5693271208664177.jpg"
  },
  "2783240": {
    "id": "2783240",
    "title": "许巍的歌是岁月酿的酒",
    "author": "Roger",
    "count": 23,
    "cover": "http://p3.music.126.net/fFBRcYhQ3wQxqgcxbeFuDA==/2830142929938073.jpg"
  },
  "2892108": {
    "id": "2892108",
    "title": "必收藏的二十首英文歌（精选）",
    "author": "李晶mm",
    "count": 19,
    "cover": "http://p3.music.126.net/AInkBgBdNpE7-3MOepS5LQ==/2824645371799530.jpg"
  },
  "3309010": {
    "id": "3309010",
    "title": "无法抗拒的好声音",
    "author": "妖妖酒",
    "count": 14,
    "cover": "http://p4.music.126.net/DhOEwqfEV22XlZEcyI3soA==/5503055697107394.jpg"
  },
  "3696034": {
    "id": "3696034",
    "title": "就是小众",
    "count": 133,
    "cover": "http://p4.music.126.net/yiKw3sfzIcyLiziASWWLqg==/2885118512184436.jpg"
  },
  "4046727": {
    "id": "4046727",
    "title": "缓解减压的好音乐",
    "author": "Lachelle",
    "count": 10,
    "cover": "http://p4.music.126.net/-jOGrB-kUUiQlyqy16xnDg==/1240249116178125.jpg"
  },
  "4142084": {
    "id": "4142084",
    "title": "用心去聆听，最美中国风",
    "author": "正小守",
    "count": 51,
    "cover": "http://p4.music.126.net/R3T0D0ya0coGHK3xks6DXw==/1896657558004533.jpg"
  },
  "4378013": {
    "id": "4378013",
    "title": "『华语』轻柔女声悲伤倒计时",
    "author": "墨_子柔",
    "count": 29,
    "cover": "http://p4.music.126.net/q_KhpJ7s4VJW-tb5flR8fQ==/1252343744115866.jpg"
  },
  "4535425": {
    "id": "4535425",
    "title": "听一遍就爱不释手",
    "author": "imDeo",
    "count": 74,
    "cover": "http://p3.music.126.net/WmY4-HFUo-a6hVg3EKWonQ==/2153943278840988.jpg"
  },
  "4738348": {
    "id": "4738348",
    "title": "小众但好听的英文歌①",
    "author": "shooting丶star",
    "count": 121,
    "cover": "http://p4.music.126.net/rEGXXxHaRfvUA_axl_xe5Q==/5841705278375015.jpg"
  },
  "4803006": {
    "id": "4803006",
    "title": "健身房运动歌单",
    "author": "吖绵绵",
    "count": 47,
    "cover": "http://p3.music.126.net/voXXrYMGjBbi_O1nbs5rcw==/1902155116171228.jpg"
  },
  "5022737": {
    "id": "5022737",
    "title": "精致小语种❤浪漫小众20首",
    "author": "素岛",
    "count": 20,
    "cover": "http://p4.music.126.net/smNdMTvDmSTen8nNbhiXsQ==/5792227255130071.jpg"
  },
  "5874646": {
    "id": "5874646",
    "title": "中国一人一首民谣",
    "author": "原创君",
    "count": 93,
    "cover": "http://p3.music.126.net/IgGn0wDVlFUHYCOXTw6JTw==/6024224208641324.jpg"
  },
  "6180953": {
    "id": "6180953",
    "title": "那些舍不得删的华语歌",
    "author": "Clark超人先生",
    "count": 103,
    "cover": "http://p4.music.126.net/WiooLdd_IntJiiZTbipK3g==/5654788301778747.jpg"
  },
  "7993654": {
    "id": "7993654",
    "title": "盘点那些耳熟能详的小清新",
    "author": "shooting丶star",
    "count": 100,
    "cover": "http://p4.music.126.net/cU-8_X_g8NQIwZU-CbBMAQ==/6011030069052271.jpg"
  },
  "8827357": {
    "id": "8827357",
    "title": "近几年好听的华语新歌",
    "author": "方-萌",
    "count": 93,
    "cover": "http://p4.music.126.net/lh_2V_8z8m-rYeNxyGajGA==/5965950092358290.jpg"
  },
  "9441723": {
    "id": "9441723",
    "title": "罗永浩微博分享合集",
    "author": "Psy心未逝",
    "count": 219,
    "cover": "http://p3.music.126.net/ZqLN6-6bbcC_noU0zjGeew==/5869193069231050.jpg"
  },
  "9601878": {
    "id": "9601878",
    "title": "学习时听的清新欧美小调",
    "author": "DJ雪莉",
    "count": 18,
    "cover": "http://p4.music.126.net/1sMlPjjMt2jIV5t43nN4pg==/6015428115681526.jpg"
  },
  "11888389": {
    "id": "11888389",
    "title": "杂良音",
    "count": 133,
    "cover": "http://p3.music.126.net/t0RSGoEnZ_OGIMvwXCevMQ==/3228166139854194.jpg"
  },
  "22974634": {
    "id": "22974634",
    "title": "摇滚中国1000首",
    "author": "耳朵冒烟",
    "count": 996,
    "cover": "http://p4.music.126.net/xfo5CSUsXO4iP0hwe-KfGA==/5974746185911426.jpg"
  },
  "23169019": {
    "id": "23169019",
    "title": "情人节，唱歌给你听",
    "author": "jenniferchen",
    "count": 43,
    "cover": "http://p4.music.126.net/fQl5XUjX0EHlXbI47QQkjA==/5995636906836268.jpg"
  },
  "24716501": {
    "id": "24716501",
    "title": "听见好时光. 网易音乐人LIVE 北京站",
    "author": "原创君",
    "count": 10,
    "cover": "http://p3.music.126.net/UX-ZAYzbOp15vSrNcTs1Vw==/8901646138618004.jpg"
  },
  "26434035": {
    "id": "26434035",
    "title": "2014 YG Family Concert歌单",
    "author": "我是一只烤全羊",
    "count": 79,
    "cover": "http://p3.music.126.net/VJOUvf21iZlKEE3GI14X6g==/6652045348284233.jpg"
  },
  "32040661": {
    "id": "32040661",
    "title": "他们老。江湖死。",
    "author": "螺丝起子",
    "count": 40,
    "cover": "http://p3.music.126.net/eYXKqm7o18G6AzaHPv3lHQ==/6660841441942973.jpg"
  },
  "33969334": {
    "id": "33969334",
    "title": "若有音「欧美」",
    "count": 98,
    "cover": "http://p3.music.126.net/SXRNtREvW981pGWxK9c0Gg==/1405175869979341.jpg"
  },
  "34794933": {
    "id": "34794933",
    "title": "轻电音•点燃沉睡的海洋",
    "author": "循光",
    "count": 15,
    "cover": "http://p3.music.126.net/2Y3zbg2tVFFawCbS_PWybQ==/7771348185318754.jpg"
  },
  "37426351": {
    "id": "37426351",
    "title": "李志",
    "count": 144,
    "cover": "http://p3.music.126.net/PNWRoOw2UyHKE7eSo4NKHQ==/1375489048830535.jpg"
  },
  "49242031": {
    "id": "49242031",
    "title": "小酒馆的微醺需要腔调和情怀",
    "author": "齊宣王啃牛角",
    "count": 30,
    "cover": "http://p3.music.126.net/KBu6AzUPu4M3rfJWcCbuDA==/2885118512088643.jpg"
  },
  "53833481": {
    "id": "53833481",
    "title": "哪句歌词曾让你热泪盈眶",
    "author": "Zealer__",
    "count": 105,
    "cover": "http://p3.music.126.net/-H4gCTr4LHPF2WW7_jYYCw==/7868105208693406.jpg"
  },
  "63733309": {
    "id": "63733309",
    "title": "进不可相恋 退不可相忘",
    "author": "夜莺与玫瑰",
    "count": 47,
    "cover": "http://p4.music.126.net/SBoByfP4CTCamUqx_gbbOw==/2945591650927733.jpg"
  },
  "71623818": {
    "id": "71623818",
    "title": "♬ 可以听到老的100首粤语",
    "author": "-安玥冉",
    "count": 100,
    "cover": "http://p3.music.126.net/rX3Eb-KFNONScQcS0gG9yA==/7709775534753025.jpg"
  },
  "80535405": {
    "id": "80535405",
    "title": "其实都是关于我爱你",
    "count": 11,
    "cover": "http://p4.music.126.net/M1lM2lOocBhjGT2KtA7SXQ==/113249697678889.jpg"
  },
  "85731479": {
    "id": "85731479",
    "title": "♬ 从你的歌声听懂你的故事（唱作人）",
    "author": "-安玥冉",
    "count": 20,
    "cover": "http://p3.music.126.net/ZWVWqFY2si3s2ivwrwO1uQ==/7847214488424422.jpg"
  },
  "100845865": {
    "id": "100845865",
    "title": "爱上村夫，性感乡村男声",
    "author": "多愁善感贾婷婷",
    "count": 24,
    "cover": "http://p4.music.126.net/4RYlDVqkEFM-teh4AA2nWg==/7957165652269204.jpg"
  },
  "105065085": {
    "id": "105065085",
    "title": "\"冷门歌手\"，热门单曲。【欧美】",
    "author": "独行的灵魂",
    "count": 144,
    "cover": "http://p3.music.126.net/inEMCtzAWZ8HU7teVei5Dw==/7801035000308150.jpg"
  },
  "130902948": {
    "id": "130902948",
    "title": "American Songwriter: 2015年50张最佳专辑",
    "author": "浮图音乐",
    "count": 43,
    "cover": "http://p4.music.126.net/wSpQRVRH60Og_YU0QCmi2A==/3406287025814130.jpg"
  },
  "148561936": {
    "id": "148561936",
    "title": "16年一月最爱",
    "count": 21,
    "cover": "http://p3.music.126.net/9lJdlA33rRjNcBtRniyl_A==/2534374306701038.jpg"
  },
  "167897049": {
    "id": "167897049",
    "title": "熊大宝",
    "count": 3,
    "cover": "http://p3.music.126.net/QcuOobJj-M4MuWPWfeefiA==/3236962234626856.jpg"
  },
  "362197741": {
    "id": "362197741",
    "title": "Love-Music",
    "count": 11,
    "cover": "http://p3.music.126.net/Q8HIzL2Dcio1B7NBv--B6A==/727876697596025.jpg"
  },
  "377030704": {
    "id": "377030704",
    "title": "Boxes",
    "count": 11,
    "cover": "http://p4.music.126.net/wxI4j8Te22qI-AcNu2oJ8A==/16641108487010635.jpg"
  },
  "377712670": {
    "id": "377712670",
    "title": "来自豆瓣",
    "count": 9,
    "cover": "http://p3.music.126.net/vHFMvPZnDMkSbDkD60HCbg==/2538772349661931.jpg"
  },
  "396359016": {
    "id": "396359016",
    "title": "走路民谣",
    "count": 1,
    "cover": "http://p3.music.126.net/IhQPwQUaCUhseyXMOhnY2g==/16592729975160609.jpg"
  }
};

var NM = {
  cache: {},
  imgLoaded: false,
  init: function() {
    if ($("#nmlist").size()) {
      return;
      // $("#nmlist").remove();
    }
    this.render();
    this.bind();
  },

  render: function() {
    var xtpl = '<li data-id="{id}" data-start="&#xe60e;" data-pause="&#xe608;"><img data-src="{cover}?param=280y280" alt="{title}"/><span>{title}</span><b>{count}</b></li>';
    var str = style + '<div id="nmlist"><h2>小胡子哥的歌单</h2><i class="icon" data-start="&#x261e;" data-pause="&#xe600;"></i><ul>';
    for (var key in nmlist) {
      str += xtpl.replace(/\{([^\}]+?)\}/g, function(m0, m1) {
        return nmlist[key][m1];
      });
    }
    str += '</ul></div>';
    $('html').append(str);
  },

  justify: function() {
    var W = $('#nmlist ul').width();
    var num = parseInt((W + 20) / 160);
    var delta = Math.floor((W - num * 140) / (num));
    $('#nmlist li').css("margin-right", delta);
  },

  bind: function() {
    var self = this;
    $("#nmlist .icon").on('click', function() {
      $("#nmlist").toggleClass('nmlist-opened');
      $('html').toggleClass('no-scroll');
      if(!NM.imgLoaded) {
        NM.imgLoaded = true;
        $('#nmlist img').each(function() {
          $(this).attr('src', $(this).attr('data-src')).hide().fadeIn();
        });
      }
      if ($("#nmlist").hasClass('nmlist-opened')) {
        self.justify();
      }
    });
    $("#nmlist li").on('click', function() {
      var $this = $(this);
      var id = $this.attr('data-id');
      if ($this.hasClass('loading')) {
        return;
      }
      if ($this.hasClass('on')) {
        $this.toggleClass('play');
        self.togglePlay();
        return;
      }
      $("#nmlist li").removeClass('on');
      $("#nmlist li").removeClass('play');
      $this.addClass('loading');
      self.pause();
      self.start(id);
    });
    $(window).on('resize', function() {
      self.justify();
      // var $p = $('#nmPlayer');
      // var offset = $p.offset();
      // var W = $(window).width();
      // var H = $(window).height();
      // var pW = $p.width();
      // var pH = $p.height();
      // var top = Math.min(offset.top, H - pH);
      // var left = Math.max(offset.left, W);
      // $p.css({
      //   left: left,
      //   top: top
      // });
    });
    $('body').on('keydown', function(e) {
      if(e.target.nodeName.toLowerCase() == 'body') {
        if(e.keyCode == 32) {
          e.preventDefault();
          self.togglePlay();
        }
        if(e.keyCode == 27) {
          $(".nmlist-opened").removeClass("nmlist-opened");
          $('html').removeClass('no-scroll');
        }
      }
    });
  },

  start: function(id) {
    var self = this;
    var musicList = this.cache[id];
    if (musicList) {
      self._startSong(musicList, id);
      return;
    }
    window['jsonp' + id] = function(list) {
      musicList = list;
      self.cache[id] = musicList;
      self._startSong(musicList, id);
      delete window['jsonp' + id];
    };
    $.getScript('/music/' + id + '.js');
  },

  _startSong: function(list, id) {
    var self = this;
    var songs = list;
    var $target = $("#nmlist li[data-id='" + id + "']");
    $("#nmlist li").removeClass('on');
    $("#nmlist li").removeClass('play');
    $target.removeClass('loading');
    $target.addClass('on');
    if (list.collect_author) {
      songs = [];
      for (var i = 0, len = list.songs.length; i < len; i++) {
        var item = list.songs[i];
        songs.push({
          title: item.title,
          author: list.collect_author,
          url: item.mp3,
          pic: list.collect_cover + "?param=280y280"/*,
          lrc: (function() {
            var lrcs = item.lrc;
            var ret = [];
            for (var key in lrcs) {
              var h = Math.floor(key / 60 / 60);
              var m = Math.floor((key - 60 * h) / 60);
              var s = key - 60 * 60 * h - 60 * m;
              h = h < 10 ? '0' + h : h;
              m = m < 10 ? '0' + m : m;
              s = s < 10 ? '0' + s : s;
              ret.push(['[', h, ':', m, ':', s, ']', lrcs[key]].join(''));
            }
            return ret.join('\n');
          })()*/
        })
      }
    }
    if (!$('#nmPlayer').size()) {
      $('<div id="nmPlayer" class="aplayer"></div>').appendTo($('html')).dragmove();
    }
    var option = {
      element: document.getElementById('nmPlayer'),
      narrow: false,
      autoplay: true,
      showlrc: 0,
      mutex: true,
      theme: '#e6d0b2',
      loop: true,
      preload: 'metadata',
      music: songs
    }
    self.pause();
    window._ap = new APlayer(option);
    window._ap.init();
    self.restart();
    $(".aplayer-list").addClass('aplayer-list-hide');
  },

  pause: function() {
    window._ap && window._ap.pause();
  },

  restart: function() {
    window._ap && window._ap.play();
  },

  togglePlay: function() {
    if($('#nmPlayer').attr('data-paused')) {
      $('#nmPlayer').removeAttr('data-paused');
      this.restart();
    } else {
      $('#nmPlayer').attr('data-paused', '1');
      this.pause();
    }
  }
};


NM.init();


$.fn.dragmove = function() {
  return this.each(function() {
    var $document = $(document),
      $this = $(this),
      active,
      startX,
      startY;
    $this.on('mousedown touchstart', function(e) {
      active = true;
      startX = e.originalEvent.pageX - $this.offset().left;
      startY = e.originalEvent.pageY - $this.offset().top;
      if ('mousedown' == e.type)
        click = $this;
      if ('touchstart' == e.type)
        touch = $this;
      if (window.mozInnerScreenX == null)
        return false;
    });
    $document.on('mousemove touchmove', function(e) {
      if ('mousemove' == e.type && active)
        click.offset({
          left: e.originalEvent.pageX - startX,
          top: e.originalEvent.pageY - startY
        });
      if ('touchmove' == e.type && active)
        touch.offset({
          left: e.originalEvent.pageX - startX,
          top: e.originalEvent.pageY - startY
        });
    }).on('mouseup touchend', function() {
      active = false;
    });
  });
};