
//declaration des constantes
const donne = "../data/produit.json";
const formProduit =document.querySelector(".formProduit");
let panierProduit = JSON.parse(localStorage.getItem("panierProduit"))|| [];







// les ecoutteurs d'evenements
window.addEventListener("load", ()=>{
    if(!window.location.hash){
        window.location.hash = "#accueil"
    }
    afficherElementHash();
});
window.addEventListener("hashchange",afficherElementHash);

formProduit.addEventListener("submit",function(e){
    validForm(e);
});


// les fonctions sur le site

//function de hash
function afficherElementHash(){
    //declaration des constants
    const hash =window.document.location.hash.replace("#","")|| "#accueil";
    const vues =document.querySelectorAll("section");

    vues.forEach(vue => {
        if(vue.id === hash){
            vue.style.display = "block" ;
        }else{
            vue.style.display = "none";
        }
    });
}


async function recuperationDonne() {
        try {
            const response = await fetch(donne)
            if(!response.ok) throw new Error("errro lors du chargement des donne!");
            const dataElement = await response.json();
            return dataElement
        } catch (error) {
            
        }
}

 recuperationDonne().then(recu =>{
    creElementCategorie(recu);
    creElementProduit(recu);
    console.log(recu[0].nom)
});


//fonction de creation element 

function creElementCategorie(element){
    const produit = document.querySelector(".produits")
    produit.innerHTML = ""
    element.forEach((p,index) => {
        const div =document.createElement("div")
        div.classList = "produitCard";
        div.innerHTML = `
                <img src= ${element[index].img} alt="image i phone">
                <h3> ${element[index].nom} </h3>
                <p> ${element[index].prix} GNF</p>
                <button>ajouter au panier</button>`   
            produit.appendChild(div) 
    });
    

}

function creElementProduit(ele){
    const afficheProduit = document.querySelector(".affichage")
    afficheProduit.innerHTML = ""
    ele.forEach((p,index) => {
        const div =document.createElement("div")
        div.classList = "produt1";
        div.innerHTML = `
                <img src= ${ele[index].img} alt="image i phone" class ="elementImg">
                <h3> ${ele[index].nom} </h3>
                <p> ${ele[index].prix} GNF</p>
                <button>ajouter au panier</button>`   
            afficheProduit.appendChild(div) 
    });

}


//fonction de validation du formulaire
function validForm(event){
     event.preventDefault();

     //selection les elements 
     const nomProduit =document.querySelector("#nom").value;
     const PhotoFile =document.querySelector("#photo").value;
     const prixProduit =document.querySelector("#prix").value;
     const selElement = document.querySelector("#cate1").value;

    if(nomProduit ===""|| PhotoFile ===""|| prixProduit ===""||selElement ===""){
        alert("les champs ne dois pas etre vide!")
    }
    
    // element du tableau
    const produitUser ={
        nom:nomProduit,
        prix:prixProduit,
        photo:PhotoFile,
        categorie:selElement
    }
}
const PhotoFile = document.querySelector("#photo").value
const selElement = document.querySelector("#cate1").value;
console.log(selElement)


