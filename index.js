const imageInput = document.getElementById("imageInput");
const text1Input = document.getElementById("text1");
const text2Input = document.getElementById("text2");
const genereBtn = document.getElementById("genereBtn");
const downloadBtn = document.getElementById("downloadBtn");
const canvas = document.getElementById("idCanvas");
const ctx = canvas.getContext("2d");
const galerie = document.getElementById("galerie");

let image = null;

// Téléchargement de l'image
imageInput.addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    image = new Image();
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      dessinerMeme();
    };
    image.src = event.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

function dessinerMeme() {
  if (!image) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  ctx.font = `${Math.floor(canvas.height / 10)}px Impact`;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.textAlign = "center";

  //Texte du haut
  const text1 = text1Input.value.toUpperCase();
  ctx.fillText(text1, canvas.width / 2, 60);
  ctx.strokeText(text1, canvas.width / 2, 60);

  //Texte du bas
  const text2 = text2Input.value.toUpperCase();
  ctx.fillText(text2, canvas.width / 2, canvas.height - 30);
  ctx.strokeText(text2, canvas.width / 2, canvas.height - 30);
}

genereBtn.addEventListener("click", dessinerMeme);

// Génération du mème
downloadBtn.addEventListener("-click", function () {
  if (!image) return alert("Veillez d'abord choisir une image!");
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL();
  link.click();
  ajouterEnGalerie();
});

//  Ajout du mème à la galerie

function ajouterEnGalerie() {
  const img = document.createElement("img");
  img.src = canvas.toDataURL();
  galerie.appendChild(img);
}
