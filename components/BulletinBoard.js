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

    li.append(title, description, contact);
    return li;
}