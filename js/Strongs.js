let Strongs = function () {
    this.strongs = StrongsGreekDictionary;
    this.strongsHebrew = strongsHebrewDictionary
    this.dict = GreekDict;
    this.hebrewDict = hebrewDict;
}

Strongs.prototype.getJsonData = function (url) {
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

Strongs.prototype.postHebrewWord = function (wordName) {
	let html = '';
	
	if (this.isInHebrewDict(wordName)) {
		let number = this.getHebrewNumber(wordName);
		if (undefined === number || -1 === number) return;
		
		let key = "H"+number;
		
		if (undefined !== strongsHebrewDictionary.key) return;
		
		let entry = strongsHebrewDictionary[key];

		let html = '<div class="greek-word-container" id="' + number + '">';

		html += '<hr/>';			
		html += '<h3 class="strongs">' + key  + '</h3>';
		html += '<h2 class="greek-word">' + wordName + '</h2>';
		html += '<h3 class="strongs">Strongs definition</h3>';
		html += '<p class="greek-translation">' +  entry['strongs_def'] + '</p>';
		html += '<h3 class="strongs">Strongs derivation</h3>';
		html += '<p class="greek-translation">' + this.setDerivation(entry['derivation']) + '</p>';
		html += '<h3 class="strongs">Transliteration</h3>';
		html += '<p class="greek-translation">' + entry['translit'] + '</p>';
		html += '<h3 class="strongs">Lemma</h3>';
		html += '<p class="greek-translation">' + entry['lemma'] + '</p>';
		html += '<h3 class="strongs">KJV definition</h3>';
		html += '<p class="greek-translation">' + entry['kjv_def'] + '</p>';
		html += '</div>';
		
		return html;
	}
	
	return html;
}

Strongs.prototype.postWord = function (wordName) {
	let html = '';

	if (this.isInDict(wordName)) {
		
		let number = this.getNumber(wordName);

		 if (undefined === number || -1 === number) return;

	    let key = 'G'+number;

	    if (undefined !== StrongsGreekDictionary.key)return;

		let entry = StrongsGreekDictionary[key];

		let html = '<div class="greek-word-container" id="' + number + '">';

		html += '<hr/>';			
		html += '<h3 class="strongs">Word</h3>';
		html += '<h2 class="greek-word">' + wordName + '</h2>';
		html += '<h3 class="strongs">Strongs definition</h3>';
		html += '<p class="greek-translation">' +  entry['strongs_def'] + '</p>';
		html += '<h3 class="strongs">Strongs derivation</h3>';
		html += '<p class="greek-translation">' + this.setDerivation(entry['derivation']) + '</p>';
		html += '<h3 class="strongs">Transliteration</h3>';
		html += '<p class="greek-translation">' + entry['translit'] + '</p>';
		html += '<h3 class="strongs">Lemma</h3>';
		html += '<p class="greek-translation">' + entry['lemma'] + '</p>';
		html += '<h3 class="strongs">KJV definition</h3>';
		html += '<p class="greek-translation">' + entry['kjv_def'] + '</p>';
		html += '</div>';
		
		return html;
		
	}

  	return html;
}

Strongs.prototype.isInHebrewDict = function (word) {
	return (undefined !== this.hebrewDict[word]);
};

Strongs.prototype.isInDict = function (word) {
    return this.dict.indexOf(word) > -1;
};

Strongs.prototype.getNumber = function (word) {
    return this.dict.indexOf(word);
}

Strongs.prototype.getHebrewNumber = function (word) {
	if (undefined !== this.hebrewDict[word]) {
		return this.hebrewDict[word]['number'];	
	} else {
		return -1;
	}
		
}

Strongs.prototype.setDerivation = function (html) {
    let matches = html.match(/G[0-9]+/);
    let g;

    for (let match in matches) {
        if (matches.hasOwnProperty(match)) {
            g = matches[match];
            console.log(g, matches);

            if (undefined !== g) {
                html = html.replace(g, '<span class="greek-word bold-green strongs-g" data-strongs="' + g + '">' + g + '</span>');
            }
        }
    }

    return html;

}

Strongs.prototype.setModalContent = function (number) {
    if (undefined === number || -1 === number) return;

    let key = 'G'+number;

    if (undefined !== StrongsGreekDictionary.key)return;

    let entry = StrongsGreekDictionary[key];

    $('#strongsG').html(key);
    $('#strongsDefinition').html(entry['strongs_def']);
    $('#strongsDerivation').html(this.setDerivation(entry['derivation']));
    $('#strongsTransliteration').html(entry['translit']);
    $('#strongsLemma').html(entry['lemma']);
    $('#strongsKJVDefinition').html(entry['kjv_def']);
}

Strongs.prototype.setModalClicks = function () {
		setTimeout(function() {
	    $("#phrase_result span[data-greek]").each(function (){
	            $(this).on('click', function () {
					let strongs = new Strongs();
	                let strongsNumber = strongs.getNumber($(this).attr('data-greek'));
    	            strongs.setModalContent(strongsNumber);
            })
        });			
		},500);

}

Strongs.prototype.clearModalContent = function () {
    $('#strongsG').html('');
    $('#strongsDefinition').html('');
    $('#strongsDerivation').html('');
    $('#strongsTransliteration').html('');
    $('#strongsLemma').html('');
    $('#strongsKJVDefinition').html('');
    this.setModalClicks();
}
