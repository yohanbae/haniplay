export const questionChristianCommon = [
	{ question: "성별이 어떻게 되요?", answer: [
		{ ans: "남자", type:"common", point:1 },
		{ ans: "여자", type:"common", point:2 }
	] },
	{ question: "당신은 정기적으로 교회에 출석하나요?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:1 },
	] },
	{ question: "현재의 삶에 만족하나요?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:1 },
	] },
	{ question: "매일 성경책 읽어요?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:1 },		
	] },
	{ question: "남친/여친이 있나요?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:2 }
	] },
	{ question: "곤경에 처한 친구를 잘 도와주는 편인가요?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:1 },
	] },
	{ question: "자선을 자주 베푸나요?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:1 },
	] },
	{ question: "십일조 헌금해봤어요?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:1 },		
	] },	
]

export const questionChristianPoint = [
	{ question: "예수가 죽음을 통해 당신의 죄값을 모두 치루신 당신의 유일한 구원자라는 사실을 믿나요?", answer: [
		{ ans: "네", type:"main", point:1 },
        { ans: "아니오", type:"main", point:0 },        
	] },
	// { question: "Do you accept Jesus Christ as the only savior that give you to salvation?", answer: [
	// 	{ ans: "YES", type:"main", point:10 },
	// 	{ ans: "NO", type:"main", point:0 },		
	// ] },	
]


export const questionIslamCommon = [
	{ question: "당신은 선인입니까, 악인입니까?", answer: [
		{ ans: "선인이다", type:"common", point:1 },
		{ ans: "악인이다", type:"common", point:0 },
	] },
	{ question: "여러 신을 섬기는 다른 종교에 대해 어떻게 생각하나요?", answer: [
		{ ans: "그럴 수 있다고 본다", type:"main", point:0 },
		{ ans: "납득할 수 없다", type:"main", point:1 },
	] },	
	{ question: "야동보는걸 좋아하나요?", answer: [
		{ ans: "네", type:"common", point:0 },
		{ ans: "아니오", type:"common", point:1 },
	] },
	{ question: "도둑질 해본 경험이 있나요?", answer: [
		{ ans: "네", type:"common", point:0 },
		{ ans: "아니오", type:"common", point:1 },		
	] },
	{ question: "남친/여친이 있나요?", answer: [
		{ ans: "네", type:"common", point:0 },
		{ ans: "아니오", type:"common", point:0 }
	] },
	{ question: "곤경에 빠진 친구를 잘 도와주는 편인가요?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:0 },
	] },
	{ question: "5명 이상의 아내/남편이 있습니까?", answer: [
		{ ans: "네", type:"common", point:0 },
		{ ans: "아니오", type:"common", point:1 },		
	] },	
]


export const questionIslamPoint = [
	{ question: "당신은 남성입니까 여성입니까?", answer: [
		{ ans: "남성", type:"gender", point:1 },
		{ ans: "여성", type:"gender", point:2 }
	] },
	{ question: "메카에 성지순례를 해봤습니까", answer: [
		{ ans: "네", type:"main", point:1 },
		{ ans: "아니오", type:"main", point:0 },
	] },	
	{ question: "라마단 금식을 매년 지키나요?", answer: [
		{ ans: "네", type:"main", point:1 },
		{ ans: "아니오", type:"main", point:0 },
	] },		
	{ question: "당신은 부자입니까?", answer: [
		{ ans: "네", type:"rich", point:1 },
		{ ans: "아니오", type:"rich", point:0 }
	] },	
	{ question: "하루 다섯번 이상 알라신에게 기도드리나요?", answer: [
		{ ans: "네", type:"main", point:1 },
		{ ans: "아니오", type:"main", point:0 },
	] },
	{ question: "자선을 자주 베풉니까?", answer: [
		{ ans: "네", type:"main", point:1 },
		{ ans: "아니오", type:"main", point:0 },
	] },
	{ question: "당신은 알라신만이 유일한 신이며 무함마드가 그의 사도라는 사실을 고백합니까", answer: [
		{ ans: "네", type:"main", point:1 },
		{ ans: "아니오", type:"main", point:0 },		
	] },	
	{ question: "당신은 지하드를 행할 것입니까. 지하드는 욕망을 끊기위한 사투이며, 전쟁에서 목숨걸고 적에게 대항하는 것입니다", answer: [
		{ ans: "네", type:"jihad", point:1 },
		{ ans: "아니오", type:"jihad", point:0 },
	] },
]

export const questionHindiCommon = [
	{ question: "나이가 어떻게 되요? 20살 이상인가요?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:1 },
	] },
	{ question: "현재의 삶이 만족스럽나요?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:1 },
	] },
	{ question: "거룩하고 경건한 삶을 살고 있나요?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "NO", type:"common", point:1 },		
	] },
	{ question: "인도사람이세요?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:2 }
	] },
	{ question: "학교에서 성적은 어땠습니까?", answer: [
		{ ans: "좋은 편", type:"common", point: 1 },
		{ ans: "나쁜 편", type:"common", point: 0 },
	] },
	{ question: "성적 욕망을 잘 절제하는 편인가요?", answer: [
		{ ans: "네", type:"common", point: 1 },
		{ ans: "아니오", type:"common", point: 0 },
	] },
	{ question: "당신은 좋은 사람입니까?", answer: [
		{ ans: "네", type:"common", point: 1 },
		{ ans: "아니오", type:"common", point: 0 },		
	] },	
	{ question: "개인의 권리와 사회적 의무. 어떤것이 더 중요한가요?", answer: [
		{ ans: "개인의 권리", type:"common", point:0 },
		{ ans: "사회적 의무", type:"common", point:1 },
	] },
	{ question: "부지런한 편인가요?", answer: [
		{ ans: "네", type:"common", point: 1 },
		{ ans: "아니오", type:"common", point: 0 },		
	] },		
]

export const questionHindiPoint = [
	{ question: "공부하는 걸 좋아하나요?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:1 },
	] },
	{ question: "환생을 믿습니까?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:1 },		
	] },	
	{ question: "남자세요 여자세요?", answer: [
		{ ans: "Man", type:"gender", point:1 },
		{ ans: "Woman", type:"gender", point:2 },
	] },
	{ question: "지난 생의 업보를 갚기위해 노력합니까?", answer: [
		{ ans: "네", type:"main", point:1 },
		{ ans: "아니오", type:"main", point:0 },		
	] },		
	{ question: "당신이 섬기는 신들을 진심으로 사랑합니까?", answer: [
		{ ans: "네", type:"main", point:1 },
		{ ans: "아니오", type:"main", point:0 },
	] },
	{ question: "부자인가요?", answer: [
		{ ans: "네", type:"main", point:1 },
		{ ans: "아니오", type:"main", point:0 },		
	] },	
	{ question: "당신은 브라만(인도 최상위 계급) 계급입니까?", answer: [
		{ ans: "네", type:"main", point:1 },
		{ ans: "아니오", type:"main", point:0 },
	] },
	{ question: "소고기를 좋아하나요?", answer: [
		{ ans: "네", type:"main", point:0 },
		{ ans: "아니오", type:"main", point:1 },		
	] },			
]



export const questionBudahCommon = [
	{ question: "당신은 스무살 이상인가요?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:1 },
	] },
	{ question: "현재의 삶에 만족하나요?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:1 },
	] },
	{ question: "거룩한 삶을 살고 있습니까?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:1 },		
	] },
	{ question: "당신은 인도사람인가요?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:2 }
	] },
	{ question: "학교 성적은 어떤 편인가요?", answer: [
		{ ans: "높은 편", type:"common", point: 1 },
		{ ans: "낮은 편", type:"common", point: 0 },
	] },
	{ question: "성적 욕망을 잘 절제하는 편인가요?", answer: [
		{ ans: "네", type:"common", point: 1 },
		{ ans: "아니오", type:"common", point: 0 },
	] },
	{ question: "당신은 좋은 사람입니까?", answer: [
		{ ans: "네", type:"common", point: 1 },
		{ ans: "아니오", type:"common", point: 0 },		
	] },	
	{ question: "당신은 부지런한 편인가요?", answer: [
		{ ans: "네", type:"common", point: 1 },
		{ ans: "아니오", type:"common", point: 0 },		
	] },		
]

export const questionBudahPoint = [
	{ question: "불경을 자주 외웁니까?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:1 },
	] },
	{ question: "윤회를 믿습니까?", answer: [
		{ ans: "네", type:"common", point:1 },
		{ ans: "아니오", type:"common", point:1 },		
	] },	
	{ question: "지난 생의 업보를 갚기위해 노력하나요?", answer: [
		{ ans: "네", type:"main", point:1 },
		{ ans: "아니오", type:"main", point:0 },		
	] },		
	{ question: "당신은 소고기를 좋아합니까?", answer: [
		{ ans: "네", type:"main", point:0 },
		{ ans: "아니오", type:"main", point:1 },		
	] },			
]
