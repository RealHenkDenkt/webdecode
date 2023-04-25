let EtymologyHandler = function () {
	
}

EtymologyHandler.prototype.parsePhraseResult = function (result) {
	let html = '<h2 class="strongs">Etymology</h2>';
	
	for (let i = 0; i < result.length; i++ ) {
		html += this.makePhraseRow(result[i]);
	}
	
	$('#etymologyResult').html(html);

	
}

EtymologyHandler.prototype.makePhraseRow = function (row) {
	let html = '<h3 class="strongs">Word</h3><p class="greek-word"">' + row.word  + '</p>';
	console.log(row);
	if (row.etymology && row.etymology.toString().trim() != '') {
		html += '<h3 class="strongs">Etymology</h3><p class="greek-translation">' + row.etymology.toString() + '</p>';
	}
	if (row.crossreferences && row.crossreferences.toString().trim() != '') {
		html += '<h3 class="strongs">Crossreferences</h3><p class="greek-translation">' + row.crossreferences.toString() + '</p>';
	}
	
	if (row.years && row.years.toString().trim() != '') {
		html += '<h3 class="strongs">Years</h3><p class="greek-translation">' + row.years.toString() + '</p>';
	}
	
	return html;	
} 