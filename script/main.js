console.log('running');

const objDOMs = {
	input: document.getElementById('input'),
	addBtn: document.getElementById('add-btn'),
	listContainer: document.getElementById('list-container'),
	dataInCircle: document.getElementById('data-in-circle'),
	TimeInCircle: document.querySelector('.time-in-circle'),
	id: 0,
};

console.log(objDOMs.TimeInCircle);

function createTasks() {
	let html = `<div class="list-${objDOMs.id}">
    <div class="info">
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
	objDOMs.id += 1;
}

function checkedTasked(event) {
	if (event.target.className === 'checkbox') {
		let u = event.target.nextElementSibling;
		let parent = u.parentNode.parentNode;
		u.classList.toggle('checked');
		parent.classList.toggle('checked-list');
	}
}

function deleteTasks(event) {
	if (event.target.className === 'delBtn') {
		objDOMs.listContainer.removeChild(event.target.parentNode.parentNode);
	}
}

objDOMs.dataInCircle.textContent = date('date');
setInterval(function () {
	objDOMs.TimeInCircle.textContent = date('timer');
}, 1000);

function date(where) {
	let date = new Date();
	let day = date.getDay();
	let dateOftheMonth = date.getDate();
	let month = date.getMonth();
	let year = date.getFullYear();
	let min = date.getMinutes();
	let sec = date.getSeconds();
	let hours = date.getHours();

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
			return `0${hours}:${min}:${sec} AM`;
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

objDOMs.listContainer.addEventListener('click', checkedTasked);
objDOMs.listContainer.addEventListener('click', deleteTasks);
objDOMs.addBtn.addEventListener('click', createTasks);
