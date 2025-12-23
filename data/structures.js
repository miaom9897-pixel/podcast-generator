// 10种结构模板数据
const STRUCTURES_DATA = {
    auto: {
        id: 'auto',
        name: '🤖 智能匹配',
        description: 'AI根据主题自动选择最适合的结构',
        recommended: true
    },
    classic: {
        id: 'classic',
        name: '经典拆解型',
        description: '开场钩子 → 深度拆解（4层递进）→ 灵魂对话 → 高能收尾',
        timeline: '1min开场 + 11min拆解 + 4min对话 + 2min收尾',
        suitable: '大部分主题'
    },
    socratic: {
        id: 'socratic',
        name: '苏格拉底式',
        description: '抛出终极问题 → 连续追问 → 层层深入 → 揭示答案',
        timeline: '2min开场 + 13min追问 + 3min揭示 + 2min收尾',
        suitable: '认知类、价值观类'
    },
    debate: {
        id: 'debate',
        name: '对比辩论型',
        description: 'controversial观点 → 4回合交锋 → 认输/认同 → 哲学升华',
        timeline: '2min开场 + 11min交锋 + 5min认同 + 2min升华',
        suitable: '争议话题（婚姻、体制、教育）'
    },
    timeline: {
        id: 'timeline',
        name: '时间轴叙事型',
        description: '现在困境 → 倒推过去 → 推演未来 → 行动窗口',
        timeline: '2min现在 + 6min过去 + 7min未来 + 3min总结 + 2min收尾',
        suitable: '职场、人生规划类'
    },
    perspective: {
        id: 'perspective',
        name: '多角色视角型',
        description: '博弈场景 → 韭菜视角 → 庄家视角 → 上帝视角 → 视角选择',
        timeline: '2min场景 + 4min韭菜 + 4min庄家 + 4min上帝 + 4min冲突 + 2min收尾',
        suitable: '金融、商业、博弈类'
    },
    case: {
        id: 'case',
        name: '案例解剖型',
        description: '震撼案例 → 解剖拆解 → 如果是你 → 提炼规律',
        timeline: '2min引入 + 12min解剖 + 4min反思 + 2min收尾',
        suitable: '商业失败、职场案例'
    },
    data: {
        id: 'data',
        name: '数据驱动型',
        description: '惊人数据 → 拆解数据 → 利益链条 → 看懂数据',
        timeline: '2min数据 + 10min拆解 + 6min链条 + 2min收尾',
        suitable: '经济、投资、政策类'
    },
    experiment: {
        id: 'experiment',
        name: '思想实验型',
        description: '思想实验 → 3种路径推演 → 大多数人的选择 → 最优路径',
        timeline: '2min实验 + 10min路径 + 4min分析 + 2min方法 + 2min收尾',
        suitable: '未来趋势、危机应对'
    },
    history: {
        id: 'history',
        name: '历史镜像型',
        description: '今天现象 → 历史案例 → 重演原因 → 会不会不一样',
        timeline: '2min现象 + 8min历史 + 6min原因 + 2min对比 + 2min收尾',
        suitable: '经济周期、社会趋势'
    },
    zen: {
        id: 'zen',
        name: '极简禅宗型',
        description: '一句话引入 → 极简故事 → 层层剥开 → 沉默留白 → 一句话总结',
        timeline: '1min引入 + 7min故事 + 8min剥开 + 2min留白 + 2min收尾',
        suitable: '哲学、人性类',
        difficulty: 5
    }
};

// 获取结构列表
function getStructuresList() {
    return Object.values(STRUCTURES_DATA);
}

// 获取结构详情
function getStructureById(id) {
    return STRUCTURES_DATA[id] || STRUCTURES_DATA.auto;
}

// 智能匹配结构（基于主题关键词）
function matchStructure(topic) {
    const keywords = {
        classic: ['为什么', '如何', '什么是', '本质'],
        socratic: ['认知', '价值', '意义', '思考'],
        debate: ['婚姻', '体制', '教育', '争议'],
        timeline: ['职场', '35岁', '未来', '规划'],
        perspective: ['赚钱', '投资', '商业', '博弈'],
        case: ['失败', '案例', '教训', '经验'],
        data: ['经济', '数据', '趋势', '报告'],
        experiment: ['如果', '未来', '趋势', '预测'],
        history: ['周期', '历史', '重演', '规律'],
        zen: ['人性', '道', '哲学', '生命']
    };
    
    // 简单关键词匹配
    for (const [structure, words] of Object.entries(keywords)) {
        if (words.some(word => topic.includes(word))) {
            return structure;
        }
    }
    
    // 默认返回经典型
    return 'classic';
}
