import childProcess from 'child_process'
// import { type } from 'os'
import type { Plugin } from 'vite'

// 判断平台，win平台不支持grep
// const isWin = type() === 'Windows_NT'
// const findStr = isWin ? 'findstr' : 'grep'

let userName = ''

try {
  userName = childProcess.execSync(`git config user.name`, { encoding: 'utf-8' })
} catch (e) {
  console.log(e)
}

const VitePluginRmOthersConsole = () => {
  return {
    name: 'vite-plugin-rm-others-console',
    enforce: 'pre',
    apply: 'serve',
    transform: async (code, id) => {
      try {
        if (!id.includes('node_modules') && id.includes('.ts') && code.includes(`console.log(`) && userName) {
          const authorList = childProcess
            .execSync(`git blame ${id} `, {
              encoding: 'utf-8'
            })
            .split('\n')
          return {
            code: code
              .split('\n')
              .map((row, index) => {
                const codeInfo = authorList[index]
                if (
                  codeInfo.includes('console.log(') &&
                  !codeInfo.includes(userName) &&
                  !codeInfo.includes('Not Committed Yet')
                ) {
                  return row.replace(/console\.log\((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*\)[;\n]?/g, `{}`)
                }
                return row
              })
              .join('\n'),
            map: null // 表示源码视图不作修改
          }
        }
      } catch {
        return {
          code,
          map: null // 表示源码视图不作修改
        }
      }
      return {
        code,
        map: null // 表示源码视图不作修改
      }
    }
  } as Plugin
}

export default VitePluginRmOthersConsole
