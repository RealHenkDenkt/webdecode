let Strongs = function () {
    this.strongs = StrongsGreekDictionary;
    this.dict = GreekDict;
}

Strongs.prototype.isInDict = function (word) {
    return this.dict.indexOf(word) > -1;
}

Strongs.prototype.getNumber = function (word) {
    return this.dict.indexOf(word);
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
