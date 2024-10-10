$(document).ready(function() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    const saveTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    };

    const renderTodos = () => {
      $('.js--todos-wrapper').empty();
      todos.forEach((todo, index) => {
        const li = $(`
          <li class="list-group-item d-flex justify-content-between align-items-center todo-item">
            <input type="checkbox" ${todo.completed ? "checked" : ""} class="form-check-input me-1" />
            <span class="todo-item__description">${todo.text}</span>
            <button class="btn btn-danger btn-sm todo-item__delete">Видалити</button>
          </li>
        `);

        if (todo.completed) {
          li.addClass('todo-item--checked');
        }

        
        li.find("input").on("click", function() {
          todos[index].completed = !todos[index].completed;
          saveTodos();
          renderTodos();
        });

        
        li.find(".todo-item__delete").on("click", function() {
          todos.splice(index, 1);
          saveTodos();
          renderTodos();
        });

        
        li.find(".todo-item__description").on("click", function() {
          $('#todoText').text(todo.text);
          $('#todoModal').modal('show');
        });

        $('.js--todos-wrapper').append(li);
      });
    };

    
    $('.js--form').on("submit", function(event) {
      event.preventDefault();
      const newTodo = {
        text: $('.js--form__input').val().trim(),
        completed: false
      };

      if (newTodo.text.length > 0) {
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        $('.js--form__input').val('');
      }
    });

    renderTodos();
  });