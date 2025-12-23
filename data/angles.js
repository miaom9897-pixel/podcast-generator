// 30大分析角度数据
const ANGLES_DATA = {
    perspective: {
        name: '维度1：视角对比类',
        angles: [
            { id: 'a1', name: '韭菜视角 vs 庄家视角' },
            { id: 'a2', name: '表象 vs 本质' },
            { id: 'a3', name: '理想 vs 现实' },
            { id: 'a4', name: '教科书 vs 江湖' },
            { id: 'a5', name: '输家视角 vs 赢家视角' },
            { id: 'a6', name: '受害者视角 vs 操盘者视角' },
            { id: 'a7', name: '消费者视角 vs 生产者视角' },
            { id: 'a8', name: '玩家视角 vs 规则制定者视角' }
        ]
    },
    timeline: {
        name: '维度2：时间轴类',
        angles: [
            { id: 'a9', name: '过去-现在-未来' },
            { id: 'a10', name: '短期 vs 长期' },
            { id: 'a11', name: '周期规律' },
            { id: 'a12', name: '拐点时刻' },
            { id: 'a13', name: '代际比较' },
            { id: 'a14', name: '时代红利消失' }
        ]
    },
    system: {
        name: '维度3：系统层级类',
        angles: [
            { id: 'a15', name: '个体 vs 系统' },
            { id: 'a16', name: '微观 vs 宏观' },
            { id: 'a17', name: '局部 vs 全局' },
            { id: 'a18', name: '底层 vs 上层' },
            { id: 'a19', name: '内部 vs 外部' },
            { id: 'a20', name: '中心 vs 边缘' }
        ]
    },
    culture: {
        name: '维度4：文化/哲学类',
        angles: [
            { id: 'a21', name: '弱势文化 vs 强势文化' },
            { id: 'a22', name: '人性 vs 规律' },
            { id: 'a23', name: '集体主义 vs 个人主义' },
            { id: 'a24', name: '道德 vs 利益' }
        ]
    },
    strategy: {
        name: '维度5：博弈/策略类',
        angles: [
            { id: 'a25', name: '零和博弈 vs 正和博弈' },
            { id: 'a26', name: '信息对称 vs 信息不对称' },
            { id: 'a27', name: '主动 vs 被动' },
            { id: 'a28', name: '进攻 vs 防守' },
            { id: 'a29', name: '单点突破 vs 全面开花' },
            { id: 'a30', name: '做局 vs 破局' }
        ]
    }
};

function getAllAngles() {
    const allAngles = [];
    Object.values(ANGLES_DATA).forEach(category => {
        allAngles.push(...category.angles);
    });
    return allAngles;
}

function getAngleName(angleId) {
    const allAngles = getAllAngles();
    const angle = allAngles.find(a => a.id === angleId);
    return angle ? angle.name : '';
}

