
function getDayStr() {
    const time = new Date()
    const year = `${time.getFullYear()}`
    const month = `${time.getMonth() + 1}`
    const day = `${time.getDay()}`
    return `${year.substring(2,4)}${month.padStart(2, '0')}${day.padStart(2, '0')}`
}

module.exports = {
    "header": "# 更新日志 \n\n",
    "types": [
        { "type": "feat", "section": "✨ Features | 新功能" },
        { "type": "fix", "section": "🐛 Bug Fixes | Bug 修复" },
        { "type": "init", "section": "🎉 Init | 初始化" },
        { "type": "docs", "section": "✏️ Documentation | 文档" },
        { "type": "style", "section": "💄 Styles | 风格" },
        { "type": "refactor", "section": "♻️ Code Refactoring | 代码重构" },
        { "type": "perf", "section": "⚡ Performance Improvements | 性能优化" },
        { "type": "test", "section": "✅ Tests | 测试" },
        { "type": "revert", "section": "⏪ Revert | 回退", "hidden": true },
        { "type": "build", "section": "📦‍ Build System | 打包构建" },
        { "type": "chore", "section": "🚀 Chore | 构建/工程依赖/工具" },
        { "type": "ci", "section": "👷 Continuous Integration | CI 配置" }
    ],
    "releaseCommitMessageFormat": `chore(release): v{{currentTag}} ${getDayStr()}`
}