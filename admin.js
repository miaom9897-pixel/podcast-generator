/**
 * 后台管理系统 - JavaScript 逻辑
 * 《元英视角》播客智能生产系统 v6.0
 */

// ========================================
// 默认数据
// ========================================

const DEFAULT_STRUCTURES = {
    auto: {
        id: 'auto',
        name: '🤖 智能匹配',
        description: 'AI根据主题自动选择最适合的结构',
        recommended: true,
        enabled: true
    },
    classic: {
        id: 'classic',
        name: '经典拆解型',
        description: '开场钩子 → 深度拆解（4层递进）→ 灵魂对话 → 高能收尾',
        timeline: '1min开场 + 11min拆解 + 4min对话 + 2min收尾',
        suitable: '大部分主题',
        enabled: true
    },
    socratic: {
        id: 'socratic',
        name: '苏格拉底式',
        description: '抛出终极问题 → 连续追问 → 层层深入 → 揭示答案',
        timeline: '2min开场 + 13min追问 + 3min揭示 + 2min收尾',
        suitable: '认知类、价值观类',
        enabled: true
    },
    debate: {
        id: 'debate',
        name: '对比辩论型',
        description: 'controversial观点 → 4回合交锋 → 认输/认同 → 哲学升华',
        timeline: '2min开场 + 11min交锋 + 5min认同 + 2min升华',
        suitable: '争议话题（婚姻、体制、教育）',
        enabled: true
    },
    timeline: {
        id: 'timeline',
        name: '时间轴叙事型',
        description: '现在困境 → 倒推过去 → 推演未来 → 行动窗口',
        timeline: '2min现在 + 6min过去 + 7min未来 + 3min总结 + 2min收尾',
        suitable: '职场、人生规划类',
        enabled: true
    },
    perspective: {
        id: 'perspective',
        name: '多角色视角型',
        description: '博弈场景 → 韭菜视角 → 庄家视角 → 上帝视角 → 视角选择',
        timeline: '2min场景 + 4min韭菜 + 4min庄家 + 4min上帝 + 4min冲突 + 2min收尾',
        suitable: '金融、商业、博弈类',
        enabled: true
    },
    case: {
        id: 'case',
        name: '案例解剖型',
        description: '震撼案例 → 解剖拆解 → 如果是你 → 提炼规律',
        timeline: '2min引入 + 12min解剖 + 4min反思 + 2min收尾',
        suitable: '商业失败、职场案例',
        enabled: true
    },
    data: {
        id: 'data',
        name: '数据驱动型',
        description: '惊人数据 → 拆解数据 → 利益链条 → 看懂数据',
        timeline: '2min数据 + 10min拆解 + 6min链条 + 2min收尾',
        suitable: '经济、投资、政策类',
        enabled: true
    },
    experiment: {
        id: 'experiment',
        name: '思想实验型',
        description: '思想实验 → 3种路径推演 → 大多数人的选择 → 最优路径',
        timeline: '2min实验 + 10min路径 + 4min分析 + 2min方法 + 2min收尾',
        suitable: '未来趋势、危机应对',
        enabled: true
    },
    history: {
        id: 'history',
        name: '历史镜像型',
        description: '今天现象 → 历史案例 → 重演原因 → 会不会不一样',
        timeline: '2min现象 + 8min历史 + 6min原因 + 2min对比 + 2min收尾',
        suitable: '经济周期、社会趋势',
        enabled: true
    },
    zen: {
        id: 'zen',
        name: '极简禅宗型',
        description: '一句话引入 → 极简故事 → 层层剥开 → 沉默留白 → 一句话总结',
        timeline: '1min引入 + 7min故事 + 8min剥开 + 2min留白 + 2min收尾',
        suitable: '哲学、人性类',
        difficulty: 5,
        enabled: true
    }
};

const DEFAULT_ANGLES = {
    perspective: {
        name: '维度1：视角对比类',
        enabled: true,
        angles: [
            { id: 'a1', name: '韭菜视角 vs 庄家视角', enabled: true },
            { id: 'a2', name: '表象 vs 本质', enabled: true },
            { id: 'a3', name: '理想 vs 现实', enabled: true },
            { id: 'a4', name: '教科书 vs 江湖', enabled: true },
            { id: 'a5', name: '输家视角 vs 赢家视角', enabled: true },
            { id: 'a6', name: '受害者视角 vs 操盘者视角', enabled: true },
            { id: 'a7', name: '消费者视角 vs 生产者视角', enabled: true },
            { id: 'a8', name: '玩家视角 vs 规则制定者视角', enabled: true }
        ]
    },
    timeline: {
        name: '维度2：时间轴类',
        enabled: true,
        angles: [
            { id: 'a9', name: '过去-现在-未来', enabled: true },
            { id: 'a10', name: '短期 vs 长期', enabled: true },
            { id: 'a11', name: '周期规律', enabled: true },
            { id: 'a12', name: '拐点时刻', enabled: true },
            { id: 'a13', name: '代际比较', enabled: true },
            { id: 'a14', name: '时代红利消失', enabled: true }
        ]
    },
    system: {
        name: '维度3：系统层级类',
        enabled: true,
        angles: [
            { id: 'a15', name: '个体 vs 系统', enabled: true },
            { id: 'a16', name: '微观 vs 宏观', enabled: true },
            { id: 'a17', name: '局部 vs 全局', enabled: true },
            { id: 'a18', name: '底层 vs 上层', enabled: true },
            { id: 'a19', name: '内部 vs 外部', enabled: true },
            { id: 'a20', name: '中心 vs 边缘', enabled: true }
        ]
    },
    culture: {
        name: '维度4：文化/哲学类',
        enabled: true,
        angles: [
            { id: 'a21', name: '弱势文化 vs 强势文化', enabled: true },
            { id: 'a22', name: '人性 vs 规律', enabled: true },
            { id: 'a23', name: '集体主义 vs 个人主义', enabled: true },
            { id: 'a24', name: '道德 vs 利益', enabled: true }
        ]
    },
    strategy: {
        name: '维度5：博弈/策略类',
        enabled: true,
        angles: [
            { id: 'a25', name: '零和博弈 vs 正和博弈', enabled: true },
            { id: 'a26', name: '信息对称 vs 信息不对称', enabled: true },
            { id: 'a27', name: '主动 vs 被动', enabled: true },
            { id: 'a28', name: '进攻 vs 防守', enabled: true },
            { id: 'a29', name: '单点突破 vs 全面开花', enabled: true },
            { id: 'a30', name: '做局 vs 破局', enabled: true }
        ]
    }
};

const DEFAULT_MODULES = {
    required: [
        { id: 'moduleA', name: 'A: 开场钩子', description: '前30秒抓住耳朵', wordCount: '200-300', enabled: true },
        { id: 'moduleB', name: 'B: 认知升级', description: '核心内容，层层递进', wordCount: '5000-6000', enabled: true },
        { id: 'moduleC', name: 'C: 对话冲突', description: '制造张力，打破认知', wordCount: '分布全程', enabled: true },
        { id: 'moduleD', name: 'D: 高能收尾', description: '余音绕梁，让人失眠', wordCount: '500-800', enabled: true }
    ],
    optional: [
        { id: 'moduleE', name: 'E: 案例', description: '0-2个，深度优先', whenToUse: '需要具体化抽象概念时', whenNotToUse: '主题本身够具体', enabled: true },
        { id: 'moduleF', name: 'F: 数据/理论', description: '权威、震撼、解释', whenToUse: '需要权威支撑时', whenNotToUse: '没有震撼数据', enabled: true },
        { id: 'moduleG', name: 'G: 历史对比', description: '时间跨度≥50年', whenToUse: '讲周期规律', whenNotToUse: '类比不精准', enabled: true },
        { id: 'moduleH', name: 'H: 思想实验', description: '假设合理，推演严密', whenToUse: '未来趋势预判', whenNotToUse: '结论不震撼', enabled: true },
        { id: 'moduleI', name: 'I: 多角色视角', description: '至少3个视角', whenToUse: '博弈类话题', whenNotToUse: '对比不强烈', enabled: true },
        { id: 'moduleJ', name: 'J: 互动埋点', description: '可选，不强求', whenToUse: '需要听众深度思考', whenNotToUse: '会显得生硬', enabled: true }
    ]
};

const DEFAULT_ENDINGS = [
    { id: 'question', name: '终极拷问', description: '抛出让人失眠的问题', enabled: true },
    { id: 'prophecy', name: '残酷预言', description: '预言未来趋势，制造紧迫感', enabled: true },
    { id: 'philosophy', name: '哲学升华', description: '拔高到生命层次', enabled: true }
];

const DEFAULT_POSITIONING = {
    hostName: '元英',
    hostPersona: '冷酷理性、洞察本质、敢说真话',
    hostDescription: 'inspired by 丁元英（《天道》主角），以冷酷理性的视角拆解中国经济、政策和社会现象。在这里没有政治正确，只有残酷真相。专门说墙内不让说的话。',
    targetAge: '45-65岁',
    targetAudience: '• 海外华人中老年群体（移民/留学生家长）\n• 在国内有资产、关心政策变化的人\n• 考虑移民或已经移民的人\n• 想了解中国真实情况的海外华人\n• 关心资产保值、养老规划的中产',
    audiencePains: '• 担心国内资产贬值/被割韭菜\n• 看不透政策背后的真实意图\n• 子女在海外，想了解国内动态\n• 对中国经济走向感到迷茫\n• 想听到墙内听不到的真话',
    contentStyle: 'sharp',
    languageStyle: '• 直接犹利，不打太极\n• 用数据和逻辑说话\n• 敢于得出结论，不模棱两可\n• 把复杂的政策用大白话讲透\n• 金句要一针见血',
    contentForbidden: '• 正能量废话\n• 假装中立\n• 收钱办事的软广\n• 人身攻击',
    coreValue: '说墙内不让说的话，讲官方不会讲的真相',
    oneLinePosition: '用丁元英的视角，拆解中国政策、经济和社会的游戏规则',
    differentiator: '• 敢说：别人不敢说的，我们说\n• 透彻：不是新闻搬运，是深度拆解\n• 实用：每期都让你看懂一个真相\n• 独立：不站队，只讲逻辑',
    competitors: '• 时政评论频道：我们更聚焦经济和个人利益\n• 财经频道：我们更敢说，不怕得罪人\n• 新闻汇总频道：我们是深度分析，不是搬运'
};

const DEFAULT_VERTICAL = {
    mainTrack: 'society',
    subTracks: ['政策解读', '资产配置', '移民润学'],
    ratioMoney: 35,
    ratioCareer: 10,
    ratioHuman: 15,
    ratioOther: 40,
    topics: [
        { id: 't1', name: '海南封关的本质：机会还是陷阱？', category: 'society', status: 'done' },
        { id: 't2', name: '2025经济工作会议解读：释放了什么信号？', category: 'society', status: 'hot' },
        { id: 't3', name: '人民币贬值，你的钱该怎么办？', category: 'money', status: 'pending' },
        { id: 't4', name: '房价还会跌到什么时候？什么时候可以抄底？', category: 'money', status: 'pending' },
        { id: 't5', name: '延迟退休的真相：为什么必须延？', category: 'society', status: 'pending' },
        { id: 't6', name: '中产返贫路线图：你在哪个阶段？', category: 'money', status: 'pending' },
        { id: 't7', name: '润学指南：移民的真实成本和代价', category: 'life', status: 'pending' },
        { id: 't8', name: '为什么体制内也不安全了？', category: 'career', status: 'pending' },
        { id: 't9', name: '中美关系走向：普通人如何应对？', category: 'society', status: 'pending' },
        { id: 't10', name: '股市3000点保卫战背后的博弈', category: 'money', status: 'pending' }
    ],
    forbiddenTopics: '• 人身攻击具体个人\n• 造谣传谣未经证实的信息\n• 煽动仇恨/歧视\n• 具体投资标的推荐（只讲逻辑，不荐股）',
    keywords: ['真相', '政策解读', '资产配置', '中产', '移民', '经济走向', '韭菜', '庄家', '游戏规则'],
    signaturePhrases: '• "这就是他们不想让你知道的真相"\n• "韭菜视角 vs 庄家视角"\n• "弱势文化 vs 强势文化"\n• "看懂游戏规则，才能不被收割"\n• "墙内不让说的话"'
};

const DEFAULT_SETTINGS = {
    systemName: '《元英视角》',
    systemVersion: 'v6.0',
    systemTagline: '撕开温情面纱，直视残酷真相',
    targetDuration: 20,
    targetWords: 10000,
    maxAngles: 5,
    primaryColor: '#6366f1',
    darkModeDefault: true,
    showWelcome: true
};

// ========================================
// 状态管理
// ========================================

let state = {
    structures: {},
    angles: {},
    modules: {},
    endings: [],
    settings: {},
    positioning: {},
    vertical: {},
    currentTab: 'positioning',
    editingItem: null,
    editingType: null
};

// ========================================
// 初始化
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initTabs();
    initEventListeners();
    renderAll();
    updateCounts();
});

function loadData() {
    // 从 localStorage 加载数据，如果没有则使用默认值
    state.structures = getStoredData('admin_structures', DEFAULT_STRUCTURES);
    state.angles = getStoredData('admin_angles', DEFAULT_ANGLES);
    state.modules = getStoredData('admin_modules', DEFAULT_MODULES);
    state.endings = getStoredData('admin_endings', DEFAULT_ENDINGS);
    state.settings = getStoredData('admin_settings', DEFAULT_SETTINGS);
    state.positioning = getStoredData('admin_positioning', DEFAULT_POSITIONING);
    state.vertical = getStoredData('admin_vertical', DEFAULT_VERTICAL);
}

function getStoredData(key, defaultValue) {
    const stored = localStorage.getItem(key);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return defaultValue;
        }
    }
    return JSON.parse(JSON.stringify(defaultValue));
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function saveAllData() {
    saveData('admin_structures', state.structures);
    saveData('admin_angles', state.angles);
    saveData('admin_modules', state.modules);
    saveData('admin_endings', state.endings);
    saveData('admin_settings', state.settings);
    saveData('admin_positioning', state.positioning);
    saveData('admin_vertical', state.vertical);
    showToast('✅ 所有配置已保存');
}

// ========================================
// Tab 切换
// ========================================

function initTabs() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = item.dataset.tab;
            switchTab(tab);
        });
    });
}

function switchTab(tab) {
    state.currentTab = tab;

    // 更新导航高亮
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.tab === tab);
    });

    // 切换内容
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `${tab}Tab`);
    });

    // 更新标题
    updatePageTitle(tab);
}

function updatePageTitle(tab) {
    const titles = {
        positioning: { title: '频道定位管理', desc: '配置频道人设、目标受众、调性风格和差异化定位' },
        vertical: { title: '内容垂直度管理', desc: '配置内容赛道、比例分配、话题库和关键词' },
        hotspots: { title: '热点选题工具', desc: '发现热门话题、分析爆款潜力、快速生成内容' },
        structures: { title: '结构模板管理', desc: '管理10种播客结构模板，可启用/禁用或编辑详情' },
        angles: { title: '分析角度管理', desc: '管理30大分析角度，可按维度启用/禁用' },
        modules: { title: '模块配置管理', desc: '管理必选和可选模块，配置模块详情' },
        endings: { title: '收尾方式管理', desc: '管理播客收尾方式，可自定义收尾风格' },
        documents: { title: '文档库', desc: '查看频道策略文档和脚本库' },
        archives: { title: '存档管理', desc: '查看聊天记录和脚本版本历史' },
        settings: { title: '系统设置', desc: '配置系统基础参数和界面设置' }
    };

    const info = titles[tab] || titles.positioning;
    document.getElementById('pageTitle').textContent = info.title;
    document.getElementById('pageDesc').textContent = info.desc;
}

// ========================================
// 事件监听
// ========================================

function initEventListeners() {
    // 保存全部
    document.getElementById('saveAllBtn').addEventListener('click', saveAllData);

    // 重置默认
    document.getElementById('resetBtn').addEventListener('click', () => {
        if (confirm('确定要重置所有配置到默认值吗？此操作不可撤销。')) {
            resetToDefault();
        }
    });

    // 添加按钮
    document.getElementById('addStructureBtn')?.addEventListener('click', () => openAddModal('structure'));
    document.getElementById('addModuleBtn')?.addEventListener('click', () => openAddModal('module'));
    document.getElementById('addEndingBtn')?.addEventListener('click', () => openAddModal('ending'));

    // 弹窗关闭
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('cancelEdit').addEventListener('click', closeModal);
    document.getElementById('confirmEdit').addEventListener('click', confirmEdit);

    // 点击遮罩关闭
    document.getElementById('editModal').addEventListener('click', (e) => {
        if (e.target.id === 'editModal') closeModal();
    });

    // 设置页面
    initSettingsListeners();
}

function initSettingsListeners() {
    // 系统设置字段
    const settingsFields = ['systemName', 'systemVersion', 'systemTagline', 'targetDuration', 'targetWords', 'maxAngles', 'primaryColor', 'darkModeDefault', 'showWelcome'];

    settingsFields.forEach(field => {
        const el = document.getElementById(field);
        if (el) {
            el.addEventListener('change', () => {
                if (el.type === 'checkbox') {
                    state.settings[field] = el.checked;
                } else if (el.type === 'number') {
                    state.settings[field] = parseInt(el.value);
                } else {
                    state.settings[field] = el.value;
                }
            });
        }
    });

    // 导出配置
    document.getElementById('exportConfigBtn')?.addEventListener('click', exportConfig);

    // 导入配置
    document.getElementById('importConfigBtn')?.addEventListener('click', () => {
        document.getElementById('importConfigInput').click();
    });

    document.getElementById('importConfigInput')?.addEventListener('change', importConfig);

    // 清除数据
    document.getElementById('clearDataBtn')?.addEventListener('click', () => {
        if (confirm('确定要清除所有数据吗？此操作不可撤销！')) {
            localStorage.clear();
            location.reload();
        }
    });
}

// ========================================
// 渲染函数
// ========================================

function renderAll() {
    renderPositioning();
    renderVertical();
    renderStructures();
    renderAngles();
    renderModules();
    renderEndings();
    renderSettings();
}

// 渲染结构模板
function renderStructures() {
    const container = document.getElementById('structuresList');
    container.innerHTML = '';

    Object.entries(state.structures).forEach(([id, structure]) => {
        const item = document.createElement('div');
        item.className = `structure-item ${structure.enabled ? '' : 'disabled'}`;
        item.innerHTML = `
            <label class="structure-toggle">
                <input type="checkbox" ${structure.enabled ? 'checked' : ''} data-id="${id}">
                <span class="toggle-slider"></span>
            </label>
            <div class="structure-info">
                <div class="structure-name">
                    ${structure.name}
                    ${structure.recommended ? '<span class="tag">推荐</span>' : ''}
                </div>
                <div class="structure-desc">${structure.description}</div>
            </div>
            <div class="structure-actions">
                <button class="action-btn edit-btn" data-id="${id}" data-type="structure">✏️</button>
                ${id !== 'auto' ? `<button class="action-btn delete delete-btn" data-id="${id}" data-type="structure">🗑️</button>` : ''}
            </div>
        `;
        container.appendChild(item);
    });

    // 绑定事件
    container.querySelectorAll('.structure-toggle input').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = e.target.dataset.id;
            state.structures[id].enabled = e.target.checked;
            renderStructures();
            updateCounts();
        });
    });

    bindEditDeleteEvents(container);
}

// 渲染分析角度
function renderAngles() {
    const container = document.getElementById('anglesCategories');
    container.innerHTML = '';

    Object.entries(state.angles).forEach(([categoryId, category]) => {
        const categoryEl = document.createElement('div');
        categoryEl.className = 'angle-category';

        const enabledCount = category.angles.filter(a => a.enabled).length;

        categoryEl.innerHTML = `
            <div class="category-header">
                <h4>${category.name}</h4>
                <span class="count">${enabledCount}/${category.angles.length} 已启用</span>
            </div>
            <div class="angles-list">
                ${category.angles.map(angle => `
                    <div class="angle-item">
                        <input type="checkbox" ${angle.enabled ? 'checked' : ''} data-category="${categoryId}" data-id="${angle.id}">
                        <span class="angle-name">${angle.name}</span>
                        <div class="angle-actions">
                            <button class="action-btn edit-btn" data-id="${angle.id}" data-category="${categoryId}" data-type="angle">✏️</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(categoryEl);
    });

    // 绑定事件
    container.querySelectorAll('.angle-item input').forEach(input => {
        input.addEventListener('change', (e) => {
            const categoryId = e.target.dataset.category;
            const angleId = e.target.dataset.id;
            const angle = state.angles[categoryId].angles.find(a => a.id === angleId);
            if (angle) {
                angle.enabled = e.target.checked;
                renderAngles();
                updateCounts();
            }
        });
    });

    bindEditDeleteEvents(container);
}

// 渲染模块配置
function renderModules() {
    // 必选模块
    const requiredContainer = document.getElementById('requiredModulesList');
    requiredContainer.innerHTML = '';

    state.modules.required.forEach(module => {
        const item = createModuleItem(module, true);
        requiredContainer.appendChild(item);
    });

    // 可选模块
    const optionalContainer = document.getElementById('optionalModulesList');
    optionalContainer.innerHTML = '';

    state.modules.optional.forEach(module => {
        const item = createModuleItem(module, false);
        optionalContainer.appendChild(item);
    });

    bindEditDeleteEvents(requiredContainer);
    bindEditDeleteEvents(optionalContainer);
}

function createModuleItem(module, isRequired) {
    const item = document.createElement('div');
    item.className = `module-item ${module.enabled ? '' : 'disabled'}`;

    item.innerHTML = `
        <div class="module-header">
            <span class="module-name">${module.name}</span>
            <div class="structure-actions">
                ${!isRequired ? `
                    <label class="structure-toggle" style="transform: scale(0.8);">
                        <input type="checkbox" ${module.enabled ? 'checked' : ''} data-id="${module.id}" data-required="${isRequired}">
                        <span class="toggle-slider"></span>
                    </label>
                ` : ''}
                <button class="action-btn edit-btn" data-id="${module.id}" data-type="module" data-required="${isRequired}">✏️</button>
            </div>
        </div>
        <div class="module-desc">${module.description}</div>
        <div class="module-meta">
            ${module.wordCount ? `<span>📝 ${module.wordCount}</span>` : ''}
            ${module.whenToUse ? `<span>✅ ${module.whenToUse}</span>` : ''}
        </div>
    `;

    // 绑定开关事件
    const toggle = item.querySelector('.structure-toggle input');
    if (toggle) {
        toggle.addEventListener('change', (e) => {
            const id = e.target.dataset.id;
            const moduleData = state.modules.optional.find(m => m.id === id);
            if (moduleData) {
                moduleData.enabled = e.target.checked;
                renderModules();
                updateCounts();
            }
        });
    }

    return item;
}

// 渲染收尾方式
function renderEndings() {
    const container = document.getElementById('endingsList');
    container.innerHTML = '';

    state.endings.forEach(ending => {
        const item = document.createElement('div');
        item.className = `ending-item ${ending.enabled ? '' : 'disabled'}`;

        item.innerHTML = `
            <div class="ending-header">
                <span class="ending-name">${ending.name}</span>
                <label class="structure-toggle" style="transform: scale(0.8);">
                    <input type="checkbox" ${ending.enabled ? 'checked' : ''} data-id="${ending.id}">
                    <span class="toggle-slider"></span>
                </label>
            </div>
            <div class="ending-desc">${ending.description}</div>
            <div class="structure-actions" style="margin-top: 12px;">
                <button class="action-btn edit-btn" data-id="${ending.id}" data-type="ending">✏️ 编辑</button>
            </div>
        `;
        container.appendChild(item);
    });

    // 绑定开关事件
    container.querySelectorAll('.structure-toggle input').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = e.target.dataset.id;
            const ending = state.endings.find(en => en.id === id);
            if (ending) {
                ending.enabled = e.target.checked;
                renderEndings();
                updateCounts();
            }
        });
    });

    bindEditDeleteEvents(container);
}

// 渲染设置
function renderSettings() {
    document.getElementById('systemName').value = state.settings.systemName || '';
    document.getElementById('systemVersion').value = state.settings.systemVersion || '';
    document.getElementById('systemTagline').value = state.settings.systemTagline || '';
    document.getElementById('targetDuration').value = state.settings.targetDuration || 20;
    document.getElementById('targetWords').value = state.settings.targetWords || 10000;
    document.getElementById('maxAngles').value = state.settings.maxAngles || 5;
    document.getElementById('primaryColor').value = state.settings.primaryColor || '#6366f1';
    document.getElementById('darkModeDefault').checked = state.settings.darkModeDefault !== false;
    document.getElementById('showWelcome').checked = state.settings.showWelcome !== false;
}

// ========================================
// 编辑/删除事件
// ========================================

function bindEditDeleteEvents(container) {
    container.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            const id = btn.dataset.id;
            openEditModal(type, id, btn.dataset);
        });
    });

    container.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            const id = btn.dataset.id;
            deleteItem(type, id);
        });
    });
}

function openEditModal(type, id, extraData = {}) {
    state.editingType = type;
    state.editingItem = { id, ...extraData };

    const modal = document.getElementById('editModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    let formHtml = '';

    switch (type) {
        case 'structure':
            const structure = state.structures[id];
            modalTitle.textContent = `编辑结构：${structure.name}`;
            formHtml = `
                <div class="form-group">
                    <label>结构名称</label>
                    <input type="text" id="editName" class="form-input" value="${structure.name}">
                </div>
                <div class="form-group">
                    <label>结构描述</label>
                    <textarea id="editDesc" class="form-input" rows="3">${structure.description}</textarea>
                </div>
                <div class="form-group">
                    <label>时间线</label>
                    <input type="text" id="editTimeline" class="form-input" value="${structure.timeline || ''}">
                </div>
                <div class="form-group">
                    <label>适用场景</label>
                    <input type="text" id="editSuitable" class="form-input" value="${structure.suitable || ''}">
                </div>
            `;
            break;

        case 'angle':
            const categoryId = extraData.category;
            const angle = state.angles[categoryId].angles.find(a => a.id === id);
            modalTitle.textContent = `编辑角度：${angle.name}`;
            formHtml = `
                <div class="form-group">
                    <label>角度名称</label>
                    <input type="text" id="editName" class="form-input" value="${angle.name}">
                </div>
            `;
            state.editingItem.categoryId = categoryId;
            break;

        case 'module':
            const isRequired = extraData.required === 'true';
            const moduleData = isRequired
                ? state.modules.required.find(m => m.id === id)
                : state.modules.optional.find(m => m.id === id);
            modalTitle.textContent = `编辑模块：${moduleData.name}`;
            formHtml = `
                <div class="form-group">
                    <label>模块名称</label>
                    <input type="text" id="editName" class="form-input" value="${moduleData.name}">
                </div>
                <div class="form-group">
                    <label>模块描述</label>
                    <textarea id="editDesc" class="form-input" rows="2">${moduleData.description}</textarea>
                </div>
                <div class="form-group">
                    <label>字数要求</label>
                    <input type="text" id="editWordCount" class="form-input" value="${moduleData.wordCount || ''}">
                </div>
                ${!isRequired ? `
                    <div class="form-group">
                        <label>何时使用</label>
                        <input type="text" id="editWhenToUse" class="form-input" value="${moduleData.whenToUse || ''}">
                    </div>
                    <div class="form-group">
                        <label>何时不用</label>
                        <input type="text" id="editWhenNotToUse" class="form-input" value="${moduleData.whenNotToUse || ''}">
                    </div>
                ` : ''}
            `;
            state.editingItem.isRequired = isRequired;
            break;

        case 'ending':
            const ending = state.endings.find(e => e.id === id);
            modalTitle.textContent = `编辑收尾方式：${ending.name}`;
            formHtml = `
                <div class="form-group">
                    <label>收尾名称</label>
                    <input type="text" id="editName" class="form-input" value="${ending.name}">
                </div>
                <div class="form-group">
                    <label>收尾描述</label>
                    <textarea id="editDesc" class="form-input" rows="3">${ending.description}</textarea>
                </div>
            `;
            break;
    }

    modalBody.innerHTML = formHtml;
    modal.classList.add('active');
}

function openAddModal(type) {
    state.editingType = type;
    state.editingItem = { isNew: true };

    const modal = document.getElementById('editModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    let formHtml = '';

    switch (type) {
        case 'structure':
            modalTitle.textContent = '添加新结构';
            formHtml = `
                <div class="form-group">
                    <label>结构ID（英文，唯一）</label>
                    <input type="text" id="editId" class="form-input" placeholder="例如: custom1">
                </div>
                <div class="form-group">
                    <label>结构名称</label>
                    <input type="text" id="editName" class="form-input" placeholder="例如: 自定义结构型">
                </div>
                <div class="form-group">
                    <label>结构描述</label>
                    <textarea id="editDesc" class="form-input" rows="3" placeholder="描述结构的流程..."></textarea>
                </div>
                <div class="form-group">
                    <label>时间线</label>
                    <input type="text" id="editTimeline" class="form-input" placeholder="例如: 2min开场 + 15min主体 + 3min收尾">
                </div>
                <div class="form-group">
                    <label>适用场景</label>
                    <input type="text" id="editSuitable" class="form-input" placeholder="例如: 适合XX类话题">
                </div>
            `;
            break;

        case 'module':
            modalTitle.textContent = '添加新模块';
            formHtml = `
                <div class="form-group">
                    <label>模块ID（英文，唯一）</label>
                    <input type="text" id="editId" class="form-input" placeholder="例如: moduleK">
                </div>
                <div class="form-group">
                    <label>模块名称</label>
                    <input type="text" id="editName" class="form-input" placeholder="例如: K: 新模块">
                </div>
                <div class="form-group">
                    <label>模块描述</label>
                    <textarea id="editDesc" class="form-input" rows="2" placeholder="模块的作用..."></textarea>
                </div>
                <div class="form-group">
                    <label>字数要求</label>
                    <input type="text" id="editWordCount" class="form-input" placeholder="例如: 500-800">
                </div>
                <div class="form-group">
                    <label>何时使用</label>
                    <input type="text" id="editWhenToUse" class="form-input" placeholder="适用场景...">
                </div>
                <div class="form-group">
                    <label>何时不用</label>
                    <input type="text" id="editWhenNotToUse" class="form-input" placeholder="不适用场景...">
                </div>
            `;
            break;

        case 'ending':
            modalTitle.textContent = '添加收尾方式';
            formHtml = `
                <div class="form-group">
                    <label>收尾ID（英文，唯一）</label>
                    <input type="text" id="editId" class="form-input" placeholder="例如: custom_ending">
                </div>
                <div class="form-group">
                    <label>收尾名称</label>
                    <input type="text" id="editName" class="form-input" placeholder="例如: 自定义收尾">
                </div>
                <div class="form-group">
                    <label>收尾描述</label>
                    <textarea id="editDesc" class="form-input" rows="3" placeholder="收尾的效果..."></textarea>
                </div>
            `;
            break;
    }

    modalBody.innerHTML = formHtml;
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('editModal').classList.remove('active');
    state.editingType = null;
    state.editingItem = null;
}

function confirmEdit() {
    const type = state.editingType;
    const isNew = state.editingItem?.isNew;

    switch (type) {
        case 'structure':
            if (isNew) {
                const id = document.getElementById('editId').value.trim();
                if (!id) {
                    showToast('请输入结构ID', true);
                    return;
                }
                if (state.structures[id]) {
                    showToast('该ID已存在', true);
                    return;
                }
                state.structures[id] = {
                    id,
                    name: document.getElementById('editName').value,
                    description: document.getElementById('editDesc').value,
                    timeline: document.getElementById('editTimeline').value,
                    suitable: document.getElementById('editSuitable').value,
                    enabled: true
                };
            } else {
                const id = state.editingItem.id;
                state.structures[id].name = document.getElementById('editName').value;
                state.structures[id].description = document.getElementById('editDesc').value;
                state.structures[id].timeline = document.getElementById('editTimeline').value;
                state.structures[id].suitable = document.getElementById('editSuitable').value;
            }
            renderStructures();
            break;

        case 'angle':
            const categoryId = state.editingItem.categoryId;
            const angleId = state.editingItem.id;
            const angle = state.angles[categoryId].angles.find(a => a.id === angleId);
            if (angle) {
                angle.name = document.getElementById('editName').value;
            }
            renderAngles();
            break;

        case 'module':
            if (isNew) {
                const id = document.getElementById('editId').value.trim();
                if (!id) {
                    showToast('请输入模块ID', true);
                    return;
                }
                state.modules.optional.push({
                    id,
                    name: document.getElementById('editName').value,
                    description: document.getElementById('editDesc').value,
                    wordCount: document.getElementById('editWordCount').value,
                    whenToUse: document.getElementById('editWhenToUse').value,
                    whenNotToUse: document.getElementById('editWhenNotToUse').value,
                    enabled: true
                });
            } else {
                const id = state.editingItem.id;
                const isRequired = state.editingItem.isRequired;
                const moduleList = isRequired ? state.modules.required : state.modules.optional;
                const module = moduleList.find(m => m.id === id);
                if (module) {
                    module.name = document.getElementById('editName').value;
                    module.description = document.getElementById('editDesc').value;
                    module.wordCount = document.getElementById('editWordCount')?.value || module.wordCount;
                    if (!isRequired) {
                        module.whenToUse = document.getElementById('editWhenToUse')?.value;
                        module.whenNotToUse = document.getElementById('editWhenNotToUse')?.value;
                    }
                }
            }
            renderModules();
            break;

        case 'ending':
            if (isNew) {
                const id = document.getElementById('editId').value.trim();
                if (!id) {
                    showToast('请输入收尾ID', true);
                    return;
                }
                state.endings.push({
                    id,
                    name: document.getElementById('editName').value,
                    description: document.getElementById('editDesc').value,
                    enabled: true
                });
            } else {
                const id = state.editingItem.id;
                const ending = state.endings.find(e => e.id === id);
                if (ending) {
                    ending.name = document.getElementById('editName').value;
                    ending.description = document.getElementById('editDesc').value;
                }
            }
            renderEndings();
            break;
    }

    updateCounts();
    closeModal();
    showToast('✅ 保存成功');
}

function deleteItem(type, id) {
    if (!confirm('确定要删除吗？')) return;

    switch (type) {
        case 'structure':
            delete state.structures[id];
            renderStructures();
            break;
        case 'module':
            state.modules.optional = state.modules.optional.filter(m => m.id !== id);
            renderModules();
            break;
        case 'ending':
            state.endings = state.endings.filter(e => e.id !== id);
            renderEndings();
            break;
    }

    updateCounts();
    showToast('🗑️ 已删除');
}

// ========================================
// 工具函数
// ========================================

function updateCounts() {
    const structuresCount = Object.values(state.structures).filter(s => s.enabled).length;
    document.getElementById('structuresCount').textContent = structuresCount;

    let anglesCount = 0;
    Object.values(state.angles).forEach(cat => {
        anglesCount += cat.angles.filter(a => a.enabled).length;
    });
    document.getElementById('anglesCount').textContent = anglesCount;

    const modulesCount = state.modules.required.length +
        state.modules.optional.filter(m => m.enabled).length;
    document.getElementById('modulesCount').textContent = modulesCount;

    const endingsCount = state.endings.filter(e => e.enabled).length;
    document.getElementById('endingsCount').textContent = endingsCount;
}

function resetToDefault() {
    state.structures = JSON.parse(JSON.stringify(DEFAULT_STRUCTURES));
    state.angles = JSON.parse(JSON.stringify(DEFAULT_ANGLES));
    state.modules = JSON.parse(JSON.stringify(DEFAULT_MODULES));
    state.endings = JSON.parse(JSON.stringify(DEFAULT_ENDINGS));
    state.settings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));

    saveAllData();
    renderAll();
    updateCounts();
    showToast('✅ 已重置为默认配置');
}

function exportConfig() {
    const config = {
        structures: state.structures,
        angles: state.angles,
        modules: state.modules,
        endings: state.endings,
        settings: state.settings,
        exportTime: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `podcast-config-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showToast('📤 配置已导出');
}

function importConfig(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const config = JSON.parse(event.target.result);

            if (config.structures) state.structures = config.structures;
            if (config.angles) state.angles = config.angles;
            if (config.modules) state.modules = config.modules;
            if (config.endings) state.endings = config.endings;
            if (config.settings) state.settings = config.settings;

            saveAllData();
            renderAll();
            updateCounts();
            showToast('📥 配置已导入');
        } catch (err) {
            showToast('导入失败：无效的配置文件', true);
        }
    };
    reader.readAsText(file);

    e.target.value = '';
}

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.querySelector('.toast-message').textContent = message;
    toast.classList.toggle('error', isError);
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========================================
// 频道定位渲染
// ========================================

function renderPositioning() {
    const p = state.positioning;

    // 填充表单值
    const fields = [
        'hostName', 'hostPersona', 'hostDescription',
        'targetAge', 'targetAudience', 'audiencePains',
        'contentStyle', 'languageStyle', 'contentForbidden',
        'coreValue', 'oneLinePosition', 'differentiator', 'competitors'
    ];

    fields.forEach(field => {
        const el = document.getElementById(field);
        if (el) {
            if (el.tagName === 'SELECT') {
                el.value = p[field] || el.options[0].value;
            } else {
                el.value = p[field] || '';
            }
        }
    });

    // 绑定即时保存事件
    fields.forEach(field => {
        const el = document.getElementById(field);
        if (el) {
            el.removeEventListener('input', handlePositioningChange);
            el.addEventListener('input', handlePositioningChange);
            el.removeEventListener('change', handlePositioningChange);
            el.addEventListener('change', handlePositioningChange);
        }
    });
}

function handlePositioningChange(e) {
    const field = e.target.id;
    state.positioning[field] = e.target.value;
}

// ========================================
// 内容垂直度渲染
// ========================================

function renderVertical() {
    const v = state.vertical;

    // 主赛道
    const mainTrackEl = document.getElementById('mainTrack');
    if (mainTrackEl) {
        mainTrackEl.value = v.mainTrack || 'money';
        mainTrackEl.addEventListener('change', (e) => {
            state.vertical.mainTrack = e.target.value;
        });
    }

    // 子赛道标签
    renderSubTracks();

    // 内容比例滑块
    renderRatioSliders();

    // 话题库
    renderTopics();

    // 关键词标签
    renderKeywords();

    // 禁区话题
    const forbiddenEl = document.getElementById('forbiddenTopics');
    if (forbiddenEl) {
        forbiddenEl.value = v.forbiddenTopics || '';
        forbiddenEl.addEventListener('input', (e) => {
            state.vertical.forbiddenTopics = e.target.value;
        });
    }

    // 特色表达
    const sigEl = document.getElementById('signaturePhrases');
    if (sigEl) {
        sigEl.value = v.signaturePhrases || '';
        sigEl.addEventListener('input', (e) => {
            state.vertical.signaturePhrases = e.target.value;
        });
    }

    // 添加话题按钮
    document.getElementById('addTopicBtn')?.addEventListener('click', () => {
        openAddModal('topic');
    });
}

function renderSubTracks() {
    const container = document.getElementById('subTracksList');
    if (!container) return;

    container.innerHTML = '';
    (state.vertical.subTracks || []).forEach((track, index) => {
        const tag = document.createElement('span');
        tag.className = 'tag-item';
        tag.innerHTML = `
            ${track}
            <button class="tag-remove" data-index="${index}">&times;</button>
        `;
        container.appendChild(tag);
    });

    // 删除标签
    container.querySelectorAll('.tag-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            state.vertical.subTracks.splice(index, 1);
            renderSubTracks();
        });
    });

    // 添加标签输入
    const input = document.getElementById('subTrackInput');
    if (input) {
        input.onkeypress = (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                if ((state.vertical.subTracks || []).length < 3) {
                    state.vertical.subTracks = state.vertical.subTracks || [];
                    state.vertical.subTracks.push(input.value.trim());
                    input.value = '';
                    renderSubTracks();
                } else {
                    showToast('最多只能添加3个子赛道', true);
                }
                e.preventDefault();
            }
        };
    }
}

function renderRatioSliders() {
    const sliders = ['ratioMoney', 'ratioCareer', 'ratioHuman', 'ratioOther'];

    sliders.forEach(id => {
        const slider = document.getElementById(id);
        const valueEl = document.getElementById(id + 'Value');

        if (slider && valueEl) {
            slider.value = state.vertical[id] || 0;
            valueEl.textContent = slider.value + '%';

            slider.oninput = () => {
                state.vertical[id] = parseInt(slider.value);
                valueEl.textContent = slider.value + '%';
                updateRatioTotal();
            };
        }
    });

    updateRatioTotal();
}

function updateRatioTotal() {
    const total = (state.vertical.ratioMoney || 0) +
        (state.vertical.ratioCareer || 0) +
        (state.vertical.ratioHuman || 0) +
        (state.vertical.ratioOther || 0);

    const totalEl = document.getElementById('ratioTotal');
    const container = totalEl?.parentElement;

    if (totalEl) {
        totalEl.textContent = total + '%';

        if (container) {
            container.classList.remove('warning', 'error');
            if (total !== 100) {
                container.classList.add(total > 100 ? 'error' : 'warning');
            }
        }
    }
}

function renderTopics() {
    const container = document.getElementById('topicsContainer');
    if (!container) return;

    container.innerHTML = '';

    const categoryEmojis = {
        money: '💰',
        career: '💼',
        human: '🧠',
        society: '🌍',
        life: '❤️'
    };

    (state.vertical.topics || []).forEach(topic => {
        const item = document.createElement('div');
        item.className = 'topic-item';
        item.innerHTML = `
            <span class="topic-category">${categoryEmojis[topic.category] || '📝'}</span>
            <div class="topic-info">
                <div class="topic-name">${topic.name}</div>
            </div>
            <span class="topic-status ${topic.status}">${getStatusLabel(topic.status)}</span>
            <div class="topic-actions">
                <button class="action-btn" data-id="${topic.id}" data-action="edit">✏️</button>
                <button class="action-btn delete" data-id="${topic.id}" data-action="delete">🗑️</button>
            </div>
        `;
        container.appendChild(item);
    });

    // 绑定话题操作事件
    container.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const action = btn.dataset.action;

            if (action === 'delete') {
                state.vertical.topics = state.vertical.topics.filter(t => t.id !== id);
                renderTopics();
            } else if (action === 'edit') {
                // 打开编辑弹窗
                const topic = state.vertical.topics.find(t => t.id === id);
                if (topic) {
                    openEditModal('topic', id, topic);
                }
            }
        });
    });
}

function getStatusLabel(status) {
    const labels = {
        pending: '待制作',
        done: '已完成',
        hot: '热门'
    };
    return labels[status] || status;
}

function renderKeywords() {
    const container = document.getElementById('keywordsList');
    if (!container) return;

    container.innerHTML = '';
    (state.vertical.keywords || []).forEach((keyword, index) => {
        const tag = document.createElement('span');
        tag.className = 'tag-item';
        tag.innerHTML = `
            ${keyword}
            <button class="tag-remove" data-index="${index}">&times;</button>
        `;
        container.appendChild(tag);
    });

    // 删除标签
    container.querySelectorAll('.tag-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            state.vertical.keywords.splice(index, 1);
            renderKeywords();
        });
    });

    // 添加标签输入
    const input = document.getElementById('keywordInput');
    if (input) {
        input.onkeypress = (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                state.vertical.keywords = state.vertical.keywords || [];
                state.vertical.keywords.push(input.value.trim());
                input.value = '';
                renderKeywords();
                e.preventDefault();
            }
        };
    }
}

// ========================================
// 热点选题工具
// ========================================

// 热点话题数据（模拟数据，实际可通过API获取）
const HOTSPOT_DATA = [
    {
        id: 'h1',
        title: '2025年中央经济工作会议解读',
        category: 'policy',
        heat: 95,
        timeliness: '刚发生',
        tags: ['政策解读', '经济走向']
    },
    {
        id: 'h2',
        title: '人民币汇率破7.3背后的真相',
        category: 'economy',
        heat: 88,
        timeliness: '本周热点',
        tags: ['汇率', '资产配置']
    },
    {
        id: 'h3',
        title: '延迟退休政策正式落地',
        category: 'policy',
        heat: 92,
        timeliness: '本月热点',
        tags: ['养老', '政策']
    },
    {
        id: 'h4',
        title: '一线城市房价跌回10年前',
        category: 'economy',
        heat: 85,
        timeliness: '本周热点',
        tags: ['房产', '投资']
    },
    {
        id: 'h5',
        title: '海外华人回国养老潮',
        category: 'overseas',
        heat: 78,
        timeliness: '最近趋势',
        tags: ['移民', '养老']
    },
    {
        id: 'h6',
        title: '硅谷裁员潮对华人的影响',
        category: 'overseas',
        heat: 82,
        timeliness: '本月热点',
        tags: ['职场', '海外华人']
    },
    {
        id: 'h7',
        title: '中产家庭资产配置困境',
        category: 'economy',
        heat: 80,
        timeliness: '长期话题',
        tags: ['投资', '中产']
    },
    {
        id: 'h8',
        title: '医保改革后就医成本上涨',
        category: 'society',
        heat: 75,
        timeliness: '最近趋势',
        tags: ['医疗', '民生']
    }
];

function initHotspotsListeners() {
    // 刷新热点按钮
    document.getElementById('refreshHotspotsBtn')?.addEventListener('click', () => {
        renderHotspots();
        showToast('🔥 热点已刷新');
    });

    // 分类筛选
    document.getElementById('hotspotCategory')?.addEventListener('change', renderHotspots);

    // 分析爆款潜力
    document.getElementById('analyzeTopicBtn')?.addEventListener('click', analyzeTopicPotential);

    // 快速操作按钮
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            handleQuickAction(action);
        });
    });

    // 匹配度检测
    document.querySelectorAll('.match-item input').forEach(checkbox => {
        checkbox.addEventListener('change', updateMatchScore);
    });
}

function renderHotspots() {
    const container = document.getElementById('hotspotsList');
    if (!container) return;

    const categoryFilter = document.getElementById('hotspotCategory')?.value || 'all';

    let filteredData = HOTSPOT_DATA;
    if (categoryFilter !== 'all') {
        filteredData = HOTSPOT_DATA.filter(h => h.category === categoryFilter);
    }

    // 按热度排序
    filteredData.sort((a, b) => b.heat - a.heat);

    container.innerHTML = filteredData.map((hotspot, index) => `
        <div class="hotspot-item" data-id="${hotspot.id}">
            <span class="hotspot-rank">${index + 1}</span>
            <div class="hotspot-info">
                <div class="hotspot-title">${hotspot.title}</div>
                <div class="hotspot-meta">
                    <span class="hotspot-timeliness">⏰ ${hotspot.timeliness}</span>
                    <div class="hotspot-heat">
                        🔥
                        <div class="heat-bar">
                            <div class="heat-fill" style="width: ${hotspot.heat}%"></div>
                        </div>
                        ${hotspot.heat}%
                    </div>
                </div>
            </div>
            <div class="hotspot-tags">
                ${hotspot.tags.map(tag => `<span class="hotspot-tag">${tag}</span>`).join('')}
            </div>
            <button class="btn btn-sm btn-primary hotspot-action" onclick="useHotspot('${hotspot.id}')">
                📝 使用
            </button>
        </div>
    `).join('');
}

function useHotspot(id) {
    const hotspot = HOTSPOT_DATA.find(h => h.id === id);
    if (hotspot) {
        document.getElementById('analyzeTopicInput').value = hotspot.title;
        analyzeTopicPotential();
        showToast(`已选择话题：${hotspot.title}`);
    }
}

function analyzeTopicPotential() {
    const input = document.getElementById('analyzeTopicInput');
    const resultContainer = document.getElementById('analysisResult');

    if (!input?.value.trim()) {
        showToast('请先输入话题', true);
        return;
    }

    const topic = input.value.trim();

    // 模拟分析（实际可对接AI分析）
    const score = calculatePotentialScore(topic);
    const scoreLevel = score >= 80 ? 'high' : (score >= 60 ? 'medium' : 'low');
    const scoreText = score >= 80 ? '爆款潜力高！' : (score >= 60 ? '有一定潜力' : '潜力一般');

    resultContainer.innerHTML = `
        <div class="analysis-score">
            <div class="score-circle ${scoreLevel}">${score}</div>
            <div class="analysis-details">
                <div class="analysis-item">
                    <span class="icon">${score >= 80 ? '✅' : '⚠️'}</span>
                    <span>${scoreText}</span>
                </div>
                <div class="analysis-item">
                    <span class="icon">${topic.includes('政策') || topic.includes('经济') ? '✅' : '⚡'}</span>
                    <span>受众匹配度: ${topic.includes('政策') || topic.includes('经济') ? '高' : '中'}</span>
                </div>
                <div class="analysis-item">
                    <span class="icon">💡</span>
                    <span>建议结构: ${suggestStructure(topic)}</span>
                </div>
            </div>
        </div>
        <button class="btn btn-primary full-width" style="margin-top: 12px;" onclick="generateFromTopic('${topic.replace(/'/g, "\\'")}')">
            ⚡ 一键生成脚本大纲
        </button>
    `;

    resultContainer.classList.add('show');
}

function calculatePotentialScore(topic) {
    let score = 50;

    // 关键词加分
    const hotKeywords = ['政策', '经济', '房价', '移民', '退休', '裁员', '汇率', '中产', '真相', '海南'];
    hotKeywords.forEach(keyword => {
        if (topic.includes(keyword)) score += 8;
    });

    // 问句加分
    if (topic.includes('？') || topic.includes('吗') || topic.includes('为什么')) {
        score += 5;
    }

    // 数字加分
    if (/\d+/.test(topic)) {
        score += 5;
    }

    return Math.min(100, score);
}

function suggestStructure(topic) {
    if (topic.includes('政策') || topic.includes('会议')) {
        return '政策解读型';
    } else if (topic.includes('为什么') || topic.includes('真相')) {
        return '深度拆解型';
    } else if (topic.includes('如何') || topic.includes('怎么')) {
        return '数据驱动型';
    } else {
        return '对比辩论型';
    }
}

function handleQuickAction(action) {
    const topic = document.getElementById('analyzeTopicInput')?.value.trim();

    if (!topic) {
        showToast('请先输入或选择一个话题', true);
        return;
    }

    let result = '';

    switch (action) {
        case 'title':
            result = generateTitles(topic);
            break;
        case 'hook':
            result = generateHook(topic);
            break;
        case 'outline':
            result = generateOutline(topic);
            break;
        case 'golden':
            result = generateGoldenQuotes(topic);
            break;
    }

    // 显示结果弹窗
    openResultModal(action, result);
}

function generateTitles(topic) {
    return `🎯 推荐标题：

1. 【天道】${topic}：他们不想让你知道的真相

2. 别被骗了！${topic}的本质，其实是一场精心设计的...

3. ${topic}？用丁元英的视角，给你说透

4. 墙内不敢说的话：${topic}背后的游戏规则

5. ${topic}：韭菜视角 vs 庄家视角，你站哪边？`;
}

function generateHook(topic) {
    return `🎣 开场钩子：

【音效：打火机声，吸烟声】

DY：
[停顿3秒]

最近这个事，你一定听说了...

${topic}

[停顿3秒]

官方说的是一个版本，
墙外说的是另一个版本。

[冷笑]

而真相？
两边都不会告诉你。

[停顿5秒]

今天我来说，
他们不敢说的那个版本。

Q：
等等，DY，你这话在墙内可不能这么说...

DY：
[吐烟]
在这里，没有墙。`;
}

function generateOutline(topic) {
    return `📝 脚本大纲：

【主题】${topic}

【时长】18-22分钟

【结构】政策解读型

一、开场钩子 (1-2分钟)
- 争议性观点引入
- 墙内vs墙外信息差
- 设置悬念

二、背景铺垫 (2-3分钟)
- 事件/政策背景
- 官方口径梳理
- 海外华人为什么要关注

三、深度拆解 (8-10分钟)
Layer 1: 表面现象
Layer 2: 背后利益链条
Layer 3: 对普通人的影响
Layer 4: 历史规律印证

四、对话冲突 (3-4分钟)
- Q的质疑和反驳
- DY的降维解释
- 认知升级时刻

五、收尾金句 (2-3分钟)
- 终极问题
- 行动建议
- 让人失眠的真相`;
}

function generateGoldenQuotes(topic) {
    return `💡 金句库：

1. "这就是他们不想让你知道的真相。"

2. "韭菜之所以是韭菜，不是因为穷，是因为不知道自己是韭菜。"

3. "规则是给守规矩的人订的，利益是给懂规则的人留的。"

4. "墙的意义不是挡住外面的信息，是让里面的人习惯看不到。"

5. "能润的不是最有钱的，是最先清醒的。"

6. "官方永远不骗你，只是选择性告诉你。"

7. "弱势文化等待救世主，强势文化自己就是救世主。"

8. "历史不会重复，但会押韵。${topic}这事，历史上早就演过了。"`;
}

function openResultModal(action, content) {
    const actionNames = {
        title: '生成标题',
        hook: '生成开场钩子',
        outline: '生成大纲',
        golden: '生成金句'
    };

    const modal = document.getElementById('editModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = actionNames[action];
    modalBody.innerHTML = `
        <div class="generated-content">
            <pre style="white-space: pre-wrap; font-family: inherit; line-height: 1.6;">${content}</pre>
        </div>
        <button class="btn btn-secondary full-width" style="margin-top: 16px;" onclick="copyToClipboard(\`${content.replace(/`/g, '\\`')}\`)">
            📋 复制到剪贴板
        </button>
    `;

    modal.classList.add('active');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('✅ 已复制到剪贴板');
    }).catch(() => {
        showToast('复制失败', true);
    });
}

function generateFromTopic(topic) {
    window.location.href = `index.html?topic=${encodeURIComponent(topic)}`;
}

function updateMatchScore() {
    const checkboxes = document.querySelectorAll('.match-item input');
    let score = 0;
    checkboxes.forEach(cb => {
        if (cb.checked) score++;
    });

    const scoreEl = document.getElementById('matchScoreValue');
    const labelEl = document.getElementById('matchScoreLabel');

    if (scoreEl) {
        scoreEl.textContent = `${score}/5`;
    }

    if (labelEl) {
        labelEl.classList.remove('good', 'warning', 'bad');
        if (score >= 4) {
            labelEl.textContent = '非常适合你的频道！🎯';
            labelEl.classList.add('good');
        } else if (score >= 2) {
            labelEl.textContent = '可以做，但需要调整角度';
            labelEl.classList.add('warning');
        } else {
            labelEl.textContent = '不太匹配，建议换话题';
            labelEl.classList.add('bad');
        }
    }
}

// 初始化热点工具
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initHotspotsListeners();
        renderHotspots();
        initDocumentsListeners();
    }, 100);
});

// ========================================
// 文档库功能
// ========================================

// 文档内容存储（由于浏览器安全限制，预加载内容）
const DOCUMENTS_CONTENT = {
    'docs/channel-strategy.md': null,
    'docs/character-guide.md': null,
    'docs/content-calendar.md': null,
    'docs/meeting-notes.md': null,
    'scripts/episode-04-sony-hainan.md': null,
    'scripts/capital-stories-01-li-ka-shing.md': null,
    'scripts/capital-stories-02-chu-shijian.md': null
};

let currentDocFile = null;

function initDocumentsListeners() {
    // 文档列表点击事件
    document.querySelectorAll('.doc-item').forEach(item => {
        item.addEventListener('click', () => {
            const file = item.dataset.file;
            selectDocument(file, item);
        });
    });

    // 复制按钮
    document.getElementById('copyDocBtn')?.addEventListener('click', copyDocContent);

    // 打开文件按钮
    document.getElementById('openDocBtn')?.addEventListener('click', openDocFile);
}

async function selectDocument(file, itemElement) {
    // 更新选中状态
    document.querySelectorAll('.doc-item').forEach(item => item.classList.remove('active'));
    itemElement.classList.add('active');

    // 检查是否有多版本
    const hasVersions = itemElement.dataset.hasVersions === 'true';

    if (hasVersions) {
        // 显示版本选择器
        const scriptName = itemElement.dataset.scriptName || '选择版本';
        const versions = JSON.parse(itemElement.dataset.versions || '[]');
        showVersionSelector(scriptName, versions);
    } else {
        // 直接显示内容
        currentDocFile = file;

        // 更新标题
        const docName = itemElement.querySelector('.doc-name').textContent;
        document.getElementById('docPreviewTitle').textContent = `📖 ${docName}`;

        // 显示按钮
        document.getElementById('copyDocBtn').style.display = 'inline-block';
        document.getElementById('openDocBtn').style.display = 'inline-block';

        // 加载文档内容
        await loadDocumentContent(file);
    }
}

// 显示版本选择器（时间线形式）
function showVersionSelector(scriptName, versions) {
    const previewEl = document.getElementById('docPreviewContent');
    document.getElementById('docPreviewTitle').textContent = `📖 ${scriptName} - 版本历史`;

    // 隐藏按钮
    document.getElementById('copyDocBtn').style.display = 'none';
    document.getElementById('openDocBtn').style.display = 'none';

    // 按日期倒序排列（最新在前）
    const sortedVersions = [...versions].sort((a, b) => new Date(b.date) - new Date(a.date));

    let html = `
        <div class="version-selector">
            <h3>📚 ${scriptName}</h3>
            <p class="version-selector-subtitle">版本时间线（共 ${versions.length} 个版本）</p>
            <div class="timeline">
    `;

    sortedVersions.forEach((v, index) => {
        const isCurrent = v.status === '当前';
        const dateStr = v.date || '未知日期';
        html += `
            <div class="timeline-item ${isCurrent ? 'timeline-current' : ''}" onclick="selectVersion('${v.file}', '${v.label}')">
                <div class="timeline-date">${dateStr}</div>
                <div class="timeline-dot ${isCurrent ? 'dot-current' : ''}"></div>
                <div class="timeline-content">
                    <span class="timeline-icon">${isCurrent ? '⭐' : '📄'}</span>
                    <span class="timeline-label">${v.label}</span>
                    ${isCurrent ? '<span class="timeline-badge">当前版本</span>' : ''}
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    previewEl.innerHTML = html;
}

// 选择版本后加载内容
async function selectVersion(file, label) {
    currentDocFile = file;

    // 更新标题
    document.getElementById('docPreviewTitle').textContent = `📖 ${label}`;

    // 显示按钮
    document.getElementById('copyDocBtn').style.display = 'inline-block';
    document.getElementById('openDocBtn').style.display = 'inline-block';

    // 加载内容
    await loadDocumentContent(file);
}

async function loadDocumentContent(file) {
    const previewEl = document.getElementById('docPreviewContent');

    // 显示加载中
    previewEl.innerHTML = '<div class="doc-placeholder"><span class="placeholder-icon">⏳</span><p>加载中...</p></div>';

    // GitHub Raw 基础URL
    const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/miaom9897-pixel/podcast-generator/main/';

    try {
        // 方法1: 尝试从GitHub Raw获取（GitHub Pages部署时使用）
        const githubRawUrl = GITHUB_RAW_BASE + file;
        const response = await fetch(githubRawUrl);
        if (response.ok) {
            const content = await response.text();
            DOCUMENTS_CONTENT[file] = content;
            renderDocumentContent(content);
            return;
        }
    } catch (error) {
        // GitHub Raw失败，尝试其他方法
    }

    try {
        // 方法2: 尝试本地fetch（Live Server时使用）
        const response = await fetch(file);
        if (response.ok) {
            const content = await response.text();
            DOCUMENTS_CONTENT[file] = content;
            renderDocumentContent(content);
            return;
        }
    } catch (error) {
        // 本地fetch失败，继续尝试嵌入内容
    }

    // 方法3: 回退到嵌入的文档内容
    if (window.EMBEDDED_DOCS && window.EMBEDDED_DOCS[file]) {
        renderDocumentContent(window.EMBEDDED_DOCS[file]);
        return;
    }

    // 都失败了，显示提示
    previewEl.innerHTML = `
        <div class="doc-placeholder">
            <span class="placeholder-icon">⚠️</span>
            <p>无法加载文件</p>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 8px;">
                文件: ${file}<br>
                请检查文件是否已推送到GitHub
            </p>
        </div>
    `;
}

function renderDocumentContent(content) {
    const previewEl = document.getElementById('docPreviewContent');

    // 简单的Markdown转HTML
    let html = content
        // 转义HTML
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        // 标题
        .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        // 粗体
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // 斜体
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // 代码块
        .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        // 行内代码
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // 引用
        .replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>')
        // 分割线
        .replace(/^---$/gm, '<hr>')
        // 链接
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

    previewEl.innerHTML = html;
}

function copyDocContent() {
    const previewEl = document.getElementById('docPreviewContent');
    const content = previewEl.textContent;

    navigator.clipboard.writeText(content).then(() => {
        showToast('已复制到剪贴板', 'success');
    }).catch(() => {
        showToast('复制失败', 'error');
    });
}

function openDocFile() {
    if (currentDocFile) {
        // 在新窗口打开文件
        window.open(currentDocFile, '_blank');
    }
}
