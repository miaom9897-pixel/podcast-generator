// 脚本生成引擎
class ScriptGenerator {
    constructor(config) {
        this.topic = config.topic || '';
        this.structure = config.structure || 'auto';
        this.angles = config.angles || [];
        this.modules = config.modules || [];
        this.ending = config.ending || 'question';
    }

    // 主生成函数
    generate() {
        // 确定最终结构
        const finalStructure = this.structure === 'auto'
            ? matchStructure(this.topic)
            : this.structure;

        // 生成脚本各部分
        const script = {
            title: this.topic,
            duration: '20分钟',
            wordCount: '10000字',
            structure: getStructureById(finalStructure).name,
            angles: this.angles.map(id => getAngleName(id)).filter(n => n),
            content: this.generateContent(finalStructure),
            quotes: this.generateGoldenQuotes(),
            info: this.generateCreationInfo(finalStructure)
        };

        return script;
    }

    // 生成主体内容
    generateContent(structure) {
        let content = '';

        // 开场钩子
        content += this.generateHook();
        content += '\n\n---\n\n';

        // 核心内容（根据结构类型）
        content += this.generateCore(structure);
        content += '\n\n---\n\n';

        // 收尾
        content += this.generateEnding();

        return content;
    }

    // 生成开场钩子
    generateHook() {
        const hooks = [
            {
                type: 'opinion',
                content: `【音效：打火机声，吸烟声】

DY：
[停顿3秒]

[冷笑]

${this.topic}？

[停顿3秒]

这个问题，
99%的人...
问错了。

[停顿5秒]

Q：
[好奇]
怎么说？

DY：
[缓慢]
因为你问的是"${this.topic}"，
但你真正该问的是...

[停顿3秒]

"谁设计了这个游戏，
谁制定了规则，
谁在收割？"

[停顿5秒]

Q：
[若有所思]
你是说...这背后有人在操盘？

DY：
[吸烟声]

不是"有人"。

[停顿3秒]

是整个系统。`
            }
        ];

        return hooks[0].content;
    }

    // 生成核心内容
    generateCore(structure) {
        const structureInfo = getStructureById(structure);

        let core = `## [01:30] ${structureInfo.name} - 深度拆解开始\n\n`;

        // 第一层认知
        core += `### 第一层：现象呈现

Q：
好，那我们就来聊聊"${this.topic}"这个话题。
你觉得大多数人是怎么理解这个问题的？

DY：
[停顿3秒]

大多数人...

[冷笑]

大多数人看到的，
都是别人想让他们看到的。

[停顿5秒]

你去问任何一个普通人"${this.topic}"，
他们会告诉你一大堆"正确答案"——

都是从学校学的，
从媒体听的，
从朋友那儿抄的。

Q：
这有什么问题吗？

DY：
问题在于...

[语气加重]

这些答案，
都是"庄家"喂给他们的。

[停顿5秒]

`;

        // 第二层认知
        core += `### [05:00] 第二层：本质拆解

Q：
等等，你说的"庄家"是什么意思？

DY：
[停顿3秒]

每一个游戏，
都有规则制定者。

劳动力市场的庄家是企业和资本，
房地产市场的庄家是开发商和银行，
教育市场的庄家是...

[冷笑]

你懂的。

[停顿5秒]

Q：
[质疑]
但这也太阴谋论了吧？
难道所有的规则都是为了割韭菜？

DY：
[停顿5秒]

[平静]

我没说"阴谋"。

[语气加重]

我说的是"阳谋"。

[停顿3秒]

规则，
明明白白地写在那儿。

只是——

[停顿3秒]

99%的人，
选择不去看。

或者看了，
选择不去信。

Q：
[沉默5秒]

...为什么？

DY：
[吸烟声]

因为真相太残酷。

[停顿3秒]

人，
本能地回避令自己痛苦的信息。

这叫"认知失调"。

[停顿5秒]

`;

        // 第三层认知
        core += `### [10:00] 第三层：规律揭示

Q：
那...作为普通人，
看清了这些又能怎样？
不还是被规则裹挟着走？

DY：
[停顿5秒]

[缓慢]

这个问题...
问得好。

[停顿3秒]

《天道》里丁元英说过一句话——

"神即道，道法自然，如来。"

[停顿5秒]

Q：
什么意思？

DY：
翻译成大白话就是——

[语气加重]

规律不以人的意志为转移。

你看不看，信不信，
它都在那儿。

[停顿3秒]

但有一点不同——

[停顿5秒]

看清规律的人，
有选择。

看不清的人，
只有被选择。

Q：
[恍然]
所以...第一步是先"看清"？

DY：
[点头]

对。

[停顿3秒]

先活明白，
再图发展。

[停顿3秒]

顺序不能反。

`;

        // 冲突对话
        core += `### [14:00] 灵魂对话

Q：
[突然打断]

DY，等一下。

我有一个问题，
可能有点冒犯...

DY：
[平静]
说。

Q：
你说这些，
是不是太...悲观了？

[情绪上来]

照你这么说，
普通人就没活路了？
就只能被割韭菜？

[停顿3秒]

我不信。

DY：
[停顿10秒]

[吸烟声]

[停顿5秒]

[缓慢]

你不信，
很正常。

[停顿3秒]

但我问你一个问题——

[语气加重]

过去十年，
你的收入增长速度，
有没有跑赢房价？
有没有跑赢通胀？
有没有跑赢资本回报率？

[停顿5秒]

Q：
[沉默10秒]

[低声]
...没有。

DY：
[平静]

这不是悲观。

[停顿3秒]

这是事实。

[停顿5秒]

悲观和乐观，
都是情绪。

我不关心情绪。

[语气加重]

我只关心规律。

Q：
[若有所思]
那...规律是什么？

DY：
[停顿5秒]

[缓慢]

规律是——

劳动永远跑不赢资本。

这是资本主义的底层代码。

[停顿3秒]

除非...

[停顿5秒]

Q：
除非什么？

DY：
[冷笑]

除非你不只是"劳动者"。

[停顿10秒]

`;

        return core;
    }

    // 生成收尾
    generateEnding() {
        const endings = {
            question: `## [18:00] 高能收尾

DY：
[停顿10秒]

[吸烟声]

[停顿5秒]

最后，
我想问你一个问题...

[停顿3秒]

如果今天——

[语气加重]

你真的看清了规则，
看清了游戏，
看清了庄家...

[停顿5秒]

你，
打算怎么办？

[停顿5秒]

是继续当一个"优秀的韭菜"？

还是...

[停顿3秒]

开始学着做"庄家"？

[停顿10秒]

不用急着回答。

[停顿3秒]

让这个问题，
陪你睡一晚上。

[停顿10秒]

【音效：打火机声，淡出】`,

            prophecy: `## [18:00] 高能收尾

DY：
[停顿5秒]

[语气加重]

最后，我告诉你一个残酷的预言。

[停顿3秒]

未来五年——

中产阶级会继续塌缩，
35岁危机会提前到30岁，
能跑赢通胀的人会越来越少。

[停顿5秒]

这不是危言耸听。

[停顿3秒]

是数据。
是规律。
是历史的重演。

[停顿5秒]

Q：
[沉重]
那...我们能做什么？

DY：
[停顿5秒]

[缓慢]

今天——

就是你能做选择的最后窗口期。

[停顿3秒]

不是明天。
不是下个月。
是现在。

[停顿5秒]

而规律，
从不因为你不相信，
就不发生。

[停顿10秒]

【音效：打火机声，淡出】`,

            philosophy: `## [18:00] 高能收尾

DY：
[停顿5秒]

《天道》里有句话...

[停顿3秒]

"强势文化造就强者，
弱势文化造就弱者。"

[停顿5秒]

翻译成大白话就是——

[停顿3秒]

你是什么人，
不取决于你经历了什么，
而取决于你信什么。

[停顿5秒]

信"等、靠、要"，你就是弱者。
信"规律、行动、破局"，你就有可能成为强者。

[停顿3秒]

这才是——

[语气加重]

"${this.topic}"的终极答案。

[停顿10秒]

【音效：打火机声，淡出】`
        };

        return endings[this.ending] || endings.question;
    }

    // 生成金句
    generateGoldenQuotes() {
        return [
            `规律不以人的意志为转移。看清规律的人有选择，看不清的人只有被选择。`,
            `劳动永远跑不赢资本，这是资本主义的底层代码。`,
            `强势文化造就强者，弱势文化造就弱者。你是什么人，取决于你信什么。`
        ];
    }

    // 生成创作信息
    generateCreationInfo(structure) {
        return {
            totalWords: '约10000字',
            duration: '20分钟',
            structure: getStructureById(structure).name,
            angles: this.angles.length + '个',
            caseCount: this.modules.includes('moduleE') ? '1个' : '0个',
            dataTheory: this.modules.includes('moduleF') ? '有' : '无',
            quotes: '3个',
            pauses: '25处',
            ending: this.ending === 'question' ? '终极拷问' :
                this.ending === 'prophecy' ? '残酷预言' : '哲学升华'
        };
    }
}

// 导出生成函数
function generateScript(config) {
    const generator = new ScriptGenerator(config);
    return generator.generate();
}
