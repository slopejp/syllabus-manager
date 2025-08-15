// --- データ構造と初期化 ---
const STORAGE_KEY = 'syllabus_manager_v1';
let state = { inprogress: [], wishlist: [], completed: [] };

// --- masterSubjects: 事前登録科目リスト ---
const masterSubjects = [
  {id:'s1', name:'線形代数I', code:'MATH101', teacher:'山田太郎', url:'', term:'2025春'},
  {id:'s2', name:'微分方程式I', code:'MATH201', teacher:'佐藤花子', url:'', term:'2025春'},
  {id:'s3', name:'情報リテラシー', code:'INF100', teacher:'田中一郎', url:'', term:'2024秋'},
];

// --- ヘルパー ---
function genId(){return 'id-'+Math.random().toString(36).slice(2,9)}
function save(){localStorage.setItem(STORAGE_KEY, JSON.stringify(state));}
function load(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(raw) state = JSON.parse(raw);
  else initializeDemoData();
}

// --- DOM参照 ---
const inList = document.getElementById('inprogress-list');
const wlList = document.getElementById('wishlist-list');
const compList = document.getElementById('completed-list');
const search = document.getElementById('search');
const modalBack = document.getElementById('modaiBack');
const addBtn = document.getElementById('addBtn');
const itemForm = document.getElementById('itemForm');
const fileInput = document.getElementById('fileInput');

// form fields
const fId = document.getElementById('itemId');
const fSubject = document.getElementById('field-subject'); // ← 修正済み
const fNote = document.getElementById('field-note');
const fStatus = document.getElementById('field-status');
const fTerm = document.getElementById('field-term');

// counts
const cIn = document.getElementById('count-in');
const cWl = document.getElementById('count-wl');
const cComp = document.getElementById('count-comp');

// --- デモ用初期化 ---
function initializeDemoData() {
  state.inprogress = [{id:genId(), subjectId:'s1', note:''}];
  state.wishlist = [{id:genId(), subjectId:'s2', note:'月曜3限'}];
  state.completed = [{id:genId(), subjectId:'s3', note:'A'}];
  save();
}

// --- 科目選択リストを作成 ---
function populateSubjectSelect() {
  if (!fSubject) { console.error('field-subject 要素が存在しません'); return; }
  fSubject.innerHTML = '<option value="">選択してください</option>';
  masterSubjects.forEach(sub => {
    const opt = document.createElement('option');
    opt.value = sub.id;
    opt.textContent = `${sub.name} (${sub.code})`;
    fSubject.appendChild(opt);
  });
}

// --- 描画 ---
function render(){
  renderList(inList, state.inprogress, 'inprogress');
  renderList(wlList, state.wishlist, 'wishlist');
  renderList(compList, state.completed, 'completed');
  cIn.textContent = state.inprogress.length;
  cWl.textContent = state.wishlist.length;
  cComp.textContent = state.completed.length;
}

function renderList(container, items, status){
  container.innerHTML = '';
  const q = search.value.trim().toLowerCase();
  const filtered = items.filter(it => {
    const subject = masterSubjects.find(s=>s.id===it.subjectId) || {};
    return !q || (subject.name||'').toLowerCase().includes(q) || (subject.code||'').toLowerCase().includes(q) || (subject.teacher||'').toLowerCase().includes(q);
  });

  if(filtered.length===0){
    const li = document.createElement('li'); li.className='item'; li.innerHTML='<div class="meta">— 空です —</div>'; container.appendChild(li); return;
  }

  filtered.forEach(it=>{
    const subject = masterSubjects.find(s=>s.id===it.subjectId) || {};
    const li = document.createElement('li'); li.className='item';
    const left = document.createElement('div'); left.style.flex='1';
    const title = document.createElement('div'); 
    title.innerHTML = `<strong>${escapeHtml(subject.name||'')}</strong> <span class="meta">${escapeHtml(subject.code||'')}</span>`;
    const meta = document.createElement('div'); 
    meta.className='meta'; 
    meta.textContent = (subject.teacher?subject.teacher+' • ':'') + (subject.term?subject.term+' • ':'') + (it.note||'');
    left.appendChild(title); left.appendChild(meta);

    const actions = document.createElement('div'); actions.className='actions';
    const open = document.createElement('button'); open.className='muted-btn small'; open.textContent='開く▶';
    open.onclick = ()=>{ if(subject.url) window.open(subject.url,'_blank'); else alert('URLが未設定です'); };

    const edit = document.createElement('button'); edit.className='muted-btn small'; edit.textContent='編集';
    edit.onclick = ()=>{ openModalForEdit(it,status); };

    const del = document.createElement('button'); del.className='muted-btn small'; del.textContent='削除';
    del.onclick = ()=>{ if(confirm('削除しますか？')) removeItem(it.id,status); };

    const moveBtn = document.createElement('button'); moveBtn.className='small';
    if(status==='inprogress') { moveBtn.textContent='✓ 履修済みに'; moveBtn.onclick = ()=> moveItem(it.id,'inprogress','completed'); }
    else if(status==='wishlist') { moveBtn.textContent='→ 履修中に'; moveBtn.onclick = ()=> moveItem(it.id,'wishlist','inprogress'); }
    else if(status==='completed') { moveBtn.textContent='↺ 再履修'; moveBtn.onclick = ()=> moveItem(it.id,'completed','inprogress'); }

    actions.appendChild(open); actions.appendChild(edit); actions.appendChild(del); actions.appendChild(moveBtn);

    li.appendChild(left); li.appendChild(actions);
    container.appendChild(li);
  });
}

function escapeHtml(s){ return String(s||'').replace(/[&<>]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]); }

// --- CRUD ---
function addItem(obj){ obj.id = genId(); state[obj.status].push(obj); save(); render(); }
function updateItem(id, status, data){
  ['inprogress','wishlist','completed'].forEach(list=> state[list] = state[list].filter(i=> i.id!==id));
  state[data.status].push(Object.assign({id},data));
  save(); render();
}
function removeItem(id, status){ state[status] = state[status].filter(i=> i.id!==id); save(); render(); }
function moveItem(id, from, to){
  const idx = state[from].findIndex(i=>i.id===id); if(idx===-1) return; const it = state[from].splice(idx,1)[0]; it.status = to; state[to].push(it); save(); render();
}

// --- modal ---
function openModalForNew(){ 
  populateSubjectSelect();
  document.getElementById('modalTitle').textContent='科目を追加'; 
  fId.value=''; fSubject.value=''; fNote.value=''; fStatus.value='inprogress'; fTerm.value=''; 
  modalBack.style.display='flex'; 
}

function openModalForEdit(item,status){ 
  populateSubjectSelect();
  const subject = masterSubjects.find(s=>s.id===item.subjectId);
  document.getElementById('modalTitle').textContent='科目を編集'; 
  fId.value=item.id; 
  fSubject.value=subject ? subject.id : ''; 
  fNote.value=item.note||''; 
  fStatus.value=status; 
  fTerm.value=subject ? subject.term : ''; 
  modalBack.style.display='flex'; 
}

function closeModal(){ modalBack.style.display='none'; itemForm.reset(); }

itemForm.addEventListener('submit', e=>{
  e.preventDefault();
  const id=fId.value;
  const data={subjectId:fSubject.value, status:fStatus.value, note:fNote.value, term:fTerm.value};
  if(!data.subjectId){ alert('科目を選択してください'); return; }
  if(id){ updateItem(id,fStatus.value,data); } else { addItem(data); }
  closeModal();
});

document.getElementById('cancelBtn').addEventListener('click', closeModal);

// --- 検索イベント ---
search.addEventListener('input', ()=> render());

// --- buttons ---
addBtn.addEventListener('click', openModalForNew);
document.getElementById('clearAll').addEventListener('click', ()=>{
  if(confirm('全データを消します。よろしいですか？')){ state={inprogress:[],wishlist:[],completed:[]}; save(); render(); }
});

// --- export / import ---
document.getElementById('exportBtn').addEventListener('click', ()=>{
  const a = document.createElement('a'); 
  const blob = new Blob([JSON.stringify(state, null, 2)],{type:'application/json'}); 
  a.href = URL.createObjectURL(blob); a.download = 'syllabus-data.json'; a.click();
});
document.getElementById('importBtn').addEventListener('click', ()=> fileInput.click());
fileInput.addEventListener('change', e=>{
  const f = e.target.files[0]; if(!f) return; 
  const reader = new FileReader(); 
  reader.onload = ()=>{
    try{ 
      const parsed = JSON.parse(reader.result); 
      state = parsed; save(); render(); alert('インポートしました'); 
    }catch(err){ alert('読み込み失敗: JSONではありません'); }
  }; 
  reader.readAsText(f);
});

// --- load & render ---
load(); render();
