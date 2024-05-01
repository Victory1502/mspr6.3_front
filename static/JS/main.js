const classesMapping = ['Castor', 'Chat', 'Chien', 'Coyote', 'Écureuil', 'Lapin', 'Loup','Lynx', 'Ours', 'Puma', 'Rat', 'Raton Laveur', 'Renard']; // les noms d'animaux pour chaque classe
const description= [
    "Le castor d’Europe, appelé également le castor commun ou le castor d’Eurasie, est un mammifère rongeur aquatique de la famille des castoridés.", 
    "Le Chat sauvage4 (Felis silvestris) est une espèce de félins du genre Felis présent dans divers types d'habitats. Son aire de répartition couvre l’Europe, l’Asie occidentale et l’Afrique.", 
    "Alors qu'on estimait autrefois que le Chien constituait une espèce à part entière (Canis canis ou encore Canis familiaris), les recherches génétiques contemporaines ont permis d'établir qu'il n'est que le résultat de la domestication du loup gris commun.", 
    "Le coyote, également appelé le chacal américain, est un mammifère carnivore apparenté au loup gris (mais de taille plus petite), de la famille des canidés.", 
    "L’écureuil est un rongeur arboricole appartenant à l’ordre des rodentiens (rongeurs) et à la famille des sciuridés.", "Le lapin de garenne, appelé également le lapin sauvage, le lapin européen ou le lapin des bois, est un petit mammifère herbivore appartenant à l’ordre des lagomorphes et à la famille des léporidés.",
     "Le loup gris commun, appelé également le loup européen ou le loup vulgaire, est un mammifère carnivore de la famille des canidés.", "Le lynx commun, appelé également le lynx boréal, le lynx d’Eurasie ou le loup-cervier, est un mammifère carnivore de la famille des félins.", 
     "L’ours brun est un mammifère omnivore de la famille des ursidés vivant en Amérique du Nord, en Europe et en Russie.", "Le puma, appelé également le cougar ou le lion de montagne, est un grand mammifère carnivore de la famille des félins.", "Le rat est un genre de gros Muridés originaires d'Asie dont deux espèces ont colonisé l'Europe et le reste du monde",
      "Le raton laveur commun est un mammifère carnivore de la famille des procyonidés.", "Le renard roux, appelé également le renard commun ou le renard rouge, est un mammifère carnivore de la famille des canidés."]

// Fonction pour trouver l'index du nom d'animal prédit
function findAnimalIndex(animal) {
    for (let i = 0; i < classesMapping.length; i++) {
        if (classesMapping[i] === animal) {
            return i; // Retourne l'index du nom d'animal
        }
    }
    return -1; // Retourne -1 si l'animal n'est pas trouvé
}

async function processImage() {
    console.log("Fonction processImage appelée.");  
    const fileInput = document.getElementById('empreinteInput');
    if (fileInput.files.length === 0) {
        alert('Veuillez sélectionner une image.');
        return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    try {
        console.log("Envoi de l'image au backend...");
        const response = await fetch('http://127.0.0.1:5001/identify', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            console.log("Réponse reçue :", result);

            const predicted_animal = result.animal;

            // Trouver l'index de l'animal prédit
            const index = findAnimalIndex(predicted_animal);

            if (index >= 0) { // Si l'animal est trouvé
                // Mettre à jour le nom de l'animal
                document.getElementById('animalNameValue').innerText = predicted_animal;

                // Afficher la description associée
                const additionalInfo = description[index];
                document.getElementById('additionalInfoValue').innerText = additionalInfo;

                // Afficher la photo de l'animal
                const photoPath = `/static/images/${predicted_animal}.jpg`;
                const pictureElement = document.getElementById('pictures');
                pictureElement.innerHTML = `<img src="${photoPath}" alt="${predicted_animal}" ;">`;
            } else {
                console.error("Animal non trouvé dans le tableau 'classesMapping'");
            }
        } else {
            console.error('Erreur:', result.error);
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'image:", error);
    }
}