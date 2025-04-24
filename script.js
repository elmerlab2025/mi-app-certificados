let studentData = [];

const columnOptions = {
  1: 'Student ID',
  2: 'Grade',
  3: 'Trend',
  4: 'NOVA',
  5: 'Cumulative Score 2024-2025',
  6: 'Cumulative Score 2023-2024',
  7: 'Cumulative Score 2022-2023',
  8: 'Cumulative Score 2021-2022',
  9: 'Cumulative Score 2020-2021',
  10: 'Cumulative Score 2019-2020',
  11: 'Extracurricular Activities 2024-2025',
  12: 'Extracurricular Activities 2023-2024',
  13: 'Extracurricular Activities 2022-2023',
  14: 'Extracurricular Activities 2021-2022',
  15: 'Extracurricular Activities 2021-2020',
  16: 'Extracurricular Activities 2020-2019'
};

fetch('CERTIFICATES/DEMOSPREADSHEET.xlsx')
  .then(res => res.arrayBuffer())
  .then(data => {
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    studentData = XLSX.utils.sheet_to_json(sheet);
    studentData.forEach(row => {
      row['Full Name'] = (row['Nombre']?.trim() || '') + ' ' + (row['Apellido']?.trim() || '');
    });

    const select = document.getElementById('columnSelect');
    Object.entries(columnOptions).forEach(([k, v]) => {
      const option = document.createElement('option');
      option.value = v;
      option.textContent = v;
      select.appendChild(option);
    });
  });

function searchStudent() {
  const name = document.getElementById("studentName").value.trim().toLowerCase();
  const column = document.getElementById("columnSelect").value;
  const resultDiv = document.getElementById("result");

  const match = studentData.find(row => row["Full Name"].toLowerCase() === name);

  if (!name || !column) {
    resultDiv.innerHTML = "<p style='color:red;'>Falta ingresar datos.</p>";
    return;
  }

  if (!match) {
    resultDiv.innerHTML = "<p style='color:red;'>No se encontró estudiante.</p>";
    return;
  }

  resultDiv.innerHTML = `<h4>${match["Full Name"]}</h4><p><strong>${column}:</strong> ${match[column] ?? "Sin datos"}</p>`;
}
