// 模块配置数据
const MODULES_DATA = {
    required: [
        { id: 'moduleA', name: 'A: 开场钩子', description: '前30秒抓住耳朵', wordCount: '200-300' },
        { id: 'moduleB', name: 'B: 认知升级', description: '核心内容，层层递进', wordCount: '5000-6000' },
        { id: 'moduleC', name: 'C: 对话冲突', description: '制造张力，打破认知', wordCount: '分布全程' },
        { id: 'moduleD', name: 'D: 高能收尾', description: '余音绕梁，让人失眠', wordCount: '500-800' }
    ],
    optional: [
        { 
            id: 'moduleE', 
            name: 'E: 案例', 
            description: '0-2个，深度优先', 
            whenToUse: '需要具体化抽象概念时',
            whenNotToUse: '主题本身够具体'
        },
        { 
            id: 'moduleF', 
            name: 'F: 数据/理论', 
            description: '权威、震撼、解释', 
            whenToUse: '需要权威支撑时',
            whenNotToUse: '没有震撼数据'
        },
        { 
            id: 'moduleG', 
            name: 'G: 历史对比', 
            description: '时间跨度≥50年', 
            whenToUse: '讲周期规律',
            whenNotToUse: '类比不精准'
        },
        { 
            id: 'moduleH', 
            name: 'H: 思想实验', 
            description: '假设合理，推演严密', 
            whenToUse: '未来趋势预判',
            whenNotToUse: '结论不震撼'
        },
        { 
            id: 'moduleI', 
            name: 'I: 多角色视角', 
            description: '至少3个视角', 
            whenToUse: '博弈类话题',
            whenNotToUse: '对比不强烈'
        },
        { 
            id: 'moduleJ', 
            name: 'J: 互动埋点', 
            description: '可选，不强求', 
            whenToUse: '需要听众深度思考',
            whenNotToUse: '会显得生硬'
        }
    ]
};

// 获取必选模块
function getRequiredModules() {
    return MODULES_DATA.required;
}

// 获取可选模块
function getOptionalModules() {
    return MODULES_DATA.optional;
}

// 获取所有模块
function getAllModules() {
    return [...MODULES_DATA.required, ...MODULES_DATA.optional];
}
