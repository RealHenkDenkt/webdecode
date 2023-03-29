let SearchHandler = function () {
	this.searchReduced = $('#search-reduced'),
	this.searchLetters = $('#search-letters'),
	this.searchWords = $('#search-words');
	$('#searchResultTableBody').html('');
};

SearchHandler.prototype.init = function () {
	$('.search-type-button').each(function (){
		$(this).on('click', function (){
			let isActive = $(this).hasClass('active')?true:false; 
			console.log(isActive);
			$('.search-type-button').each(function (){
				$(this).removeClass('active');
				let id = '#' + $(this).prop('name');
				$(id).val(0);				
			});
			
			if (false === isActive) {
				$(this).addClass('active');
				let id = '#' + $(this).prop('name');
				$(id).val(1);				
			}
		})
	});	
};

SearchHandler.prototype.parsePhraseResult = function (data) {

	let html = '';

	for (let i = 0; i < data.phrases.length; i++) {
		html += this.makePhraseRow(data.phrases[i]);
	}	
	
	return html;
//	$('#searchResultTableBody').html(html);
//	this.highlightRowValues();
}

SearchHandler.prototype.makePhraseRow = function (values) {

	let phrase=values;

	let title = "Source: " + phrase.phrase.source  + ", transliteration: " + phrase.phrase.transliteration;
	let html = '<tr class="search-result-row" title="' + title + '">';	
	html += '<td class="search-results-phrase">' + phrase.phrase.phrase + '</td>';
	html += '<td class="search-results-total">' + phrase.aTotal + '</td>';
	html += '<td class="search-results-reduced">' + phrase.bTotal + '</td>';
	html += '<td class="search-results-letters">' + phrase.cTotal + '</td>';
	html += '<td class="search-results-words">' + phrase.dTotal + '</td>';
	html += '<td class="search-results-summed">' + phrase.total  + '</td>';	

	html += '</tr>';
	
	return html;	
}

SearchHandler.prototype.parseResult = function (data) {
	let html = '';

	for (item in data) {
		if (data.hasOwnProperty(item)) {
			html +=	this.makeRow(data[item]);
		}
	}

	return html;	
}

SearchHandler.prototype.makeLinks = function () {
	$('.search-results-phrase').each(function (){
		$(this).on('click', function (){
			$('#phraseAdd').val($(this).html()).trigger('input');	
		});		
	});
}

SearchHandler.prototype.highlightRowValues = function () {
	let rowTypes = [];
	
	if ($('#search-reduced').val() == '1') rowTypes.push('reduced');
	else if ($('#search-letters').val() == '1') rowTypes.push( 'letters');
	else if ($('#search-words').val() == '1') rowTypes.push('words');
	else {
		rowTypes.push('total');
		rowTypes.push('summed');
	}

	for (let i = 0; i < rowTypes.length; i++){
		let css = '.search-results-'+ rowTypes[i];

		$(css).each(function (){
			$(this).addClass('bold-green');		
		});			
	}
	

};


SearchHandler.prototype.makeRow = function (row) {
	let html = '<tr class="search-result-row>';

	html += '<td>' + row['word'] + '</td>';
	html += '<td>' + row['aTotal'] + '</td>';
	html += '<td>' + row['bTotal'] + '</td>';
	html += '<td>' + row['cTotal'] + '</td>';
	html += '<td>' + row['dTotal'] + '</td>';
	html += '<td>' + row['total'] + '</td>';	

	html += '</tr>';
	return html;
}

SearchHandler.prototype.numericalSearch = function () {
	
};