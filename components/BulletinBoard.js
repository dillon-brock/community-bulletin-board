export default function createBulletinBoard(root, { handleClick, deleted }) {

    return ({ bulletins }) => {
        for (const bulletin of bulletins) {
            console.log(bulletin.title);
            root.append(Bulletin({ bulletin, handleClick, deleted }));
        }
    };
}

function Bulletin({ bulletin, handleClick, deleted }) {
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

    if (deleted) {
        button.classList.add('repost-button');
        button.textContent = 'REPOST';
    }
    else {
        button.classList.add('delete-button');
        button.textContent = 'X';
    }

    button.addEventListener('click', () => {
        handleClick(bulletin.title, bulletin.description, bulletin.contact);
    });

    li.append(button, div);

    return li;
}