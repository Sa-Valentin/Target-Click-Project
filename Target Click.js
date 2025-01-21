const IniciarContagem = document.getElementById("iniciar");
const Desistir = document.getElementById("desistir");
let Contagem = document.getElementById("tempo");
let Estado = ""

let TimeInterval;

function FormatTime(seconds){
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");

    return `${minutes}:${secs}`; 
}

function parseTime(timeString){
    const [minutes, seconds] = timeString.split(":").map(Number);
    //array com os valores de horas, minutos e segundos, divide os valores e os converte para Number.

    return minutes * 60 + seconds;
}

    document.body.appendChild(Desistir);

IniciarContagem.addEventListener("click", function(){

    //Ao clicar no botão "iniciar", o input "PausarJogo" é criado e estilizado assim como o input "Desistir"
    let currentSeconds = parseTime(Contagem.textContent)
    // utiliza a função "parseTime" para gerar o total de segundos, obtidos do conteúdo de texto que está no "<p>"
    const PausarJogo = document.createElement("input");
    PausarJogo.type = "button"
    PausarJogo.id = "pausarjogo"
    PausarJogo.style.position = "fixed";
    PausarJogo.style.display = "flex";
    PausarJogo.style.top = "7.5%";
    PausarJogo.style.left = "5px";
    PausarJogo.style.width = "65px";
    PausarJogo.style.height = "65px";
    PausarJogo.style.borderRadius = "8%";

    if (Estado === "pausado"){
        Desistir.style.display = "none";
        Desistir.disabled = true;
        Estado = ""
    }
    
    // Adicionando o hover dinamicamente com JavaScript
    PausarJogo.addEventListener("mouseover", () => {
        PausarJogo.style.backgroundColor = "rgb(218, 218, 218)";
    });
    PausarJogo.addEventListener("mouseout", () => {
        PausarJogo.style.backgroundColor = ""; // Volta ao estilo original
    });
    
    PausarJogo.addEventListener("click", function(){
    clearInterval(timerInterval);
    timerInterval = null
    Estado = "pausado" 

    IniciarContagem.style.right = "52%"
    IniciarContagem.value = "Continuar"
    IniciarContagem.style.display = "block";
    IniciarContagem.disabled = false;

    Desistir.style.display = "block";
    Desistir.disabled = false;
    
    PausarJogo.remove();
});
    
    document.body.appendChild(PausarJogo)

    timerInterval = setInterval(() => {
        currentSeconds--;
        Contagem.textContent = FormatTime(currentSeconds); 
       
        if (currentSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null; 
        }
    }, 1000);

    IniciarContagem.style.display = "none";
    IniciarContagem.disabled = true;
});

    function DesistirButton(){
        Desistir.style.display = "none";
        Desistir.disabled = true;
        Estado = ""
        let Pause = document.getElementById("pausarjogo");

        if (Pause){
            Pause.remove()
        }
        currentSeconds = 300;

        IniciarContagem.style.display = "block";
        IniciarContagem.disabled = false;
        IniciarContagem.style.right = "48%";
        IniciarContagem.value = "Começar"
    }

    Desistir.addEventListener("click", function(){
        DesistirButton()
    })
    
    Desistir.addEventListener("click", function(){
        DesistirButton();
    })


window.onload = function () {
    // Espera 3 segundos (duração da animação) para exibir o conteúdo
    setTimeout(function () {
        // Oculta a tela de carregamento
        document.querySelector('#loadingScreen').style.display = 'none';
        
        // Exibe o conteúdo real da página
        document.querySelector('.content').style.display = 'block';
    }, 300);
};