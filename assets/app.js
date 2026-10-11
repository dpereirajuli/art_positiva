'use strict';
// Site estático: não depende de servidor, bibliotecas JS ou banco de dados.
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const WHATSAPP = '5511963354187'; // Contato publicado no site original. Confirme antes de publicar.
const state = { color: '#292e25', colorName: 'grafite', brand: '', night: false, letter: 'bloco', letterName: 'bloco', light: 'none', lightName: 'sem luz', selected: false, photoURL: null };
const LETTER_FONTS = { bloco: 'Manrope,Arial,sans-serif', serif: 'Georgia,"Times New Roman",serif', neon: 'Manrope,Arial,sans-serif' };
$('#year').textContent = new Date().getFullYear();

const menuButton = $('.menu-toggle');
function closeMenu(){ $('#menu').classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Abrir menu'); }
menuButton.addEventListener('click', () => {const open = $('#menu').classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');});
$$('#menu a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => {if(e.key==='Escape')closeMenu();});

// Conteúdo permanece visível se JS ou IntersectionObserver não estiverem disponíveis.
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
 document.documentElement.classList.add('js');
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible'); observer.unobserve(entry.target);}}), {threshold:0.08});
 $$('.reveal').forEach(el => observer.observe(el));
}

const dialog=$('#project-dialog');
$$('.project').forEach(card => card.addEventListener('click', () => {
 $('#dialog-image').src=card.dataset.img;$('#dialog-image').alt=card.querySelector('img').alt;$('#dialog-title').textContent=card.dataset.title;
 if(typeof dialog.showModal==='function')dialog.showModal();else window.open(card.dataset.img,'_blank','noopener');
}));
$('.dialog-close').addEventListener('click',()=>dialog.close());
$('#dialog-quote').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});

// Comparador: arraste em qualquer ponto da imagem, com mouse, caneta ou toque.
const comparison = $('.comparison');
const comparisonRange = $('#comparison-range');
let comparisonPointer = null;
function updateComparison(value){
 const split = Math.max(0, Math.min(100, Number(value)));
 comparisonRange.value = String(split);
 comparison.style.setProperty('--split', `${split}%`);
 comparisonRange.setAttribute('aria-valuetext', `${Math.round(split)}% antes, ${100-Math.round(split)}% conceito`);
}
function compareAtPointer(event){
 const bounds = comparison.getBoundingClientRect();
 if(bounds.width) updateComparison(Math.round((event.clientX-bounds.left)/bounds.width*100));
}
comparisonRange.addEventListener('input', event => updateComparison(event.target.value));
comparison.addEventListener('pointerdown', event => {
 if(!event.isPrimary || event.button !== 0) return;
 comparisonPointer = event.pointerId;
 comparison.setPointerCapture(event.pointerId);
 comparison.classList.add('dragging');
 comparisonRange.focus({preventScroll:true});
 compareAtPointer(event);
 event.preventDefault();
});
comparison.addEventListener('pointermove', event => {
 if(event.pointerId === comparisonPointer) compareAtPointer(event);
});
function finishComparison(event){
 if(event.pointerId !== comparisonPointer) return;
 comparisonPointer = null;
 comparison.classList.remove('dragging');
 if(comparison.hasPointerCapture(event.pointerId)) comparison.releasePointerCapture(event.pointerId);
}
comparison.addEventListener('pointerup', finishComparison);
comparison.addEventListener('pointercancel', finishComparison);
comparison.addEventListener('lostpointercapture', finishComparison);
comparison.addEventListener('dragstart', event => event.preventDefault());
updateComparison(comparisonRange.value);
function updateScene(){
 $('#facade-panel').setAttribute('fill',state.color);
 const title=state.brand.trim()||'SUA MARCA';
 const font=LETTER_FONTS[state.letter]||LETTER_FONTS.bloco;
 const weight=state.letter==='serif'?'700':state.letter==='neon'?'600':'800';
 ['#brand-sign','#brand-glow'].forEach(selector=>{
  const text=$(selector);
  text.textContent=title.toLocaleUpperCase('pt-BR');
  text.setAttribute('font-size',title.length>14?'27':title.length>10?'34':'44');
  text.setAttribute('font-family',font);
  text.setAttribute('font-weight',weight);
 });
 // "Acesa" quando é neon, há iluminação escolhida, ou está de noite.
 const glowing=state.letter==='neon'||state.light!=='none'||state.night;
 // A areia requer letras escuras para manter contraste na prévia diurna.
 const signFill=state.letter==='neon'?'#c6dcff':state.night?'#e4efff':state.colorName==='areia'?'#2b3427':'#ffffff';
 $('#brand-sign').setAttribute('fill',signFill);
 $('#studio-view').classList.toggle('night',state.night);
 $('#studio-view').classList.toggle('lit',glowing);
 $('#selected-color').textContent=state.colorName;
 $('#scene-status').textContent=`ACM ${state.colorName} · letra ${state.letterName} · luz ${state.lightName} · ${state.night?'noite':'dia'}`;
 $('#night-toggle').textContent=state.night?'Ver de dia':'Ver à noite';
 $('#night-toggle').setAttribute('aria-pressed',String(state.night));
}
$('#brand-name').addEventListener('input',e=>{state.brand=e.target.value;updateScene();});
$$('.swatch').forEach(button=>button.addEventListener('click',()=>{state.color=button.dataset.color;state.colorName=button.dataset.name;$$('.swatch').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});updateScene();}));
function bindChips(attr,stateKey,nameKey){
 const group=$$(`[data-${attr}]`);
 group.forEach(button=>button.addEventListener('click',()=>{
  state[stateKey]=button.dataset[attr];
  state[nameKey]=button.dataset[`${attr}Name`]||button.dataset[attr];
  group.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  updateScene();
 }));
}
bindChips('letter','letter','letterName');
bindChips('light','light','lightName');
$('#night-toggle').addEventListener('click',()=>{state.night=!state.night;updateScene();});
$('#use-concept').addEventListener('click',()=>{state.selected=true;$('#service').value='Projeto completo';});
$$('[data-service]').forEach(link=>link.addEventListener('click',()=>$('#service').value=link.dataset.service));

const photoInput=$('#photo');
function removePhoto(){if(state.photoURL)URL.revokeObjectURL(state.photoURL);state.photoURL=null;photoInput.value='';$('#photo-preview').hidden=true;$('#photo-preview img').removeAttribute('src');$('#photo-status').classList.remove('error');$('#photo-status').textContent='A foto fica no seu navegador. Você deverá anexá-la manualmente no WhatsApp.';}
$('#remove-photo').addEventListener('click',removePhoto);
photoInput.addEventListener('change',()=>{
 const file=photoInput.files[0];if(!file){removePhoto();return;}
 if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>10*1024*1024){removePhoto();$('#photo-status').textContent='Escolha uma imagem JPG, PNG ou WebP de até 10 MB.';$('#photo-status').classList.add('error');return;}
 if(state.photoURL)URL.revokeObjectURL(state.photoURL);state.photoURL=URL.createObjectURL(file);
 $('#photo-preview img').src=state.photoURL;$('#photo-preview').hidden=false;$('#photo-status').classList.remove('error');$('#photo-status').textContent=`${file.name} selecionada. Anexe esta foto manualmente após abrir o WhatsApp.`;
 $('#photo-preview img').onerror=()=>{removePhoto();$('#photo-status').textContent='Não foi possível abrir esta imagem. Selecione outro arquivo.';$('#photo-status').classList.add('error');};
});
$('#quote-form').addEventListener('submit',e=>{
 e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;
 const values=Object.fromEntries(new FormData(form));
 if(!values.name.trim()||!values.city.trim()){$('#form-status').textContent='Preencha seu nome e a cidade.';return;}
 const lines=[`Olá, Artpositiva! Sou ${values.name.trim()} e gostaria de solicitar um orçamento.`,`Cidade: ${values.city.trim()}`,`Serviço: ${values.service}`];
 if(values.size.trim())lines.push(`Medidas aproximadas: ${values.size.trim()}`);
 if(values.message.trim())lines.push(`Minha ideia: ${values.message.trim()}`);
 if(state.selected)lines.push(`Referência do estúdio: marca ${state.brand.trim()||'a definir'}, revestimento ACM ${state.colorName}, letra ${state.letterName}, iluminação ${state.lightName}, visualização ${state.night?'noturna':'diurna'}.`);
 if(photoInput.files.length)lines.push('Também enviarei uma foto do local em anexo.');
 const url=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`;
 const fallback=$('#whatsapp-fallback');fallback.href=url;fallback.hidden=false;
 window.open(url,'_blank','noopener,noreferrer');
 $('#form-status').textContent='Pedido preparado. Envie a mensagem no WhatsApp para iniciar o atendimento. Se a janela não abriu, use o link abaixo.';
});
window.addEventListener('pagehide',()=>{if(state.photoURL)URL.revokeObjectURL(state.photoURL);});
updateScene();

// Navegação do portfólio com a estrutura de carrossel disponível na página.
const projectTrack = document.getElementById('project-track');
if(projectTrack){
 const previousProject = document.getElementById('prev-project');
 const nextProject = document.getElementById('next-project');
 const moveProject = direction => {
  const card = [...projectTrack.querySelectorAll('.project')].find(item => !item.hidden);
  if(card) projectTrack.scrollBy({left:direction * (card.getBoundingClientRect().width + 26),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
 };
 previousProject?.addEventListener('click',()=>moveProject(-1));
 nextProject?.addEventListener('click',()=>moveProject(1));
 projectTrack.addEventListener('keydown',event=>{
  if(event.target===projectTrack && ['ArrowLeft','ArrowRight'].includes(event.key)){
   event.preventDefault();moveProject(event.key==='ArrowRight'?1:-1);
  }
 });
}
