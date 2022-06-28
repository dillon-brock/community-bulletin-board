export default function createBulletinBoard(root) {

    return ({ bulletins }) => {
        for (const bulletin of bulletins) {
            
            root.append(Bulletin({ bulletin }));
        }
    };
}

function Bulletin({ bulletin }) {
    const li = document.createElement('li');
    li.classList.add('bulletin');
    
    const title = document.createElement('h3');
    title.textContent = bulletin.title;
    const description = document.createElement('p');
    description.textContent = bulletin.description;
    const contact = document.createElement('p');
    contact.textContent = bulletin.contact;
    
    const dateDisplay = document.createElement('p');
    dateDisplay.classList.add('date');
    let date = new Date(bulletin.created_at * 1000);
    date = date.toString();
    let dateArray = date.split(' ');
    dateArray = dateArray.slice(0, 4);
    date = dateArray.join(' ');
    dateDisplay.textContent = date;

    li.append(title, description, contact, dateDisplay);
    return li;
}