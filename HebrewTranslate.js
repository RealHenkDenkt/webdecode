let HebrewTranslate = function () {
	this.result = '';	
	//this.jsonData = {};
  	this.jsonData = this.getJsonData('dict-he-en.json');
}

HebrewTranslate.prototype.getJsonData = function (url) {
	var jsonData = null;
    $.ajax({
    	async: false,
      	url: url,
      	dataType: 'json',
      	success: function (data) {
        	jsonData = data;
      	}
    });
    return jsonData;
}; 

HebrewTranslate.prototype.postWord = function(lang, wordName) {
	if (lang === 'he') {
    	//let wordName = $('.he .wtt').val();
      	let jsonData = this.jsonData;
      	let words = jsonData;
      	
      	for (i in words) {
        	let word = words[i];
        	let wordFound = null;
        	let dictWord = word.translated.replace(/[\u0591-\u05C7]/g,'');

        	if (dictWord === wordName) {
        		wordFound = true;
        	}
        
        	if (wordFound === true) {
				let html = '<div id="' + word.id + '">';
				html += '<h2 class="hebrew-word">' + word.translated + '</h2>'; 
				html += '<p class="hebrew-translation">' + word.translation + '</p></div>';
	          	return html;
      		}
      	}
	} else if (lang === 'en') {
    	let wordName = $('.en .wtt').val();
    	let jsonData = this.getJsonData('dict-en-he.json');
      	let words = jsonData;
      
      	for (i in words) {
        	let word = words[i];
        	let wordFound = null;
        	let dictWord = word.translated;
        
        	if (dictWord.toUpperCase() === wordName.toUpperCase()) {
          		wordFound = true;
        	}
        
        	if (wordFound === true) {
          		let w = $('<div/>', {
            	id: word.id,
            	class: 'word',
	          	});
	
	          	$('<h2/>', {
	            	text: word.translated,
	          	}).appendTo(w);
	
	          	$('<h3/>', {
	            	text: word.part_of_speech,
	          	}).appendTo(w);
	
	          	$('<p/>', {
	            	class: 'rtl',
	            	text: word.translation,
	          	}).appendTo(w);
	
	          	w.prependTo('.en .words');
	          	this.result = w;
	    	}
     	}
  	}
  	return ''
}

HebrewTranslate.prototype.sliceDict = function(lang, start, end) {
	if (lang === 'he') {
    	let jsonData = this.getJsonData('dict-he-en.json');
     	let words = jsonData.slice(start, end);
      	
      	$('.he .words').empty();
      
      	for (i in words) {
        	let word = words[i];
        	let w = $('<div/>', {
          		id: word.id,
          		class: 'word',
        	});

        	$('<h2/>', {
          		class: 'rtl',
          		text: word.translated,
        	}).appendTo(w);

        	$('<h3/>', {
          		class: 'rtl',
          		text: word.part_of_speech,
        	}).appendTo(w);

        	$('<p/>', {
          		text: word.translation,
        	}).appendTo(w);

        	w.appendTo('.he .words');
      	}
    } else if (lang === 'en') {
      	let jsonData = this.getJsonData('dict-en-he.json');
      	let words = jsonData.slice(start, end);
      	$('.en .words').empty();
      
      	for (i in words) {
        	let word = words[i];
        	let w = $('<div/>', {
        		id: word.id,
          		class: 'word',
        	});

        	$('<h2/>', {
          		text: word.translated,
        	}).appendTo(w);

        	$('<h3/>', {
          		text: word.part_of_speech,
        	}).appendTo(w);

        	$('<p/>', {
          		class: 'rtl',
          		text: word.translation,
        	}).appendTo(w);

        	w.appendTo('.en .words');
      	}
	}
}

/*
  var getJsonData = function (url) {
    var jsonData = null;
    $.ajax({
      async: false,
      url: url,
      dataType: 'json',
      success: function (data) {
        jsonData = data;
      }
    });
    return jsonData;
  }
  var postWord = function(lang) {
    if (lang === 'he') {
      var wordName = $('.he .wtt').val();
      var jsonData = getJsonData('dict-he-en.json');
      var words = jsonData;
      for (i in words) {
        var word = words[i];
        var wordFound = null;
        var dictWord = word.translated.replace(/[\u0591-\u05C7]/g,'');
        if (dictWord === wordName) {
          wordFound = true;
        }
        if (wordFound === true) {
          var w = $('<div/>', {
            id: word.id,
            class: 'word',
          });

          $('<h2/>', {
            class: 'rtl',
            text: word.translated,
          }).appendTo(w);

          $('<h3/>', {
            class: 'rtl',
            text: word.part_of_speech,
          }).appendTo(w);

          $('<p/>', {
            text: word.translation,
          }).appendTo(w);

          w.prependTo('.he .words');
        }
      }
    }
    else if (lang === 'en') {
      var wordName = $('.en .wtt').val();
      var jsonData = getJsonData('dict-en-he.json');
      var words = jsonData;
      for (i in words) {
        var word = words[i];
        var wordFound = null;
        var dictWord = word.translated;
        if (dictWord.toUpperCase() === wordName.toUpperCase()) {
          wordFound = true;
        }
        if (wordFound === true) {
          var w = $('<div/>', {
            id: word.id,
            class: 'word',
          });

          $('<h2/>', {
            text: word.translated,
          }).appendTo(w);

          $('<h3/>', {
            text: word.part_of_speech,
          }).appendTo(w);

          $('<p/>', {
            class: 'rtl',
            text: word.translation,
          }).appendTo(w);

          w.prependTo('.en .words');
        }
      }
    }
  }
  var sliceDict = function(lang, start, end) {
    if (lang === 'he') {
      var jsonData = getJsonData('dict-he-en.json');
      var words = jsonData.slice(start, end);
      $('.he .words').empty();
      for (i in words) {
        var word = words[i];
        var w = $('<div/>', {
          id: word.id,
          class: 'word',
        });

        $('<h2/>', {
          class: 'rtl',
          text: word.translated,
        }).appendTo(w);

        $('<h3/>', {
          class: 'rtl',
          text: word.part_of_speech,
        }).appendTo(w);

        $('<p/>', {
          text: word.translation,
        }).appendTo(w);

        w.appendTo('.he .words');
      }
    }
    else if (lang === 'en') {
      var jsonData = getJsonData('dict-en-he.json');
      var words = jsonData.slice(start, end);
      $('.en .words').empty();
      for (i in words) {
        var word = words[i];
        var w = $('<div/>', {
          id: word.id,
          class: 'word',
        });

        $('<h2/>', {
          text: word.translated,
        }).appendTo(w);

        $('<h3/>', {
          text: word.part_of_speech,
        }).appendTo(w);

        $('<p/>', {
          class: 'rtl',
          text: word.translation,
        }).appendTo(w);

        w.appendTo('.en .words');
      }
    }
  }
*/