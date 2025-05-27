document.getElementById("formReserva").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = this.nombre.value;
  const correo = this.correo.value;
  const telefono = this.telefono.value;
  const grupo = this.grupo.value;
  const fecha = this.fecha.value;
  const hora = this.hora.value;

  // Fecha y hora actual
  const now = new Date();
  const fechaActual = now.toLocaleDateString("es-PE");
  const horaActual = now.toLocaleTimeString("es-PE");

  const mensaje = `*Reserva Massimo Grosso*%0A Nombre: ${nombre}%0A Correo: ${correo}%0A Teléfono: ${telefono}%0A Grupo: ${grupo}%0A Fecha: ${fecha}%0A Hora: ${hora}`;

  const numeroRestaurante = "922032144";
  const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${numeroRestaurante}&text=${mensaje}`;
  window.open(enlaceWhatsApp, "_blank");

  // ✅ Texto limpio y ordenado para el QR
  const infoQR = 
    `Reserva Confirmada\n` +
    `Nombre: ${nombre}\n` +
    `Teléfono: ${telefono}\n` +
    `Grupo: ${grupo}\n` +
    `Fecha de reserva: ${fecha}\n` +
    `Hora: ${hora}\n` +
    `Generado el: ${fechaActual} a las ${horaActual}`;

  const qrURL = `https://quickchart.io/qr?text=${encodeURIComponent(infoQR)}&size=250`;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const qrDataURL = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const pageWidth = pdf.internal.pageSize.getWidth();
    const qrWidth = 100;
    const qrX = (pageWidth - qrWidth) / 2;

    pdf.setFontSize(14);
    pdf.text("Reserva Massimo Grosso", pageWidth / 2, 20, { align: "center" });
    pdf.setFontSize(12);
    pdf.text(`Nombre: ${nombre}`, 20, 40);
    pdf.text(`Teléfono: ${telefono}`, 20, 50);
    pdf.text(`Grupo: ${grupo}`, 20, 60);
    pdf.text(`Fecha de reserva: ${fecha}`, 20, 70);
    pdf.text(`Hora: ${hora}`, 20, 80);
    pdf.text(`Generado el: ${fechaActual} ${horaActual}`, 20, 90);

    pdf.addImage(qrDataURL, "PNG", qrX, 100, qrWidth, qrWidth);

    pdf.save("reserva_qr.pdf");

    alert("Reserva enviada por WhatsApp y QR generado.");
  };

  img.src = qrURL;
});
