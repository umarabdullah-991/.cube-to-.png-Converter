document.getElementById('selectFilesBtn').addEventListener('click', () => {
    document.getElementById('cubeFile').click();
  });
  
  document.getElementById('selectFolderBtn').addEventListener('click', () => {
    document.getElementById('folderInput').click();
  });
  
  document.getElementById('convertBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('cubeFile');
    const folderInput = document.getElementById('folderInput');
    const files = [...fileInput.files, ...folderInput.files];
  
    if (files.length === 0) {
      alert('Please select one or more files or folders.');
      return;
    }
  
    const zip = new JSZip();
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; 
  
    let totalConverted = 0;
    const errors = [];
    const conversionDetails = [];
  
    for (const file of files) {
      const fileItem = document.createElement('div');
      fileItem.className = 'file-item';
      fileItem.textContent = `Processing: ${file.webkitRelativePath || file.name}`;
      fileList.appendChild(fileItem);
  
      try {
        if (file.name.endsWith('.cube')) {
          const lut = await parseCubeFile(file);
          if (lut) {
            const pngDataUrl = await drawLUT(lut);
            const pngBlob = dataUrlToBlob(pngDataUrl);
            const filePath = file.webkitRelativePath || file.name;
            zip.file(filePath.replace('.cube', '.png'), pngBlob);
            fileItem.textContent = `Converted: ${filePath}`;
            totalConverted++;
            conversionDetails.push(`Converted: ${filePath} (from .cube to .png)`);
          }
        } else {
          throw new Error('Unsupported file format.');
        }
      } catch (error) {
        fileItem.textContent = `Error: ${file.webkitRelativePath || file.name} - ${error.message}`;
        fileItem.classList.add('error');
        errors.push({ fileName: file.webkitRelativePath || file.name, message: error.message });
      }
    }
  
    const totalFilesConverted = document.getElementById('totalFilesConverted');
    const noFilesConverted = document.getElementById('noFilesConverted');
    const errorList = document.getElementById('errorList');
    const errorMessages = document.getElementById('errorMessages');
    const conversionDetailsContainer = document.getElementById('conversionDetails');
    const conversionMessages = document.getElementById('conversionMessages');
  
    if (totalConverted > 0) {
      totalFilesConverted.textContent = `Total files converted: ${totalConverted}`;
      noFilesConverted.style.display = 'none';
  
      zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, 'converted_files.zip');
      });
    } else {
      totalFilesConverted.textContent = '';
      noFilesConverted.style.display = 'block';
    }
  
    if (errors.length > 0) {
      errorList.style.display = 'block';
      errorMessages.innerHTML = errors.map(error => `<li><strong>${error.fileName}:</strong> ${error.message}</li>`).join('');
    } else {
      errorList.style.display = 'none';
    }
  
    if (conversionDetails.length > 0) {
      conversionDetailsContainer.style.display = 'block';
      conversionMessages.innerHTML = conversionDetails.map(detail => `<li>${detail}</li>`).join('');
    } else {
      conversionDetailsContainer.style.display = 'none';
    }
  });
  
  async function parseCubeFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const lines = event.target.result.split('\n');
        let size = 32;
        const lut = [];
  
        for (const line of lines) {
          if (line.startsWith('LUT_3D_SIZE')) size = parseInt(line.split(' ')[1], 10);
          else if (/^\d/.test(line)) lut.push(line.trim().split(/\s+/).map(parseFloat));
        }
  
        lut.length ? resolve({ size, data: lut }) : reject(new Error('No valid LUT data found.'));
      };
  
      reader.onerror = () => reject(new Error('Error reading file.'));
      reader.readAsText(file);
    });
  }
  
  async function drawLUT(lut) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = lut.size;
    canvas.width = size * size;
    canvas.height = size;
  
    const imageData = ctx.createImageData(size * size, size);
    lut.data.forEach(([r, g, b], i) => {
      const idx = i * 4;
      imageData.data[idx] = r * 255;
      imageData.data[idx + 1] = g * 255;
      imageData.data[idx + 2] = b * 255;
      imageData.data[idx + 3] = 255;
    });
  
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
  }
  
  function dataUrlToBlob(dataUrl) {
    return new Blob([Uint8Array.from(atob(dataUrl.split(',')[1]), c => c.charCodeAt(0))], { type: 'image/png' });
  }
  