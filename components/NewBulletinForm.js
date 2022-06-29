export default function createNewBulletin(form, { handleAddBulletin }) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        handleAddBulletin(formData.get('title'), formData.get('description'), formData.get('contact'));
    });
    return () => { };
}