// === 授权检查 - 核心功能现已免费开放 ===
function checkAuthorization() {
  // 核心功能已免费开放，Token仅用于展示用户状态
  return true;
}

// === 右键菜单功能 ===
function showContextMenu(x, y) {
  const menu = document.getElementById('contextMenu');
  if (!menu) return;
  
  // 确保菜单不超出屏幕
  const menuWidth = 200;
  const menuHeight = 500;
  const finalX = (x + menuWidth > window.innerWidth) ? (window.innerWidth - menuWidth - 10) : x;
  const finalY = (y + menuHeight > window.innerHeight) ? (window.innerHeight - menuHeight - 10) : y;
  
  menu.style.left = finalX + 'px';
  menu.style.top = finalY + 'px';
  menu.style.display = 'block';
  
  // 添加显示动画
  menu.style.opacity = '0';
  menu.style.transform = 'scale(0.95)';
  setTimeout(() => {
    menu.style.transition = 'opacity 0.2s, transform 0.2s';
    menu.style.opacity = '1';
    menu.style.transform = 'scale(1)';
  }, 10);
}

function contextMenuAction(action) {
  const menu = document.getElementById('contextMenu');
  if (menu) menu.style.display = 'none';
  
  switch(action) {
    case 'zoomIn': 
      if (typeof zoomIn === 'function') zoomIn(); 
      break;
    case 'zoomOut': 
      if (typeof zoomOut === 'function') zoomOut(); 
      break;
    case 'zoomFit': 
      if (typeof zoomFit === 'function') zoomFit(); 
      break;
    case 'prevPage': 
      if (typeof prevPage === 'function') prevPage(); 
      break;
    case 'nextPage': 
      if (typeof nextPage === 'function') nextPage(); 
      break;
    case 'firstPage':
      if (typeof goToPage === 'function') goToPage(1);
      break;
    case 'lastPage':
      if (typeof pdfDoc !== 'undefined' && pdfDoc && typeof goToPage === 'function') {
        goToPage(pdfDoc.numPages);
      }
      break;
    case 'goToPage':
      const pageInputEl = document.getElementById('pageInput');
      if (pageInputEl) {
        pageInputEl.focus();
        pageInputEl.select();
        showToast('输入页码后按Enter跳转');
      }
      break;
    case 'toggleBookmark': 
      if (typeof toggleBookmark === 'function') toggleBookmark(); 
      break;
    case 'fullscreen': 
      if (typeof toggleFullscreen === 'function') toggleFullscreen(); 
      break;
    case 'search': 
      const searchInput = document.getElementById('globalSearch');
      if (searchInput) {
        searchInput.focus();
        showToast('开始搜索教材');
      }
      break;
    case 'help': 
      if (typeof toggleShortcuts === 'function') toggleShortcuts(); 
      break;
    case 'toggleSidebar': 
      if (typeof toggleSidebar === 'function') toggleSidebar(); 
      break;
    case 'jump10':
    case 'jump20':
    case 'jump30':
    case 'jump40':
    case 'jump50':
      const pageNum = parseInt(action.replace('jump', ''));
      if (typeof pdfDoc !== 'undefined' && pdfDoc && typeof goToPage === 'function') {
        if (pageNum <= pdfDoc.numPages) {
          goToPage(pageNum);
          showToast(`跳转到第 ${pageNum} 页`);
        } else {
          showToast(`第 ${pageNum} 页不存在`);
        }
      }
      break;
  }
}

// 右键菜单事件
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  showContextMenu(e.clientX, e.clientY);
  return false;
});

// 点击其他地方关闭右键菜单
document.addEventListener('click', function(e) {
  const menu = document.getElementById('contextMenu');
  if (menu && !menu.contains(e.target)) {
    menu.style.display = 'none';
  }
});

// ESC关闭右键菜单
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const menu = document.getElementById('contextMenu');
    if (menu) menu.style.display = 'none';
  }
});

console.log('✅ 右键菜单功能已加载（需授权）');
