# .CUBE to PNG Converter

A web-based tool to convert `.cube` files (3D Look-Up Tables) into `.png` images. This tool allows users to upload individual `.cube` files or entire folders containing `.cube` files, processes them, and provides a downloadable ZIP archive of the converted `.png` files. It also displays detailed conversion logs and error messages.

---

## Features

- **File and Folder Upload**: Upload individual `.cube` files or entire folders containing `.cube` files.
- **Auto-Detect File Format**: Automatically detects `.cube` files and skips unsupported formats.
- **Conversion to PNG**: Converts `.cube` files into `.png` images.
- **Preserve Folder Structure**: Maintains the original folder structure and file names in the output ZIP archive.
- **Error Handling**: Displays detailed error messages for files that fail to convert.
- **Conversion Logs**: Provides a detailed log of all conversions, including skipped files.
- **Download ZIP**: Bundles all converted `.png` files into a single ZIP archive for easy download.

---

## How to Use

1. **Select Files or Folders**:
   - Click the **"Select Files"** button to upload individual `.cube` files.
   - Click the **"Select Folder"** button to upload an entire folder containing `.cube` files.

2. **Convert Files**:
   - Click the **"Convert All to PNG"** button to start the conversion process.

3. **View Results**:
   - The tool will display:
     - The total number of files converted.
     - A list of errors (if any).
     - A detailed log of all conversions.

4. **Download ZIP**:
   - If files are successfully converted, a ZIP archive (`converted_files.zip`) will be automatically downloaded.

---

## Example

### Input:
- `file1.cube` (valid)
- `file2.cube` (invalid format)
- `file3.png` (already a `.png` file)

### Output:
```
Total files converted: 1

Errors:
- file2.cube: No valid LUT data found.

Conversion Details:
- Converted: file1.cube (from .cube to .png)
- Skipped: file3.png (already a .png file)
```

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cube-to-png-converter.git
   cd cube-to-png-converter
   ```

2. Open `index.html` in your browser:
   - Simply double-click the `index.html` file or serve it using a local server.

---

## Code Structure

- **`index.html`**: The main HTML file containing the user interface.
- **`style.css`**: The CSS file for styling the interface.
- **`app.js`**: The JavaScript file containing the logic for file processing, conversion, and error handling.

---

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

---

## Live Demo

Check out the live demo [.cube to .png Converter](https://cube-to-png-converter.netlify.app/).

---
## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact Us:

If you have any questions or inquiries, you can reach out to us via email at [umarabdullah.work@gmail.com](mailto:umarabdullah.work@gmail.com).


---

Enjoy converting your `.cube` files to `.png` images! 🚀
