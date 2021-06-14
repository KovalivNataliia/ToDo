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

function deleteTask(id) {
    request.open('DELETE', url + id + '/');

    request.onload = () => {
        document.getElementById(id).remove();
    }

    request.send();
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
        .map(({id, text, is_completed}) => {
            const task = document.createElement('li');
            task.classList.add('list-group-item');
            task.classList.add('d-flex');
            task.setAttribute('id', id);
    
            const checkboxElement = document.createElement('input');
            checkboxElement.setAttribute('type', 'checkbox');
            checkboxElement.checked = is_completed;
            checkboxElement.classList.add('form-check-input');
            checkboxElement.classList.add('me-3');

            const deleteButton = document.createElement('a');
            deleteButton.setAttribute('href', '#');
            deleteButton.classList.add('ms-auto');

            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('bi');
            deleteIcon.classList.add('bi-trash-fill');

            deleteButton.append(deleteIcon);

            task.append(checkboxElement, text, deleteButton);
    
            return task;
        });

    listElement.append(...tasksList);

    const deleteButtons = document.querySelectorAll('.ms-auto');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            deleteTask(btn.parentNode.id);
        })
    })
}


