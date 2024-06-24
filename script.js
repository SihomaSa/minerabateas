const models = window['powerbi-client'].models;

// Configura el ID del informe y el token de acceso
const reportId = "TU_REPORT_ID";
const embedUrl = "TU_EMBED_URL";
const accessToken = "TU_ACCESS_TOKEN";

// Configuración de la incrustación
const embedConfig = {
    type: "report",
    id: reportId,
    embedUrl: embedUrl,
    accessToken: accessToken,
    tokenType: models.TokenType.Embed,
    settings: {
        panes: {
            filters: {
                visible: false
            },
            pageNavigation: {
                visible: true
            }
        }
    }
};

// Obtiene el contenedor del informe
const reportContainer = document.getElementById("reportContainer");

// Incrusta el informe de Power BI
const powerbi = window['powerbi'];
const report = powerbi.embed(reportContainer, embedConfig);

// Añadir funcionalidad de descarga como PDF
document.getElementById('downloadPdfBtn').addEventListener('click', function() {
    report.export(models.ExportDataType.PDF).then(function(data) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(data.body);
        link.download = 'reporte.pdf';
        link.click();
    }).catch(function(error) {
        console.error('Error al exportar el informe:', error);
    });
});

// Funcionalidad del menú desplegable para mostrar imágenes según el mes y la semana
const images = {
    enero: {
        semana1: ["ruta_imagenes/enero1-1.jpg", "ruta_imagenes/enero1-2.jpg"],
        semana2: ["ruta_imagenes/enero2-1.jpg", "ruta_imagenes/enero2-2.jpg"],
        semana3: ["ruta_imagenes/enero3-1.jpg", "ruta_imagenes/enero3-2.jpg"],
        semana4: ["ruta_imagenes/enero4-1.jpg", "ruta_imagenes/enero4-2.jpg"],
        semana5: ["ruta_imagenes/enero5-1.jpg", "ruta_imagenes/enero5-2.jpg"]
    },
    febrero: {
        semana1: ["ruta_imagenes/febrero1-1.jpg", "ruta_imagenes/febrero1-2.jpg"],
        semana2: ["ruta_imagenes/febrero2-1.jpg", "ruta_imagenes/febrero2-2.jpg"],
        semana3: ["ruta_imagenes/febrero3-1.jpg", "ruta_imagenes/febrero3-2.jpg"],
        semana4: ["ruta_imagenes/febrero4-1.jpg", "ruta_imagenes/febrero4-2.jpg"],
        semana5: ["ruta_imagenes/febrero5-1.jpg", "ruta_imagenes/febrero5-2.jpg"]
    },
    // Agrega más meses y semanas según sea necesario
};

document.getElementById('monthDropdown').addEventListener('change', function() {
    const month = this.value;
    const week = document.getElementById('weekDropdown').value;
    showImages(month, week);
});

document.getElementById('weekDropdown').addEventListener('change', function() {
    const week = this.value;
    const month = document.getElementById('monthDropdown').value;
    showImages(month, week);
});

function showImages(month, week) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '';
    if (images[month] && images[month][week]) {
        images[month][week].forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${month} ${week}`;
            imageContainer.appendChild(img);
        });
    }
}
