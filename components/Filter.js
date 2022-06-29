export default function createFilter(root, { handleFilter }) {
    const filterSelect = root.querySelector('select');
    
    filterSelect.addEventListener('change', () => {
        handleFilter(filterSelect.value);
    });

    return ({ filterTime }) => {
        if (filterTime === 86400 || filterTime === 604800) {
            filterSelect.value = filterTime;
        }
        else {
            filterSelect.value = '';
        }
    };
}