const formulario = document.getElementById('formulario')
const listaTweets= document.getElementById('lista-tweets')


let tweets=[]

// los listeners y tal:
eventListeners();

function eventListeners(){
formulario.addEventListener('submit', agregarTweet)
document.addEventListener('DOMContentLoaded', ()=>{
    tweets=JSON.parse(localStorage.getItem('tweets'))||[]
    console.log(tweets)
    crearHTML()
})
}
// las funciones y tal:


function agregarTweet(e){
    e.preventDefault();
    const tweet= document.getElementById('tweet').value

    
    if (tweet===''){
        mostrarError('El mensaje no puede ir vacio.');
        return;
    }

    const tweetObj={
        id:Date.now(), tweet:tweet
    }
    
    

    tweets=[...tweets,tweetObj]
    crearHTML();
    formulario.reset();
    // console.table(tweets)
}


function mostrarError (error){
    const mensajeError=document.createElement('p');
    mensajeError.textContent=error;
    mensajeError.classList.add('error')

    const contenido=document.getElementById('contenido')
    contenido.appendChild(mensajeError)

    setTimeout(()=>{
        mensajeError.remove();},2000)
    
}


function crearHTML(){
    limpiarHTML();
    if (tweets.length>=0){
        

        tweets.forEach((tweet)=>{
            const botonBorrar=document.createElement('a')
            botonBorrar.classList='borrar-tweet'
            botonBorrar.innerText='Eliminar'

            botonBorrar.onclick=()=>{
                borrarTweet(tweet.id);
            }

            const li=document.createElement('li')   
            li.textContent=tweet.tweet
            
            li.appendChild(botonBorrar)
            
            listaTweets.appendChild(li);
        })
    }
    agregarStorage();
}


function limpiarHTML(){
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstElementChild)
    }
}


function agregarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

function borrarTweet(id){
    tweets=tweets.filter(tweet=>tweet.id!==id)
    crearHTML()
}