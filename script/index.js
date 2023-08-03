/* GLOBAL VARIABLES */
const tempoTotal = document.getElementById('tempo-total');
const tempoParcial = document.getElementById('tempo-parcial');
const tempoDePausa = document.getElementById('tempo-pausa').value;

const progressoBar = document.querySelector('#barraDeProgresso');

let progressoTotal = 100;



let contadorSegundos = 0;
let contadorMinutos = 0;
let contadorHora = 0;

if(contadorSegundos === 0){
    contadorSegundos = 59;
}

let setaIntervalo; //variavel que controla o fluxo de execução



/* FUNCTIONS */
function fecharTudo(){
    configs.classList.remove('active');
    overlay.classList.remove('active');
    menu.classList.remove("active");
}

//funcao que configura o pomodoro
function ajustePomodoro(event){
    event.preventDefault();
    contadorHora = tempoTotal.value;
    contadorMinutos = tempoParcial.value;

    if(!contadorHora && !contadorMinutos){
        fecharTudo();
        setTimeout(() => {
            alert(`Campos Hora e Minutos em branco`);
        }, 250);    
        hora.innerHTML = `00`;
        minutos.innerHTML = `00`;
    }else{
        if(contadorHora < 10 && contadorHora > 0){
            hora.innerHTML = `0${contadorHora}`;
            if(!contadorMinutos){
                contadorMinutos = "00";
            }
        }else{ //maior que 10
            hora.innerHTML = contadorHora;
            if(!contadorMinutos){
                contadorMinutos = "00";
            }
        }

        if(contadorMinutos < 10 && contadorMinutos > 0){
            minutos.innerHTML = `0${contadorMinutos}`;
            if(!contadorHora){
                hora.innerHTML = `00`;
            }
        }else{
            minutos.innerHTML = contadorMinutos;
            if(!contadorHora){
                hora.innerHTML = `00`;
            }
        }
    }

    fecharTudo();
} //-> Função OK!

function pomodoroTimer(){
    if(contadorHora > 0){      
        if(contadorMinutos > 0){
            console.log(`Loop 1º`);
            hora.innerHTML = (contadorHora > 0 && contadorHora < 10)  ? `0${contadorHora}` : contadorHora;
            minutos.innerHTML = (contadorMinutos > 0 && contadorMinutos < 10)  ? `0${contadorMinutos}` : contadorMinutos;
            contadorMinutos--;
            setaIntervalo = setInterval(() => {
                if (contadorSegundos === 0) {
                    if (contadorMinutos > 0) {
                        contadorMinutos--;
                        contadorSegundos = 59;
                    } else if(contadorHora > 0) {
                        contadorHora--;
                        contadorMinutos = 59;
                    }else if(contadorHora === 0 && contadorMinutos === 0 && contadorSegundos === 0){
                        clearInterval(setaIntervalo);
                    }
                } else {
                    contadorSegundos--;
                }
        
                // Atualiza os elementos na tela
                hora.innerHTML = (contadorHora > 0 && contadorHora < 10) ? `0${contadorHora}` : contadorHora;
                segundos.innerHTML = (contadorSegundos > 0) ? `${contadorSegundos}` : contadorSegundos;
                minutos.innerHTML = (contadorMinutos > 0 && contadorMinutos < 10) ? `0${contadorMinutos}` : contadorMinutos;
            }, 1000);
            
        }else{
            contadorHora--;
            contadorMinutos = 59;
            setaIntervalo = setInterval(() => {
                console.log(`Loop 2º`);
                if (contadorSegundos === 0) {
                    if (contadorMinutos > 0) {
                        contadorMinutos--;
                        contadorSegundos = 59;
                    } else if(contadorHora > 0) {
                        contadorHora--;
                        contadorMinutos = 59;
                    }else if(contadorHora === 0 && contadorMinutos === 0 && contadorSegundos === 0){
                        clearInterval(setaIntervalo);
                        hora.innerHTML = `00`
                        minutos.innerHTML = `00`
                        segundos.innerHTML = `00`
                    }
                } else {
                    contadorSegundos--;
                }
        
                // Atualiza os elementos na tela
                hora.innerHTML = (contadorHora > 0 && contadorHora < 10) ? `0${contadorHora}` : `00`;
                segundos.innerHTML = (contadorSegundos > 0) ? `${contadorSegundos}` : `00`;
                minutos.innerHTML = (contadorMinutos > 0 && contadorMinutos < 10) ? `0${contadorMinutos}` : contadorMinutos;
            }, 100);
        }
    }else{
        if (contadorMinutos > 0 && contadorHora < 1) {
            console.log(`Loop 3º`);
            hora.innerHTML = (contadorHora > 0 && contadorHora < 10) ? `0${contadorHora}` : `00`;
            minutos.innerHTML = (contadorMinutos > 0 && contadorMinutos < 10) ? `0${contadorMinutos}` : contadorMinutos;
            contadorMinutos--;
            setaIntervalo = setInterval(() => {
              contadorSegundos--;       
              if (contadorSegundos < 0) {
                contadorSegundos = 59;
                contadorMinutos--;

                if (contadorMinutos < 0) {
                  clearInterval(setaIntervalo);
                  minutos.innerHTML = `00`;
                  return;
                }
              }
          
              hora.innerHTML = (contadorHora > 0 && contadorHora < 10) ? `0${contadorHora}` : `00`;
              segundos.innerHTML = (contadorSegundos > 0) ? `${contadorSegundos}` : `00`;
              minutos.innerHTML = (contadorMinutos > 0 && contadorMinutos < 10) ? `0${contadorMinutos}` : `${contadorMinutos}`;
            }, 1000)
            }
    }
} //-> FIZ FUNCIONAR POREM PRECISA REFATORAR

function iniciaPomodoro(){
    pom.classList.add('active');
    pomodoroTimer();

    setInterval(()=>{
        if(contadorHora > 0){
            progressoBar.style.width = (contadorHora  * 3600)  / 60 + `%`;
        }else if(contadorMinutos > 0){
            progressoBar.style.width =  (contadorMinutos  * 60) / contadorSegundos + `%`;
        }else{
            progressoBar.style.width =  (contadorSegundos * contadorSegundos) / 1000 + `%`;
        }
    }, 1000)
}

function pausaPomodoro(){
    clearTimeout(setaIntervalo);
}

function continuaPomodoro(){
    contadorMinutos = contadorMinutos;
    pomodoroTimer()
}










/* EVENTS */

settings.addEventListener('click', ()=>{
    configs.classList.toggle('active');
    overlay.classList.toggle('active');
})

fecharConfigs.addEventListener('click', fecharTudo);
overlay.addEventListener('click', fecharTudo)

hamburguer.addEventListener('click', ()=>{
    menu.classList.toggle("active");
    overlay.classList.toggle('active');
})