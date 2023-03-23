let activeText = '';
let DefaultCipher = 'EnglishGematria';
let 
	currentCipher = $('#currentCipher'),
	partialPhrase = $('#partialPhrase'),
	partialPhraseTotal = $('#partialPhraseTotal'),	
	partialPhraseReduced = $('#partialPhraseReduced'),
	partialPhraseLetters = $('#partialPhraseLetters'),
	partialPhraseWords = $('#partialPhraseWords'),
	partialPhraseSummed = $('#partialPhraseSummed');

let decode = function (){
	chrome.tabs.query({ active: true, currentWindow: true}).then(function (tabs){
		let activeTab = tabs[0];
		let activeTabId = activeTab.id;

		chrome.scripting.executeScript( {
			target: { tabId: activeTabId},
  			func: getSel
		}, function(selection) {
  			let el = document.getElementById('phraseAdd'); 
  			el.value = selection[0].result;

		});
	});
	
	setTimeout(function (){
		document.getElementById('phraseAdd').dispatchEvent(new Event('input'));
	},400);
}


function getSel() {
	return window.getSelection().toString();
}


$(document).ready(function (){
	// Load cipher from storage
	loadData();
	// Save config button
	$('#saveConfigurationButton').on('click', function (){
		console.log('hier');
		let cipher = $('#activeCipher').val();
		setStorageKey("cipher", cipher);
	});
	// Run decode on cipher change
	$('#activeCipher').on('change', function (){
		setStorageKey("cipher", $(this).val());
		decodeAndParse();				
	});
	
	// Run decode when phrase is added
	$('#phraseAdd').on('input', function (){
		decodeAndParse();
	});
	
	decode();
});		

function decodeAndParse () {
	let cipher = $('#activeCipher').val();
	let phrase = $('#phraseAdd').val();
	
	if (phrase !== '') {
			let phraser = new Phraser(phrase, cipher);
		
			phraser.getPhraseValue();
			phraser.totalize();
			
			if (cipher === 'HebrewGematria' || cipher === 'HebrewGematriaOrdinal') {
				let hebrewTranslation = phraser.translateHebrew();
				$('#translate_result').html(hebrewTranslation);
			}
			
			if (cipher === 'GreekIsopheny') {
				$('#translate_result').html(phraser.greekTranslation);
			}
				
			currentCipher.html(cipher);
			partialPhrase.html(phraser.phraseHtml);
			partialPhraseTotal.html(phraser.totals.A);	
			partialPhraseReduced.html(phraser.totals.B);
			partialPhraseLetters.html(phraser.totals.C);
			partialPhraseWords.html(phraser.totals.D);
			partialPhraseSummed.html(phraser.totals.S);

			if (cipher === 'HebrewGematria' || cipher === 'HebrewGematriaOrdinal') {			
				//partialPhrase.css('text-align', 'right');
				$('.a_word').each(function (){
					$(this).css('float', 'right');
										
				});
				$('sup').each(function (){
					$(this).css('text-align', 'right');
				});
				
			} else {
				//partialPhrase.css('text-align', 'left');
				$(this).css('float', 'left');
			}
			
		
	}
}


// Sets a key and stores its value into the storage
function setStorageKey(key, value){
    chrome.storage.local.set({ [key]: value });
}

// Gets a key value from the storage
function getStorageKeyValue(key, onGetStorageKeyValue){
    chrome.storage.local.get([key], function(result) {
       onGetStorageKeyValue(result[key]);
    });
}

//setStorageKey("K1", value);

//) 2) Get saved value from storage and display a warning message with the value
//getStorageKeyValue("K1", function(key) {
//  alert("Set value: "+value+" --- Received value: "+ key);
//});
// Results in: Set value: 10 --- Received Value: 10

function loadData() {
	getStorageKeyValue("cipher", function (cipher){
		let select = $("#activeCipher");
		
		select.val(cipher !== ''?cipher:DefaultCipher);						
	});		
//		let cipher = (undefined === obj.cipher)?DefaultCipher:obj.cipher;
//							
//		let select = $("#activeCipher");
//		select.val(cipher);
	
	
}

