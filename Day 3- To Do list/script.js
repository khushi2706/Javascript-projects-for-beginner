myStorage = window.localStorage;

window.addEventListener('load', () => {
    const form = document.querySelector("#task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    var stored_task_list = window.localStorage["tasks"];
    if (!stored_task_list) {
        let tasks = [];
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    var stored_task = JSON.parse(stored_task_list);

    stored_task.forEach(task => {
        display(task);
    });

    // display all the data




    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;


        if (!task) {
            alert("Please enter the task!!");
            return;
        }

        display(task);
        //store in local storage
        stored_task.push(task);
        localStorage.setItem("tasks", JSON.stringify(stored_task));


        // console.log();


        input.value = "";



    })


    function display(task) {
        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);


        // add action button

        const task_action_el = document.createElement("div");
        task_action_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_done_el = document.createElement("button");
        task_done_el.classList.add("done");
        task_done_el.innerHTML = "done";

        task_action_el.appendChild(task_edit_el);
        task_action_el.appendChild(task_done_el);

        //append in task
        task_el.appendChild(task_content_el);
        task_el.appendChild(task_action_el);
        list_el.appendChild(task_el);

        var valueTobeChang = ""
        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerHTML.toLowerCase() == "edit") {
                valueTobeChang = task_input_el.value;
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerHTML = "save";
            }
            else {
                stored_task[stored_task.indexOf(valueTobeChang)] = task_input_el.value;
                localStorage.setItem("tasks", JSON.stringify(stored_task));
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerHTML = "edit";
            }
        });

        task_done_el.addEventListener("click", () => {
            // console.log(task_input_el.value);
            list_el.removeChild(task_el);
            stored_task = stored_task.filter(item => item !== task_input_el.value);
            localStorage.setItem("tasks", JSON.stringify(stored_task));
        });
    }

});


