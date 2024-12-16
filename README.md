# IOLabs Inventory Management System

## Overview
This is an internal web application designed to manage the inventory for IOLabs. The system allows users to add, edit, and remove devices in the inventory. It includes features for importing and exporting inventory data as XLSX files, and provides dropdown menus for specifying device characteristics.

## Features
- **Add Devices:** Users can add new devices to the inventory by filling out a form with various fields including device type, CPU, GPU, RAM, storage, model number, cosmetic condition, and notes.
- **Edit Devices:** Users can click on table cells to edit the information of existing devices.
- **Remove Devices:** Users can remove devices from the inventory by clicking on a remove icon.
- **Import XLSX:** Users can import inventory data from an XLSX file.
- **Export XLSX:** Users can export the current inventory data to an XLSX file.

## Usage
1. Open `index.html` in your web browser to use the inventory management system.
2. Click the **+ Add Device** button to open the form for adding a new device.
3. Fill out the form fields and click **Add Device** to add the device to the inventory table.
4. Click on any cell in the table to edit its content.
5. Click the remove icon next to a device to remove it from the inventory.
6. Use the **Import XLSX** button to import inventory data from an XLSX file.
7. Use the **Export to XLSX** button to export the current inventory data to an XLSX file.

## Dependencies
- [XLSX.js](https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js): Used for handling XLSX file operations.

## File Structure
- `index.html`: Main HTML file for the inventory management system.
- `styles.css`: CSS file for styling the inventory management system.
- `script.js`: JavaScript file for handling the functionality of the inventory management system.

## License
This project is licensed under the MIT License.
