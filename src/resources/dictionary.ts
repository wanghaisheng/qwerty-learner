import type { Dictionary, DictionaryResource } from '@/typings/index'
import { calcChapterCount } from '@/utils'


// 德语词典
const shanghanBook: DictionaryResource[] = [
  {
    id: 'guilinguben-jianti',
    name: '桂林古本伤寒论 白云阁版本',
    description: '桂林罗哲初  手抄',
    category: '伤寒论',
    tags: ['简体'],
    url: '/dicts/shanghan-guilin-jianti.json',
    length: 5892,
    language: 'zh',
    languageCategory: 'shanghan',
  },
  {
    id: 'guilinguben-fanti',
    name: '桂林古本伤寒论 白云阁版本',
    description: '桂林罗哲初  手抄',
    category: '伤寒论',
    tags: ['繁体'],
    url: '/dicts/shanghan-guilin-fanti.json',
    length: 5892,
    language: 'zh',
    languageCategory: 'shanghan',
  },  
  {
    id: 'song-jianti',
    name: '宋 简体 伤寒论',
    description: 'xxxxxx',
    category: '伤寒论',
    tags: ['简体'],
    url: '/dicts/shanghan-song-jianti.json',
    length: 5892,
    language: 'zh',
    languageCategory: 'shanghan',
  },    
]




/**
 * Built-in dictionaries in an array.
 * Why arrays? Because it keeps the order across browsers.
 */
export const dictionaryResources: DictionaryResource[] = [
  ...shanghanBook,

  // {
  //   id: 'zhtest',
  //   name: '中文测试',
  //   description: '中文测试词库',
  //   category: '测试',
  //   url: '/dicts/chinese_test.json',
  //   length: 27,
  //   language: 'zh',
  // },
  // {
  //   id: 'jptest',
  //   name: '日文测试',
  //   description: '日文测试词库',
  //   category: '测试',
  //   url: '/dicts/japanese_test.json',
  //   length: 20,
  //   language: 'ja',
  // },
]

export const dictionaries: Dictionary[] = dictionaryResources.map((resource) => ({
  ...resource,
  chapterCount: calcChapterCount(resource.length),
}))

/**
 * An object-map from dictionary IDs to dictionary themselves.
 */
export const idDictionaryMap: Record<string, Dictionary> = Object.fromEntries(dictionaries.map((dict) => [dict.id, dict]))
