export const questionChristianCommon = [
	{ question: "Are you a man or woman", answer: [
		{ ans: "man", type:"common", point:1 },
		{ ans: "woman", type:"common", point:2 }
	] },
	{ question: "Do you attend church regularly?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:1 },
	] },
	{ question: "Are you satisfied with your life?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:1 },
	] },
	{ question: "Do you read bible every day?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:1 },		
	] },
	{ question: "Do you have a girlfriend or boyfriend?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:2 }
	] },
	{ question: "Will you help your friend in trouble?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:1 },
	] },
	{ question: "Do you donate often?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:1 },
	] },
	{ question: "Do you offer tithe the ten percent of your income?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:1 },		
	] },	
]

export const questionChristianPoint = [
	{ question: "Do you believe that Jesus paid for all your sin through his death? and accept Jesus as your only savior?", answer: [
		{ ans: "YES", type:"main", point:1 },
		{ ans: "NO", type:"main", point:0 },
	] },
	// { question: "Do you accept Jesus Christ as the only savior that give you to salvation?", answer: [
	// 	{ ans: "YES", type:"main", point:10 },
	// 	{ ans: "NO", type:"main", point:0 },		
	// ] },	
]


export const questionIslamCommon = [
	{ question: "Are you a good person or bad?", answer: [
		{ ans: "Good", type:"common", point:1 },
		{ ans: "Bad", type:"common", point:0 },
	] },
	{ question: "what do you think of other religions serve numerous gods", answer: [
		{ ans: "Acceptable", type:"main", point:0 },
		{ ans: "Not acceptable", type:"main", point:1 },
	] },	
	{ question: "Do you love to watch porn?", answer: [
		{ ans: "YES", type:"common", point:0 },
		{ ans: "NO", type:"common", point:1 },
	] },
	{ question: "Have you ever steal?", answer: [
		{ ans: "YES", type:"common", point:0 },
		{ ans: "NO", type:"common", point:1 },		
	] },
	{ question: "Do you have a girlfriend or boyfriend?", answer: [
		{ ans: "YES", type:"common", point:0 },
		{ ans: "NO", type:"common", point:0 }
	] },
	{ question: "Will you help your friend in trouble?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:0 },
	] },
	{ question: "Do you have more than five wives?", answer: [
		{ ans: "YES", type:"common", point:0 },
		{ ans: "NO", type:"common", point:1 },		
	] },	
]


export const questionIslamPoint = [
	{ question: "Are you a man or woman", answer: [
		{ ans: "man", type:"gender", point:1 },
		{ ans: "woman", type:"gender", point:2 }
	] },
	{ question: "!Have you been to Meccah?", answer: [
		{ ans: "Good", type:"main", point:1 },
		{ ans: "Bad", type:"main", point:0 },
	] },	
	{ question: "!Do you fasting during Ramadan?", answer: [
		{ ans: "Yes", type:"main", point:1 },
		{ ans: "No", type:"main", point:0 },
	] },		
	{ question: "!Are you RICH?", answer: [
		{ ans: "man", type:"rich", point:1 },
		{ ans: "woman", type:"rich", point:0 }
	] },	
	{ question: "!Do you pray five times a day?", answer: [
		{ ans: "YES", type:"main", point:1 },
		{ ans: "NO", type:"main", point:0 },
	] },
	{ question: "!Do you donate often?", answer: [
		{ ans: "YES", type:"main", point:1 },
		{ ans: "NO", type:"main", point:0 },
	] },
	{ question: "!Do you faithfully accept that 'There is no God but Allah, and Muhammad is his messenger'", answer: [
		{ ans: "YES", type:"main", point:1 },
		{ ans: "NO", type:"main", point:0 },		
	] },	
	{ question: "!Are you willing to give up your life to kill your religious enemy?", answer: [
		{ ans: "YES", type:"jihad", point:1 },
		{ ans: "NO", type:"jihad", point:0 },
	] },
]

export const questionHindiCommon = [
	{ question: "Are you over 20 years old?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:1 },
	] },
	{ question: "Are you satisfied with your life?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:1 },
	] },
	{ question: "Are you living a holy life?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:1 },		
	] },
	{ question: "Are you Indian?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:2 }
	] },
	{ question: "How is your grades in school? High or low?", answer: [
		{ ans: "High", type:"common", point: 1 },
		{ ans: "Low", type:"common", point: 0 },
	] },
	{ question: "Are you able to control your sexual desire?", answer: [
		{ ans: "YES", type:"common", point: 1 },
		{ ans: "NO", type:"common", point: 0 },
	] },
	{ question: "Are you a good person?", answer: [
		{ ans: "YES", type:"common", point: 1 },
		{ ans: "NO", type:"common", point: 0 },		
	] },	
	{ question: "What do you put first? Personal rights vs. Social duties", answer: [
		{ ans: "Personal Rights", type:"common", point:0 },
		{ ans: "Social Duties", type:"common", point:1 },
	] },
	{ question: "Are you diligent?", answer: [
		{ ans: "YES", type:"common", point: 1 },
		{ ans: "NO", type:"common", point: 0 },		
	] },		
]

export const questionHindiPoint = [
	{ question: "Do you like to study", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:1 },
	] },
	{ question: "Do you believe in Reincarnation?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:1 },		
	] },	
	{ question: "Are you a man or woman?", answer: [
		{ ans: "Man", type:"gender", point:1 },
		{ ans: "Woman", type:"gender", point:2 },
	] },
	{ question: "Do you work hard to bring a good karma?", answer: [
		{ ans: "YES", type:"main", point:1 },
		{ ans: "NO", type:"main", point:0 },		
	] },		
	{ question: "Do you love your gods?", answer: [
		{ ans: "YES", type:"main", point:1 },
		{ ans: "NO", type:"main", point:0 },
	] },
	{ question: "Are you rich?", answer: [
		{ ans: "YES", type:"main", point:1 },
		{ ans: "NO", type:"main", point:0 },		
	] },	
	{ question: "Are you a Brahmin?", answer: [
		{ ans: "YES", type:"main", point:1 },
		{ ans: "NO", type:"main", point:0 },
	] },
	{ question: "Do you love Beef?", answer: [
		{ ans: "YES", type:"main", point:0 },
		{ ans: "NO", type:"main", point:1 },		
	] },			
]



export const questionBudahCommon = [
	{ question: "Are you over 20 years old?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:1 },
	] },
	{ question: "Are you satisfied with your life?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:1 },
	] },
	{ question: "Are you living a holy life?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:1 },		
	] },
	{ question: "Are you Indian?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:2 }
	] },
	{ question: "How is your grades in school? High or low?", answer: [
		{ ans: "High", type:"common", point: 1 },
		{ ans: "Low", type:"common", point: 0 },
	] },
	{ question: "Are you able to control your sexual desire?", answer: [
		{ ans: "YES", type:"common", point: 1 },
		{ ans: "NO", type:"common", point: 0 },
	] },
	{ question: "Are you a good person?", answer: [
		{ ans: "YES", type:"common", point: 1 },
		{ ans: "NO", type:"common", point: 0 },		
	] },	
	{ question: "What do you put first? Personal rights vs. Social duties", answer: [
		{ ans: "Personal Rights", type:"common", point:0 },
		{ ans: "Social Duties", type:"common", point:1 },
	] },
	{ question: "Are you diligent?", answer: [
		{ ans: "YES", type:"common", point: 1 },
		{ ans: "NO", type:"common", point: 0 },		
	] },		
]

export const questionBudahPoint = [
	{ question: "Do you like to study", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:1 },
	] },
	{ question: "Do you believe in Reincarnation?", answer: [
		{ ans: "YES", type:"common", point:1 },
		{ ans: "NO", type:"common", point:1 },		
	] },	
	{ question: "Are you a man or woman?", answer: [
		{ ans: "Man", type:"gender", point:1 },
		{ ans: "Woman", type:"gender", point:2 },
	] },
	{ question: "Do you work hard to bring a good karma?", answer: [
		{ ans: "YES", type:"main", point:1 },
		{ ans: "NO", type:"main", point:0 },		
	] },		
	{ question: "Do you love Beef?", answer: [
		{ ans: "YES", type:"main", point:0 },
		{ ans: "NO", type:"main", point:1 },		
	] },			
]
