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
