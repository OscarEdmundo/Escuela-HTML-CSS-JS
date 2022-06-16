/*	playable.js
*	Por: Oscar E. Palacios
*	Fecha: 17-04-2021
*/
/*

<div id="columna-css">CSS</div>
*/
const playable={
	editable:document.createElement('style'),
	textareaHTM:document.querySelector('.playable-htm'),
	textareaCSS:document.querySelector('.playable-css'),
	preview:document.createElement('div'),	
	htmOriginal:'',
	cssOriginal:'',
	auto_update:false,
	
	fillCode:function() {
		with(playable) {
		try{
			preview.innerHTML = textareaHTM.value;
			editable.textContent = textareaCSS.value;
		}catch(e){}
		}
	},

	auto:function(){
		if(playable.auto_update) playable.fillCode();
	},

	start:function(){
		with(playable) {
		editable.className=('editable');
		document.querySelector('head').appendChild(editable);

		try{
			htmOriginal=textareaHTM.defaultValue;
			textareaHTM.addEventListener('input', auto);
		}catch(e){alert(e)}

		try{
			cssOriginal=textareaCSS.defaultValue;
			textareaCSS.addEventListener('input', auto);
		}catch(e){alert(e)}

		let temp = document.querySelector('#html-row');
		if(temp){
		  let x=document.createElement('div');
		  x.setAttribute('id','columna-html');
		  x.innerHTML = 'HTML';
		  temp.insertBefore(x, temp.firstChild);
		}
		
		temp = document.querySelector('#css-row');
		if(temp){
		  let x=document.createElement('div');
		  x.setAttribute('id','columna-css');
		  x.innerHTML = 'CSS';
		  temp.insertBefore(x, temp.firstChild);
		}
		
		let nav=document.createElement('nav');
		nav.className="playable-buttons";
		
		let resetB=document.createElement('button');
		resetB.textContent='Reiniciar';
		resetB.setAttribute('id','playable-reset')

		let autoB=document.createElement('button');
		autoB.textContent='Auto';
		autoB.setAttribute('id','playable-auto-update')

		let runB=document.createElement('button');
		runB.textContent='Run';
		runB.setAttribute('id','playable-run')

		nav.appendChild(resetB);
		nav.appendChild(runB);
		nav.appendChild(autoB);

		let papa=document.querySelector('.playable');
		papa.insertBefore(nav, papa.firstChild);

		let row_preview=document.createElement('div');		
		row_preview.className='playable-row';
		row_preview.setAttribute('id','salida-row');
		row_preview.innerHTML='<div id="columna-salida">Salida</div>';
		preview.className='playable-preview';
		row_preview.appendChild(preview);
		papa.appendChild(row_preview);
		
		setTimeout(function(){
			resetB.addEventListener('click', function() {
				try{textareaHTM.value = htmOriginal;}catch(e){}
				try{textareaCSS.value = cssOriginal;}catch(e){}
				fillCode();
			})
			
			autoB.addEventListener('click', function() {
				autoB.classList.toggle('playable-button-active');
				auto_update = !auto_update;
			})
			
			runB.addEventListener('click', fillCode);
		}, 1000);
		fillCode();
		}
	}
}

window.addEventListener('load', playable.start, false);
	