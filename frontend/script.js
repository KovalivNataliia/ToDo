const url = 'http://192.168.0.104:7999/api/v1/tasks/';

const request = new XMLHttpRequest();
const button = document.querySelector('.btn');

getTasks();

function getTasks() {

    request.open('GET', url);

    request.responseType = 'json';

    request.onload = () => {
        const data = request.response;
        createList(data);
    }

    request.send();
}

function postTask(json) {

    request.open('POST', url);

    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    request.onload = () => {
        document.getElementById('list').innerHTML = '';
        getTasks();
    }

    request.send(json);
}


button.addEventListener('click', () => {
    const input = document.querySelector('.form-control');
    if (!input.value) {

        input.classList.add('is-invalid');

        input.addEventListener('focus', () => {
            input.classList.remove('is-invalid');
        });

    } else {

        let json = JSON.stringify({
            text: input.value,
        });

        postTask(json);
        input.value = '';
    }

});



function createList(array) {
    const listElement = document.querySelector('.list-group');

    const tasksList = array
        .sort((a, b) => a.is_completed - b.is_completed)
        .map(({text, is_completed}) => {
            const task = document.createElement('li');
            task.classList.add('list-group-item');
    
            const checkboxElement = document.createElement('input');
            checkboxElement.setAttribute('type', 'checkbox');
            checkboxElement.checked = is_completed;
            checkboxElement.classList.add('form-check-input');
            checkboxElement.classList.add('me-1');
    
            task.append(checkboxElement, text);
    
            return task;
        });

    listElement.append(...tasksList);
}


