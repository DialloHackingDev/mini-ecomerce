
//import des module js
import { produits } from "../data/produit.js";

// console.log(produits)

//style pour le nav
const nav = document.querySelector("nav");
window.addEventListener("scroll",()=>{
    if(window.scrolleY !== 0){
        nav.style.background ="transparent"
    }else{
        nav.style.background = "#fff"
    }
})

const search = document.querySelector("#search");
const barreRecher = document.querySelector(".conteneurRecher");
const panierConten =document.querySelector(".panierConteneur");
const btnShop =document.querySelector("#shop");
const utilisateur = document.querySelector(".utilisateur");
const btnUser = document.querySelector("#user-icon");


const panierConteneur = document.querySelector(".panierConteneur");

// Sélectionne l'input de recherche (assure-toi que ton HTML a bien <input id="search-input">)
const searchInput = document.querySelector("#search-input");
if (searchInput) {
    // Quand on tape dans la barre de recherche, on lance la recherche
    searchInput.addEventListener("input", rechercherProduit);
}





// Fonction de recherche des produits
// Cette fonction filtre les produits selon le texte tapé dans la barre de recherche
function rechercherProduit() {
    const valeurChercher = searchInput.value.toLowerCase();
    if (valeurChercher.trim() === "") {
        // Si l'input est vide, on réaffiche tous les produits (état initial)
        produitDinamiq();
        return;
    }
    // Sinon, on filtre normalement
    const produitFilteres = produits.filter(produit =>
        produit.nom.toLowerCase().includes(valeurChercher)
    );
    afficherProduitFilter(produitFilteres);
}


//fonction afficher produit filter
function afficherProduitFilter(produits){
    const produitList = document.querySelector(".produitBox");
    if(!produitList) return;
    produitList.innerHTML = "";
    produits.forEach(data =>{
        const div = document.createElement("div");
        div.className = "produitBoxContent";
        // Correction : ajout de guillemets autour de ${data.image} pour l'attribut src
        div.innerHTML = ` 
                   <img src="${data.image}" alt="">
                    <h2 class="nom">${data.nom}</h2>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                        <span class="prix">${data.prix}</span>
                        <i class="fa fa-shopping-cart ajouter-panier"></i>`;
        produitList.appendChild(div);
    });
    // On laisse le CSS gérer la largeur
}





// les evenements de mon script
search.addEventListener("click",()=>{
    barreRecher.classList.toggle("active");
    panierConten.classList.remove("active");
    utilisateur.classList.remove("active");
})
btnShop.addEventListener("click",()=>{
    panierConten.classList.toggle("active");
    barreRecher.classList.remove("active");
    utilisateur.classList.remove("active");
})

btnUser.addEventListener("click",()=>{
    utilisateur.classList.toggle("active");
    barreRecher.classList.remove("active");
    panierConten.classList.remove("active");
})



//gestion de la parite panier du site
let panier = [];


if(localStorage.getItem("panier")){
    panier = JSON.parse(localStorage.getItem("panier"));
    afficherPanier();
}


// Correction du sélecteur pour le bouton d'ajout au panier (ajouter-panier)
function activerAjoutPanier() {
    document.querySelectorAll(".ajouter-panier").forEach(boutton =>{
        boutton.addEventListener("click",()=>{
            const produitDiv = boutton.closest(".produitBoxContent");
            const nom = produitDiv.querySelector(".nom").textContent;
            const prix = parseInt(produitDiv.querySelector(".prix").textContent);
            const image = produitDiv.querySelector("img").getAttribute("src");
            const id = nom + prix;
            const existant = panier.find(p => p.id === id);
            if(existant){
                existant.quantite += 1;
            }else{
                panier.push({id,nom,prix,quantite:1,image});
            }
            sauvegarderEtAfficher();
        });
    });
}


//ajouter au panier
function afficherPanier(){
    const liste = document.querySelector(".content1");
    if(liste) liste.innerHTML = "";
    panierConteneur.innerHTML = "";

    let total = 0;

    panier.forEach((produit,index) =>{
        total += produit.prix * produit.quantite;
        // pour l'entete du panier
        const elemEtet = document.createElement("div");
        elemEtet.className = "cartPanier";

        const div = document.createElement("div");
        div.className = "ligne-panier";

        // Création du contenu HTML sans les onclick inline
        div.innerHTML = ` 
                <img src="${produit.image} " alt="imge produit">
                <div class="infoPanier">
                    <h3> ${produit.nom} </h3>
                    <p>prix: ${produit.prix} GNF</p>
                    <label>quantite: <input type="number" value="${produit.quantite}" min="1" readonly></label>
                    <label class="total"> sous total :${produit.prix * produit.quantite} GNF</label>
                    <button class="btn-plus">+</button>
                    <button class="btn-moins">-</button>
                    <button class="btn-supprimer"><i class="fa fa-trash"></i></button>
                </div>`;

        // Ajout des écouteurs d'événements pour +, - et supprimer
        const btnPlus = div.querySelector('.btn-plus');
        const btnMoins = div.querySelector('.btn-moins');
        const btnSupprimer = div.querySelector('.btn-supprimer');
        btnPlus.addEventListener('click', () => changeQuantite(index, 1));
        btnMoins.addEventListener('click', () => changeQuantite(index, -1));
        btnSupprimer.addEventListener('click', () => supprimer(index));

        // Ajout du contenu pour le panier latéral avec boutons interactifs
        elemEtet.innerHTML = `
            <img src="${produit.image}" alt="image panier">
                    <div class="cartText">
                        <h3>${produit.nom} </h3>
                        <span>${produit.prix}</span>
                        <span>${produit.quantite}x</span>    
                    </div>
                    <div class="controlPanier">
                        <button class="btn-plus"><i class="fa fa-plus"></i></button>
                        <button class="btn-moins"><i class="fa fa-minus"></i></button>
                    </div>
                    <div class="poubell">
                        <button class="btn-supprimer"><i class="fa fa-trash"></i></button>
                    </div>
                    <h2 class="total">total:${produit.prix * produit.quantite} GNF</h2>
                    <a href="#" class="btn">voir panier</a>`;

        // Ajout des écouteurs d'événements pour +, - et supprimer dans le panier latéral
        const btnPlusSide = elemEtet.querySelector('.btn-plus');
        const btnMoinsSide = elemEtet.querySelector('.btn-moins');
        const btnSupprimerSide = elemEtet.querySelector('.btn-supprimer');
        btnPlusSide.addEventListener('click', () => changeQuantite(index, 1));
        btnMoinsSide.addEventListener('click', () => changeQuantite(index, -1));
        btnSupprimerSide.addEventListener('click', () => supprimer(index));

        if(liste) liste.appendChild(div);
        panierConteneur.appendChild(elemEtet);
    });

// Fonction qui calcule la somme totale de tous les produits dans le panier
function getTotalPanier() {
    // On additionne le prix * quantité de chaque produit
    return panier.reduce((somme, produit) => somme + (produit.prix * produit.quantite), 0);
}

    // Affichage du total général en bas de la liste principale
    if(liste) {
        const totalDiv = document.createElement('div');
        totalDiv.className = 'total-panier-global';
        totalDiv.innerHTML = `<h2>Total du panier : ${getTotalPanier()} GNF</h2>`;
        liste.appendChild(totalDiv);
    }

    // Affichage du total général dans le panier latéral
    const totalSideDiv = document.createElement('div');
    totalSideDiv.className = 'total-panier-global-side';
    totalSideDiv.innerHTML = `<h2>Total du panier : ${getTotalPanier()} GNF</h2>`;
    panierConteneur.appendChild(totalSideDiv);

    console.log(getTotalPanier());
}
if (panier.length > 0) {
    console.log(panier[0].quantite);
}
//pour changer la quantite
// Fonction pour changer la quantité d'un produit dans le panier
// index : position du produit dans le tableau panier
// variation : +1 pour ajouter, -1 pour retirer
// Fonction pour changer la quantité d'un produit dans le panier
// index : position du produit dans le tableau panier
// variation : +1 pour ajouter, -1 pour retirer
function changeQuantite(index, variation) {
    // Vérifie que l'index est valide
    if (index < 0 || index >= panier.length) return;

    // Ajoute la variation à la quantité actuelle
    panier[index].quantite += variation;

    // Si la quantité devient inférieure à 1, on retire le produit du panier
    if (panier[index].quantite < 1) {
        panier.splice(index, 1);
    }

    // Sauvegarde le panier dans le localStorage et met à jour l'affichage
    sauvegarderEtAfficher();
}

//fonction supprimer
function supprimer(index){
    alert("voulez vous retirer ce produit!");
    panier.splice(index,1);
    localStorage.setItem("panier",JSON.stringify(panier));
    sauvegarderEtAfficher();
    alert("produit supprimer avec sucess !")
}

//fonction sauvegarde et afficher
function sauvegarderEtAfficher(){
    localStorage.setItem("panier",JSON.stringify(panier));
    afficherPanier();
}

//pour l'affichage dynamique


// Sauvegarde la liste des produits dans le localStorage
localStorage.setItem("produits", JSON.stringify(produits));

//recuperation depuis le local
const saveProduits = JSON.parse(localStorage.getItem("produits"));

//afficchage dynamique


function produitDinamiq(){
    const produitList = document.querySelector(".produitBox");
    if(!produitList) return;
    produitList.innerHTML = "";
    saveProduits.forEach(data =>{
        const div = document.createElement("div");
        div.className = "produitBoxContent";
        // Correction : ajout de guillemets autour de ${data.image} pour l'attribut src
        div.innerHTML = ` 
                   <img src="${data.image}" alt="">
                    <h2 class="nom">${data.nom}</h2>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                        <span class="prix">${data.prix}</span>
                        <i class="fa fa-shopping-cart ajouter-panier"></i>`;
        produitList.appendChild(div);
    });
    activerAjoutPanier();
}
produitDinamiq();


//fonction pour le hash du site 
function gererHash(){
    const hash = window.location.hash.replace("#","") || "#accueil";
    const section = document.querySelectorAll("section");
    section.forEach(element => {
        if (element.id == hash) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
    // Masquer le footer sur la section accueil ET la section panier
    const footer = document.querySelector("footer");
    if (footer) {
        if (hash === "accueil" || hash === "#accueil" || hash === "elementPanier" || hash === "#elementPanier") {
            footer.style.display = "none";
        } else {
            footer.style.display = "";
        }
    }
}

//afficher la bonne section au chargement 
window.addEventListener("load",gererHash);
//change de section quand le hash change
window.addEventListener("hashchange",gererHash);
