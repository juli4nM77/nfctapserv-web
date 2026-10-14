// Configuración de NFC TAP SERV. El WhatsApp ya está configurado; podés editar los precios cuando quieras.
// IMPORTANTE: escribí el número de WhatsApp con código de país y SIN +, espacios ni ceros extra.
// Ejemplo de formato uruguayo: 59899123456 (EJEMPLO, NO ES TU NÚMERO).
window.NFC_CONFIG = {
  whatsapp: "59892656978", // WhatsApp de NFC TAP SERV (Uruguay, sin cero inicial).
  currency: "UYU",
  products: [
    { id:"whatsapp", name:"Placa WhatsApp", category:"redes", description:"Que te escriban con un toque. Ideal para atención y ventas.", price:890, icon:"◉", badge:"WHATSAPP" },
    { id:"instagram", name:"Placa Instagram", category:"redes", description:"Llevá nuevos clientes directo a tu perfil de Instagram.", price:890, icon:"◎", badge:"SOCIAL" },
    { id:"google", name:"Placa Google Reviews", category:"resenas", description:"Facilitá que tus clientes encuentren dónde dejar una reseña de Google.", price:1490, icon:"★", badge:"OFERTA", offer:true },
    { id:"personalizada", name:"Placa Personalizada", category:"personalizadas", description:"Tu marca, tu mensaje y tu enlace, en una placa a tu medida.", price:1790, icon:"✧", badge:"OFERTA", offer:true }
  ]
};
