function range(start, stop, step) {
    if (typeof stop == 'undefined') {

        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};

var TESTS = [
    // daengdaeng
    {
        info : {
            mainTitle:"베르나르다 알바 캐릭터 성격 분석",
            subTitle:"내가 베르나르다 알바 속 캐릭터라면?",
            mainUrl:"alba",
            scoreType:"typeCounting",
            mainImage:"https://user-images.githubusercontent.com/35620531/109659976-a56de980-7bab-11eb-80e0-bf6de62f58a7.png",
            thumbImage:"https://user-images.githubusercontent.com/35620531/109660083-cb938980-7bab-11eb-8a64-0acadaad8233.png"
        },
        questions:[
            {
                question: '기분이 별로일 때 나는 주로',
                answers:[
                    {
                        type: "아델라",
                        score: 2,
                        content: '기분이 풀릴때까지 혼자 있다가 기분이 나아 질 때 힘차게 돌아온다.'
                    },
                    {
                        type: "마르띠리오",
                        score: 5,
                        content: '누가 건드리만 하면 그 사람에 대해 참고 있던 게 폭발한다. '
                    },
                    {
                        type: "막달레나",
                        score: 10,
                        content: '“생각할수록 기분이 나빠지니 생각하지 않으려 노력한다.'
                    },
                    {
                        type: "앙구스티아스",
                        score: 10,
                        content: '혼자 왜 기분이 좋지 않을까 곱씹는다.'
                    },
                ],
            },
            {
                question: "모르는 사람과 함께 있을 때 나는 주로 ",
                answers:[
                    {
                        type: "아델라",
                        score: 2,
                        content: "가만히 있으면 심심하니 말을 걸어본다. "
                    },
                    {
                        type: "아멜리아",
                        score: 5,
                        content: "눈치를 보다가 친절한 사람 같으면 말을 걸어본다."
                    },
                    {
                        type: "앙구스티아스",
                        score: 10,
                        content: "모르는 사람에게 말을 걸 필요가 있나?"
                    },
                    {
                        type: "마르띠리오",
                        score: 10,
                        content: "얕보이지 않게 눈에 힘을 준다."
                    },
                ]
            },
            {
                question: "가족들 사이에서 나의 역할은",
                answers:[
                    {
                        type: "마르띠리오",
                        score: 2,
                        content: "모두가 어려워 하는 아픈 손가락"
                    },
                    {
                        type: "아멜리아",
                        score: 5,
                        content: "톡톡 튀는 분위기 메이커"
                    },
                    {
                        type: "앙구스티아스",
                        score: 10,
                        content: "가족들이랑 별로 친하지 않아서 역할이 따로 없다."
                    },
                    {
                        type: "아델라",
                        score: 10,
                        content: "가족들 모두가 날 사랑해! 귀여운 막내"
                    },
                ]
            },
            {
                question: "오랜만에 친구들을 만날 때 나는",
                answers:[
                    {
                        type: "막달레나",
                        score: 2,
                        content: "반갑게 인사하며 이친구 저친구의 안부를 물어본다."
                    },
                    {
                        type: "앙구스티아스",
                        score: 5,
                        content: "가만히 누가 말을 걸 때 까지 기다린다."
                    },
                    {
                        type: "아델라",
                        score: 10,
                        content: "처음에는 조용하다가 금방 적응해 분위기를 주도한다."
                    },
                    {
                        type: "마르띠리오",
                        score: 10,
                        content: "친구들을 만나는 걸 별로 좋아하지 않아 친구들을 만나지 않는다."
                    },
                ]
            },
            {
                question: "오랜만에 찾아온 휴일에 나는",
                answers:[
                    {
                        type: "앙구스티아스",
                        score: 2,
                        content: "밀어둔 집안일을 하며 혼자 산책을 나가기도 한다."
                    },
                    {
                        type: "아멜리아",
                        score: 5,
                        content: "미리 약속을 잡아둔 친구들과 만나 밖에서 신나게 논다."
                    },
                    {
                        type: "막달레나",
                        score: 10,
                        content: "침대 밖을 나가지 않고 하루종일 빈둥거리며 낮잠을 잔다."
                    },
                    {
                        type: "마르띠리오",
                        score: 10,
                        content: "집 안에서 혼자 영화를 보거나 책을 읽으며 시간을 보낸다."
                    },
                ]
            },
            {
                question: "계획을 세워야 할 때 나는",
                answers:[
                    {
                        type: "아델라",
                        score: 2,
                        content: "절대 먼저 계획을 세우는 편이 아니다."
                    },
                    {
                        type: "막달레나",
                        score: 5,
                        content: "대충대충 계획을 세워본다."
                    },
                    {
                        type: "앙구스티아스",
                        score: 10,
                        content: "마지막의 마지막까지 계획을 세우는 걸 미룬다."
                    },
                    {
                        type: "아멜리아",
                        score: 10,
                        content: "최대한 꼼꼼하게 계획을 세우고 검토한다."
                    },
                ]
            },
            {
                question: "가족들과의 외식에서 음식점을 내가 골라야 한다면",
                answers:[
                    {
                        type: "막달레나",
                        score: 2,
                        content: "이미 준비한 180902가지의 맛집 리스트가 있다."
                    },
                    {
                        type: "마르띠리오",
                        score: 5,
                        content: "가족들과 별로 밥을 먹고 싶지 않다."
                    },
                    {
                        type: "앙구스티아스",
                        score: 10,
                        content: "아무 곳이나 상관없다며 다른 사람에게 고르라고 부탁한다."
                    },
                    {
                        type: "아멜리아",
                        score: 10,
                        content: "일단 나가서 마음에 드는 식당이 보이면 들어간다."
                    },
                ]
            },
            {
                question: "화가 나서 화를 내려고 할 때",
                answers:[
                    {
                        type: "막달레나",
                        score: 2,
                        content: "내도 소용이 없다 생각하고 화를 내지 않는다."
                    },
                    {
                        type: "아델라",
                        score: 5,
                        content: "불같이 화를 내며 하고 싶던 말을 다 한다."
                    },
                    {
                        type: "아멜리아",
                        score: 10,
                        content: "여기서 화를 내면 안된다고 스스로를 진정시킨다."
                    },
                    {
                        type: "앙구스티아스",
                        score: 10,
                        content: "사람들이 이미 나에게 화를 내고 있어 화를 낼 수 없다."
                    },
                ]
            },
            {
                question: "나중에 어디론가 갈 수 있다면 나는",
                answers:[
                    {
                        type: "막달레나",
                        score: 2,
                        content: "초원에 가 말을 타고 싶다."
                    },
                    {
                        type: "마르띠리오",
                        score: 5,
                        content: "첫사랑과 함께 한 장소를 찾아간다."
                    },
                    {
                        type: "아멜리아",
                        score: 10,
                        content: "푸르른 나무가 무성한 강가를 간다."
                    },
                    {
                        type: "아델라",
                        score: 10,
                        content: "시원한 파도가 치는 바다로 갈 거야!"
                    },
                ]
            },
        ],
        results:[
            {
                type: "아델라",
                desc: `어리고 제일 예뻤어~ 아델라!`,
                query: "fifth",
                score_range:range(26),
                img_src:'https://user-images.githubusercontent.com/35620531/109660294-05fd2680-7bac-11eb-9c8a-98faa4ba7f19.png',
                real_meta: 'https://user-images.githubusercontent.com/35620531/109660294-05fd2680-7bac-11eb-9c8a-98faa4ba7f19.png'
            },
            {
                type: "마르띠리오",
                desc: `남자들이 다 싫어해~ 마르띠리오!`,
                query: "fourth",
                score_range:range(26, 51),
                img_src:'https://user-images.githubusercontent.com/35620531/109660461-3d6bd300-7bac-11eb-8377-d56d2ed46070.png',
                real_meta: 'https://user-images.githubusercontent.com/35620531/109660461-3d6bd300-7bac-11eb-8377-d56d2ed46070.png'
            },
            {
                type: "아멜리아",
                desc: `부끄럼만 많아~ 아멜리아!`,
                query: "third",
                score_range:range(51, 75),
                img_src:'https://user-images.githubusercontent.com/35620531/109660136-db12d280-7bab-11eb-9a59-4fa6ec046758.png',
                real_meta: 'https://user-images.githubusercontent.com/35620531/109660136-db12d280-7bab-11eb-9a59-4fa6ec046758.png'

            },
            {
                type: "앙구스티아스",
                desc: `첫째딸 이름은~ 앙구스티아스!`,
                query: "first",
                score_range:range(76, 101),
                img_src:'https://user-images.githubusercontent.com/35620531/109660521-4fe60c80-7bac-11eb-89c2-90d9cafcc083.png',
                real_meta: 'https://user-images.githubusercontent.com/35620531/109660521-4fe60c80-7bac-11eb-89c2-90d9cafcc083.png'

            },
            {
                type: "막달레나",
                desc: `온종일 낮잠만 자~ 막달레나!`,
                query: "second",
                score_range:range(76, 101),
                img_src:'https://user-images.githubusercontent.com/35620531/109660599-655b3680-7bac-11eb-87be-6c88d002de9f.png',
                real_meta: 'https://user-images.githubusercontent.com/35620531/109660599-655b3680-7bac-11eb-87be-6c88d002de9f.png'

            },
        ]
    },
]

export default TESTS;
