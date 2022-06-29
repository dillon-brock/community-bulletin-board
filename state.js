const state = {};

function initialize() {
    state.deletedBulletins = [];
    state.deletedCount = 0;
}

initialize();

export default state;

export function addDeletedBulletin(bulletin) {
    state.deletedBulletins.push(bulletin);
}

export function resetDeletedBulletins() {
    state.deletedBulletins = [];
}

export function undeleteBulletin(bulletin) {
    const index = state.deletedBulletins.indexOf(bulletin);
    state.deletedBulletins.splice(index, 1);
}