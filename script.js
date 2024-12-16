let laptopCounter = 1;
let mobileCounter = 1;
let currentEditIndex = null;

function toggleAddForm() {
    const form = document.getElementById('add-device-form');
    form.classList.toggle('hidden');
}

function toggleDeviceSpecs() {
    const deviceType = document.getElementById('device-type').value;
    const laptopSpecs = document.getElementById('laptop-specs');
    if (deviceType === 'Laptop') {
        laptopSpecs.classList.remove('hidden');
    } else {
        laptopSpecs.classList.add('hidden');
    }
}

document.getElementById('inventory-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const deviceType = document.getElementById('device-type').value;
    const cpu = document.getElementById('cpu').value || '-';
    const gpu = document.getElementById('gpu').value || '-';
    const ram = document.getElementById('ram').value || '-';
    const storage = document.getElementById('storage').value || '-';
    const modelNumber = document.getElementById('model-number').value;
    const cosmeticCondition = document.getElementById('cosmetic-condition').value;
    const notes = document.getElementById('notes').value;

    let deviceNumber;
    if (deviceType === 'Laptop') {
        deviceNumber = 'L' + String(laptopCounter).padStart(3, '0');
        laptopCounter++;
    } else if (deviceType === 'Mobile') {
        deviceNumber = 'M' + String(mobileCounter).padStart(3, '0');
        mobileCounter++;
    }

    const table = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];
    let row;
    if (currentEditIndex === null) {
        row = table.insertRow();
    } else {
        row = table.rows[currentEditIndex];
        currentEditIndex = null;
    }

    row.innerHTML = `
        <td class="editable" onclick="editCell(this)">${deviceType}</td>
        <td class="editable" onclick="editCell(this)">${deviceNumber}</td>
        <td class="editable" onclick="editCell(this)">${cpu}</td>
        <td class="editable" onclick="editCell(this)">${gpu}</td>
        <td class="editable" onclick="editCell(this)">${ram}</td>
        <td class="editable" onclick="editCell(this)">${storage}</td>
        <td class="editable" onclick="editCell(this)">${modelNumber}</td>
        <td class="editable" onclick="editCell(this)">${cosmeticCondition}</td>
        <td class="editable" onclick="editCell(this)">${notes}</td>
        <td>
            <img src="placeholder.png" alt="Remove" onclick="removeRow(this)" />
        </td>
    `;

    document.getElementById('inventory-form').reset();
    toggleAddForm();
});

function editCell(cell) {
    const oldValue = cell.innerText;
    cell.innerHTML = `<input type="text" value="${oldValue}" onblur="saveEdit(this)">`;
    cell.firstChild.focus();
}

function saveEdit(input) {
    const newValue = input.value;
    const cell = input.parentElement;
    cell.innerHTML = newValue;
}

function removeRow(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

function exportToExcel() {
    const table = document.getElementById('inventory-table');
    const workbook = XLSX.utils.table_to_book(table);
    XLSX.writeFile(workbook, 'inventory.xlsx');
}

function importFromExcel() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';
    input.onchange = function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            populateTable(jsonData);
        };
        reader.readAsArrayBuffer(file);
    };
    input.click();
}

function populateTable(data) {
    const table = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    data.forEach(item => {
        const row = table.insertRow();
        row.innerHTML = `
            <td class="editable" onclick="editCell(this)">${item.Device}</td>
            <td class="editable" onclick="editCell(this)">${item.Number}</td>
            <td class="editable" onclick="editCell(this)">${item.CPU}</td>
            <td class="editable" onclick="editCell(this)">${item.GPU}</td>
            <td class="editable" onclick="editCell(this)">${item.RAM}</td>
            <td class="editable" onclick="editCell(this)">${item.Storage}</td>
            <td class="editable" onclick="editCell(this)">${item["Model Number"]}</td>
            <td class="editable" onclick="editCell(this)">${item["Cosmetic Condition"]}</td>
            <td class="editable" onclick="editCell(this)">${item.Notes}</td>
            <td>
                <img src="placeholder.png" alt="Remove" onclick="removeRow(this)" />
            </td>
        `;
    });
}
