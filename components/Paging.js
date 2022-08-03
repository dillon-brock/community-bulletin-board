export default function createPaging(root, { handlePaging }) {
    const pageSelect = root.querySelector('select');
    const pageDisplay = root.querySelector('span');
    const [prev, next] = root.querySelectorAll('button');

    pageSelect.addEventListener('change', () => {
        handlePaging(0, pageSelect.value);
    });

    prev.addEventListener('click', () => {
        handlePaging(-1, pageSelect.value);
    });

    next.addEventListener('click', () => {
        handlePaging(1, pageSelect.value);
    });

    return ({ page, pageSize, totalPages }) => {

        pageSelect.value = pageSize;
        pageDisplay.textContent = `page ${page} of ${totalPages}`;

        prev.disabled = page <= 1;
        next.disabled = page === totalPages;
    };
}