window.addEventListener('DOMContentLoaded', () => {

	const goalsParent = document.querySelector('.list'),
				goalsInput = document.querySelector('#user-text'),
				goalsButton = document.querySelector('#add-btn'),
				goalsArray = [];

	// Creating goal
		
	function createGoal(value, checked = '') {
		let goal = document.createElement('li');
		goal.classList.add('list__item');

		goal.innerHTML = `<label class="list__label">
		<input class="list__checkbox" type="checkbox" ${checked}>
		<span class="list__text">${value}</span>
		</label>
		<button class="list__set-btn" type="button"></button>
		<button class="list__delete-btn"></button>`;

		goalsParent.append(goal);

		goalsArray.push({text: value, checked: checked});

		setLocalStrg();
	};

	goalsButton.addEventListener('click', () => {
		createGoal(goalsInput.value);
	});

	// Deleting goal

	goalsParent.addEventListener('click', (e) => {

		const target = e.target;

		if (target.classList.contains('list__delete-btn')) {
			goalsArray.forEach((item, i) => {
				if (item.text == target.parentElement.innerText) {
					goalsArray.splice(i, 1);
				};
			});

			target.parentElement.remove();
		};

		if (target.classList.contains('list__checkbox')) {
			goalsArray.forEach((item, i) => {
				if (item.text == target.nextElementSibling.innerText && target.checked === true) {
					goalsArray[i].checked = 'checked';
				} else if (item.text == target.nextElementSibling.innerText && target.checked === false) {
					goalsArray[i].checked = '';
				}
			});
		};

		setLocalStrg();
	});

	// Setting in LocalStorage

	function setLocalStrg() {
		window.localStorage.setItem('goals', JSON.stringify(goalsArray));
	};
	
	// Get goals from LS
	
	function getGoals() {
	goals = JSON.parse(window.localStorage.getItem('goals'));
	goals.forEach(el => {
		createGoal(el.text, el.checked);
	});
	};

	getGoals();

});