export default function createBulletinBoard(root, { handleDelete }) {

    return ({ bulletins }) => {
        for (const bulletin of bulletins) {
            
            root.append(Bulletin({ bulletin, handleDelete }));
        }
    };
}

function Bulletin({ bulletin, handleDelete }) {
    const li = document.createElement('li');
    li.classList.add('bulletin');

    const div = document.createElement('div');
    div.classList.add('bulletin-contents');
    
    const title = document.createElement('h3');
    title.textContent = bulletin.title;
    const description = document.createElement('p');
    description.textContent = bulletin.description;
    const contact = document.createElement('p');
    contact.textContent = bulletin.contact;
    
    const dateDisplay = document.createElement('span');
    dateDisplay.classList.add('date');
    let date = new Date(bulletin.created_at * 1000);
    date = date.toString();
    let dateArray = date.split(' ');
    dateArray = dateArray.slice(0, 4);
    date = dateArray.join(' ');
    dateDisplay.textContent = date;

    div.append(title, description, contact, dateDisplay);

    const button = document.createElement('button');
    button.classList.add('delete-button');
    button.textContent = 'X';

    li.append(button, div);

    button.addEventListener('click', () => {
        handleDelete(bulletin.title, bulletin.description, bulletin.contact);
    });

    return li;
}