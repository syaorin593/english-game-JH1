// --- 設定 & データ定義 ---
const SAVE_KEY = 'english_quest_jhs1_v2_fixed'; // キーを更新

// --- 称号データ ---
const ACHIEVEMENTS = [
    {id:'c1', name:'Hello World', desc:'Stage 1 (be動詞) クリア', icon:'🥚'},
    {id:'c2', name:'アクション開始', desc:'Stage 2 (一般動詞) クリア', icon:'🏃'},
    {id:'c3', name:'Noと言える勇気', desc:'Stage 3 (否定文) クリア', icon:'🙅'},
    {id:'c4', name:'クエスチョン', desc:'Stage 4 (疑問文) クリア', icon:'❓'},
    {id:'c5', name:'可能性の扉', desc:'Stage 5 (can) クリア', icon:'🔓'},
    {id:'c6', name:'探究者', desc:'Stage 6 (疑問詞) クリア', icon:'🔎'},
    {id:'c7', name:'数と命令', desc:'Stage 7 (複数・命令) クリア', icon:'🔢'},
    {id:'c8', name:'実況中継', desc:'Stage 8 (現在進行形) クリア', icon:'🎥'},
    {id:'c9', name:'未来の夢', desc:'Stage 9 (不定詞) クリア', icon:'🌈'},
    {id:'c10', name:'思い出', desc:'Stage 10 (過去形) クリア', icon:'🎞️'},
    {id:'c11', name:'中1マスター', desc:'Final Review クリア', icon:'🎓'},
    {id:'c12', name:'記述の神', desc:'EX Stage クリア', icon:'👑'},
    
    {id:'combo_10', name:'リズム', desc:'10コンボ達成', icon:'🎵'},
    {id:'combo_30', name:'フロー', desc:'30コンボ達成', icon:'🌊'},
    {id:'combo_50', name:'ゾーン', desc:'50コンボ達成', icon:'⚡'},
    {id:'rank_s', name:'完璧主義', desc:'ランクSを獲得', icon:'✨'},
    {id:'rank_f', name:'挫折を知る', desc:'ゲームオーバーになる', icon:'💀'},
    {id:'no_miss', name:'ノーミス', desc:'全問正解でクリア', icon:'🎯'},
    {id:'full_hp', name:'無傷の生還', desc:'HP満タンでクリア', icon:'🛡️'},
    {id:'survivor', name:'生存者', desc:'HP1でクリア', icon:'❤️‍🔥'},
    {id:'boss_killer', name:'ボス撃破', desc:'ボスに勝利する', icon:'👹'},

    {id:'rich', name:'大富豪', desc:'1000G 貯める', icon:'💰'},
    {id:'item_user', name:'道具使い', desc:'アイテムを使用する', icon:'💊'},

    {id:'total_50', name:'学習の芽', desc:'累計50問正解', icon:'🥉'},
    {id:'total_100', name:'知識の蕾', desc:'累計100問正解',icon:'🥈'},
    {id:'total_300', name:'大賢者', desc:'累計300問正解', icon:'🥇'},
    {id:'total_500', name:'伝説', desc:'累計500問正解', icon:'💎'},
    {id:'total_1000', name:'英語の神', desc:'累計1000問正解', icon:'🪐'},
    {id:'level_5', name:'ルーキー', desc:'Lv.5 到達', icon:'⭐'},
    {id:'level_10', name:'ベテラン', desc:'Lv.10 到達', icon:'🌟'},
    {id:'level_20', name:'マスター', desc:'Lv.20 到達', icon:'🌌'},
    {id:'end_10', name:'持久力', desc:'エンドレス10問正解', icon:'🔋'},
    {id:'end_30', name:'無限の彼方', desc:'エンドレス30問正解', icon:'🚀'},

    {id:'night_owl', name:'夜更かし', desc:'深夜(0-4時)にプレイ', icon:'🦉', hidden:true},
    {id:'lucky_7', name:'ラッキー7', desc:'スコアの末尾が77', icon:'🎰', hidden:true},
    {id:'creator', name:'創造主', desc:'デバッグモード起動', icon:'🛠️', hidden:true}
];

const STAGE_TITLES = {
    1:"be動詞", 2:"一般動詞", 3:"否定文", 4:"疑問文", 5:"助動詞 can",
    6:"疑問詞", 7:"複数形・命令形", 8:"現在進行形", 9:"不定詞(名詞的用法)", 10:"過去形", 
    11:"総復習 (Grade 1)", 12:"EX:鬼の全文記述(中1完結)"
};

// --- シャッフル関数 ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// --- 問題データ生成 ---
function getStageData(stageId) {
    let q = [];
    const add = (type, qText, ans, opts, expl) => {
        // IDを一意にする
        q.push({ id: `${stageId}_${q.length}_${Math.random().toString(36).substring(7)}`, stage: stageId, type, q: qText, a: ans, o: opts, expl });
    };

    // --- Stage 1: be動詞 (am, are, is) ---
    if (stageId === 1 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'I ( ) a student.', 'am', ['am','are','is','do'], 'I am ~');
        add('choice', 'You ( ) a teacher.', 'are', ['are','am','is','does'], 'You are ~');
        add('choice', 'He ( ) my friend.', 'is', ['is','am','are','play'], 'He is ~');
        add('choice', 'This ( ) a pen.', 'is', ['is','am','are','in'], 'This is ~');
        add('sort', '私はケンです。', 'I am Ken', ['I','am','Ken'], 'I am [名前]');
        add('sort', 'あなたは親切です。', 'You are kind', ['You','are','kind'], 'You are [形容詞]');
        add('sort', 'あれは私の学校です。', 'That is my school', ['That','is','my','school'], 'That is ~');
        add('fill', '私は日本出身です。 I ( ) from Japan.', 'am', null, 'I am from ~');
        add('fill', '彼女は美しい。 She ( ) beautiful.', 'is', null, 'She is ~');
        add('full', '私は東京出身です。', 'I am from Tokyo.', null, 'I am from [場所]');
        add('full', 'これは私のカバンです。', 'This is my bag.', null, 'This is ~');
        add('choice', 'My mother ( ) a doctor.', 'is', ['is','am','are','go'], '単数形 is');
        add('sort', '元気ですか？', 'How are you', ['How','are','you'], '挨拶');
        add('fill', 'それは素晴らしい。 It ( ) nice.', 'is', null, 'It is nice');
        add('full', 'あなたは私の先生です。', 'You are my teacher.', null, 'You are ~');
    }

    // --- Stage 2: 一般動詞 (play, like, study など) ---
    if (stageId === 2 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'I ( ) tennis.', 'play', ['play','plays','playing','is'], 'I play ~');
        add('choice', 'I ( ) music.', 'like', ['like','likes','liking','am'], 'I like ~');
        add('choice', 'You ( ) English.', 'study', ['study','studies','studying','are'], 'You study ~');
        add('sort', '私はサッカーをします。', 'I play soccer', ['I','play','soccer'], 'I play [スポーツ]');
        add('sort', 'あなたは猫が好きです。', 'You like cats', ['You','like','cats'], 'You like ~');
        add('sort', '私たちは学校へ行きます。', 'We go to school', ['We','go','to','school'], 'go to school');
        add('fill', '私はギターを弾きます。 I ( ) the guitar.', 'play', null, 'play the [楽器]');
        add('fill', '私は納豆が好きです。 I ( ) natto.', 'like', null, 'like [物]');
        add('full', '私は毎日勉強します。', 'I study every day.', null, 'study every day');
        add('full', '私は新しい自転車を持っています。', 'I have a new bike.', null, 'have (持っている)');
        add('choice', 'He ( ) baseball.', 'plays', ['plays','play','playing','is'], '3単現のs');
        add('choice', 'She ( ) Chinese.', 'speaks', ['speaks','speak','speaking','is'], '3単現のs');
        add('sort', '彼は東京に住んでいます。', 'He lives in Tokyo', ['He','lives','in','Tokyo'], 'lives in');
        add('fill', '彼女は夕食を作ります。 She ( ) dinner.', 'cooks', null, 'cooks (3単現)');
        add('full', 'トムは速く走ります。', 'Tom runs fast.', null, 'runs (3単現)');
    }

    // --- Stage 3: 否定文 (be動詞 & 一般動詞) ---
    if (stageId === 3 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'I ( ) not a student.', 'am', ['am','do','are','is'], 'be動詞の否定');
        add('choice', 'You ( ) not busy.', 'are', ['are','do','am','is'], 'You are not');
        add('choice', 'I ( ) play soccer.', "don't", ["don't","not","am not","doesn't"], '一般動詞の否定 I don\'t');
        add('choice', 'He ( ) not like dogs.', 'does', ['does','do','is','are'], '3単現の否定 doesn\'t');
        add('sort', '私は先生ではありません。', 'I am not a teacher', ['I','am','not','a','teacher'], 'I am not ~');
        add('sort', 'これはペンではありません。', 'This is not a pen', ['This','is','not','a','pen'], 'This is not ~');
        add('sort', '私はピアノを弾きません。', 'I do not play the piano', ['I','do','not','play','the','piano'], 'I do not ~');
        add('fill', '彼女はトムを知りません。 She ( ) not know Tom.', 'does', null, 'She does not');
        add('fill', '私はその本を持っていません。 I ( ) have the book.', "don't", null, "don't have");
        add('full', '私はオーストラリア出身ではありません。', 'I am not from Australia.', null, 'am not from');
        add('full', '彼は英語を話しません。', "He doesn't speak English.", null, "doesn't speak");
        add('choice', 'They ( ) my friends.', "aren't", ["aren't","isn't","don't","doesn't"], 'be動詞短縮');
        add('sort', '私たちは魚を食べません。', "We don't eat fish", ['We',"don't",'eat','fish'], 'We don\'t ~');
        add('fill', 'それは私の犬ではありません。 It ( ) not my dog.', 'is', null, 'It is not');
        add('full', '私は野球が好きではありません。', "I don't like baseball.", null, "don't like");
    }

    // --- Stage 4: 疑問文 (be動詞・一般動詞) ---
    if (stageId === 4 || (stageId >= 11 && stageId !== 12)) {
        add('choice', '( ) you a student?', 'Are', ['Are','Do','Is','Am'], 'Are you ~?');
        add('choice', '( ) this your bag?', 'Is', ['Is','Does','Are','Do'], 'Is this ~?');
        add('choice', '( ) you like sports?', 'Do', ['Do','Are','Does','Is'], 'Do you like ~?');
        add('choice', '( ) he play tennis?', 'Does', ['Does','Do','Is','Are'], 'Does he ~?');
        add('sort', 'あなたは東京出身ですか？', 'Are you from Tokyo', ['Are','you','from','Tokyo'], 'Are you from ~?');
        add('sort', 'あなたは寿司が好きですか？', 'Do you like sushi', ['Do','you','like','sushi'], 'Do you like ~?');
        add('sort', '彼女は日本語を話しますか？', 'Does she speak Japanese', ['Does','she','speak','Japanese'], 'Does she ~?');
        add('fill', 'ケンは忙しいですか？ ( ) Ken busy?', 'Is', null, 'Is Ken ~?');
        add('fill', 'あなたはピアノを持っていますか？ ( ) you have a piano?', 'Do', null, 'Do you have ~?');
        add('full', 'あなたは先生ですか？', 'Are you a teacher?', null, 'Are you ~?');
        add('full', 'あなたは毎日勉強しますか？', 'Do you study every day?', null, 'Do you study ~?');
        add('choice', 'Yes, I ( ).', 'do', ['do','am','are','does'], 'Do you...? の答え');
        add('choice', 'No, he ( ).', "doesn't", ["doesn't","don't","isn't","aren't"], 'Does he...? の答え');
        add('sort', 'あれはあなたの車ですか？', 'Is that your car', ['Is','that','your','car'], 'Is that ~?');
        add('full', '彼は納豆を食べますか？', 'Does he eat natto?', null, 'Does he eat ~?');
    }

    // --- Stage 5: can (助動詞) ---
    if (stageId === 5 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'I ( ) swim.', 'can', ['can','cans','canning','to can'], 'I can ~');
        add('choice', 'He can ( ) the piano.', 'play', ['play','plays','playing','to play'], 'can + 原形');
        add('choice', 'Can you ( ) English?', 'speak', ['speak','speaks','speaking','spoke'], 'Can you + 原形');
        add('choice', 'I ( ) run fast.', "cannot", ["cannot","isn't","don't","not can"], 'cannot (できない)');
        add('sort', '私はスキーができます。', 'I can ski', ['I','can','ski'], 'I can [動作]');
        add('sort', 'あなたは料理ができますか？', 'Can you cook', ['Can','you','cook'], 'Can you ~?');
        add('sort', '彼は速く走れません。', "He can't run fast", ['He',"can't",'run','fast'], 'cannot / can\'t');
        add('fill', '手伝ってくれますか？ ( ) you help me?', 'Can', null, 'Can you ~? (依頼)');
        add('fill', '私は泳げません。 I ( ) swim.', "can't", null, "can't");
        add('full', '私は上手に歌えます。', 'I can sing well.', null, 'sing well');
        add('full', '私の父は運転できます。', 'My father can drive.', null, 'can drive');
        add('choice', 'Yes, I ( ).', 'can', ['can','do','am','will'], 'Can you...? の答え');
        add('sort', 'ここでテニスができますか？', 'Can I play tennis here', ['Can','I','play','tennis','here'], 'Can I ~? (許可)');
        add('fill', 'ドアを開けてくれませんか？ ( ) you open the door?', 'Can', null, 'Can you ~?');
        add('full', 'あなたは漢字が読めますか？', 'Can you read Kanji?', null, 'read Kanji');
    }

    // --- Stage 6: 疑問詞 (What, Who, Where, When, How) ---
    if (stageId === 6 || (stageId >= 11 && stageId !== 12)) {
        add('choice', '( ) is this?', 'What', ['What','Who','Where','How'], 'What is this?');
        add('choice', '( ) is that boy?', 'Who', ['Who','What','Where','When'], 'Who is ~?');
        add('choice', '( ) do you live?', 'Where', ['Where','Who','What','When'], 'Where do you live?');
        add('choice', '( ) is your birthday?', 'When', ['When','Where','Who','What'], 'When is ~?');
        add('sort', 'これは何ですか？', 'What is this', ['What','is','this'], 'What is this?');
        add('sort', 'あの女性は誰ですか？', 'Who is that woman', ['Who','is','that','woman'], 'Who is ~?');
        add('sort', 'あなたはどうやって学校へ来ますか？', 'How do you come to school', ['How','do','you','come','to','school'], 'How do you ~?');
        add('fill', '時刻は今何時ですか？ ( ) time is it now?', 'What', null, 'What time ~?');
        add('fill', '出身はどこですか？ ( ) are you from?', 'Where', null, 'Where are you from?');
        add('full', 'トイレはどこですか？', 'Where is the bathroom?', null, 'Where is ~?');
        add('full', 'あなたの誕生日はいつですか？', 'When is your birthday?', null, 'When is ~?');
        add('choice', '( ) day is it today?', 'What', ['What','Who','How','Where'], 'What day (何曜日)');
        add('choice', '( ) old are you?', 'How', ['How','Who','What','When'], 'How old (何歳)');
        add('sort', '今日の天気はどうですか？', 'How is the weather today', ['How','is','the','weather','today'], 'How is the weather');
        add('full', 'あなたの名前は何ですか？', 'What is your name?', null, 'What is your name?');
    }

    // --- Stage 7: 複数形・命令形 ---
    if (stageId === 7 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'I have two ( ).', 'dogs', ['dogs','dog','doges','dogss'], '複数形 s');
        add('choice', 'I have three ( ).', 'boxes', ['boxes','boxs','box','boxxes'], '複数形 es');
        add('choice', '( ) your book.', 'Open', ['Open','Opens','Opening','To open'], '命令形(原形)');
        add('choice', '( ) swim here.', "Don't", ["Don't","Not","No","Doesn't"], '禁止の命令 Don\'t');
        add('sort', '私は2人の姉妹がいます。', 'I have two sisters', ['I','have','two','sisters'], 'two sisters');
        add('sort', '座ってください。', 'Sit down please', ['Sit','down','please'], 'Sit down');
        add('sort', 'この部屋に入ってはいけません。', "Don't enter this room", ["Don't",'enter','this','room'], 'Don\'t enter');
        add('fill', '静かにしなさい。 Be ( ).', 'quiet', null, 'Be quiet.');
        add('fill', '窓を開けましょう。 ( ) open the window.', "Let's", null, "Let's ~");
        add('full', '私はたくさんの本を持っています。', 'I have many books.', null, 'many books');
        add('full', 'ドアを閉めてください。', 'Close the door, please.', null, 'Close the door');
        add('choice', 'Do you have any ( )?', 'pets', ['pets','pet','a pet','pettes'], 'any pets');
        add('sort', 'さあ、行きましょう。', "Let's go", ["Let's",'go'], "Let's go");
        add('fill', '私の父は2台の車を持っています。 My father has two ( ).', 'cars', null, 'two cars');
        add('full', 'ここで写真を撮ってはいけません。', "Don't take pictures here.", null, "Don't take pictures");
    }

    // --- Stage 8: 現在進行形 (be + ing) ---
    if (stageId === 8 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'I am ( ) English.', 'studying', ['studying','study','studies','studied'], 'am studying');
        add('choice', 'He is ( ) tennis.', 'playing', ['playing','play','plays','played'], 'is playing');
        add('choice', 'They are ( ).', 'running', ['running','runing','runs','run'], 'running (n重ねる)');
        add('choice', 'Are you ( ) lunch?', 'eating', ['eating','eat','eats','ate'], 'Are you eating?');
        add('sort', '私は本を読んでいます。', 'I am reading a book', ['I','am','reading','a','book'], 'am reading');
        add('sort', '彼は今、眠っています。', 'He is sleeping now', ['He','is','sleeping','now'], 'is sleeping');
        add('sort', '彼女は泳いでいますか？', 'Is she swimming', ['Is','she','swimming'], 'Is she swimming?');
        add('fill', '彼らは歌っています。 They are ( ).', 'singing', null, 'are singing');
        add('fill', 'あなたは何をしていますか？ What are you ( )?', 'doing', null, 'What are you doing?');
        add('full', '私はテレビを見ています。', 'I am watching TV.', null, 'am watching');
        add('full', 'トムは勉強していません。', "Tom isn't studying.", null, "isn't studying");
        add('choice', 'Look. The bus is ( ).', 'coming', ['coming','comeing','comes','came'], 'coming (eをとる)');
        add('sort', '私は手紙を書いています。', 'I am writing a letter', ['I','am','writing','a','letter'], 'writing (eをとる)');
        add('fill', 'ケンは走っていますか？ Is Ken ( )?', 'running', null, 'running');
        add('full', '母は料理をしています。', 'My mother is cooking.', null, 'is cooking');
    }

    // --- Stage 9: 不定詞 (名詞的用法 want to / like to / try to) ---
    if (stageId === 9 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'I want ( ) play soccer.', 'to', ['to','for','at','of'], 'want to ~');
        add('choice', 'I like ( ) swim.', 'to', ['to','for','in','at'], 'like to ~');
        add('choice', 'I want to ( ) a teacher.', 'be', ['be','am','is','are'], 'want to be (なりたい)');
        add('choice', 'He wants to ( ) to the park.', 'go', ['go','goes','going','went'], 'to + 原形');
        add('sort', '私はテニスがしたいです。', 'I want to play tennis', ['I','want','to','play','tennis'], 'want to play');
        add('sort', '私は本を読むのが好きです。', 'I like to read books', ['I','like','to','read','books'], 'like to read');
        add('sort', '彼は医者になりたいです。', 'He wants to be a doctor', ['He','wants','to','be','a','doctor'], 'wants to be');
        add('fill', '私は英語を勉強したいです。 I want ( ) study English.', 'to', null, 'want to');
        add('fill', '彼女は歌うのが好きです。 She likes ( ) sing.', 'to', null, 'likes to');
        add('full', '私は野球がしたいです。', 'I want to play baseball.', null, 'want to play');
        add('full', 'あなたは何になりたいですか？', 'What do you want to be?', null, 'What do you want to be?');
        add('choice', 'I tried ( ) open the door.', 'to', ['to','for','at','on'], 'try to (～しようとする)');
        add('sort', '私は日本を訪れたいです。', 'I want to visit Japan', ['I','want','to','visit','Japan'], 'want to visit');
        add('fill', '私は家に帰りたい。 I want to ( ) home.', 'go', null, 'go home');
        add('full', '私はその本を読みたいです。', 'I want to read the book.', null, 'want to read');
    }

    // --- Stage 10: 過去形 (was/were, 規則動詞, 不規則動詞) ---
    if (stageId === 10 || (stageId >= 11 && stageId !== 12)) {
        add('choice', 'I ( ) busy yesterday.', 'was', ['was','am','were','is'], 'I was (be過去)');
        add('choice', 'You ( ) happy last night.', 'were', ['were','was','are','did'], 'You were (be過去)');
        add('choice', 'I ( ) tennis yesterday.', 'played', ['played','play','plays','playing'], 'play -> played');
        add('choice', 'I ( ) to Tokyo last Sunday.', 'went', ['went','go','goes','going'], 'go -> went');
        add('sort', '私は昨日、公園にいました。', 'I was in the park yesterday', ['I','was','in','the','park','yesterday'], 'I was in ~');
        add('sort', '私は昨夜、テレビを見ました。', 'I watched TV last night', ['I','watched','TV','last','night'], 'watched');
        add('sort', '彼は昨日、英語を勉強しましたか？', 'Did he study English yesterday', ['Did','he','study','English','yesterday'], 'Did he study ~?');
        add('fill', '私は昨日、宿題をしました。 I ( ) my homework yesterday.', 'did', null, 'did (doの過去)');
        add('fill', '私は彼に会いました。 I ( ) him.', 'saw', null, 'saw (seeの過去)');
        add('full', '私は昨夜、忙しくありませんでした。', "I wasn't busy last night.", null, "wasn't busy");
        add('full', 'あなたは昨日何をしましたか？', 'What did you do yesterday?', null, 'What did you do');
        add('choice', 'He ( ) come yesterday.', "didn't", ["didn't","don't","doesn't","isn't"], 'didn\'t (過去否定)');
        add('sort', '私たちは昨日、楽しい時間を過ごしました。', 'We had a good time yesterday', ['We','had','a','good','time','yesterday'], 'had a good time');
        add('fill', '彼らは昨夜、家にいました。 They ( ) at home last night.', 'were', null, 'were');
        add('full', '私は今朝、6時に起きました。', 'I got up at six this morning.', null, 'got up');
    }

    // --- Stage 12: EX (中1総まとめ全文記述) ---
    if (stageId === 12) {
        add('full', '私は音楽が好きではありません。', "I don't like music.", null, '一般動詞否定');
        add('full', 'あなたはどこに住んでいますか？', 'Where do you live?', null, '疑問詞 Where');
        add('full', '彼は泳ぐことができますか？', 'Can he swim?', null, '助動詞 Can');
        add('full', 'ドアを開けてください。', 'Open the door, please.', null, '命令形');
        add('full', '私は今、英語を勉強しています。', 'I am studying English now.', null, '現在進行形');
        add('full', '彼女は先生になりたいです。', 'She wants to be a teacher.', null, '不定詞 want to be');
        add('full', '私は昨日、図書館に行きました。', 'I went to the library yesterday.', null, '過去形 went');
        add('full', '昨日は晴れでした。', 'It was sunny yesterday.', null, '過去形 It was');
        add('full', 'あなたは何個のボールを持っていますか？', 'How many balls do you have?', null, 'How many ~?');
        add('full', '彼らは公園で走っています。', 'They are running in the park.', null, '進行形 running');
        add('full', '日曜日には何をしますか？', 'What do you do on Sunday?', null, 'What do you do');
        add('full', 'そのカバンを買ってはいけません。', "Don't buy the bag.", null, '禁止 Don\'t');
        add('full', '私はその時、お腹が空いていました。', 'I was hungry then.', null, '過去形 I was');
        add('full', '彼女は日本語を話しません。', "She doesn't speak Japanese.", null, '3単現否定');
        add('full', 'これは誰の自転車ですか？', 'Whose bike is this?', null, 'Whose ~?');
        return q;
    }

    return q;
}

// --- ゲーム変数 ---
let gameState = {
    mode: '', 
    stageId: 1,
    queue: [],
    qIndex: 0,
    score: 0,
    combo: 0,
    mistakes: [],
    hp: 5, // HP 5
    maxHp: 5,
    expGained: 0,
    goldGained: 0,
    endlessWave: 0,
    endlessCorrectCount: 0, 
    writeCorrectCount: 0,
    shieldActive: false,
    pencilUsed: false,
    coinActive: false, 
    debugClicks: 0
};

// --- セーブデータ管理 ---
function loadGameData() {
    let data = localStorage.getItem(SAVE_KEY);
    let parsed = data ? JSON.parse(data) : {};
    return {
        cleared: parsed.cleared || [],
        achieved: parsed.achieved || [],
        level: parsed.level || 1,
        exp: parsed.exp || 0,
        gold: parsed.gold || 0,
        items: {
            potion: (parsed.items && parsed.items.potion) || 0,
            bomb: (parsed.items && parsed.items.bomb) || 0,
            hint: (parsed.items && parsed.items.hint) || 0,
            pencil: (parsed.items && parsed.items.pencil) || 0,
            shield: (parsed.items && parsed.items.shield) || 0,
            coin: (parsed.items && parsed.items.coin) || 0
        },
        totalSolved: parsed.totalSolved || 0,
        writeCount: parsed.writeCount || 0,
        maxEndlessScore: parsed.maxEndlessScore || 0 
    };
}
let saveData = loadGameData();

function getNextLevelExp(level) { return level * 50; } 

window.onload = () => {
    updateTitleStats();
    updateStageList();
    document.getElementById('game-title').onclick = () => {
        if(++gameState.debugClicks >= 7) {
            document.getElementById('debug-btn').classList.remove('hidden');
            unlockAchievement('creator');
        }
    };
    gameState.debugClicks = 0;
};

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    if(id === 'screen-stages') {
        const goldEl = document.getElementById('stage-gold');
        if(goldEl) goldEl.innerText = saveData.gold;
    }
}

function updateTitleStats() {
    const nextExp = getNextLevelExp(saveData.level);
    document.getElementById('title-level').innerText = saveData.level;
    document.getElementById('title-next-exp').innerText = nextExp - saveData.exp;
    const pct = Math.min(100, (saveData.exp / nextExp) * 100);
    document.getElementById('title-exp-bar').style.width = `${pct}%`;
    const recEl = document.getElementById('endless-record-display');
    if(recEl) recEl.innerText = `Endless Best: ${saveData.maxEndlessScore} 問`;
}

function updateStageList() {
    const list = document.getElementById('stage-list');
    list.innerHTML = '';
    const maxStage = saveData.cleared.length >= 11 ? 12 : 11;

    for(let i=1; i<=maxStage; i++) {
        const btn = document.createElement('button');
        const isLocked = i > 1 && !saveData.cleared.includes(i-1);
        btn.innerText = `Stage ${i}: ${STAGE_TITLES[i]}`;
        if(saveData.cleared.includes(i)) btn.innerText += " ✅";
        
        if(isLocked) {
            btn.classList.add('locked');
            btn.disabled = true;
            btn.innerText = "🔒 Locked";
        } else {
            // ★重要：ここをシンプルに
            btn.onclick = function() { startStage(i); };
        }
        list.appendChild(btn);
    }
    
    const endBtn = document.getElementById('btn-endless');
    const recEl = document.getElementById('endless-record-display');
    
    if(saveData.cleared.includes(11)) { 
        endBtn.classList.remove('locked');
        endBtn.classList.remove('hidden');
        endBtn.innerText = "♾️ エンドレスモード";
        endBtn.disabled = false;
        if(recEl) recEl.classList.remove('hidden'); 
    } else {
        endBtn.classList.add('locked');
        endBtn.classList.add('hidden');
        endBtn.disabled = true;
        if(recEl) recEl.classList.add('hidden'); 
    }
    
    const goldEl = document.getElementById('stage-gold');
    if(goldEl) goldEl.innerText = saveData.gold;
}

// --- ショップ機能 ---
function showShop() {
    showScreen('screen-shop');
    updateShopUI();
}
function updateShopUI() {
    const setTxt = (id, val) => { const el = document.getElementById(id); if(el) el.innerText = val; };
    setTxt('shop-gold', `${saveData.gold} G`);
    setTxt('inv-potion', saveData.items.potion);
    setTxt('inv-bomb', saveData.items.bomb);
    setTxt('inv-hint', saveData.items.hint);
    setTxt('inv-pencil', saveData.items.pencil);
    setTxt('inv-shield', saveData.items.shield);
    setTxt('inv-coin', saveData.items.coin);
}
function buyItem(item, price) {
    if(saveData.gold >= price) {
        saveData.gold -= price;
        saveData.items[item] = (saveData.items[item] || 0) + 1;
        saveGame();
        updateShopUI();
    } else {
        alert("ゴールドが足りません！");
    }
}

// --- アイテム使用 ---
function updateItemButtons() {
    const setTxt = (id, val) => { const el = document.getElementById(id); if(el) el.innerText = val; };
    setTxt('game-inv-potion', saveData.items.potion || 0);
    setTxt('game-inv-bomb', saveData.items.bomb || 0);
    setTxt('game-inv-hint', saveData.items.hint || 0);
    setTxt('game-inv-pencil', saveData.items.pencil || 0);
    setTxt('game-inv-shield', saveData.items.shield || 0);
    setTxt('game-inv-coin', saveData.items.coin || 0);
    
    const currentQ = gameState.queue[gameState.qIndex];
    if(!currentQ) return;

    const btnPotion = document.getElementById('btn-use-potion');
    if(btnPotion) btnPotion.disabled = !(saveData.items.potion > 0 && gameState.hp < gameState.maxHp);
    const btnBomb = document.getElementById('btn-use-bomb');
    if(btnBomb) btnBomb.disabled = !(saveData.items.bomb > 0 && currentQ.type === 'choice');
    const btnHint = document.getElementById('btn-use-hint');
    if(btnHint) btnHint.disabled = !(saveData.items.hint > 0 && (currentQ.type === 'fill' || currentQ.type === 'full' || currentQ.type === 'sort'));
    const btnPencil = document.getElementById('btn-use-pencil');
    if(btnPencil) btnPencil.disabled = !(saveData.items.pencil > 0 && !gameState.pencilUsed && (currentQ.type === 'fill' || currentQ.type === 'full'));
    const btnShield = document.getElementById('btn-use-shield');
    if(btnShield) btnShield.disabled = !(saveData.items.shield > 0 && !gameState.shieldActive);
    const btnCoin = document.getElementById('btn-use-coin');
    if(btnCoin) btnCoin.disabled = !(saveData.items.coin > 0 && !gameState.coinActive);
}
function usePotion() {
    if(saveData.items.potion > 0 && gameState.hp < gameState.maxHp) {
        saveData.items.potion--; gameState.hp++;
        updateHpBar(); updateItemButtons(); unlockAchievement('item_user'); saveGame();
    }
}
function useBomb() {
    if(saveData.items.bomb > 0) {
        const q = gameState.queue[gameState.qIndex];
        if(q.type === 'choice') {
            saveData.items.bomb--; saveGame();
            const container = document.getElementById('choices-container');
            const buttons = Array.from(container.children);
            let removed = 0;
            for(let btn of buttons) {
                if(btn.innerText !== q.a) { btn.style.visibility = 'hidden'; removed++; if(removed >= 2) break; }
            }
            updateItemButtons();
        }
    }
}
function useHint() {
    if(saveData.items.hint > 0) {
        saveData.items.hint--; saveGame(); unlockAchievement('item_user');
        const q = gameState.queue[gameState.qIndex];
        if(q.type === 'sort') {
            alert(`最初の単語は "${q.a.split(' ')[0]}" です`);
        } else if(q.type === 'fill' || q.type === 'full') {
            const words = q.a.split(' ');
            const inp = document.getElementById('writing-input');
            inp.value = words[0] + " "; inp.focus();
            let hintPattern = words.map(w => w[0] + "_".repeat(Math.max(0, w.length-1))).join(' ');
            document.getElementById('writing-hint').innerText = "Hint: " + hintPattern.replace(/_/g, '_');
        }
        updateItemButtons();
    }
}
function usePencil() {
    if(saveData.items.pencil > 0 && !gameState.pencilUsed) {
        const q = gameState.queue[gameState.qIndex];
        if(q.type === 'fill' || q.type === 'full') {
            saveData.items.pencil--; gameState.pencilUsed = true; saveGame();
            let dummies = ["I don't know.", "She is happy.", "He plays tennis."];
            if(gameState.queue.length > 3) { dummies = gameState.queue.filter(bq => bq !== q).slice(0,3).map(bq => bq.a); }
            document.getElementById('writing-container').classList.add('hidden');
            const c = document.getElementById('choices-container');
            c.classList.remove('hidden'); c.innerHTML = '';
            let opts = [q.a, ...dummies].sort(() => Math.random() - 0.5);
            opts.forEach(opt => {
                const btn = document.createElement('button'); btn.className = 'choice-btn';
                btn.innerText = opt; btn.onclick = () => checkAnswer(opt === q.a, q); c.appendChild(btn);
            });
            updateItemButtons();
        }
    }
}
function useShield() {
    if(saveData.items.shield > 0 && !gameState.shieldActive) {
        saveData.items.shield--; gameState.shieldActive = true;
        document.getElementById('shield-overlay').classList.remove('hidden'); saveGame(); updateItemButtons();
    }
}
function useCoin() {
    if(saveData.items.coin > 0 && !gameState.coinActive) {
        saveData.items.coin--; gameState.coinActive = true;
        document.getElementById('coin-overlay').classList.remove('hidden'); saveGame(); updateItemButtons();
    }
}

function initGame(mode) {
    gameState.mode = mode; gameState.queue = []; 
    gameState.score = 0; gameState.combo = 0; gameState.qIndex = 0; gameState.mistakes = [];
    gameState.hp = 5; gameState.maxHp = 5; // HP 5
    gameState.expGained = 0; gameState.goldGained = 0;
    gameState.endlessWave = 1; gameState.endlessCorrectCount = 0; gameState.writeCorrectCount = 0;
    gameState.shieldActive = false; gameState.pencilUsed = false; gameState.coinActive = false;
    updateHpBar();
    showScreen('screen-game');
    updateItemButtons();
    
    const qArea = document.getElementById('question-area');
    if(qArea) {
        qArea.classList.remove('anim-wrong'); qArea.classList.remove('anim-correct'); qArea.style.borderColor = "#dfe6e9";     
    }
    const gameScreen = document.getElementById('screen-game');
    gameScreen.classList.remove('boss-mode');
    document.getElementById('boss-overlay').classList.add('hidden');
    document.getElementById('shield-overlay').classList.add('hidden');
    document.getElementById('coin-overlay').classList.add('hidden');
}

// ★修正：startStage関数（エラーハンドリング強化・変数重複回避）
function startStage(id) {
    try {
        initGame('stage');
        gameState.stageId = id;
        
        // データを取得する変数を明確に分ける
        let currentStageData = [];

        if(id === 12) {
            let exData = getStageData(12);
            // EXステージは15問
            gameState.queue = exData.sort(() => Math.random() - 0.5).slice(0, 15);
        } else {
            // 通常ステージ
            let sourceData = [];
            if(id === 11) {
                // 総復習は全ステージから
                for(let i=1; i<=10; i++) {
                    sourceData = sourceData.concat(getStageData(i));
                }
            } else {
                // 通常は特定IDから
                sourceData = getStageData(id);
            }

            // 安全策：データがない場合はエラー
            if(!sourceData || sourceData.length === 0) {
                throw new Error("No data found for stage " + id);
            }

            const choices = sourceData.filter(q => q.type === 'choice');
            const sorts = sourceData.filter(q => q.type === 'sort');
            const writes = sourceData.filter(q => q.type === 'fill' || q.type === 'full');
            
            const pick = (arr, n) => arr.sort(() => Math.random() - 0.5).slice(0, n);
            
            let set = [];
            set = set.concat(pick(choices, 4));
            set = set.concat(pick(sorts, 3));
            set = set.concat(pick(writes, 3));
            
            // 10問に満たない場合の補充
            let loopCount = 0;
            while(set.length < 10 && sourceData.length >= 10 && loopCount < 100) {
                let c = sourceData[Math.floor(Math.random()*sourceData.length)];
                if(!set.some(s=>s.id===c.id)) set.push(c);
                loopCount++;
            }
            gameState.queue = set.sort(() => Math.random() - 0.5);
        }
        
        if(gameState.queue.length === 0) { 
            alert("エラー: 問題データの読み込みに失敗しました。");
            showScreen('screen-stages');
            return;
        }

        document.getElementById('q-category').innerText = `Stage ${id}`;
        showQuestion();

    } catch(e) {
        console.error(e);
        alert("エラーが発生しました: " + e.message);
        showScreen('screen-stages');
    }
}

function startEndless() {
    initGame('endless');
    addEndlessQuestions();
    showQuestion();
}

function addEndlessQuestions() {
    let pool = [];
    for(let i=1; i<=11; i++) { pool = pool.concat(getStageData(i)); }
    pool = shuffleArray(pool);
    gameState.queue = gameState.queue.concat(pool.slice(0, 10));
}

// --- 問題表示 ---
function showQuestion() {
    if (gameState.mode === 'endless' && gameState.qIndex >= gameState.queue.length) {
        showEndlessModal(); return;
    }
    if (gameState.qIndex >= gameState.queue.length) {
        finishGame(true); return;
    }

    const isBoss = (gameState.mode === 'stage' && gameState.qIndex === gameState.queue.length - 1);
    const gameScreen = document.getElementById('screen-game');
    const bossOverlay = document.getElementById('boss-overlay');
    
    if(isBoss) {
        gameScreen.classList.add('boss-mode');
        bossOverlay.classList.remove('hidden');
        setTimeout(() => bossOverlay.classList.add('hidden'), 2000);
    } else {
        gameScreen.classList.remove('boss-mode');
        bossOverlay.classList.add('hidden');
    }

    const q = gameState.queue[gameState.qIndex];
    document.getElementById('q-text').innerText = q.q;
    document.getElementById('q-type-badge').innerText = getTypeLabel(q.type);

    if (gameState.mode === 'endless') {
        document.getElementById('q-category').innerText = `正解数: ${gameState.endlessCorrectCount} (Best: ${saveData.maxEndlessScore})`;
    } else {
        document.getElementById('q-category').innerText = `Stage ${gameState.stageId}`;
    }

    const total = gameState.queue.length;
    const pct = ((gameState.qIndex) / total) * 100;
    document.getElementById('progress-fill').style.width = `${pct}%`;

    ['choices-container', 'sort-container', 'writing-container'].forEach(id => document.getElementById(id).classList.add('hidden'));
    document.getElementById('writing-status').classList.add('hidden');
    document.getElementById('writing-hint').innerText = ""; 
    updateItemButtons();

    if(q.type === 'choice') {
        const c = document.getElementById('choices-container');
        c.classList.remove('hidden'); c.innerHTML = '';
        let opts = shuffleArray([...q.o]);
        opts.forEach(opt => {
            const btn = document.createElement('button'); btn.className = 'choice-btn';
            btn.innerText = opt; btn.onclick = () => checkAnswer(opt === q.a, q); c.appendChild(btn);
        });
    } else if(q.type === 'sort') {
        const c = document.getElementById('sort-container');
        c.classList.remove('hidden');
        gameState.sortAns = [];
        gameState.shuffledSortOptions = shuffleArray([...q.o]);
        renderSortUI(q);
    } else {
        const c = document.getElementById('writing-container');
        c.classList.remove('hidden');
        const ws = document.getElementById('writing-status');
        const wordCount = q.a.trim().split(/\s+/).length;
        ws.innerText = `単語数: ${wordCount}`;
        ws.classList.remove('hidden');
        const inp = document.getElementById('writing-input');
        inp.value = ''; inp.focus();
        inp.onkeydown = (e) => { if(e.key==='Enter') checkWritingAnswer(); };
    }
}

function getTypeLabel(t) { if(t==='choice') return '4択'; if(t==='sort') return '並び替え'; return '記述'; }

function normalizeText(text) {
    let t = text.toLowerCase().trim();
    t = t.replace(/[.?!,]/g, ''); t = t.replace(/\s+/g, ' ');    
    const maps = {
        "don't": "do not", "doesn't": "does not", "didn't": "did not", "can't": "cannot", "won't": "will not",
        "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not",
        "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is", "we're": "we are",
        "they're": "they are", "it's": "it is", "that's": "that is", "let's": "let us"
    };
    for (let key in maps) { const regex = new RegExp(`\\b${key.replace("'", "")}\\b`, 'g'); t = t.replace(key, maps[key]); }
    return t;
}

function checkAnswer(isCorrect, q) {
    const area = document.getElementById('question-area');
    const isBoss = (gameState.mode === 'stage' && gameState.qIndex === gameState.queue.length - 1);

    if(isCorrect) {
        gameState.score += 10 + gameState.combo; gameState.combo++; gameState.expGained += 20;
        if(gameState.mode === 'endless') {
            gameState.endlessCorrectCount++;
            if(gameState.endlessCorrectCount > saveData.maxEndlessScore) { saveData.maxEndlessScore = gameState.endlessCorrectCount; saveGame(); }
        }
        let gold = 20; if(isBoss) { gold += 50; gameState.expGained += 50; unlockAchievement('boss_killer'); }
        gameState.goldGained += gold;
        if(q.type === 'full' || q.type === 'fill') gameState.writeCorrectCount++;
        area.classList.add('anim-correct');
        document.getElementById('score-display').innerText = `Score: ${gameState.score}`;
        checkInGameAchievements();
        setTimeout(() => { area.classList.remove('anim-correct'); gameState.qIndex++; showQuestion(); }, 500);
    } else {
        if(gameState.shieldActive) {
            gameState.shieldActive = false; document.getElementById('shield-overlay').classList.add('hidden');
            alert("🛡️ Shield blocked the damage!"); gameState.combo = 0; area.classList.add('anim-wrong');
            setTimeout(() => { area.classList.remove('anim-wrong'); showExplanation(q); }, 500);
        } else {
            let dmg = isBoss ? 2 : 1; gameState.hp -= dmg; updateHpBar();
            gameState.combo = 0; gameState.mistakes.push(q); area.classList.add('anim-wrong');
            if(gameState.hp <= 0) { setTimeout(() => finishGame(false), 500); }
            else { setTimeout(() => { area.classList.remove('anim-wrong'); showExplanation(q); }, 500); }
        }
    }
}

function renderSortUI(q) {
    const area = document.getElementById('sort-answer-area'); const opts = document.getElementById('sort-options-area');
    area.innerHTML = ''; opts.innerHTML = '';
    gameState.sortAns.forEach(w => { const sp = document.createElement('span'); sp.className = 'sort-word'; sp.innerText = w; area.appendChild(sp); });
    let remaining = [...q.o];
    gameState.sortAns.forEach(w => { const idx = remaining.indexOf(w); if(idx > -1) remaining.splice(idx, 1); });
    gameState.shuffledSortOptions.forEach(w => {
        if(remaining.includes(w)) {
            const btn = document.createElement('button'); btn.className = 'btn-small'; btn.innerText = w;
            btn.onclick = () => {
                gameState.sortAns.push(w); renderSortUI(q);
                if(gameState.sortAns.length === q.o.length) checkAnswer(gameState.sortAns.join(' ') === q.a, q);
            };
            opts.appendChild(btn);
            const idx = remaining.indexOf(w); if(idx > -1) remaining.splice(idx, 1);
        }
    });
}
function resetSort() { gameState.sortAns = []; gameState.shuffledSortOptions = shuffleArray([...gameState.queue[gameState.qIndex].o]); renderSortUI(gameState.queue[gameState.qIndex]); }
function checkWritingAnswer() {
    const val = document.getElementById('writing-input').value.trim();
    const q = gameState.queue[gameState.qIndex];
    checkAnswer(normalizeText(val) === normalizeText(q.a), q);
}
function updateHpBar() {
    const pct = Math.max(0, (gameState.hp / gameState.maxHp) * 100);
    const bar = document.getElementById('hp-bar-fill');
    bar.style.width = `${pct}%`;
    bar.style.backgroundColor = gameState.hp <= 1 ? '#d63031' : '#00b894';
}
function showExplanation(q) {
    const m = document.getElementById('explanation-modal');
    document.getElementById('expl-answer').innerText = q.a;
    document.getElementById('expl-text').innerText = q.expl || "No explanation.";
    m.classList.remove('hidden');
}
function closeExplanation() { document.getElementById('explanation-modal').classList.add('hidden'); gameState.qIndex++; showQuestion(); }
function showEndlessModal() { document.getElementById('endless-modal').classList.remove('hidden'); }
function continueEndless() { document.getElementById('endless-modal').classList.add('hidden'); gameState.hp = gameState.maxHp; updateHpBar(); addEndlessQuestions(); showQuestion(); }

function finishGame(isClear) {
    document.getElementById('endless-modal').classList.add('hidden');
    showScreen('screen-result');
    const title = document.getElementById('result-title'); const badge = document.getElementById('rank-badge'); const msg = document.getElementById('levelup-msg');
    msg.classList.add('hidden');

    if(!isClear) {
        title.innerText = "GAME OVER"; title.style.color = "#d63031"; badge.innerText = "F"; badge.className = "rank-F"; unlockAchievement('rank_f');
    } else {
        title.innerText = "QUEST CLEAR!"; title.style.color = "#2d3436";
        const rate = (gameState.queue.length - gameState.mistakes.length) / gameState.queue.length; 
        let rank = 'C'; if(rate >= 1.0) rank = 'S'; else if(rate >= 0.8) rank = 'A'; else if(rate >= 0.6) rank = 'B';
        badge.innerText = rank; badge.className = `rank-${rank}`;
        saveData.totalSolved += (gameState.qIndex - gameState.mistakes.length); saveData.writeCount += gameState.writeCorrectCount;
        if(gameState.mode === 'stage' && rank !== 'C') {
            if(!saveData.cleared.includes(gameState.stageId)) {
                saveData.cleared.push(gameState.stageId); unlockAchievement(`c${gameState.stageId}`); gameState.goldGained += 500; 
            }
        }
        if(rank === 'S') { unlockAchievement('rank_s'); gameState.goldGained += 300; }
        if(gameState.mistakes.length === 0) unlockAchievement('no_miss');
        if(gameState.hp === gameState.maxHp) unlockAchievement('full_hp');
        if(gameState.hp === 1) unlockAchievement('survivor');
        if(gameState.coinActive) { gameState.goldGained *= 2; }
    }

    saveData.gold += gameState.goldGained;
    document.getElementById('result-gold').innerText = `+${gameState.goldGained} G` + (gameState.coinActive && isClear ? " (x2)" : "");
    if(saveData.gold >= 1000) unlockAchievement('rich');

    processExp(); checkGlobalAchievements(); saveGame(); updateStageList(); updateTitleStats();
}

function checkInGameAchievements() {
    if(gameState.combo >= 10) unlockAchievement('combo_10');
    if(gameState.combo >= 30) unlockAchievement('combo_30');
    if(gameState.combo >= 50) unlockAchievement('combo_50');
    if(gameState.mode === 'endless') {
        const count = gameState.endlessCorrectCount;
        if(count >= 10) unlockAchievement('end_10');
        if(count >= 30) unlockAchievement('end_30');
    }
}
function checkGlobalAchievements() {
    if(saveData.totalSolved >= 50) unlockAchievement('total_50');
    if(saveData.totalSolved >= 100) unlockAchievement('total_100');
    if(saveData.totalSolved >= 300) unlockAchievement('total_300');
    if(saveData.totalSolved >= 500) unlockAchievement('total_500');
    if(saveData.totalSolved >= 1000) unlockAchievement('total_1000');
    if(saveData.level >= 5) unlockAchievement('level_5');
    if(saveData.level >= 10) unlockAchievement('level_10');
    if(saveData.level >= 20) unlockAchievement('level_20');
    if(saveData.writeCount >= 10) unlockAchievement('writer');
    const h = new Date().getHours();
    if(h >= 0 && h <= 4) unlockAchievement('night_owl');
}
function unlockAchievement(id) {
    if(!saveData.achieved.includes(id)) {
        saveData.achieved.push(id);
        const a = ACHIEVEMENTS.find(x => x.id === id);
        if(a) { const name = (a.hidden) ? a.name : a.name; alert(`🏆 称号獲得: ${name}\n${a.desc}`); }
        saveGame();
    }
}
function processExp() {
    const gained = gameState.expGained; saveData.exp += gained;
    document.getElementById('result-exp').innerText = `+${gained} EXP`;
    let leveledUp = false;
    while(true) {
        const need = getNextLevelExp(saveData.level);
        if(saveData.exp >= need) { saveData.exp -= need; saveData.level++; leveledUp = true; } else { break; }
    }
    const nextNeed = getNextLevelExp(saveData.level);
    const pct = (saveData.exp / nextNeed) * 100;
    document.getElementById('result-exp-bar').style.width = `${pct}%`;
    if(leveledUp) document.getElementById('levelup-msg').classList.remove('hidden');
}
function saveGame() { localStorage.setItem(SAVE_KEY, JSON.stringify(saveData)); }
function showAchievements() {
    showScreen('screen-achievements');
    const list = document.getElementById('achievement-list'); list.innerHTML = '';
    const stats = document.getElementById('achievement-stats');
    const unlocked = saveData.achieved.length;
    stats.innerText = `獲得数: ${unlocked} / ${ACHIEVEMENTS.length}`;
    ACHIEVEMENTS.forEach(a => {
        const u = saveData.achieved.includes(a.id);
        const div = document.createElement('div'); div.className = `achievement-card ${u?'unlocked':''}`;
        const name = a.name; const desc = (a.hidden && !u) ? "???" : a.desc;
        div.innerHTML = `<div class="achieve-icon">${u?a.icon:'🔒'}</div><div><div style="font-weight:bold">${name}</div><div style="font-size:0.8rem; color:#636e72">${desc}</div></div>`;
        list.appendChild(div);
    });
}
function confirmQuit() { if(confirm("あきらめますか？")) showScreen('screen-title'); }
function retryGame() { if(gameState.mode==='stage') startStage(gameState.stageId); else startEndless(); }
function nextStage() { startStage(gameState.stageId + 1); }
function toggleDebugMenu() { document.getElementById('debug-menu').classList.toggle('hidden'); }
function debugUnlockAll() { 
    saveData.cleared=[1,2,3,4,5,6,7,8,9,10,11,12]; saveData.level = 20; saveData.gold+=10000;
    saveGame(); updateStageList(); updateTitleStats(); alert("全開放しました！"); 
}
function debugReset() { 
    if(confirm("【重要】全てのデータを消去して初期化しますか？")) { 
        localStorage.clear();
        saveData = { cleared: [], achieved: [], level: 1, exp: 0, gold: 0, items: { potion: 0, bomb: 0, hint: 0, pencil: 0, shield: 0, coin: 0 }, totalSolved: 0, writeCount: 0 };
        saveGame();
        gameState = { mode: '', stageId: 1, queue: [], qIndex: 0, score: 0, combo: 0, mistakes: [], hp: 5, maxHp: 5, expGained: 0, goldGained: 0, endlessWave: 0, writeCorrectCount: 0, shieldActive: false, pencilUsed: false, coinActive: false, debugClicks: 0 };
        showScreen('screen-title'); updateStageList(); updateTitleStats(); alert("データを初期化しました。");
    } 
}
