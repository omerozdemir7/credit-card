const el = (id)=>document.getElementById(id);
const card = el('card');
const nameIn = el('name');
const numberIn = el('number');
const expIn = el('exp');
const cvvIn = el('cvv');


const ccName = el('cc-name');
const ccNumber = el('cc-number');
const ccExp = el('cc-exp');
const ccCvv = el('cc-cvv');


function formatName(v){
if(!v) return 'AD SOYAD';
return v.replace(/\s+/g,' ').trim().toUpperCase();
}


function formatNumber(v){
const digits = v.replace(/\D/g,'').slice(0,16);
const groups = digits.match(/.{1,4}/g) || [];
return groups.join(' ');
}


function formatExp(v){
const d = v.replace(/\D/g,'').slice(0,4);
let mm = d.slice(0,2), yy = d.slice(2,4);
if(mm.length === 1 && parseInt(mm,10) > 1){ mm = '0'+mm; }
if(mm.length===2){
let m = parseInt(mm,10);
if(isNaN(m) || m<1) mm = '01';
if(m>12) mm = '12';
}
return (mm + (yy?'/'+yy:'')) || '';
}


function maskCVV(v){
const d = v.replace(/\D/g,'').slice(0,4);
return d.replace(/\d/g,'•');
}


// Live bindings
nameIn.addEventListener('input', ()=> ccName.textContent = formatName(nameIn.value) || 'AD SOYAD');


numberIn.addEventListener('input', ()=>{
const formatted = formatNumber(numberIn.value);
numberIn.value = formatted;
ccNumber.textContent = formatted || '0000 0000 0000 0000';
});


expIn.addEventListener('input', ()=>{
const formatted = formatExp(expIn.value);
expIn.value = formatted;
ccExp.textContent = formatted || 'MM/YY';
});


cvvIn.addEventListener('input', ()=> ccCvv.textContent = maskCVV(cvvIn.value) || '•••');


// Flip on CVV focus
cvvIn.addEventListener('focus', ()=> card.classList.add('is-back'));
cvvIn.addEventListener('blur', ()=> card.classList.remove('is-back'));


// Placeholder temizleme (focus olunca sil, boş kalırsa geri getir)
document.querySelectorAll('input').forEach(input=>{
const ph = input.getAttribute('placeholder');
input.addEventListener('focus', ()=>{ input.setAttribute('data-ph', ph); input.removeAttribute('placeholder'); });
input.addEventListener('blur', ()=>{ if(!input.value){ input.setAttribute('placeholder', ph); } });
});


ccCvv.textContent = maskCVV(cvvIn.value) || '•••';