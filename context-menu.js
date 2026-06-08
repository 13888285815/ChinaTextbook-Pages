// === 右键菜单功能 ===
function showContextMenu(x, y) {
  const menu = document.getElementById('contextMenu');
  if (!menu) return;
  
  // 确保菜单不超出屏幕
  const menuWidth = 180;
  const menuHeight = 400;
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
        if (typeof showToast === 'function') showToast('开始搜索教材');
      }
      break;
    case 'help': 
      if (typeof toggleShortcuts === 'function') toggleShortcuts(); 
      break;
    case 'toggleSidebar': 
      if (typeof toggleSidebar === 'function') toggleSidebar(); 
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

console.log('✅ 右键菜单功能已加载');
