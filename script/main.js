console.log('running');

const objDOMs = {
	input: document.getElementById('input'),
	addBtn: document.getElementById('add-btn'),
	listContainer: document.getElementById('list-container'),
	dataInCircle: document.getElementById('data-in-circle'),
	TimeInCircle: document.querySelector('.time-in-circle'),
};

const status = {
	state: false,
	id: 0,
};

console.log(objDOMs.TimeInCircle);
// console.log(localStorage.setItem('time', objDOMs.TimeInCircle.innerHTML));

function createTasks(e) {
	// // console.log(e.keyCode);
	// console.log(e.type);
	if (e.keyCode === 13 || e.type === 'click') {
		let html = `<div class="list-${status.id}">
		<div class="info" status="${status.state}">
			<div class="info-input">
				<input class="checkbox"  type="checkbox" />
				<h3 class="incomingValue">${objDOMs.input.value}</h3>
				<div class="time">
					<i class="fas fa-clock"> ${date('list')}</i>
				</div>
			</div>
			<button class="delBtn"><i class="fas fa-trash del"></i></button>
		</div>  
	</div>`;
		objDOMs.listContainer.insertAdjacentHTML('afterbegin', html);
		status.id += 1;
		objDOMs.input.value = ' ';
		objDOMs.input.focus();
	}
}

function checkedTasked(event) {
	if (event.target.className === 'checkbox') {
		//access the second parent and change the  checked status of it
		if (event.target.parentNode.parentNode.getAttribute('status') === 'false') {
			event.target.parentNode.parentNode.setAttribute('status', 'true');
		} else {
			event.target.parentNode.parentNode.setAttribute('status', 'false');
		}
		let u = event.target.nextElementSibling;
		let parent = u.parentNode.parentNode;
		u.classList.toggle('checked');
		parent.classList.toggle('checked-list');
		// console.log(event.target.parentNode.parentNode);

		//here access the next sibling which is the input and toggle a class to it
	}
}

function deleteTasks(event) {
	if (event.target.className === 'delBtn') {
		//check if the status of checkedbox is true
		if (event.target.parentNode.getAttribute('status') === 'true') {
			objDOMs.listContainer.removeChild(event.target.parentNode.parentNode);
		} else {
			// need improvment

			event.target.parentNode.classList.toggle('shake');
			console.log(event.target.parentNode);
		}
	}
}

objDOMs.addBtn.addEventListener('click', createTasks);
objDOMs.input.addEventListener('keydown', createTasks);
objDOMs.listContainer.addEventListener('click', checkedTasked);
objDOMs.listContainer.addEventListener('click', deleteTasks);
////////////////////////////////////////////////////////////////

setInterval(function () {
	objDOMs.dataInCircle.textContent = date('date');
	objDOMs.TimeInCircle.textContent = date('timer');
}, 1000);

function date(where) {
	let date, day, month, year, dateOftheMonth, min, sec, hours;

	date = new Date();
	day = date.getDay();
	dateOftheMonth = date.getDate();
	month = date.getMonth();
	year = date.getFullYear();
	min = date.getMinutes();
	sec = date.getSeconds();
	hours = date.getHours();

	// console.log(date);
	let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	let months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	let dayToString = () => {
		if (day === 0) {
			return days[day];
		} else {
			return days[day - 1];
		}
	};

	let monthToString = () => {
		return months[month];
	};
	hours = ((hours + 11) % 12) + 1;
	min = min < 10 ? `0${min}` : min;
	sec = sec < 10 ? `0${sec}` : sec;

	let time = () => {
		if (hours < 12) {
			return `${hours}:${min}:${sec} AM`;
		} else {
			return `${hours}:${min}:${sec} PM`;
		}
	};

	// console.log(monthToString());
	// console.log(dayToString());
	// console.log(time());

	if (where === 'list') {
		return `${time()}, ${dayToString()} ${monthToString()} ${dateOftheMonth} ${year}`;
	} else if (where === 'date') {
		return ` ${monthToString()} ${dateOftheMonth} ${year}`;
	} else if (where === 'timer') {
		return `${time()}`;
	}
}
console.log(date('timer'));

function scrollDown() {}
