import {deleteUser, getUsers} from "./api/userApi";
import './index.css'



//Populate Table of users via API call
getUsers().then(result => {
    let userBody ="";

    result.forEach(user => {
        userBody += `<tr>
        <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a> </td>
        <td> ${user.id}</td>
        <td> ${user.firstName}</td>
        <td> ${user.lastName}</td>
        <td> ${user.email}</td>
        </tr>`

        console.log(user); //eslint-disable-line no-console
    });

    global.document.getElementById('users').innerHTML = userBody;

    const  deleteLink = global.document.getElementsByClassName('deleteUser');

    Array.from(deleteLink, link => {
        link.onclick = function (event) {
            const element = event.target;
            event.preventDefault();
            deleteUser(element.attributes['data-id'].value);
            const row = element.parentNode.parentNode;
            row.parentNode.removeChild(row);
        }
    })
})