import { useState } from 'react';

export default function UploadPreflight() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [warnings, setWarnings] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  const MIN_RESOLUTION = 1500;
  const ACCEPTED_TYPES = ['image/png', 'image/svg+xml'];
  const ACCEPTED_EXTENSIONS = ['.png', '.svg'];

  const validateFile = (fileToValidate) => {
    const newWarnings = [];
    const fileExtension = fileToValidate.name.slice(fileToValidate.name.lastIndexOf('.')).toLowerCase();

    // Check file type
    if (!ACCEPTED_TYPES.includes(fileToValidate.type) && !ACCEPTED_EXTENSIONS.includes(fileExtension)) {
      newWarnings.push('Invalid file type. Please upload PNG or SVG files only.');
      return newWarnings;
    }

    // For image files, check resolution
    if (fileToValidate.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;

          setFileInfo({
            name: fileToValidate.name,
            size: `${(fileToValidate.size / 1024).toFixed(2)} KB`,
            type: fileToValidate.type || fileExtension,
            width: width,
            height: height,
          });

          const resolutionWarnings = [];
          if (width < MIN_RESOLUTION || height < MIN_RESOLUTION) {
            resolutionWarnings.push(
              `⚠️ Image resolution (${width}x${height}) is below recommended minimum of ${MIN_RESOLUTION}x${MIN_RESOLUTION}. Output quality may be affected.`
            );
          }
          setWarnings(resolutionWarnings);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(fileToValidate);
    }
  };

  const handleFileSelect = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      validateFile(selectedFile);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFileInput = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);

    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      alert(`File "${file.name}" ready for upload!\n\nIn a production app, this would send the file to the server.`);
      // Reset for next upload
      setFile(null);
      setPreview(null);
      setFileInfo(null);
      setWarnings([]);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setFileInfo(null);
    setWarnings([]);
  };

  return (
    <div className="upload-preflight">
      <h2>📤 Upload Print Job</h2>

      {warnings.length > 0 && (
        <div className="alert alert-warning">
          <div>
            {warnings.map((warning, index) => (
              <p key={index}>{warning}</p>
            ))}
          </div>
        </div>
      )}

      <div
        className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📁</p>
        <p>Drag and drop your PNG or SVG file here</p>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>or</p>
        <label htmlFor="file-input" className="file-input-label">
          Browse Files
        </label>
        <input
          id="file-input"
          type="file"
          accept=".png,.svg,image/png,image/svg+xml"
          onChange={handleFileInput}
        />
      </div>

      {preview && fileInfo && (
        <div className="file-preview">
          <div className="file-info">
            <div className="info-item">
              <label>Filename</label>
              <span>{fileInfo.name}</span>
            </div>
            <div className="info-item">
              <label>File Size</label>
              <span>{fileInfo.size}</span>
            </div>
            <div className="info-item">
              <label>Type</label>
              <span>{fileInfo.type}</span>
            </div>
            <div className="info-item">
              <label>Resolution</label>
              <span>{fileInfo.width} × {fileInfo.height}px</span>
            </div>
          </div>

          <img src={preview} alt="Preview" className="preview-image" />

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              onClick={handleClear}
              style={{ backgroundColor: 'var(--text-light)' }}
            >
              Clear
            </button>
            <button onClick={handleUpload}>Upload to Server</button>
          </div>
        </div>
      )}
    </div>
  );
}
