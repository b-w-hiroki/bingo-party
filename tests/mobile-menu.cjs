const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
function harness(){
 const node=()=>{const set=new Set();return {handlers:{},attrs:{},inert:true,classList:{contains:k=>set.has(k),add:k=>set.add(k),remove:k=>set.delete(k)},addEventListener(k,f){this.handlers[k]=f},setAttribute(k,v){this.attrs[k]=v},focus(){document.activeElement=this}}};
 const toggle=node(),menu=node(),links=[node(),node(),node()],desktop=node(),media=node();menu.querySelectorAll=()=>links;menu.contains=n=>links.includes(n);
 const document={activeElement:null,body:{style:{overflow:'auto'}},handlers:{},getElementById:id=>id==='menuToggle'?toggle:menu,querySelector:()=>desktop,addEventListener(k,f){this.handlers[k]=f}};
 const html=fs.readFileSync('index.html','utf8');vm.runInNewContext(html.slice(html.indexOf('const menuToggle ='),html.indexOf('/* ===== スクロールアニメーション')), {document,window:{matchMedia:()=>media}});
 return {toggle,menu,links,desktop,media,document};
}
test('open announces state, focuses first link, close restores previous scrolling',()=>{const h=harness();h.toggle.handlers.click();assert.equal(h.toggle.attrs['aria-expanded'],'true');assert.equal(h.menu.inert,false);assert.equal(h.document.activeElement,h.links[0]);h.toggle.handlers.click();assert.equal(h.menu.inert,true);assert.equal(h.document.body.style.overflow,'auto');assert.equal(h.toggle.attrs['aria-expanded'],'false')});
test('Escape closes and keyboard focus cycles inside navigation',()=>{const h=harness();h.toggle.handlers.click();h.document.handlers.keydown({key:'Tab',shiftKey:true,preventDefault(){}});assert.equal(h.document.activeElement,h.toggle);h.document.handlers.keydown({key:'Escape'});assert.equal(h.document.activeElement,h.toggle);assert.equal(h.menu.inert,true)});
test('desktop resize releases lock and transfers focus to visible desktop navigation',()=>{const h=harness();h.toggle.handlers.click();h.media.handlers.change({matches:true});assert.equal(h.document.body.style.overflow,'auto');assert.equal(h.document.activeElement,h.desktop);assert.equal(h.menu.inert,true)});
test('navigation link closes menu without leaving hidden focus',()=>{const h=harness();h.toggle.handlers.click();h.links[0].handlers.click();assert.equal(h.document.body.style.overflow,'auto');assert.equal(h.document.activeElement,h.toggle)});
