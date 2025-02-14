import { CHAPTER_LENGTH } from '@/constants'
import { currentChapterAtom, currentDictInfoAtom } from '@/store'
import type { Word, WordWithIndex } from '@/typings/index'
import { useAtom, useAtomValue } from 'jotai'
import { useMemo } from 'react'
import useSWR from 'swr'

export type UseWordListResult = {
  words: WordWithIndex[] | undefined
  isLoading: boolean
  error: Error | undefined
}

/**
 * Use word lists from the current selected dictionary.
 */
export function useWordList(): UseWordListResult {
  const currentDictInfo = useAtomValue(currentDictInfoAtom)
  const [currentChapter, setCurrentChapter] = useAtom(currentChapterAtom)

  console.log('useWordList: currentDictInfo from atom:', currentDictInfo); // Debug 1: Log currentDictInfo immediately

  if (!currentDictInfo) {
    console.log('useWordList: currentDictInfo is UNDEFINED!'); // Debug 2: Log if currentDictInfo is undefined
    return { words: undefined, isLoading: false, error: undefined }; // Early return if undefined
  }

  console.log('useWordList: ========= currentDictInfo.id:', currentDictInfo.id); // Original log - now should be safe

  const isFirstChapter = currentDictInfo.id === 'guilinguben_jianti' && currentChapter === 0

  console.log('useWordList: currentChapter:', currentChapter);
  console.log('useWordList: currentDictInfo.chapterCount:', currentDictInfo.chapterCount);

  // Reset current chapter to 0, when currentChapter is greater than chapterCount.
  if (currentChapter >= currentDictInfo.chapterCount) {
    console.log('useWordList: Resetting currentChapter because it exceeded chapterCount');
    setCurrentChapter(0)
  }

  const urlForSWR = currentDictInfo.url;
  console.log('useWordList: URL for useSWR:', urlForSWR);
  const { data: wordList, error, isLoading } = useSWR(urlForSWR, wordListFetcher)

  const words: WordWithIndex[] = useMemo(() => {
    console.log('useWordList: useMemo callback executing');
    console.log('useWordList: useMemo - isFirstChapter:', isFirstChapter);
    console.log('useWordList: useMemo - wordList (from SWR):', wordList);
    console.log('useWordList: useMemo - currentChapter:', currentChapter);

    const newWords = isFirstChapter
      ? firstChapter
      : wordList
      ? wordList.slice(currentChapter * CHAPTER_LENGTH, (currentChapter + 1) * CHAPTER_LENGTH)
      : []

    // 记录原始 index
    return newWords.map((word, index) => ({ ...word, index }))
  }, [isFirstChapter, wordList, currentChapter])

  return { words: wordList === undefined ? undefined : words, isLoading, error }
}

async function wordListFetcher(url: string): Promise<Word[]> {
  console.log('wordListFetcher: Fetching URL:', url);
  const URL_PREFIX: string = import.meta.env.REACT_APP_DEPLOY_ENV === 'pages' ? '/qwerty-learner' : ''; // Use import.meta.env for Vite
  const fullURL = URL_PREFIX + url;
  console.log('wordListFetcher: Full URL:', fullURL);

  const response = await fetch(fullURL);
  console.log('wordListFetcher: Fetch Response Status:', response.status);
  const words: Word[] = await response.json();
  console.log('wordListFetcher: Fetched words:', words.length, 'words');
  return words
}


const  firstChapter=[

    {
        "name": "桂林古本伤寒杂病论",
        "trans": []
    },
    {
        "name": "汉长沙太守南阳张机仲景  述",
        "trans": []
    },
    {
        "name": "桂林罗哲初  手抄",
        "trans": []
    },
    {
        "name": "据广西人民出版社1980年7月第2版",
        "trans": []
    },
    {
        "name": "伤寒杂病论序(张机序)",
        "trans": []
    },
    {
        "name": "论曰：余每览越人入虢之诊，望齐侯之色，未尝不慨然叹其才秀也。怪当今居世之士，曾不留神医药，精究方术，上以疗君亲之疾，下以救贫贱之厄，中以保身长全，以养其生，但竞逐荣势，企踵权豪，孜孜汲汲，惟名利是务，崇饰其末，忽弃其本，华其外，而悴其内，皮之不存，毛将安附焉。卒然遭邪风之气，婴非常之疾，患及祸至，而方震栗，降志屈节，钦望巫祝，告穷归天，束手受败，賫百年之寿命，持至贵之重器，委付凡医，恣其所措，咄嗟嗚呼！厥身已毙，神明消灭，变为异物，幽潜重泉，徒为啼泣，痛夫！举世昏迷，莫能觉悟，不惜其命，若是轻生，彼何荣势之足云哉！而进不能爱人知人，退不能爱身知己，遇灾值祸，身居厄地，蒙蒙昧昧，蠢若游魂。哀乎！趋势之士，驰竞浮华，不固根本，忘躯徇物，危若冰谷，至于是也。余宗族素多，向余二百，建安纪元以来，犹未十稔，其死亡者，三分有二，伤寒十居其七。感往昔之沦丧，伤横夭之莫救，乃勤求古训，博采众方，撰用《素问》、《九卷》、《八十一难》、《阴阳大論》、《胎臚药录》，并平脉辨证，为《伤寒杂病论》合十六卷，虽未能尽愈诸病，庶可以见病知源，若能寻余所集，思过半矣。夫天布五行，以运万类，人禀五常，以有五脏，经络府俞，阴阳会通，玄冥幽微，变化难极，自非才高识妙，岂能探其理致哉！上古有神农、黄帝、歧伯、伯高、雷公、少俞、少师、仲文，中世有长桑、扁鹊，汉有公乘阳庆及仓公，下此以往，未之闻也。观今之医，不念思求经旨，以演其所知，各承家技，终始顺旧，省疾问病，务在口给。相对须臾，便处汤药，按寸不及尺，握手不及足，人迎趺阳，三部不参，动数发息，不满五十，短期未知决诊，九候曾无仿佛，明堂闕庭，尽不见察，所谓窥管而已。夫欲视死别生，实为难矣。孔子云：生而知之者上，学则亚之，多闻博识，知之次也。余宿尚方术，请事斯语。     汉长沙太守南阳张机序",
        "trans": []
    },
    {
        "name": "伤寒杂病论序(桂林左德序)",
        "trans": []
    },
    {
        "name": "余闻吾师张绍祖先生之言曰：\"吾家伤寒一书，相传共有一十三稿，每成一稿，传抄殆遍城邑，兹所存者为第十二稿，余者或为族人所秘，或付劫灰，不外是矣；叔和所得相传为第七次稿，与吾所脏者较，其间阙如固多，编次亦不相类，或为叔和所篡乱，或疑为宋人所增删，聚讼纷如，各执其说；然考晋时尚无刊本，犹是传抄，唐末宋初始易传抄为刊刻，遂称易简，以此言之，则坊间所刊者，不但非汉时之原稿，恐亦非叔和之原稿也。\"余聆训之下，始亦疑之，及读至伤寒例一卷，见其于可汗不可汗，可吐不可吐，可下不可下法，尽载其中，于六经已具之条为并不重引，法律谨严，始知坊间所刻之辨可汗不可汗，可吐不可吐，可下不可下，以及发汗 吐下后各卷，盖后人以读书之法，错杂其间，而未计及编书之法固不如是也，不然孔氏之徒，问仁者众，问政者繁，何不各类其类，而惮烦若此耶!吾师讳学正，自言为仲氏四十六世孙，自晋以后迁徙不一，其高祖复初公，自岭南复迁原籍，寄居光州，遂聚族焉。吾师虽承家学，不以医名，亦不轻出此书以三示人，余得之受业者，殆有天焉。余宿好方术，得针灸之学于永川邓师宪章公，后随侍先严游宦岭南，与吾师同寅，朝夕相过从，见余手执宋本伤寒论，笑问曰：\"亦嗜此乎？\"时余年仅弱冠，答曰：\"非敢云嗜，尚未得其要领，正寻绎耳。\"师曰：\"子既好学，复知针灸，可以读伤寒论矣，吾有世传抄本伤寒杂病论十六卷，向不示人，得人不传，恐成坠绪。\"遂历言此书颠末，及吾师家世滔滔不倦。先严促余曰：\"速下拜。\"于是即席拜之，得师事焉。今罗生哲初为吾邑知名人士，从习针灸历有年所，颇能好余之所好，余亦以所得者尽授之，余不负吾师，罗生亦必不负余，故特序其原起，罗生其志之，罗生其勉之。 光绪二十年岁次甲午三月桂林左盛德序",
        "trans": []
    }

]