// Récupérer éléments
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const tel = document.getElementById("tel");
const btn = document.getElementById("btn-add");
const tbody = document.getElementById("list-contact");
const indice_modifier = document.getElementById("indice");
const pagination = document.getElementById("pagination");
// Tableau des contacts
let tab_contact = [];
// Pagination
let pageActuelle = 1;
const elementsParPage = 5;
// Ajouter ou modifier
btn.onclick = function(){
    if(prenom.value.trim() == "" || nom.value.trim() == "" || tel.value.trim() == ""){
        alert("Tous les champs sont obligatoires");
    }else{
        let c = {
            prenom: prenom.value.trim(),
            nom: nom.value.trim(),
            tel: tel.value.trim(),
        };
        // AJOUT
        if(indice_modifier.value == ""){
            tab_contact.push(c);
        }
        // MODIFICATION
        else{
            tab_contact[indice_modifier.value] = c;
            indice_modifier.value = "";
            btn.innerText = "Ajouter";
            btn.classList.remove("btn-warning");
            btn.classList.add("btn-success");
        }
    remplirTableau();
        // Vider champs
        prenom.value = "";
        nom.value = "";
        tel.value = "";
    }
};
// Afficher tableau
function remplirTableau(){
    tbody.innerHTML = "";
    // Début
    const debut = (pageActuelle - 1) * elementsParPage;
    // Fin
    const fin = debut + elementsParPage;
    // Découpage
    const contactsPage = tab_contact.slice(debut, fin);
    contactsPage.forEach((contact, indice) => {
        tbody.innerHTML += `<tr>
            <td>${debut + indice + 1}</td>
            <td>${contact.prenom}</td>
            <td>${contact.nom}</td>
            <td>${contact.tel}</td>
            <td>
                <button class="btn btn-sm btn-outline-warning" onclick="modifierContact(${debut + indice})">🖍️</button>
                <button class="btn btn-sm btn-outline-danger" onclick="supprimerContact(${debut + indice})"> ❌</button>
            </td>
        </tr>`;
    });
    afficherPagination();
}
// Supprimer
function supprimerContact(position){
    if(confirm("Voulez-vous supprimer ce contact ?")){
        tab_contact.splice(position, 1);
        remplirTableau();
    }
}
// Modifier
function modifierContact(position){
    indice_modifier.value = position;
    prenom.value = tab_contact[position].prenom;
    nom.value = tab_contact[position].nom;
    tel.value = tab_contact[position].tel;
    btn.innerText = "Mettre à jour";
    btn.classList.remove("btn-success");
    btn.classList.add("btn-warning");
}
// Afficher pagination
function afficherPagination(){
    pagination.innerHTML = "";
    const nombrePages = Math.ceil(tab_contact.length / elementsParPage);
    // Bouton précédent
    pagination.innerHTML += `<li class="page-item ${pageActuelle == 1 ? 'disabled' : ''}">
        <button class="page-link" onclick="changerPage(${pageActuelle - 1})">
            Précédent
        </button>
    </li>`;
    // Numéros des pages
    for(let i = 1; i <= nombrePages; i++){
        pagination.innerHTML += `<li class="page-item ${pageActuelle == i ? 'active' : ''}">
            <button class="page-link" onclick="changerPage(${i}) >
                ${i}
            </button>
        </li>`;
    }
    // Bouton suivant
    pagination.innerHTML += `<li class="page-item ${pageActuelle == nombrePages ? 'disabled' : ''}">
        <button class="page-link" onclick="changerPage(${pageActuelle + 1})">
            Suivant
        </button>
    </li>`;
}
// Changer page
function changerPage(page){
    const nombrePages = Math.ceil(tab_contact.length / elementsParPage);
    if(page < 1 || page > nombrePages){
        return;
    }
    pageActuelle = page;
    remplirTableau();
} 
// Rechercher
let recherche = document.getElementById("recherche");
recherche.addEventListener("keyup", function () {
    let valeur = recherche.value.toLowerCase();
    let lignes = document.querySelectorAll("tbody tr");
    lignes.forEach(function (ligne) {
        let nom = ligne.cells[0].textContent.toLowerCase();
        let prenom = ligne.cells[1].textContent.toLowerCase();
        if (nom.startsWith(valeur) || prenom.startsWith(valeur)) {
            ligne.style.display = "";
        } else {
            ligne.style.display = "none";
        }
    });

});
