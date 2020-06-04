/* TABS */
window.addEventListener('load', function load() {
  document.getElementById('defaultOpen').click();
});
function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
}

function cleanCanvas() {
  let movedImages = document.querySelectorAll('.moved');
  movedImages.forEach((image) => {
    image.classList.remove('moved');
    image.style = 'visibility: hidden';
    image.parentNode.style.display = 'none';
  });
}

/* ON PLAY SHOW LANDSCAPE + on change hide PLAY button*/
$(document).ready(function () {
  $('.play').click(function () {
    $('#random').show();
    $('.play').fadeOut();
  });
  $('.play').click(function () {
    $('#change1, #change').show();
  });
});

/* RANDOM RANDOM LANDSCAPE */
function randombg() {
  var random = Math.floor(Math.random() * 6) + 0;
  var bigSize = [
    "url('images/landscape2.png')",
    "url('images/landscape3.png')",
    "url('images/landscape4.png')",
    "url('images/landscape5.png')",
    "url('images/landscape6.png')",
    "url('images/landscape7.png')",
    "url('images/landscape8.png')",
    "url('images/landscape9.png')",
    "url('images/landscape10.png')",
  ];
  document.getElementById('random').style.backgroundImage = bigSize[random];
}

document.addEventListener('DOMContentLoaded', () => {
  /* SAVE DOM ELEMENT TO IMAGE */
  let saveImageBtn = document.getElementById('save-image-btn');
  saveImageBtn.addEventListener('click', () => {
    domtoimage
      .toJpeg(document.getElementById('wrapper'), { quality: 0.95 })
      .then(function (dataUrl) {
        let link = document.createElement('a');
        link.download = 'imagen-guardada.jpeg';
        link.href = dataUrl;
        link.click();
      });
  });
});

/* STICKERS SUBMENU */
$(document).ready(function () {
  $('#animals').click(function () {
    showItems('animals', '#close1');
    $('.animals').show();
  });
  $('#hunters').click(function () {
    showItems('hunters', '#close2');
    $('.hunters').show();
  });
  $('#weapons').click(function () {
    showItems('weapons', '#close3');
    $('.weapons').show();
  });
  $('#blood').click(function () {
    showItems('blood', '#close4');
    $('.blood').show();
  });
  $('#plants').click(function () {
    showItems('plants', '#close4');
    $('.plants').show();
  });
  $('#others').click(function () {
    showItems('others', '#close5');
    $('.others').show();
  });

  $('#close1').click(function () {
    hideItems('.animals', this);
  });

  $('#close2').click(function () {
    hideItems('.hunters', this);
  });
  $('#close3').click(function () {
    hideItems('.weapons', this);
  });
  $('#close4').click(function () {
    hideItems('.blood', this);
  });
  $('#close5').click(function () {
    hideItems('.plants', this);
  });
  $('#close6').click(function () {
    hideItems('.others', this);
  });
});

function showItems(section, closeButton) {
  $(`#${section}`).click(function () {
    let notMovedItems = document
      .querySelector(`.${section}`)
      .querySelectorAll('img:not(.moved)');

    notMovedItems.forEach((item) => {
      item.style.visibility = 'visible';
    });

    $(`.${section}`).css('border', '');
    $(`${closeButton}`).css('display', 'block');
  });
}

function hideItems(section, closeButton) {
  let notMovedItems = document
    .querySelector(`${section}`)
    .querySelectorAll('img:not(.moved)');
  notMovedItems.forEach((item) => {
    item.style.visibility = 'hidden';
  });

  $(`${section}`).css('border', 'none');
  $(closeButton).css('display', 'none');
}

/* DRAGGABLE */
$(function () {
  $('.animal, .weapon, .hunter, .bloods, .landscape, .other, .plant').draggable(
    {
      drag: function () {
        this.classList.add('moved');
      },
    }
  );
});

var scrollEventHandler = function () {
  window.scroll(0, window.pageYOffset);
};
window.addEventListener('scroll', scrollEventHandler, false);

/* AUDIO */
function audioPlayer() {
  var currentSong = 0;
  $('#audioPlayer')[0].src = $('#playlist li a')[0];
  $('#audioPlayer')[0].play();
  $('#playlist li a').click(function (e) {
    e.preventDefault();
    $('#audioPlayer')[0].src = this;
    $('#audioPlayer')[0].play();
    $('#playlist li').removeClass('current-song');
    currentSong = $(this).parent().index();
    $(this).parent().addClass('current-song');
  });

  $('#audioPlayer')[0].addEventListener('ended', function () {
    currentSong++;
    if (currentSong == $('#playlist li a').length) currentSong = 0;
    $('#playlist li').removeClass('current-song');
    $('#playlist li:eq(' + currentSong + ')').addClass('current-song');
    $('#audioPlayer')[0].src = $('#playlist li a')[currentSong].href;
    $('#audioPlayer')[0].play();
  });
}
