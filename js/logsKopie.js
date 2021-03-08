//                      _              __
//                     | |            / _|
//  ___  __ _ _ __  ___| |__   ___   | |_ ___  _ __ _____   _____ _ __
// / __|/ _` | '_ \/ __| '_ \ / _ \  |  _/ _ \| '__/ _ \ \ / / _ \ '__|
// \__ \ (_| | | | \__ \ | | | (_) | | || (_) | | |  __/\ V /  __/ |
// |___/\__,_|_| |_|___/_| |_|\___/  |_| \___/|_|  \___| \_/ \___|_| and ever and ever ...
//
//
// thank you Sansho so much.
// sorry for this appropriation, but it was necessary.
//

var numberOfQuestions = 1;
var speechactivated = false;
var unansweredQuestions = 0;
$('#main1, #main2, #main3, #main4, #end').hide();
$('#notchrome, #nomedia, #emotion_chart, #waveform, #notdesktop').hide();
$('#videoloader, #norecognition, #nomicallowed, #redFlash, .speakCircle').hide();

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (isChrome) {
} else {
  $('#notchrome').show();
}

var ua = navigator.userAgent;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
  $('#notdesktop').show();
  $('.imprintlink').hide();
  $('.privacylink').hide();
}

var wavesurfer = WaveSurfer.create({ container: '#waveform', waveColor: 'white' });

var microphone = Object.create(WaveSurfer.Microphone);

microphone.init({
  wavesurfer: wavesurfer,
});

microphone.on('deviceReady', function (stream) {
  console.log('The trainer is ready!', stream);
});
microphone.on('deviceError', function (code) {
  console.warn('Trainer error: ' + code);
  $('#nomedia').show();
});

Pace.on('done', function () {
  $('#introsound').trigger('play');

  // console.log($("#introsound")[0].paused);

  if ($('#introsound')[0].paused) {
    // audio not playing. show auto play hint
    $('#intro').css('display', 'none').hide();
    $('#noAutoplay').css('display', 'flex').hide().fadeIn();
  } else {
    $('.h1, .h2, .h3, .h4, .h5').addClass('go');
    setTimeout(function () {
      initCamera();
    }, 9200);
  }

  if ($('#nomedia').is(':visible')) {
    $('#introsound').trigger('pause');
    $('body').append("<audio src='videos/nomediasound.mp3' id='nomediasound'></audio>");
    $('#nomediasound').trigger('play');
  }

  if ($('#notchrome').is(':visible')) {
    $('#introsound').trigger('pause');
  }
});

$('#noAutoplay').click(function () {
  $('#noAutoplay').hide();
  $('#intro').css('display', 'none').hide().fadeIn();
  $('.h1, .h2, .h3, .h4, .h5').addClass('go');
  $('#introsound').trigger('play');
  setTimeout(function () {
    initCamera();
  }, 9200);
});

var cho = Math.floor(Math.random() * 2) + 1;
if (cho == 1) {
  $('#imprintname').append('Vinzenz Aubry, Fabian Burghardt');
  $('#made').append(
    '<a href="https://www.instagram.com/vinzenzaubry/" target="_blank" class="curated1"> @vinzenzaubry</a> & <a href="https://twitter.com/fabuchao" target="_blank" class="curated1 twentypx">@fabuchao</a> Camera: <a href="https://www.instagram.com/franz.becker/" target="_blank" class="curated1 twentypx">@franz.becker</a> Sven: <a href="https://twitter.com/svengelhaus" target="_blank" class="curated1">@svengelhaus</a>'
  );
} else {
  $('#imprintname').append('Fabian Burghardt, Vinzenz Aubry');
  $('#made').append(
    '<a href="https://twitter.com/fabuchao" target="_blank" class="curated1"> @fabuchao</a> & <a href="https://www.instagram.com/vinzenzaubry/" target="_blank" class="curated1 twentypx">@vinzenzaubry</a> Camera: <a href="https://www.instagram.com/franz.becker/" target="_blank" class="curated1 twentypx">@franz.becker</a> Sven: <a href="https://twitter.com/svengelhaus" target="_blank" class="curated1">@svengelhaus</a>'
  );
}

var question1_1 = { sauce: 'videos/question1-1.mp4', timecode: '4.5', subtitlestart: '3600', subtitleend: '7600', subtitle: 'Zdravím, jste v rizikové skupině?' };
var question1_1a = { sauce: 'videos/question1-1.mp4', timecode: '4.5', subtitlestart: '3600', subtitleend: '7600', subtitle: 'Jste riziková skupina?' };
var question1_2 = { sauce: 'videos/question1-2.mp4', timecode: '4.5', subtitlestart: '3600', subtitleend: '7600', subtitle: 'Dobrý den, jaký máte zákonný nárok na očkování?' };
var question1_2a = { sauce: 'videos/question1-2.mp4', timecode: '4.5', subtitlestart: '3600', subtitleend: '7600', subtitle: 'Proč se jdete očkovat?' };
var question1_3 = { sauce: 'videos/question1-3.mp4', timecode: '6.3', subtitlestart: '5680', subtitleend: '9680', subtitle: 'Dobrý den, kolik Vám je let?' };
var question1_3a = { sauce: 'videos/question1-3.mp4', timecode: '6.3', subtitlestart: '5680', subtitleend: '9680', subtitle: 'Stát! Z jakého jste okresu?!' };
var question1_4 = { sauce: 'videos/question1-4.mp4', timecode: '3.2', subtitlestart: '2720', subtitleend: '6720', subtitle: 'Rok narození?' };
var question1_4a = { sauce: 'videos/question1-4.mp4', timecode: '3.2', subtitlestart: '2720', subtitleend: '6720', subtitle: 'Stůjte! Kolik Vám je?!' };

var question2_1 = { sauce: 'videos/question2-1.mp4', timecode: '1.7', subtitlestart: '1000', subtitleend: '5000', subtitle: 'Preferujete západní nebo východní vakcínu?' };
var question2_1a = { sauce: 'videos/question2-1.mp4', timecode: '1.7', subtitlestart: '1000', subtitleend: '5000', subtitle: 'Chcete americkou, nebo ruskou vakcínu?' };
var question2_2 = { sauce: 'videos/question2-2.mp4', timecode: '1.9', subtitlestart: '1000', subtitleend: '5000', subtitle: 'Bude Vám vadit neschválená vakcína?' };
var question2_2a = { sauce: 'videos/question2-2.mp4', timecode: '1.9', subtitlestart: '1000', subtitleend: '5000', subtitle: 'Vadila by Vám pouze poloviční dávka?' };
var question2_3 = { sauce: 'videos/question2-3.mp4', timecode: '2.1', subtitlestart: '1000', subtitleend: '5000', subtitle: 'Bude Vám vadit jet na očkování do Karviné?' };
var question2_3a = { sauce: 'videos/question2-3.mp4', timecode: '2.1', subtitlestart: '1000', subtitleend: '5000', subtitle: 'Porušujete vládní protipandemická opatření?' };
var question2_4 = { sauce: 'videos/question2-4.mp4', timecode: '2.3', subtitlestart: '1000', subtitleend: '5000', subtitle: 'Proč potřebujete očkovat?' };
var question2_4a = { sauce: 'videos/question2-4.mp4', timecode: '2.3', subtitlestart: '1000', subtitleend: '5000', subtitle: 'Zemřel Vám někdo v rodině na koronavirus?' };

var question3_1 = { sauce: 'videos/question3-1.mp4', timecode: '1.9', subtitlestart: '1000', subtitleend: '5000', subtitle: 'Koho budete volit?' };
var question3_1a = { sauce: 'videos/question3-1.mp4', timecode: '1.9', subtitlestart: '1000', subtitleend: '5000', subtitle: 'Jaký je Váš názor na současnou vládu?' };
var question3_2 = { sauce: 'videos/question3-2.mp4', timecode: '1.7', subtitlestart: '1000', subtitleend: '5000', subtitle: 'Máte známé?' };
var question3_2a = { sauce: 'videos/question3-2.mp4', timecode: '1.7', subtitlestart: '1000', subtitleend: '5000', subtitle: 'Považujete se za vlivného člověka?' };
var question3_3 = { sauce: 'videos/question3-3.mp4', timecode: '1.7', subtitlestart: '1000', subtitleend: '5000', subtitle: 'Jaký je Váš příjem?' };
var question3_3a = { sauce: 'videos/question3-3.mp4', timecode: '1.7', subtitlestart: '1000', subtitleend: '5000', subtitle: 'Co si myslíte o Čapím hnízdě?' };
var question3_4 = { sauce: 'videos/question3-4.mp4', timecode: '1.5', subtitlestart: '1000', subtitleend: '5000', subtitle: 'Jste v nějaké politické straně?' };
var question3_4a = { sauce: 'videos/question3-4.mp4', timecode: '1.5', subtitlestart: '1000', subtitleend: '5000', subtitle: 'Díváte se na 168 hodin?' };

var question4_1 = { sauce: 'videos/question4-1.mp4', timecode: '3', subtitlestart: '3000', subtitleend: '7000', subtitle: 'Hm, dneska ne, zkuste to zítra.' };
var question4_1a = { sauce: 'videos/question4-1.mp4', timecode: '3', subtitlestart: '3000', subtitleend: '7000', subtitle: 'Pryč!' };
var question4_2 = { sauce: 'videos/question4-2.mp4', timecode: '4', subtitlestart: '3000', subtitleend: '7000', subtitle: 'Jděte, dnes už máme plno.' };
var question4_2a = { sauce: 'videos/question4-2.mp4', timecode: '4', subtitlestart: '3000', subtitleend: '7000', subtitle: 'Zmizte odsud!' };
var question4_3 = { sauce: 'videos/question4-3.mp4', timecode: '1', subtitlestart: '1640', subtitleend: '5640', subtitle: 'Máme plno. Sorry jako.' };
var question4_3a = { sauce: 'videos/question4-3.mp4', timecode: '1', subtitlestart: '1640', subtitleend: '5640', subtitle: 'Stavte se na podzim.' };
var question4_4 = { sauce: 'videos/question4-4.mp4', timecode: '2', subtitlestart: '2000', subtitleend: '6000', subtitle: 'Pro Vás tu dneska vakcínu nemáme.' };
var question4_4a = { sauce: 'videos/question4-4.mp4', timecode: '2', subtitlestart: '2000', subtitleend: '6000', subtitle: 'Pst, dnes nic, ale zkusíme něco vymyslet, ozvi se.' };

var entry_1 = { sauce: 'videos/entry_1.mp4', timecode: '2', subtitlestart: '1500', subtitleend: '4500', subtitle: 'Dobře, pojďte dovnitř!' };

var question1 = Array(question1_1, question1_2, question1_3, question1_4, question1_1a, question1_2a, question1_3a, question1_4a);
var question1 = question1[Math.floor(Math.random() * question1.length)];

var question2 = Array(question2_1, question2_2, question2_3, question2_4, question2_1a, question2_2a, question2_3a, question2_4a);
var question2 = question2[Math.floor(Math.random() * question2.length)];

var question3 = Array(question3_1, question3_2, question3_3, question3_4, question3_1a, question3_2a, question3_3a, question3_4a);
var question3 = question3[Math.floor(Math.random() * question3.length)];

var question4 = Array(question4_1, question4_2, question4_3, question4_4, question4_1a, question4_2a, question4_3a, question4_4a);
var question4 = question4[Math.floor(Math.random() * question4.length)];

var entry = entry_1;

$('#main1 source').attr('src', question1.sauce);
$('#main1')[0].load();

$('#main2 source').attr('src', question2.sauce);
$('#main2')[0].load();

$('#main3 source').attr('src', question3.sauce);
$('#main3')[0].load();

$('#main4 source').attr('src', question4.sauce);
$('#main4')[0].load();

$('.imprintlink').click(function () {
  $('#imprint').fadeToggle('fast', 'linear');
  $(this).toggleClass('active');
});

$('.privacylink').click(function () {
  $('#privacy').fadeToggle('fast', 'linear');
  $(this).toggleClass('active');
});

function whoMadeThis() {
  alert('spiffy guys');
  window.location.href = 'https://sansho.studio/';
}

function createAudio() {
  wavesurfer.backend.ac.resume();
}

function startedByAudio() {
  $('#introsound').trigger('pause');
  $('.logo').addClass('logo_active');
  $('.box').fadeOut(300);
  setTimeout(function () {
    $('.logo').addClass('loader');
  }, 1000);

  annyang.removeCommands('start');
  annyang.abort();
  setTimeout(function () {
    $('#intro').fadeOut(200);
    $('#emotion_chart, #waveform').delay(1000).fadeIn(400);
    startTraining();

    $('#cam_container').addClass('container_big');
    $('#cam_container').removeClass('container_small');
  }, 2500);
}

function startTraining() {
  $('#introvideo').show();
  $('#introvideo').get(0).play();
  setTimeout(function () {
    $('#subtitle').empty().text('Blížíte se k zdravotnímu maršálovi Vlády ČR.');
  }, 3800);
  setTimeout(function () {
    $('#subtitle').empty().text('Odpovězte dle nejlepšího vědomí a svědomí na jeho otázky');
  }, 11600);
  setTimeout(function () {
    $('#subtitle').empty().text('a získejte přístup do polního očkovacího centra.');
  }, 16000);
  setTimeout(function () {
    $('#subtitle').empty();
  }, 20000);
}

$('#introvideo').on('ended', function () {
  $('#introvideo').trigger('pause');
  $('#introvideo').hide();
  $('#main1').show();
  $('#main1').get(0).play();
  $('#soundbg').trigger('play');

  var substart = question1.subtitlestart;
  substart = parseInt(substart);
  var subend = question1.subtitleend;
  subend = parseInt(subend);
  subend = subend;

  setTimeout(function () {
    $('#subtitle').empty().text(question1.subtitle);
  }, substart);
  setTimeout(function () {
    $('#subtitle').empty();
  }, subend);
});

var runAtTime = function (handler, time) {
  var wrapped = function () {
    if (this.currentTime >= time) {
      $(this).off('timeupdate', wrapped);
      return handler.apply(this, arguments);
    }
  };
  return wrapped;
};

$('#main4').on('ended', function () {
  $('#main4').trigger('pause');
});

function tenSecondTime() {
  tenTimeout = setTimeout(function () {
    if (speechactivated) {
      annyang.abort();
      speechactivated = false;
      $('.speakCircle').hide();
      $('#redFlash').fadeIn(10).fadeOut(500);
      unansweredQuestions = unansweredQuestions + 1;

      setTimeout(function () {
        choseNextQuestion();
      }, 1000);
    }
  }, 9000);
}

$('#refreshButton').click(function () {
  location.reload();
});

$('#main1').on('timeupdate', runAtTime(Handler1, question1.timecode));

function Handler1() {
  annyang.addCommands(commands2);
  annyang.start();

  annyang.addCallback('resultNoMatch', function (userSaid) {
    var text = question1.subtitle + ': ' + userSaid[0];
    writeSaidToPhP(text);

    annyang.abort();
    speechactivated = false;
    $('.speakCircle').hide();
    choseNextQuestion();
  });

  annyang.addCallback('resultMatch', function (userSaid) {
    var text = question1.subtitle + ': ' + userSaid[0];
    writeSaidToPhP(text);

    annyang.abort();
    speechactivated = false;
    $('.speakCircle').hide();
    choseNextQuestion();
  });

  speechactivated = true;
  $('.speakCircle').show().addClass('blink');
  tenSecondTime();
}

$('#main2').on('timeupdate', runAtTime(Handler2, question2.timecode));

function Handler2() {
  annyang.addCommands(commands2);
  annyang.start();

  annyang.addCallback('resultNoMatch', function (userSaid) {
    var text = question2.subtitle + ': ' + userSaid[0];
    writeSaidToPhP(text);
    annyang.abort();
    speechactivated = false;
    $('.speakCircle').hide();
    choseNextQuestion();
  });

  annyang.addCallback('resultMatch', function (userSaid) {
    var text = question2.subtitle + ': ' + userSaid[0];
    writeSaidToPhP(text);
    annyang.abort();
    speechactivated = false;
    $('.speakCircle').hide();
    choseNextQuestion();
  });

  speechactivated = true;
  $('.speakCircle').show();
  tenSecondTime();
}

$('#main3').on('timeupdate', runAtTime(Handler3, question3.timecode));

function Handler3() {
  annyang.addCommands(commands2);
  annyang.start();

  annyang.addCallback('resultNoMatch', function (userSaid) {
    var text = question3.subtitle + ': ' + userSaid[0] + '\n';
    writeSaidToPhP(text);

    annyang.abort();
    speechactivated = false;
    $('.speakCircle').hide();
    choseNextQuestion();
  });

  annyang.addCallback('resultMatch', function (userSaid) {
    var text = question3.subtitle + ': ' + userSaid[0] + '\n';
    writeSaidToPhP(text);

    annyang.abort();
    speechactivated = false;
    $('.speakCircle').hide();
    choseNextQuestion();
  });

  speechactivated = true;
  $('.speakCircle').show();
  tenSecondTime();
}

var commands = {
  okay: function () {
    startedByAudio();
  },
  ok: function () {
    startedByAudio();
  },
  'okay?': function () {
    startedByAudio();
  },
  'oh kay': function () {
    startedByAudio();
  },
  'oh keh': function () {
    startedByAudio();
  },
  'o.k.': function () {
    startedByAudio();
  },
  'who made this': function () {
    whoMadeThis();
  },
};

var commands2 = {
  'ja!': function () {},
  ja: function () {},
  nein: function () {},
  yes: function () {},
  no: function () {},
  nah: function () {},
  na: function () {},
  nope: function () {},
  ne: function () {},
  neh: function () {},
  jo: function () {},
  'ya!': function () {},
  ya: function () {},
  nö: function () {},
  ye: function () {},
  yepp: function () {},
};

function choseNextQuestion() {
  switch (numberOfQuestions) {
    case 0:
      numberOfQuestions = 1;
      break;
    case 1:
      $('#videoloader').show();
      clearTimeout(tenTimeout);

      annyang.removeCommands();
      annyang.removeCallback('result');
      annyang.removeCallback('resultNoMatch');
      annyang.removeCallback('resultMatch');
      setTimeout(function () {
        $('#main1').get(0).pause();
        $('#main1').hide();
        $('#main2').show();
        $('#main2').get(0).play();
        var substart = question2.subtitlestart;
        substart = parseInt(substart);
        var subend = question2.subtitleend;
        subend = parseInt(subend);
        subend = subend;

        setTimeout(function () {
          $('#subtitle').empty().text(question2.subtitle);
        }, substart);
        setTimeout(function () {
          $('#subtitle').empty();
        }, subend);
        numberOfQuestions = 2;
        $('#videoloader').hide();
      }, 2500);
      break;
    case 2:
      $('#videoloader').show();
      clearTimeout(tenTimeout);

      annyang.removeCommands();
      annyang.removeCallback('result');
      annyang.removeCallback('resultNoMatch');
      annyang.removeCallback('resultMatch');

      setTimeout(function () {
        $('#main2').get(0).pause();
        $('#main2').hide();
        $('#main3').show();
        $('#main3').get(0).play();

        var substart = question3.subtitlestart;
        substart = parseInt(substart);
        var subend = question3.subtitleend;
        subend = parseInt(subend);
        subend = subend;

        setTimeout(function () {
          $('#subtitle').empty().text(question3.subtitle);
        }, substart);
        setTimeout(function () {
          $('#subtitle').empty();
        }, subend);

        numberOfQuestions = 3;
        $('#videoloader').hide();
      }, 2500);

      break;
    case 3:
      $('#videoloader').show();
      clearTimeout(tenTimeout);
      setTimeout(function () {
        $('#main3').get(0).pause();
        $('#main3').hide();
        $('#main4').show();
        $('#main4').get(0).play();

        var substart = question4.subtitlestart;
        substart = parseInt(substart);
        var subend = question4.subtitleend;
        subend = parseInt(subend);
        subend = subend;

        setTimeout(function () {
          $('#subtitle').empty().text(question4.subtitle);
        }, substart);
        setTimeout(function () {
          $('#subtitle').empty();
        }, subend);

        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.src = 'js/svg.js';
        ga.id = 'svgjs';
        document.body.appendChild(ga);
        $('#svgjs').remove();

        var interfaceEnd = question4.subtitleend;
        interfaceEnd = parseInt(interfaceEnd) + 1000;

        $('#main1').hide();
        $('#main2').hide();
        $('#main3').hide();
        setTimeout(function () {
          $('#end').fadeIn(3000);
          $('#cam_container, #waveform, #emotion_chart').fadeOut(500);
        }, interfaceEnd);

        numberOfQuestions = 4;
        $('#videoloader').hide();
      }, 2500);
      setTimeout(function () {
        $('#soundbg').animate({ volume: 0.1 }, 10000);
      }, 3000);
      break;
    case 4:
      if (final_result == 3) {
        $('#videoloader').show();
        clearTimeout(tenTimeout);
        setTimeout(function () {
          $('#main3').get(0).pause();
          $('#main3').hide();
          $('#main4').show();
          $('#main4').get(0).play();

          var substart = entry.subtitlestart;
          substart = parseInt(substart);
          var subend = entry.subtitleend;
          subend = parseInt(subend);
          subend = subend;
          console.log(substart, subend);
          setTimeout(function () {
            $('#subtitle').empty().text(entry.subtitle);
          }, substart);
          setTimeout(function () {
            $('#subtitle').empty();
          }, subend);
          numberOfQuestions = 4;
          $('#videoloader').hide();
        }, 2500);
      }
      break;

    default:
      alert("We're sorry, something went wrong with the speechanalyzation, please reload the page.");
  }
}

console.log('V4.3');

function initCamera() {
  annyang.addCommands(commands);

  annyang.start();

  microphone.start();

  var vid = document.getElementById('videoel');
  var overlay = document.getElementById('cam_overlay');
  var overlayCC = overlay.getContext('2d');

  var p = navigator.mediaDevices.getUserMedia({ video: true });

  p.then(function (mediaStream) {
    var video = document.querySelector('video');

    try {
      video.srcObject = mediaStream;
    } catch (error) {
      video.src = window.URL.createObjectURL(mediaStream); // depreceated, so try other first
    }
    video.onloadedmetadata = function (e) {};
  });
  p.catch(function (err) {
    console.log(err.name);
    $('#nomedia').show();
    annyang.abort();
  });
  function enablestart() {}

  vid.addEventListener('canplay', enablestart, false);

  var ctrack = new clm.tracker({ useWebGL: true });
  ctrack.init(pModel);

  function startVideo() {
    vid.play();

    ctrack.start(vid);

    drawLoop();
  }

  function drawLoop() {
    requestAnimFrame(drawLoop);
    overlayCC.clearRect(0, 0, 400, 300);

    if (ctrack.getCurrentPosition()) {
      ctrack.draw(overlay);
    }
    var cp = ctrack.getCurrentParameters();

    var er = ec.meanPredict(cp);
    if (er) {
      updateData(er);
    }
  }

  var ec = new emotionClassifier();
  ec.init(emotionModel);
  var emotionData = ec.getBlank();

  var margin = { top: 20, right: 20, bottom: 10, left: 40 },
    width = 300 - margin.left - margin.right,
    height = 30 - margin.top - margin.bottom;

  var barWidth = 30;

  var formatPercent = d3.format('.0%');

  var x = d3.scale
    .linear()
    .domain([0, ec.getEmotions().length])
    .range([margin.left, width + margin.left]);

  var y = d3.scale.linear().domain([0, 1]).range([0, height]);

  var svg = d3
    .select('#emotion_chart')
    .append('svg')
    .attr('width', 100 + width + margin.left + margin.right)
    .attr('height', 30 + height + margin.top + margin.bottom);
  svg
    .selectAll('text.labels')
    .data(emotionData)
    .enter()
    .append('svg:text')
    .attr('x', function (datum, index) {
      return x(index) + barWidth;
    })
    .attr('y', 10)
    .attr('dx', -barWidth / 2)
    .attr('dy', '1.2em')
    .attr('id', function (datum, index) {
      return 'weite' + x(index);
    })
    .attr('text-anchor', 'middle')
    .text(function (datum) {
      return datum.value;
    })
    .attr('fill', 'white')
    .attr('class', 'labels');

  function updateData(data) {
    var texts = svg
      .selectAll('text.labels')
      .data(data)
      .text(function (datum) {
        return datum.value.toFixed(1);
      });
  }

  setTimeout(function () {
    startVideo();
  }, 1000);
}

$('#reloader').click(function () {
  location.reload();
});

function writeSaidToPhP(text) {
  $.ajax({
    url: '/js/write.php',
    type: 'POST',
    data: {
      text: text,
    },
    success: function (callback) {
      // console.log("wrote to text")
    },
  });
}

var Konami = function (callback) {
  var konami = {
    addEvent: function (obj, type, fn, ref_obj) {
      if (obj.addEventListener) obj.addEventListener(type, fn, false);
      else if (obj.attachEvent) {
        // IE
        obj['e' + type + fn] = fn;
        obj[type + fn] = function () {
          obj['e' + type + fn](window.event, ref_obj);
        };
        obj.attachEvent('on' + type, obj[type + fn]);
      }
    },
    input: '',
    pattern: '38384040373937396665',
    load: function (link) {
      this.addEvent(
        document,
        'keydown',
        function (e, ref_obj) {
          if (ref_obj) konami = ref_obj; // IE
          konami.input += e ? e.keyCode : event.keyCode;
          if (konami.input.length > konami.pattern.length) konami.input = konami.input.substr(konami.input.length - konami.pattern.length);
          if (konami.input == konami.pattern) {
            konami.code(link);
            konami.input = '';
            e.preventDefault();
            return false;
          }
        },
        this
      );
      // this.iphone.load(link);
    },
    code: function (link) {
      window.location = link;
    },
    //,
    // iphone: {
    // 	start_x: 0,
    // 	start_y: 0,
    // 	stop_x: 0,
    // 	stop_y: 0,
    // 	tap: false,
    // 	capture: false,
    // 	orig_keys: "",
    // 	keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
    // 	code: function (link) {
    // 		konami.code(link);
    // 	},
    // 	load: function (link) {
    // 		this.orig_keys = this.keys;
    // 		konami.addEvent(document, "touchmove", function (e) {
    // 			if (e.touches.length == 1 && konami.iphone.capture == true) {
    // 				var touch = e.touches[0];
    // 				konami.iphone.stop_x = touch.pageX;
    // 				konami.iphone.stop_y = touch.pageY;
    // 				konami.iphone.tap = false;
    // 				konami.iphone.capture = false;
    // 				konami.iphone.check_direction();
    // 			}
    // 		});
    // 		konami.addEvent(document, "touchend", function (evt) {
    // 			if (konami.iphone.tap == true) konami.iphone.check_direction(link);
    // 		}, false);
    // 		konami.addEvent(document, "touchstart", function (evt) {
    // 			konami.iphone.start_x = evt.changedTouches[0].pageX;
    // 			konami.iphone.start_y = evt.changedTouches[0].pageY;
    // 			konami.iphone.tap = true;
    // 			konami.iphone.capture = true;
    // 		});
    // 	},
    // 	check_direction: function (link) {
    // 		x_magnitude = Math.abs(this.start_x - this.stop_x);
    // 		y_magnitude = Math.abs(this.start_y - this.stop_y);
    // 		x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
    // 		y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
    // 		result = (x_magnitude > y_magnitude) ? x : y;
    // 		result = (this.tap == true) ? "TAP" : result;

    // 		if (result == this.keys[0]) this.keys = this.keys.slice(1, this.keys.length);
    // 		if (this.keys.length == 0) {
    // 			this.keys = this.orig_keys;
    // 			this.code(link);
    // 		}
    // 	}
    // }
  };

  typeof callback === 'string' && konami.load(callback);
  if (typeof callback === 'function') {
    konami.code = callback;
    konami.load();
  }

  return konami;
};

var easter_egg;
var easter_egg_value = false;

easter_egg = new Konami(function () {
  easter_egg_value = true;
  // return alert('Konami code!');
  console.log("you're so clever!");
});
