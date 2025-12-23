/**
 * 配置加载器 - 从后台管理系统读取配置
 * 负责从 localStorage 加载配置，让前端使用后台设置的参数
 */

const ConfigLoader = {
    // 获取结构模板（只返回启用的）
    getStructures() {
        const stored = localStorage.getItem('admin_structures');
        if (stored) {
            try {
                const structures = JSON.parse(stored);
                // 过滤出启用的结构
                const enabled = {};
                Object.entries(structures).forEach(([id, structure]) => {
                    if (structure.enabled !== false) {
                        enabled[id] = structure;
                    }
                });
                return enabled;
            } catch (e) {
                console.warn('加载结构配置失败，使用默认值');
            }
        }
        return null; // 返回null表示使用默认值
    },

    // 获取分析角度（只返回启用的）
    getAngles() {
        const stored = localStorage.getItem('admin_angles');
        if (stored) {
            try {
                const angles = JSON.parse(stored);
                // 过滤出启用的角度
                const filtered = {};
                Object.entries(angles).forEach(([categoryId, category]) => {
                    if (category.enabled !== false) {
                        filtered[categoryId] = {
                            ...category,
                            angles: category.angles.filter(a => a.enabled !== false)
                        };
                    }
                });
                return filtered;
            } catch (e) {
                console.warn('加载角度配置失败，使用默认值');
            }
        }
        return null;
    },

    // 获取模块配置
    getModules() {
        const stored = localStorage.getItem('admin_modules');
        if (stored) {
            try {
                const modules = JSON.parse(stored);
                return {
                    required: modules.required.filter(m => m.enabled !== false),
                    optional: modules.optional.filter(m => m.enabled !== false)
                };
            } catch (e) {
                console.warn('加载模块配置失败，使用默认值');
            }
        }
        return null;
    },

    // 获取收尾方式（只返回启用的）
    getEndings() {
        const stored = localStorage.getItem('admin_endings');
        if (stored) {
            try {
                const endings = JSON.parse(stored);
                return endings.filter(e => e.enabled !== false);
            } catch (e) {
                console.warn('加载收尾配置失败，使用默认值');
            }
        }
        return null;
    },

    // 获取系统设置
    getSettings() {
        const stored = localStorage.getItem('admin_settings');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.warn('加载系统设置失败，使用默认值');
            }
        }
        return {
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
    },

    // 应用系统设置到页面
    applySettings() {
        const settings = this.getSettings();

        // 应用系统名称
        const logoEl = document.querySelector('.logo');
        if (logoEl && settings.systemName) {
            logoEl.textContent = settings.systemName;
        }

        // 应用版本号
        const versionEl = document.querySelector('.version');
        if (versionEl && settings.systemVersion) {
            versionEl.textContent = settings.systemVersion;
        }

        // 应用标语
        const taglineEl = document.querySelector('.tagline');
        if (taglineEl && settings.systemTagline) {
            taglineEl.textContent = settings.systemTagline;
        }

        // 应用规格信息
        const specEl = document.querySelector('.spec');
        if (specEl && settings.targetDuration && settings.targetWords) {
            specEl.textContent = `${settings.targetDuration}分钟 / ${settings.targetWords}字`;
        }

        // 应用主题色
        if (settings.primaryColor) {
            document.documentElement.style.setProperty('--primary', settings.primaryColor);
            // 计算更亮和更暗的版本
            const lightColor = this.adjustColor(settings.primaryColor, 20);
            const darkColor = this.adjustColor(settings.primaryColor, -20);
            document.documentElement.style.setProperty('--primary-light', lightColor);
            document.documentElement.style.setProperty('--primary-dark', darkColor);
        }

        return settings;
    },

    // 调整颜色亮度
    adjustColor(hex, percent) {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.min(255, Math.max(0, (num >> 16) + percent));
        const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + percent));
        const b = Math.min(255, Math.max(0, (num & 0x0000FF) + percent));
        return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
    },

    // 检查是否有后台配置
    hasAdminConfig() {
        return localStorage.getItem('admin_structures') !== null ||
            localStorage.getItem('admin_angles') !== null ||
            localStorage.getItem('admin_modules') !== null;
    }
};

// 导出供其他模块使用
if (typeof window !== 'undefined') {
    window.ConfigLoader = ConfigLoader;
}
