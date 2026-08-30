// Change these values to your own username, password, question, and answer.
const LOGIN_CREDENTIALS = {
	username: 'Magenta Trulli Maharisaputri',
	password: '05072006'
};
const QUESTION = {
	prompt: 'What is one tiny thing that made you smile today?',
	answer: 'sunshine'
};
// Replace YOUR_FORM_ID with the ID from your Formspree form.
const FORM_ENDPOINT = 'https://formspree.io/f/mqpkzlyz';
const message = document.querySelector('#message');
const surprise = document.querySelector('#surprise');
const counter = document.querySelector('#counter');
let heartsSent = 0;
document.querySelector('#question').textContent = QUESTION.prompt;
document.querySelector('#open').addEventListener('click', (event) => {
	surprise.classList.remove('hidden');
	event.currentTarget.classList.add('hidden');
	message.textContent = 'You are loved more than words can fit on this page.';
	celebrate();
});
document.querySelector('#more').addEventListener('click', () => {
	message.textContent = 'I choose you—today, tomorrow, and all the ordinary little moments in between. ❤️';
	celebrate();
});
document.querySelectorAll('.mood').forEach((mood) => mood.addEventListener('click', () => {
	document.querySelectorAll('.mood').forEach((item) => item.classList.remove('active'));
	mood.classList.add('active');
	message.textContent = mood.dataset.message;
}));
const heart = document.querySelector('.heart');
function sendHeart() {
	heartsSent++;
	counter.textContent = `Hearts sent: ${heartsSent}`;
	const heartPop = document.createElement('span');
	heartPop.className = 'heart-pop'; heartPop.textContent = '💗';
	heartPop.style.left = `${35 + randomValue() * 30}vw`;
	document.body.appendChild(heartPop);
	setTimeout(() => heartPop.remove(), 1200);
}
heart.addEventListener('click', sendHeart);
document.querySelector('#answer-form').addEventListener('submit', async (event) => {
	event.preventDefault();
	const answer = document.querySelector('#answer').value.trim();
	const answerStatus = document.querySelector('#answer-status');
	const submitButton = event.currentTarget.querySelector('button[type="submit"]');

	if (FORM_ENDPOINT.includes('YOUR_FORM_ID')) {
		answerStatus.textContent = 'Add your Formspree form ID in script.js first.';
		return;
	}

	submitButton.disabled = true;
	answerStatus.textContent = 'Sending your answer... 💌';
	try {
		const response = await fetch(FORM_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ question: QUESTION.prompt, answer })
		});
		if (!response.ok) throw new Error('Form submission failed');
		answerStatus.textContent = answer.toLowerCase() === QUESTION.answer.toLowerCase()
			? 'That is exactly right. You know the secret word! 💖'
			: 'Your answer was sent successfully. 💕';
		answerStatus.classList.add('success');
		document.querySelector('#answer').value = '';
	} catch (error) {
		answerStatus.textContent = 'Could not send the answer. Please try again.';
	} finally {
		submitButton.disabled = false;
	}
});
document.querySelector('#login-form').addEventListener('submit', (event) => {
	event.preventDefault();
	const username = document.querySelector('#username').value;
	const password = document.querySelector('#password').value;
	const loginStatus = document.querySelector('#login-status');
	const isValid = username === LOGIN_CREDENTIALS.username && password === LOGIN_CREDENTIALS.password;
	loginStatus.textContent = isValid ? '' : 'That login does not match yet. Try again 💗';
	if (isValid) {
		document.querySelector('#login-screen').classList.add('hidden');
		document.querySelector('#welcome-content').classList.remove('hidden');
	}
});
function randomValue() {
	return crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
}
function celebrate() {
	for (let i = 0; i < 24; i++) {
		const spark = document.createElement('span');
		spark.className = 'spark'; spark.textContent = ['♥', '✨', '💗'][i % 3];
		spark.style.left = randomValue() * 100 + 'vw';
		spark.style.fontSize = 14 + randomValue() * 20 + 'px';
		spark.style.animationDelay = randomValue() * .8 + 's';
		document.body.appendChild(spark);
		setTimeout(() => spark.remove(), 3800);
	}
}
