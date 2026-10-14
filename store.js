"use strict";
const cfg=window.NFC_CONFIG || {products:[],whatsapp:""};
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>'$ '+Number(n).toLocaleString('es-UY');
const products=cfg.products||[];
let cart=[];try{cart=JSON.parse(localStorage.getItem('nfc-cart')||'[]');if(!Array.isArray(cart))cart=[];}catch{cart=[]}
cart=cart.filter(i=>i && typeof i==='object' && products.some(p=>p.id===i.id)).map(i=>({id:i.id,quantity:Math.max(1,Math.min(20,Math.floor(Number(i.quantity)||1))),link:typeof i.link==='string'?i.link.slice(0,500):'',text:typeof i.text==='string'?i.text.slice(0,250):''}));
let selected=null,filter='todos',returnFocus=null;
const drawer=$('#cartDrawer'),modal=$('#productModal'),backdrop=$('#backdrop');
function openPanel(panel){returnFocus=document.activeElement;closePanels(false);if(panel===drawer){drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');show(backdrop)}else show(modal);document.body.style.overflow='hidden';panel.querySelector('button,input')?.focus()}
function closePanels(restore=true){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');hide(modal);hide(backdrop);document.body.style.overflow='';if(restore)returnFocus?.focus()}
backdrop.onclick=()=>closePanels();
modal.onclick=e=>{if(e.target===modal)closePanels()};
document.addEventListener('keydown',e=>{
 const panel=!modal.classList.contains('hidden')?modal:drawer.classList.contains('open')?drawer:null;
 if(!panel)return;
 if(e.key==='Escape'){e.preventDefault();closePanels()}
 if(e.key==='Tab'){const nodes=Array.from(panel.querySelectorAll('button:not(:disabled),input,a[href]'));const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}
});
const phone=String(cfg.whatsapp||'').replace(/\D/g,'');
function save(){try{localStorage.setItem('nfc-cart',JSON.stringify(cart))}catch{} renderCart()}
function notice(s){$('#checkoutFeedback').textContent=s}
function show(el){el?.classList.remove('hidden')}function hide(el){el?.classList.add('hidden')}
function renderProducts(){const a=products.filter(p=>filter==='todos'||p.category===filter);$('#productGrid').innerHTML=a.map((p,i)=>`<article class="product-card"><div class="product-image"><span class="product-tag">${escapeHTML(p.badge)}</span><div class="plaque-mini ${i%2?'top-right':''}"><div class="mini-symbol">${escapeHTML(p.icon)}</div><div class="mini-code" aria-hidden="true"></div><div class="mini-caption">NFC + QR</div></div></div><div class="product-body"><span class="product-category">${p.category==='resenas'?'RESEÑAS':p.category==='redes'?'REDES SOCIALES':'PERSONALIZADA'}</span><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.description)}</p><div class="product-bottom"><div class="product-price">${money(p.price)}<small>PRECIO DE REFERENCIA</small></div><button class="product-add" type="button" data-add="${escapeHTML(p.id)}" aria-label="Agregar ${escapeHTML(p.name)}">+</button></div></div></article>`).join('');$$('[data-add]').forEach(b=>b.onclick=()=>openProduct(b.dataset.add))}
function openProduct(id){selected=products.find(p=>p.id===id);if(!selected)return;$('#modalTitle').textContent=selected.name;$('#customLink').value='';$('#customText').value='';$('#customQuantity').value=1;$('#modalFeedback').textContent='';openPanel(modal)}
function renderCart(){cart=cart.filter(i=>products.some(p=>p.id===i.id));const count=cart.reduce((a,b)=>a+b.quantity,0);$('#cartCount').textContent=count;$('#drawerCount').textContent=`(${count})`;$('#cartTotal').textContent=money(cart.reduce((a,b)=>a+products.find(p=>p.id===b.id).price*b.quantity,0));$('#checkoutButton').disabled=!count;$('#cartItems').innerHTML=cart.length?cart.map((c,i)=>{const p=products.find(x=>x.id===c.id);return `<div class="cart-line"><div class="cart-line-head"><strong>${escapeHTML(p.name)}</strong><button type="button" data-remove="${i}" aria-label="Quitar">×</button></div>${c.link?`<small>Enlace: ${escapeHTML(c.link)}</small>`:''}${c.text?`<small>Detalle: ${escapeHTML(c.text)}</small>`:''}<div class="cart-line-qty"><div class="qty-control"><button data-qty="${i}" data-delta="-1">−</button><span>${c.quantity}</span><button data-qty="${i}" data-delta="1">+</button></div><b>${money(p.price*c.quantity)}</b></div></div>`}).join(''):'<div class="empty-cart"><div class="huge">⌁</div><p>Tu pedido está vacío.<br>Elegí tu primera placa NFC + QR.</p></div>';$$('[data-remove]').forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.remove,1);save()});$$('[data-qty]').forEach(b=>b.onclick=()=>{let i=cart[+b.dataset.qty];i.quantity=Math.min(20,i.quantity+Number(b.dataset.delta));if(i.quantity<=0)cart.splice(+b.dataset.qty,1);save()})}
function orderText(){let total=0;const lines=cart.map((c,i)=>{const p=products.find(x=>x.id===c.id);total+=p.price*c.quantity;return `${i+1}. ${p.name}\nCantidad: ${c.quantity}\nPrecio de referencia: ${money(p.price*c.quantity)}${c.link?'\nEnlace: '+c.link:''}${c.text?'\nPersonalización: '+c.text:''}`});return `Hola, NFC TAP SERV. Quisiera consultar por este pedido:\n\n${lines.join('\n\n')}\n\nTotal de referencia: ${money(total)} UYU\n\n¿Me confirmás disponibilidad, precio final y entrega?`}
function openWhatsApp(txt){const url=phone?`https://wa.me/${phone}?text=${encodeURIComponent(txt)}`:null;if(url){window.open(url,'_blank','noopener,noreferrer');notice('Se abrió WhatsApp. Tocá Enviar para compartir el mensaje.')}else{const box=$('#checkoutFeedback');box.textContent='Falta configurar el número de WhatsApp de NFC TAP SERV. Podés copiar el pedido y enviarlo manualmente: '+txt; if(navigator.clipboard?.writeText)navigator.clipboard.writeText(txt).then(()=>{box.textContent='Pedido copiado al portapapeles. Falta configurar el número de WhatsApp para abrir el chat directamente.'}).catch(()=>{});}}
$('#checkoutButton').onclick=()=>{if(cart.length)openWhatsApp(orderText())};
$('#contactButton').onclick=()=>openWhatsApp('Hola, NFC TAP SERV. Quisiera conocer sus placas NFC + QR.');
$('#addCustomized').onclick=()=>{if(!selected)return;const link=$('#customLink').value.trim();if(link){try{const url=new URL(link);if(!['https:','http:'].includes(url.protocol))throw Error()}catch{$('#modalFeedback').textContent='Ingresá un enlace completo que empiece con https:// o dejalo vacío para definirlo luego.';$('#customLink').focus();return}}const quantity=Math.max(1,Math.min(20,Math.floor(Number($('#customQuantity').value)||1)));cart.push({id:selected.id,quantity,link:$('#customLink').value.trim(),text:$('#customText').value.trim()});save();openPanel(drawer)};
$('#cartOpen').onclick=()=>openPanel(drawer);
$('#cartClose').onclick=()=>closePanels();
$('#productModalClose').onclick=()=>closePanels();
$('#menuToggle').onclick=()=>{const open=$('.main-nav').classList.toggle('open');$('#menuToggle').setAttribute('aria-expanded',String(open))};
$$('.main-nav a').forEach(a=>a.onclick=()=>{$('.main-nav').classList.remove('open');$('#menuToggle').setAttribute('aria-expanded','false')});
$$('#filters [data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;$$('#filters [data-filter]').forEach(x=>x.classList.toggle('active',x===b));renderProducts()});
$('#year').textContent=new Date().getFullYear();
renderProducts();renderCart();
