const url = 'http://192.168.0.104:7999/api/v1/tasks';

const request = new XMLHttpRequest();

request.open('GET', url);

request.responseType = 'json';

request.onload = () => {
    const data = request.response;
    createList(data);
}

request.send();


function createList(array) {
    const listElement = document.querySelector('.list-group');

    const tasksList = array.map(({text, is_completed}) => {
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