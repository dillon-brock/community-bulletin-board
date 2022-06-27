// import services and utilities
import { getBulletins } from './services/bulletin-service.js';
// import component creators
import createBulletinBoard from './components/BulletinBoard.js';
// declare state variables
let bulletins = [];
// write handler functions
async function handlePageLoad() {
    bulletins = await getBulletins();
    display();
}
// Create each component: 
// - pass in the root element via querySelector
// - pass any needed handler functions as properties of an actions object 
const BulletinBoard = createBulletinBoard(document.getElementById('bulletin-board'));
// Roll-up display function that renders (calls with state) each component
function display() {
    // Call each component passing in props that are the pieces of state this component needs
    BulletinBoard({ bulletins });
}

// Call display on page load
handlePageLoad();