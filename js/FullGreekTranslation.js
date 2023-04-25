let FullGreekTranslation = function (rows) {
	this.html;
	this.rows = rows;
}

FullGreekTranslation.prototype.processRows = function (){
	let html = '';
	let rows = this.rows;
	
	for (let i = 0; i < rows.length; i++) {
		if (undefined !== rows[i]['word']){
			html += this.makeRow(rows[i]);	
		}
	}
	
	this.html = html;
};

FullGreekTranslation.prototype.getHtml = function () {
	this.processRows();
	return this.html;
}

FullGreekTranslation.prototype.makeRow = function (row) {
	let html = '<div class="full-translation-row"><h2 class="greek-word">' + row['word'] + '</h2>';
	html += '<h3 class="strongs">Alternate spelling</h3>';
	html +=  '<p class="greek-translation">' + row.alternate + '</p>';
	html += '<h3 class="strongs">Transliteration</h3>';
	html += '<p class="greek-translation">' + row.transliteration + '</p>';
	html += '<h3 class="strongs">Glossary</h3>';
	html += '<p class="greek-translation">'  + row.glossary + '</p>';
	html += '<h3 class="strongs">Real value</h3>';
	html += '<p class="greek-translation">' + row.real + '</p>';
	html += '<h3 class="strongs">Strongs</h3>';
	html += '<p class="greek-translation">' + row.strongs + '</p>';
	html += '</div>';
	
	return html;
}