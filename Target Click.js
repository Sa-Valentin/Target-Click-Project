const IniciarContagem = document.getElementById("iniciar");
const Desistir = document.getElementById("desistir");
const PausarJogo = document.getElementById("pausarjogo");
const DivTeste = document.getElementById("divteste")

PausarJogo.style.display = "none";
PausarJogo.disabled = true;

let Contagem = document.getElementById("tempo");
let LastTarget
let Estado = ""
let currentSeconds = parseTime(Contagem.textContent)
    // utiliza a função "parseTime" para gerar o total de segundos, obtidos do conteúdo de texto que está no "<p>"
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

    function TargetButton(){
        const Target = document.createElement("input");
        Target.type = "button"
        Target.id = "target"
        Target.style.position = "fixed";
        Target.style.display = "flex";
        Target.style.width = "65px";
        Target.style.height = "65px";
        Target.style.backgroundColor = "rgb(255, 102, 0)";
        Target.style.borderRadius = "50%";
        
        const marginTop = 120; // Altura do cronômetro e barra preta.
        const marginLeft = 160;
    
        const MaxWidth = window.innerWidth - 65 - marginLeft;; //Para limitar o Target aos limites da tela em exibição.
        const MaxHeight = window.innerHeight - 65 - marginTop; //Para limitar a altura máxima que o target pode ter até chegar ao limite da tela
    
        const RandomLeft = marginLeft + Math.random() * MaxWidth;
        const RandomTop = marginTop + Math.random() * MaxHeight;
    
        Target.style.left = `${RandomLeft}px`
        Target.style.top = `${RandomTop}px`
    
        document.body.appendChild(Target);

        LastTarget = Target;

        Target.addEventListener("click", function() {
            Target.remove(); // Remove o botão clicado.
            TargetButton(); // Cria um novo botão Target.
            currentSeconds += 2;
        Contagem.textContent = FormatTime(currentSeconds);
        });
        Estado = "jogoIniciado"

        DivTeste.addEventListener("click", function(event){ //Cliques na div decrementam o tempo
            
            if(LastTarget && !LastTarget.contains(event.target)){
                
                if (currentSeconds <= 0){
                    currentSeconds = 0
                }else {
                    currentSeconds -= 5;
                }
                Contagem.textContent = FormatTime(currentSeconds);
            }
        })
        
       
    }
        

IniciarContagem.addEventListener("click", function(){
    //Ao clicar no botão "iniciar", o input "PausarJogo" é criado e estilizado assim como o input "Desistir"

    if (Estado === ""){
        //Verifica se o estado é o atribuido inicialmente, para então criar o botão Target, que também atribui ao estado o valor "iniciado", para que ao pausar e continuar o jogo, o botão Target não seja criado novamente.
        TargetButton()
        currentSeconds += 5;
        Contagem.textContent = FormatTime(currentSeconds);
    }
    

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
    
    PausarJogo.style.display = "block";
    PausarJogo.disabled = false;
    
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
    
    PausarJogo.style.display = "none";
    PausarJogo.disabled = true;
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
