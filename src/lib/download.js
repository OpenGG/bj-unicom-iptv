const download = (filename, content) => {
  const blob = new Blob([content]);

  const a = document.createElement('a');

  a.href = URL.createObjectURL(blob);

  a.download = filename;

  a.style.display = 'none';

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
};

export default download;
