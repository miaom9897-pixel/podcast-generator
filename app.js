// 《元英视角》播客智能生产系统 - 主应用
document.addEventListener('DOMContentLoaded', function () {
    // 初始化应用
    initApp();
});

// 状态管理
const appState = {
    selectedAngles: [],
    maxAngles: 5,
    settings: null,
    anglesData: null,
    structuresData: null,
    modulesData: null,
    endingsData: null
};

// 初始化应用
function initApp() {
    // 加载后台配置
    loadAdminConfig();
    renderAnglesGrid();
    renderStructuresSelect();
    renderModulesConfig();
    renderEndingsOptions();
    bindEvents();
    updateCharCount();
}

// 加载后台管理配置
function loadAdminConfig() {
    if (typeof ConfigLoader !== 'undefined') {
        // 应用系统设置
        appState.settings = ConfigLoader.applySettings();
        appState.maxAngles = appState.settings?.maxAngles || 5;

        // 获取配置数据
        appState.anglesData = ConfigLoader.getAngles();
        appState.structuresData = ConfigLoader.getStructures();
        appState.modulesData = ConfigLoader.getModules();
        appState.endingsData = ConfigLoader.getEndings();
    }
}

// 获取角度数据（优先使用后台配置）
function getAnglesDataSource() {
    return appState.anglesData || ANGLES_DATA;
}

// 获取结构数据（优先使用后台配置）
function getStructuresDataSource() {
    return appState.structuresData || STRUCTURES_DATA;
}

// 渲染结构类型下拉选择
function renderStructuresSelect() {
    const select = document.getElementById('structureType');
    if (!select) return;

    const structures = getStructuresDataSource();
    select.innerHTML = '';

    Object.entries(structures).forEach(([id, structure]) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = structure.name;
        if (structure.recommended) {
            option.textContent += '（推荐）';
        }
        select.appendChild(option);
    });
}

// 渲染模块配置
function renderModulesConfig() {
    const modulesData = appState.modulesData;
    if (!modulesData) return;

    // 更新可选模块显示
    const optionalContainer = document.querySelector('.module-group:last-child');
    if (optionalContainer && modulesData.optional) {
        optionalContainer.innerHTML = '<h3>可选模块</h3>';
        modulesData.optional.forEach(module => {
            const label = document.createElement('label');
            label.className = 'module-item';
            label.innerHTML = `
                <input type="checkbox" id="${module.id}">
                <span>${module.name}</span>
            `;
            optionalContainer.appendChild(label);
        });
    }
}

// 渲染收尾方式
function renderEndingsOptions() {
    const endingsData = appState.endingsData;
    if (!endingsData) return;

    const container = document.querySelector('.ending-options');
    if (!container) return;

    container.innerHTML = '';
    endingsData.forEach((ending, index) => {
        const label = document.createElement('label');
        label.className = 'ending-option';
        label.innerHTML = `
            <input type="radio" name="ending" value="${ending.id}" ${index === 0 ? 'checked' : ''}>
            <div class="ending-card">
                <h3>${ending.name}</h3>
                <p>${ending.description}</p>
            </div>
        `;
        container.appendChild(label);
    });
}

// 渲染角度选择网格
function renderAnglesGrid() {
    const grid = document.getElementById('anglesGrid');
    if (!grid) return;

    const anglesData = getAnglesDataSource();

    let html = '';
    Object.entries(anglesData).forEach(([key, category]) => {
        if (category.angles && category.angles.length > 0) {
            html += `<div class="angle-category">
                <div class="category-name">${category.name}</div>`;

            category.angles.forEach(angle => {
                html += `
                    <label class="angle-item" data-id="${angle.id}">
                        <input type="checkbox" value="${angle.id}">
                        <span>${angle.name}</span>
                    </label>`;
            });

            html += '</div>';
        }
    });

    grid.innerHTML = html;

    // 更新最大角度显示
    const countSpan = document.querySelector('.selected-count');
    if (countSpan) {
        countSpan.innerHTML = `已选: <span id="angleCount">0</span>/${appState.maxAngles}`;
    }
}

// 绑定事件
function bindEvents() {
    // 主题输入字数统计
    const topicInput = document.getElementById('topicInput');
    topicInput.addEventListener('input', updateCharCount);

    // 角度选择
    const anglesGrid = document.getElementById('anglesGrid');
    anglesGrid.addEventListener('change', handleAngleChange);

    // 生成按钮
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.addEventListener('click', handleGenerate);

    // 操作按钮
    document.getElementById('copyBtn')?.addEventListener('click', handleCopy);
    document.getElementById('exportBtn')?.addEventListener('click', handleExport);
    document.getElementById('newBtn')?.addEventListener('click', handleNew);

    // 信息按钮
    document.querySelectorAll('.info-btn').forEach(btn => {
        btn.addEventListener('click', handleInfoClick);
    });

    // 模态框关闭
    document.querySelector('.modal-close')?.addEventListener('click', closeModal);
}

// 更新字数统计
function updateCharCount() {
    const input = document.getElementById('topicInput');
    const count = document.querySelector('.char-count');
    count.textContent = `${input.value.length} 字`;
}

// 处理角度选择
function handleAngleChange(e) {
    if (e.target.type !== 'checkbox') return;

    const angleId = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
        if (appState.selectedAngles.length >= appState.maxAngles) {
            e.target.checked = false;
            alert(`最多只能选择 ${appState.maxAngles} 个角度`);
            return;
        }
        appState.selectedAngles.push(angleId);
        e.target.closest('.angle-item').classList.add('selected');
    } else {
        appState.selectedAngles = appState.selectedAngles.filter(id => id !== angleId);
        e.target.closest('.angle-item').classList.remove('selected');
    }

    updateAngleCount();
}

// 更新角度计数
function updateAngleCount() {
    document.getElementById('angleCount').textContent = appState.selectedAngles.length;
}

// 处理生成
function handleGenerate() {
    const topic = document.getElementById('topicInput').value.trim();

    if (!topic) {
        alert('请输入播客主题');
        return;
    }

    // 显示加载状态
    const btn = document.getElementById('generateBtn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');

    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';
    btn.disabled = true;

    // 收集配置
    const config = {
        topic: topic,
        structure: document.getElementById('structureType').value,
        angles: appState.selectedAngles,
        modules: getSelectedModules(),
        ending: document.querySelector('input[name="ending"]:checked').value
    };

    // 模拟生成延迟
    setTimeout(() => {
        try {
            const script = generateScript(config);
            displayResult(script);
        } catch (error) {
            console.error('生成失败:', error);
            alert('生成失败，请重试');
        } finally {
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            btn.disabled = false;
        }
    }, 1500);
}

// 获取选中的可选模块
function getSelectedModules() {
    const modules = [];
    const modulesData = appState.modulesData;

    if (modulesData && modulesData.optional) {
        modulesData.optional.forEach(module => {
            const checkbox = document.getElementById(module.id);
            if (checkbox && checkbox.checked) {
                modules.push(module.id);
            }
        });
    } else {
        // 使用默认模块列表
        ['moduleE', 'moduleF', 'moduleG', 'moduleH', 'moduleI', 'moduleJ'].forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox && checkbox.checked) {
                modules.push(id);
            }
        });
    }
    return modules;
}

// 显示结果
function displayResult(script) {
    // 隐藏欢迎屏幕，显示结果
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'block';

    // 填充标题和元信息
    document.getElementById('scriptTitle').textContent = `# ${script.title}`;
    document.getElementById('scriptDuration').textContent = `⏱️ ${script.duration}`;
    document.getElementById('scriptWords').textContent = `📝 ${script.wordCount}`;
    document.getElementById('scriptStructure').textContent = `🏗️ ${script.structure}`;

    // 填充脚本内容
    document.getElementById('scriptContent').innerHTML = formatScriptContent(script.content);

    // 填充金句
    const quotesList = document.getElementById('quotesList');
    quotesList.innerHTML = script.quotes.map((quote, i) =>
        `<div class="quote-item">${i + 1}. "${quote}"</div>`
    ).join('');

    // 填充创作信息
    const infoGrid = document.getElementById('infoGrid');
    infoGrid.innerHTML = Object.entries(script.info).map(([key, value]) => `
        <div class="info-item">
            <div class="info-label">${formatInfoLabel(key)}</div>
            <div class="info-value">${value}</div>
        </div>
    `).join('');

    // 滚动到顶部
    document.querySelector('.output-section').scrollTop = 0;
}

// 格式化脚本内容
function formatScriptContent(content) {
    return content
        .replace(/\n/g, '<br>')
        .replace(/##\s+\[([^\]]+)\]\s+([^\n<]+)/g, '<h2 class="section-title">[$1] $2</h2>')
        .replace(/###\s+\[([^\]]+)\]\s+([^\n<]+)/g, '<h3 class="subsection-title">[$1] $2</h3>')
        .replace(/###\s+([^\n<]+)/g, '<h3 class="subsection-title">$1</h3>')
        .replace(/\*\*💡 金句\*\*：/g, '<span class="golden-marker">💡 金句：</span>')
        .replace(/DY：/g, '<span class="speaker dy">DY：</span>')
        .replace(/Q：/g, '<span class="speaker q">Q：</span>')
        .replace(/【音效：([^】]+)】/g, '<span class="sound-effect">【音效：$1】</span>')
        .replace(/\[([^\]]+)\]/g, '<span class="stage-direction">[$1]</span>');
}

// 格式化信息标签
function formatInfoLabel(key) {
    const labels = {
        totalWords: '总字数',
        duration: '预估时长',
        structure: '结构类型',
        angles: '使用角度',
        caseCount: '案例数量',
        dataTheory: '数据/理论',
        quotes: '金句数量',
        pauses: '停顿标注',
        ending: '收尾方式'
    };
    return labels[key] || key;
}

// 复制脚本
function handleCopy() {
    const content = document.getElementById('scriptContent').innerText;
    navigator.clipboard.writeText(content).then(() => {
        alert('已复制到剪贴板');
    }).catch(() => {
        alert('复制失败，请手动复制');
    });
}

// 导出脚本
function handleExport() {
    const title = document.getElementById('scriptTitle').textContent;
    const content = document.getElementById('scriptContent').innerText;
    const quotes = document.getElementById('quotesList').innerText;

    const fullContent = `${title}\n\n${'='.repeat(50)}\n\n${content}\n\n${'='.repeat(50)}\n\n核心金句：\n${quotes}`;

    const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `元英视角_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// 新建脚本
function handleNew() {
    document.getElementById('welcomeScreen').style.display = 'flex';
    document.getElementById('resultScreen').style.display = 'none';
    document.getElementById('topicInput').value = '';
    document.getElementById('topicInput').focus();
    updateCharCount();
}

// 信息按钮点击
function handleInfoClick(e) {
    const type = e.target.dataset.info;
    const modal = document.getElementById('infoModal');
    const body = document.getElementById('modalBody');

    const structures = getStructuresDataSource();
    const structuresList = Object.values(structures);

    const info = {
        structure: `
            <h2>结构模板列表</h2>
            <ul>
                ${structuresList.map(s => `<li><strong>${s.name}</strong>: ${s.description}</li>`).join('')}
            </ul>
        `
    };

    body.innerHTML = info[type] || '';
    modal.style.display = 'flex';
}

// 关闭模态框
function closeModal() {
    document.getElementById('infoModal').style.display = 'none';
}

// 点击模态框外部关闭
document.addEventListener('click', (e) => {
    const modal = document.getElementById('infoModal');
    if (e.target === modal) {
        closeModal();
    }
});
