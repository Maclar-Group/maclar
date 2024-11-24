document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // предотвращаем стандартное поведение (например, отправку формы)
        search(); // вызываем функцию поиска с введенным значением
    }
});

function search() {
    var searchValue = document.getElementById('search-input').value;
    location.href='https://www.google.com/search?q=' + searchValue;
}