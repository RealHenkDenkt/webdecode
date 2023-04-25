$(document).ready(function (){
	let stars = [
		{
			'width': 1,
			'height': 1,
			'pattern': [
				'()'
			]
		}
		,
		{
			'width' : 4,
			'height': 5, 
			'pattern': [
				'---()---',
				'()()()()',
				'-()()()-',
				'()()()()',
				'---()---',
			]
		},
		{
			'width' : 7,
			'height': 9, 
			'pattern': [
				'------()------',
				'-----()()-----',
				'()()()()()()()',
				'-()()()()()()-',				
				'--()()()()()--',				
				'-()()()()()()-',
				'()()()()()()()',
				'-----()()-----',
				'------()------',
			]
		},
		{
			'width': 10,
			'height': 13,
			'pattern': [
				'---------()---------',
				'--------()()--------',
				'-------()()()-------',
				'()()()()()()()()()()',
				'-()()()()()()()()()-',
				'--()()()()()()()()--',
				'---()()()()()()()---',
				'--()()()()()()()()--',
				'-()()()()()()()()()-',				
				'()()()()()()()()()()',				
				'-------()()()-------',				
				'--------()()--------',				
				'---------()---------',				
				
							]
		}
	];


    var c = document.getElementById("canvas");
    var hex = new CenteredHexagon(2, c);
    hex.drawFigure();
/*	
	let star = stars[1];
	let width = c.width;
	let height = c.height;
	let unit = Math.floor(height / star.height);
	let rad = Math.floor(unit/2);
	
	let y = rad;
	let d = c.getContext("2d");
	
	for (let i = 0; i < star.pattern.length; i++) {
		let x = rad;
		let line = star.pattern[i].split(''); 
 		
 		for (let l = 0; l < line.length; l++) {
			if ('(' === line[l]) {
				d.beginPath();
				d.arc(x + width /4, y, rad, 0, 2 * Math.PI);
				d.stroke();
			}
			x+=rad;
			
		}
		y+=unit;
	}

*/

    
   
})
