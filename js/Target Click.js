const IniciarContagem = document.getElementById("iniciar");
const Desistir = document.getElementById("desistir");
const PausarJogo = document.getElementById("pausarjogo");
const DivButtons = document.getElementById("DivButtons");

let FireGif = document.getElementById("gifFire");
let targetTimers = [];
let Penalidade = 5;
let Contagem = document.getElementById("tempo");
let AllTargets = [];
let Estado = "";
let currentSeconds = parseTime(Contagem.textContent); // utiliza a função "parseTime" para gerar o total de segundos, obtidos do conteúdo de texto que está no "<p>"
let timerInterval;
let targetsClicked = 0;
let targetSize = 80;
let ComboScreen = document.getElementById("comboScreen");

let Combo = 0;

PausarJogo.style.visibility = "hidden";
FireGif.style.visibility = "hidden";
Contagem.style.visibility = "hidden";
Desistir.style.visibility = "hidden";

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

    function TargetButton(){
        const Target = document.createElement("input");
        Target.type = "button";
        Target.id = "target";
        Target.style.position = "fixed";
        Target.style.display = "flex";
        Target.style.width = `${targetSize}px`;
        Target.style.height = `${targetSize}px`;
        Target.style.backgroundColor = "rgb(255, 61, 2)";
        Target.style.borderRadius = "50%";
        
        
        const marginTop = 120; // Altura do cronômetro e barra preta.
        const marginLeft = 160;
    
        let MaxWidth = window.innerWidth - targetSize - marginLeft; //Para limitar o Target aos limites da tela em exibição.
        let MaxHeight = window.innerHeight - targetSize - marginTop; //Para limitar a altura máxima que o target pode ter até chegar ao limite da tela
    
        const RandomLeft = marginLeft + Math.random() * MaxWidth;
        const RandomTop = marginTop + Math.random() * MaxHeight;
    
        Target.style.left = `${RandomLeft}px`;
        Target.style.top = `${RandomTop}px`;
    
        document.body.appendChild(Target);

        AllTargets.push(Target); //adiciona todos os targets criados no array

        LastTarget = Target;

        const timeoutId = setTimeout(() => {
            if (document.body.contains(Target) && Estado === "jogoIniciado"){
                Target.remove();
                TargetButton();
                currentSeconds -= Penalidade;
                Contagem.textContent = FormatTime(currentSeconds);
                
            }if (currentSeconds <= 0){
                currentSeconds = 0;
                Contagem.textContent = FormatTime(currentSeconds);
            }
          }, 4000);

          targetTimers.push(timeoutId);

        Target.addEventListener("click", function() {
            if (Estado === "jogoIniciado"){
                Target.remove(); // Remove o botão clicado.
                TargetButton(); // Cria um novo botão Target.

                currentSeconds += 5;
                Contagem.textContent = FormatTime(currentSeconds);

                Combo++;
                targetsClicked++;
                    console.log(`${targetsClicked} targets`);
                    ComboScreen.textContent = `${Combo}`;
        
        }
        
        if (targetsClicked === 10 || targetsClicked === 40){ //Construção do desafio progressivo
            TargetButton();
            targetSize = 65;
            Penalidade = 10;
        }
        
        if (targetsClicked === 80){
            targetSize = 50;
            TargetButton();
            Penalidade = 20;
        }

        if (targetsClicked === 150){
            targetSize = 30;

        }

        if (Combo >= 15 && Combo < 50){ //começo do efeito visual de progressão
            ComboScreen.style.color = "rgb(240, 240, 0)";
        }else if (Combo >= 50 && Combo < 100){
            FireGif.style.visibility = "visible";
            FireGif.style.backgroundImage = "url('./assets/images/fogo.gif')";
            ComboScreen.style.color = "orange";
        }else if (Combo >= 100 && Combo < 1000){
            FireGif.style.backgroundImage = "url('./assets/images/fogo_2x_speed.gif')";
            ComboScreen.style.color = "red";
        }else if (Combo >= 1000){
            ComboScreen.style.color = "purple";
        }

        
        });
        
    }

    DivButtons.addEventListener("click", function(event){ //Cliques na div decrementam o tempo
        ComboScreen.style.color = "black";
        FireGif.style.visibility = "hidden";
        if(LastTarget && !LastTarget.contains(event.target)){
            
            if (currentSeconds <= 0){
                currentSeconds = 0;
                ComboScreen.style.backgroundImage = null;
                Combo = 0;
                ComboScreen.style.color = "black";
            }else if (Estado === "jogoIniciado") {
                currentSeconds -= Penalidade;
                Combo = 0;
                ComboScreen.textContent = null
                console.log(currentSeconds)
                ComboScreen.style.backgroundImage = null;
            }
            Contagem.textContent = FormatTime(currentSeconds);
        }
        
    })
        

IniciarContagem.addEventListener("click", function(){
    currentSeconds += Penalidade;
    if (Estado === ""){
        //Verifica se o estado é o atribuido inicialmente, para então criar o botão Target, que também atribui ao estado o valor "iniciado", para que ao pausar e continuar o jogo, o botão Target não seja criado novamente.
        TargetButton()
        Contagem.textContent = FormatTime(currentSeconds);
        Estado = "jogoIniciado"
    }
    
    Desistir.style.visibility = "hidden";
    PausarJogo.style.visibility = "visible";
    Contagem.style.visibility = "visible";

    AllTargets.forEach(target => {
        if (document.body.contains(target)) {
            target.style.visibility = "visible";
        }
      });

    if (Estado === "pausado"){
        Estado = "jogoIniciado"
    }
    PausarJogo.style.transition = "width 0.3s ease, height 0.3s ease";
    // Adicionando o hover dinamicamente com JavaScript
    PausarJogo.addEventListener("mouseover", () => {
        PausarJogo.style.width = "3.5vw";
        PausarJogo.style.height = "3.5vw";

    });
    PausarJogo.addEventListener("mouseout", () => {
        PausarJogo.style.backgroundColor = ""; // Volta ao estilo original
        PausarJogo.style.width = "3vw";
        PausarJogo.style.height = "3vw";
    });
    
    PausarJogo.style.backgroundImage = "url('assets/images/PauseImage.png')";
    PausarJogo.style.backgroundSize = "cover";
    PausarJogo.style.backgroundPosition = "center";
    PausarJogo.style.visibility = "visible";
    
    PausarJogo.addEventListener("click", function(){
        clearInterval(timerInterval);
        timerInterval = null
        Estado = "pausado" 

        Combo = 0;
        ComboScreen.textContent = null

        IniciarContagem.style.left = "45%";
        IniciarContagem.style.visibility = "visible";

        Desistir.style.visibility = "visible";
        PausarJogo.style.visibility = "hidden";

    AllTargets.forEach(target => {
        if (document.body.contains(target)) {
            target.style.visibility = "hidden";
        }
      });
});

    timerInterval = setInterval(() => {
        if (currentSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            ComboScreen.style.color = "black";
            ComboScreen.textContent = null
            FireGif.style.visibility = "hidden";

            AllTargets.forEach(target => {
                  target.remove();
                
              });
              
              AllTargets = []; // Limpa o array
            targetTimers.forEach(clearInterval);
            targetTimers = [];
        }

        currentSeconds--;
        Contagem.textContent = FormatTime(currentSeconds); 
    }, 1000);

        IniciarContagem.style.visibility = "hidden";
});

    function DesistirButton(){
            Desistir.style.visibility = "hidden";
            Estado = ""
            clearInterval(timerInterval);
            timerInterval = null
            Combo = 0;
            ComboScreen.style.color = "black";
            ComboScreen.textContent = null

        Contagem.textContent = "02:00";
            currentSeconds = 120;
            targetsClicked = 0;
            targetSize = 80;
            Penalidade = 5;

            AllTargets.forEach(target => {
                if (document.body.contains(target)) {
                  target.remove();
                }
              });

              AllTargets = []; // Limpa o array
            targetTimers.forEach(clearInterval);
            targetTimers = [];
        

        IniciarContagem.style.display = "block";
        IniciarContagem.disabled = false;
        IniciarContagem.style.left = "48vw";
    }

    Desistir.addEventListener("click", function(){
        DesistirButton()
    })

    window.onload = function () {
    // Espera 3 segundos (duração da animação) para exibir o conteúdo
        setTimeout(function () {
        // Oculta a tela de carregamento
            document.querySelector('#loadingScreen').style.display = 'none';
        
        // Exibe o conteúdo real da página
            document.querySelector('.content').style.display = 'block';
    }, 2300);
};