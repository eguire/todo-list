window.addEventListener('DOMContentLoaded', () => {

	const goalsParent = document.querySelector('.list'),
				goalsInput = document.querySelector('#user-text'),
				goalsButton = document.querySelector('#add-btn'),
				goalsArray = [];

	// Creating goal

	function createGoal(value, checked = '') {
		const goal = document.createElement('li');
		goal.classList.add('list__item');

		goal.innerHTML = `<label class="list__label">
		<input class="list__checkbox" type="checkbox" ${checked}>
		<span class="list__text">${value}</span>
		</label>
		<button class="list__set-btn" type="button"></button>
		<button class="list__delete-btn"></button>`;

		goalsParent.append(goal);

		goalsArray.push({ text: value, checked: checked });

		setLocalStrg();
	};

	goalsButton.addEventListener('click', () => {
		createGoal(goalsInput.value);
		goalsInput.value = '';
	});

	// Deleting and editing goals

	goalsParent.addEventListener('click', (e) => {

		const target = e.target,
					userText = document.querySelector('.list__textarea'),
					spans = document.querySelectorAll('.list__text');

		// Check and edit checkboxes
		if (target.classList.contains('list__checkbox')) {
			goalsArray.forEach((item, i) => {
				if (item.text == target.nextElementSibling.innerText && target.checked === true) {
					goalsArray[i].checked = 'checked';
				} else if (item.text == target.nextElementSibling.innerText && target.checked === false) {
					goalsArray[i].checked = '';
				}
			});
		};

		// Cancel editing on click out of target
		if (userText && !target.classList.contains('list__textarea') && !target.classList.contains('list__apply-btn') && !target.classList.contains('list__cancel-btn')) {
			userText.remove();

			spans.forEach(span => {
				span.style.display = 'block';
			});

			document.querySelector('.list__apply-btn').classList.remove('list__apply-btn');
			document.querySelector('.list__cancel-btn').classList.remove('list__cancel-btn');
		};

		// Editing
		if (target.classList.contains('list__apply-btn')) { // Apply changes
			goalsArray.forEach((item, i) => {
				if (item.text == target.previousElementSibling.children[1].innerText) {
					goalsArray[i].text = userText.value;
				}
			});

			userText.remove();
			target.previousElementSibling.children[1].innerText = userText.value;
			target.previousElementSibling.children[1].style.display = 'block';

			target.classList.remove('list__apply-btn');
			target.nextElementSibling.classList.remove('list__cancel-btn');
		} else if (target.classList.contains('list__set-btn')) { // Edit goal
			goalsArray.forEach(item => {
				if (item.text == target.parentElement.innerText) {
					const textarea = document.createElement('textarea');

					textarea.classList.add('list__textarea');
					textarea.innerText = item.text;

					target.previousElementSibling.append(textarea);
					target.previousElementSibling.children[1].style.display = 'none';

					target.classList.add('list__apply-btn');
					target.nextElementSibling.classList.add('list__cancel-btn');
				}
			});
		} else if (target.classList.contains('list__cancel-btn')) { // Cancel changes

			userText.remove();

			target.classList.remove('list__cancel-btn');
			target.previousElementSibling.classList.remove('list__apply-btn');
			target.parentElement.firstChild.children[1].style.display = 'block';
		} else if (target.classList.contains('list__delete-btn')) { // Delete goal
			goalsArray.forEach((item, i) => {
				if (item.text == target.parentElement.innerText) {
					goalsArray.splice(i, 1);
				};
			});

			target.parentElement.remove();
		};

		setLocalStrg(); // Save all changes in local storage
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