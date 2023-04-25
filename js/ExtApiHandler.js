let ExtApiHandler = function () {
	this.data = {}; 
	this.hostUrlPart = 'http://localhost:8000'; 
	
};

ExtApiHandler.prototype.setData = function () {
	this.data = {
		'phrase': $('#phraseAdd').val(),
		'cipher': $('#activeCipher').val(),
		'totals':{
			'aTotal': $('#partialPhraseTotal').text(),
			'bTotal': $('#partialPhraseReduced').text(),
			'cTotal': $('#partialPhraseLetters').text(),
			'dTotal': $('#partialPhraseWords').text()
		},
		'search-types': {
			'reduced': $('#search-reduced').val(),
			'letters': $('#search-letters').val(),
			'words': $('#search-words').val()
		},
		'search-input': $('#searchInput').val()
	};
};

ExtApiHandler.prototype.getData = function () {
	this.setData();
	return this.data;
}

ExtApiHandler.prototype.defaultCall = function () {
    $.ajax({            
		url: "/api-ext/<call>",
        data: this.getData(),
        method: 'post',
        success: (function (d) {
            d = $.parseJSON(d);
        })
    });
};

ExtApiHandler.prototype.loadPhrase = function () {
    let collection = [];
    $.ajax({            
		url: this.hostUrlPart + "/api-ext/loadphrase",
	    data: this.getData(),
    	method: 'post',
    	success: (function (d) {
        	collection = $.parseJSON(d);

        	let trans = new FullGreekTranslation(collection);
        	let html = trans.getHtml();
        	$('#fullTranslation').html(html);
	    })
	});
}

ExtApiHandler.prototype.loadEtymology = function () {
	$.ajax({
		url: this.hostUrlPart  + "/api-ext/loadetymology",
		data: this.getData(),
		method: 'post',
		success: (function (d) {
			collection = $.parseJSON(d);
			let handler = new EtymologyHandler();
			handler.parsePhraseResult(collection);			
		})
	});
}

ExtApiHandler.prototype.searchPhrase = function () {
	    $.ajax({            
		url: this.hostUrlPart + "/api-ext/searchphrase",
        data: this.getData(),
        method: 'post',
        success: (function (d) {
            let result = $.parseJSON(d);
            let handler = new SearchHandler();
            let html = '';
            if (result['phrases']) html += handler.parsePhraseResult(result);
            if (result['words']) html += handler.parseResult(result['words']);

			$('#searchResultTableBody').html(html);	
			handler.highlightRowValues();
			handler.makeLinks();            
            
        })
    });
}
