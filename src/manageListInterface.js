

let lists = [];

export function addNewListInterface(listObject, container, insert_before) {

    lists.push(listObject);
    console.log(lists);

    const aList = document.createElement('div');
    aList.classList.add('a-list');
    container.insertBefore(aList, insert_before);


    const left = document.createElement('div');
    left.classList.add('left');
    aList.appendChild(left);

    const right = document.createElement('div');
    right.classList.add('right');
    aList.appendChild(right);

    const icon1 = document.createElement('img');
    icon1.classList.add('icon');
    icon1.setAttribute('src', 'icons/plus.png');
    left.appendChild(icon1);

    const listTitle = document.createElement('div');
    listTitle.classList.add('list-title');
    listTitle.textContent = listObject.getTitle;
    left.appendChild(listTitle);

    const icon2 = document.createElement('img');
    icon2.classList.add('icon');
    icon2.setAttribute('src', 'icons/plus.png');
    right.appendChild(icon2);

    const icon3 = document.createElement('img');
    icon3.classList.add('icon');
    icon3.setAttribute('src', 'icons/plus.png');
    right.appendChild(icon3);

    const icon4 = document.createElement('img');
    icon4.classList.add('icon');
    icon4.setAttribute('src', 'icons/plus.png');
    right.appendChild(icon4);

    const icon5 = document.createElement('img');
    icon5.classList.add('icon');
    icon5.setAttribute('src', 'icons/plus.png');
    right.appendChild(icon5);
}




// <div class="a-list">
//     <div class="left">
//         <img class="icon" src="icons/plus.png" alt="pic">
//         <div class="list-title">My Day</div>
//     </div>
//     <div class="right">
//         <img class="icon" src="icons/plus.png" alt="E">
//         <img class="icon" src="icons/plus.png" alt="U">
//         <img class="icon" src="icons/plus.png" alt="D">
//         <img class="icon" src="icons/plus.png" alt="Del">
//     </div>
// </div>
