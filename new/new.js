import { getUser, addBulletin } from '../services/bulletin-service.js';
import createNewBulletin from '../components/NewBulletinForm.js';

let user = null;

async function handlePageLoad() {
    user = await getUser();
    if (!user) {
        location.replace('../auth');
    }
    display();
}

async function handleAddBulletin(title, description, contact) {
    const response = await addBulletin(title, description, contact);
    // eslint-disable-next-line no-console
    response.error ? console.log(response.error) : location.assign('/');
}

const NewBulletin = createNewBulletin(document.querySelector('form'), { handleAddBulletin });

function display() {
    NewBulletin();
}

handlePageLoad();