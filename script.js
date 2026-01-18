// 图书馆管理系统 JavaScript

// 模拟图书数据
const booksData = [
    { id: 1, title: '百年孤独', author: '加西亚·马尔克斯', isbn: '9787544253994', category: '文学', stock: 5, borrowed: 3 },
    { id: 2, title: '活着', author: '余华', isbn: '9787506365437', category: '小说', stock: 8, borrowed: 2 },
    { id: 3, title: '深度学习', author: 'Ian Goodfellow', isbn: '9787115464763', category: '科技', stock: 3, borrowed: 3 },
    { id: 4, title: '人类简史', author: '尤瓦尔·赫拉利', isbn: '9787508647357', category: '历史', stock: 6, borrowed: 4 },
    { id: 5, title: '三体', author: '刘慈欣', isbn: '9787536692930', category: '科幻', stock: 4, borrowed: 2 },
    { id: 6, title: '平凡的世界', author: '路遥', isbn: '9787530216781', category: '文学', stock: 7, borrowed: 5 },
    { id: 7, title: '围城', author: '钱钟书', isbn: '9787020024759', category: '文学', stock: 3, borrowed: 1 },
    { id: 8, title: '月亮与六便士', author: '毛姆', isbn: '9787020042951', category: '文学', stock: 5, borrowed: 3 },
];

// 模拟借阅记录数据
const borrowingData = [
    { id: 1, bookTitle: '百年孤独', reader: '张明远', borrowDate: '2024-01-10', dueDate: '2024-02-10', status: 'normal' },
    { id: 2, bookTitle: '三体', reader: '李晓琳', borrowDate: '2024-01-08', dueDate: '2024-02-08', status: 'normal' },
    { id: 3, bookTitle: '平凡的世界', reader: '王志强', borrowDate: '2024-01-05', dueDate: '2024-02-05', status: 'normal' },
    { id: 4, bookTitle: '围城', reader: '赵雅芳', borrowDate: '2023-12-15', dueDate: '2024-01-15', status: 'overdue' },
    { id: 5, bookTitle: '深度学习', reader: '陈伟杰', borrowDate: '2024-01-12', dueDate: '2024-02-12', status: 'normal' },
];

// 模拟读者数据
const readersData = [
    { id: 1, name: '张明远', cardNo: 'L20240001', phone: '13800138001', registerDate: '2023-06-15', status: 'active' },
    { id: 2, name: '李晓琳', cardNo: 'L20240002', phone: '13800138002', registerDate: '2023-07-20', status: 'active' },
    { id: 3, name: '王志强', cardNo: 'L20240003', phone: '13800138003', registerDate: '2023-08-10', status: 'active' },
    { id: 4, name: '赵雅芳', cardNo: 'L20240004', phone: '13800138004', registerDate: '2023-09-05', status: 'suspended' },
    { id: 5, name: '陈伟杰', cardNo: 'L20240005', phone: '13800138005', registerDate: '2023-10-12', status: 'active' },
];

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initModals();
    initSearch();
    initTabs();
    initForms();

    // 根据当前页面初始化相应功能
    const currentPath = window.location.pathname;
    if (currentPath.includes('books.html')) {
        renderBooksTable();
    } else if (currentPath.includes('borrowing.html')) {
        renderBorrowingTable();
    } else if (currentPath.includes('users.html')) {
        renderReadersTable();
    }
});

// 导航高亮
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath.split('/').pop()) {
            link.closest('.nav-item').classList.add('active');
        }
    });
}

// 模态框功能
function initModals() {
    // 打开模态框
    document.querySelectorAll('[data-modal]').forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // 关闭模态框
    document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
        el.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.closest('.modal-overlay'));
            }
        });
    });

    // ESC 关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modal) {
    modal.classList.remove('active');
}

// 搜索功能
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const categorySelect = document.querySelector('.category-select');
    const keyword = searchInput?.value?.toLowerCase() || '';
    const category = categorySelect?.value || 'all';

    if (window.location.pathname.includes('books.html')) {
        filterBooks(keyword, category);
    } else if (window.location.pathname.includes('users.html')) {
        filterReaders(keyword);
    }
}

// 标签页功能
function initTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabGroup = this.closest('.tabs');
            tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const targetId = this.getAttribute('data-tab');
            document.querySelectorAll('.tab-content').forEach(content => {
                content.style.display = content.id === targetId ? 'block' : 'none';
            });
        });
    });
}

// 表单功能
function initForms() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    });
}

function handleFormSubmit(form) {
    const formData = new FormData(form);
    const formId = form.id;

    switch(formId) {
        case 'addBookForm':
            addBook(formData);
            break;
        case 'borrowBookForm':
            addBorrowRecord(formData);
            break;
        case 'addReaderForm':
            addReader(formData);
            break;
        default:
            showToast('操作成功', 'success');
    }
}

// 图书管理功能
function renderBooksTable() {
    const tbody = document.getElementById('booksTableBody');
    if (!tbody) return;

    tbody.innerHTML = booksData.map(book => `
        <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><span class="badge badge-info">${book.category}</span></td>
            <td>${book.stock - book.borrowed}/${book.stock}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editBook(${book.id})">编辑</button>
                <button class="btn btn-sm btn-danger" onclick="deleteBook(${book.id})">删除</button>
            </td>
        </tr>
    `).join('');
}

function filterBooks(keyword, category) {
    let filtered = booksData;

    if (keyword) {
        filtered = filtered.filter(book =>
            book.title.toLowerCase().includes(keyword) ||
            book.author.toLowerCase().includes(keyword) ||
            book.isbn.includes(keyword)
        );
    }

    if (category !== 'all') {
        filtered = filtered.filter(book => book.category === category);
    }

    const tbody = document.getElementById('booksTableBody');
    if (tbody) {
        tbody.innerHTML = filtered.length > 0 ? filtered.map(book => `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><span class="badge badge-info">${book.category}</span></td>
                <td>${book.stock - book.borrowed}/${book.stock}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editBook(${book.id})">编辑</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteBook(${book.id})">删除</button>
                </td>
            </tr>
        `).join('') : '<tr><td colspan="7" class="empty-state">没有找到匹配的图书</td></tr>';
    }
}

function addBook(formData) {
    const newBook = {
        id: booksData.length + 1,
        title: formData.get('title'),
        author: formData.get('author'),
        isbn: formData.get('isbn'),
        category: formData.get('category'),
        stock: parseInt(formData.get('stock')),
        borrowed: 0
    };

    booksData.push(newBook);
    renderBooksTable();
    closeModal(document.querySelector('.modal-overlay.active'));
    showToast('图书添加成功', 'success');

    // 重置表单
    document.getElementById('addBookForm').reset();
}

function editBook(id) {
    const book = booksData.find(b => b.id === id);
    if (book) {
        document.getElementById('editBookId').value = book.id;
        document.getElementById('editTitle').value = book.title;
        document.getElementById('editAuthor').value = book.author;
        document.getElementById('editIsbn').value = book.isbn;
        document.getElementById('editCategory').value = book.category;
        document.getElementById('editStock').value = book.stock;
        openModal('editBookModal');
    }
}

function deleteBook(id) {
    if (confirm('确定要删除这本图书吗？')) {
        const index = booksData.findIndex(b => b.id === id);
        if (index > -1) {
            booksData.splice(index, 1);
            renderBooksTable();
            showToast('图书删除成功', 'success');
        }
    }
}

// 借阅管理功能
function renderBorrowingTable() {
    const tbody = document.getElementById('borrowingTableBody');
    if (!tbody) return;

    tbody.innerHTML = borrowingData.map(record => {
        const statusClass = record.status === 'overdue' ? 'badge-danger' : 'badge-success';
        const statusText = record.status === 'overdue' ? '已逾期' : '正常';
        const isOverdue = record.status === 'overdue';

        return `
            <tr>
                <td>${record.id}</td>
                <td>${record.bookTitle}</td>
                <td>${record.reader}</td>
                <td>${record.borrowDate}</td>
                <td>${record.dueDate}</td>
                <td><span class="badge ${statusClass}">${statusText}</span></td>
                <td>
                    ${isOverdue ?
                        `<button class="btn btn-sm btn-warning" onclick="remindReader(${record.id})">催还</button>
                         <button class="btn btn-sm btn-primary" onclick="returnBook(${record.id})">归还</button>` :
                        `<button class="btn btn-sm btn-primary" onclick="returnBook(${record.id})">归还</button>`
                    }
                </td>
            </tr>
        `;
    }).join('');
}

function addBorrowRecord(formData) {
    const newRecord = {
        id: borrowingData.length + 1,
        bookTitle: formData.get('bookTitle'),
        reader: formData.get('readerName'),
        borrowDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'normal'
    };

    borrowingData.unshift(newRecord);
    renderBorrowingTable();
    closeModal(document.querySelector('.modal-overlay.active'));
    showToast('借阅登记成功', 'success');
    document.getElementById('borrowBookForm').reset();
}

function returnBook(id) {
    const index = borrowingData.findIndex(r => r.id === id);
    if (index > -1) {
        borrowingData.splice(index, 1);
        renderBorrowingTable();
        showToast('图书归还成功', 'success');
    }
}

function remindReader(id) {
    showToast('已发送催还通知', 'info');
}

// 读者管理功能
function renderReadersTable() {
    const tbody = document.getElementById('readersTableBody');
    if (!tbody) return;

    tbody.innerHTML = readersData.map(reader => {
        const statusClass = reader.status === 'active' ? 'badge-success' : 'badge-warning';
        const statusText = reader.status === 'active' ? '正常' : '已暂停';

        return `
            <tr>
                <td>${reader.id}</td>
                <td>${reader.name}</td>
                <td>${reader.cardNo}</td>
                <td>${reader.phone}</td>
                <td>${reader.registerDate}</td>
                <td><span class="badge ${statusClass}">${statusText}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editReader(${reader.id})">编辑</button>
                    <button class="btn btn-sm btn-secondary" onclick="toggleReaderStatus(${reader.id})">
                        ${reader.status === 'active' ? '暂停' : '启用'}
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function filterReaders(keyword) {
    let filtered = readersData;

    if (keyword) {
        filtered = filtered.filter(reader =>
            reader.name.toLowerCase().includes(keyword) ||
            reader.cardNo.toLowerCase().includes(keyword) ||
            reader.phone.includes(keyword)
        );
    }

    const tbody = document.getElementById('readersTableBody');
    if (tbody) {
        tbody.innerHTML = filtered.length > 0 ? filtered.map(reader => {
            const statusClass = reader.status === 'active' ? 'badge-success' : 'badge-warning';
            const statusText = reader.status === 'active' ? '正常' : '已暂停';

            return `
                <tr>
                    <td>${reader.id}</td>
                    <td>${reader.name}</td>
                    <td>${reader.cardNo}</td>
                    <td>${reader.phone}</td>
                    <td>${reader.registerDate}</td>
                    <td><span class="badge ${statusClass}">${statusText}</span></td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editReader(${reader.id})">编辑</button>
                        <button class="btn btn-sm btn-secondary" onclick="toggleReaderStatus(${reader.id})">
                            ${reader.status === 'active' ? '暂停' : '启用'}
                        </button>
                    </td>
                </tr>
            `;
        }).join('') : '<tr><td colspan="7" class="empty-state">没有找到匹配的读者</td></tr>';
    }
}

function addReader(formData) {
    const newReader = {
        id: readersData.length + 1,
        name: formData.get('name'),
        cardNo: 'L' + new Date().getFullYear() + String(readersData.length + 1).padStart(4, '0'),
        phone: formData.get('phone'),
        registerDate: new Date().toISOString().split('T')[0],
        status: 'active'
    };

    readersData.push(newReader);
    renderReadersTable();
    closeModal(document.querySelector('.modal-overlay.active'));
    showToast('读者添加成功', 'success');
    document.getElementById('addReaderForm').reset();
}

function editReader(id) {
    const reader = readersData.find(r => r.id === id);
    if (reader) {
        document.getElementById('editReaderId').value = reader.id;
        document.getElementById('editName').value = reader.name;
        document.getElementById('editCardNo').value = reader.cardNo;
        document.getElementById('editPhone').value = reader.phone;
        openModal('editReaderModal');
    }
}

function toggleReaderStatus(id) {
    const reader = readersData.find(r => r.id === id);
    if (reader) {
        reader.status = reader.status === 'active' ? 'suspended' : 'active';
        renderReadersTable();
        showToast(`读者${reader.status === 'active' ? '启用' : '暂停'}成功`, 'success');
    }
}

// Toast 提示
function showToast(message, type = 'info') {
    const container = document.querySelector('.toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// 分页功能
function setupPagination(totalPages) {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;

    let html = '';

    // 上一页
    html += `<button class="pagination-btn" onclick="changePage('prev')">&lt;</button>`;

    // 页码
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="pagination-btn ${i === 1 ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }

    // 下一页
    html += `<button class="pagination-btn" onclick="changePage('next')">&gt;</button>`;

    paginationContainer.innerHTML = html;
}

function changePage(page) {
    // 分页逻辑
    console.log('跳转到页面:', page);
}

// 快速操作按钮
document.querySelectorAll('.action-btn-card').forEach(btn => {
    btn.addEventListener('click', function() {
        const action = this.querySelector('span').textContent;

        switch(action) {
            case '新增图书':
                if (document.getElementById('addBookModal')) {
                    openModal('addBookModal');
                } else {
                    window.location.href = 'books.html';
                }
                break;
            case '借阅登记':
                if (document.getElementById('borrowBookModal')) {
                    openModal('borrowBookModal');
                } else {
                    window.location.href = 'borrowing.html';
                }
                break;
            case '图书查询':
                window.location.href = 'books.html';
                break;
            case '打印报表':
                window.print();
                break;
        }
    });
});

// 导出功能
function exportData(type) {
    const data = type === 'books' ? booksData :
                 type === 'borrowing' ? borrowingData :
                 type === 'readers' ? readersData : [];

    if (data.length === 0) {
        showToast('没有数据可导出', 'warning');
        return;
    }

    const csv = convertToCSV(data);
    downloadCSV(csv, `${type}_export_${new Date().toISOString().split('T')[0]}.csv`);
    showToast('数据导出成功', 'success');
}

function convertToCSV(data) {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).join(','));
    return [headers, ...rows].join('\n');
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// 初始化日期选择器
document.querySelectorAll('.date-input').forEach(input => {
    input.type = 'date';
});

// 自动保存表单草稿（可选功能）
function saveDraft(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const formData = new FormData(form);
    const draft = {};
    for (let [key, value] of formData.entries()) {
        draft[key] = value;
    }
    localStorage.setItem(`${formId}_draft`, JSON.stringify(draft));
}

function loadDraft(formId) {
    const draft = localStorage.getItem(`${formId}_draft`);
    if (!draft) return;

    const data = JSON.parse(draft);
    const form = document.getElementById(formId);
    if (!form) return;

    for (let [key, value] of Object.entries(data)) {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
            input.value = value;
        }
    }
}

// 统计数据更新
function updateStats() {
    const totalBooks = booksData.reduce((sum, book) => sum + book.stock, 0);
    const borrowedBooks = booksData.reduce((sum, book) => sum + book.borrowed, 0);
    const activeReaders = readersData.filter(r => r.status === 'active').length;
    const overdueCount = borrowingData.filter(r => r.status === 'overdue').length;

    // 更新统计卡片
    const statCards = document.querySelectorAll('.stat-value');
    if (statCards.length >= 4) {
        statCards[0].textContent = totalBooks.toLocaleString();
        statCards[1].textContent = borrowedBooks.toLocaleString();
        statCards[2].textContent = activeReaders.toLocaleString();
        statCards[3].textContent = overdueCount;
    }
}

// 页面加载完成后更新统计
if (window.location.pathname.includes('index.html')) {
    updateStats();
}
