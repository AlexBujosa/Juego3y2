var miMazo = []
var ComputerMazo = []
var mazo = []
var Carta = []
var carta;
var left = 450;
var turno = false;
var evaluador = 0;

function esconder(element1, element2, element3)
{
    element1.style.display ="none";
    element2.style.display = "none";
    element3.style.display = "none";
}

function play()
{
    var element1 = document.getElementById("object");
    var element2 = document.getElementById("object1");
    var element3 = document.getElementById("objects");
    element1.style.opacity = 0;
    element2.style.opacity = 0;
    element3.style.opacity = 0;
    GenerarMazo();
    mazo = barajarMazo(mazo);
    RecogerCartas();
    setTimeout(function(){
        esconder(element1, element2, element3);
        document.getElementById("MazoOculto").style.display = "block";
        container = document.getElementById("parent");
        container.style.display = "block";
        cartaArriba();
        var div  = document.querySelector("div").style.marginTop = "3%";
        crearCartasPlayer1();
        crearCartasComputer();
    },3000);
    Verificar(1, miMazo);
    Verificar(1,ComputerMazo);
}
function RecogerCartas()
{
    for(var i = 0; i<5; i++)
    {
        miMazo.push(mazo.pop());
        ComputerMazo.push(mazo.pop());
    }
    Carta.push(mazo.pop())
}
function barajarMazo(a)
{
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
function MazoCentralOculto()
{
    if(miMazo.length == 5 && turno == false)
    {
        moverCartaMazoCentralOculto();
    }
    else if(mazo.length == 0 && turno == false)
    {
        document.getElementById("MazoOculto").display = "none";
    }
}
function MazoCentralVisto()
{
    if(miMazo.length == 5 && turno == false)
    {
        moverCartaCentral();
    }
}
function crearCartasPlayer1()
{
    var i = 0;
    var parent = document.querySelector('div');
    var ul = document.createElement('ul');
    ul.id = "parent1";
    parent.appendChild(ul);
    ul.style.display = "block"
    
    var interval = setInterval(function(){ 
        var li = document.createElement('li');
        var carta = document.createElement('img');
        carta.src = miMazo[i][1];
        carta.id = miMazo[i][0];
        li.id = miMazo[i][0] + 'li';
        carta.setAttribute('onclick','dragstart('+ miMazo[i][0] +')');
        carta.className = "cartaJugador";
        carta.style.display = "block";
        li.appendChild(carta);
        ul.appendChild(li);
        apareceCarta(carta);
        i++;
        if(i == 5)
        {
            clearInterval(interval);
        }
    },1000);
}
function crearCartasComputer()
{
    var i = 0;
    var ulC = document.getElementById('parentComputer');
    ulC.style.display = "block";
    var interval = setInterval(function(){ 
        var li = document.createElement('li');
        var carta = document.createElement('img');
        carta.src = "cartas/ParteTrasera.PNG";
        carta.id = ComputerMazo[i][0];
        li.id = ComputerMazo[i][0] + 'li';
        carta.className = "cartaComputer";
        carta.style.display = "block";
        li.appendChild(carta);
        ulC.appendChild(li);
        apareceCarta(carta);
        i++;
        if(i == 5)
        {
            clearInterval(interval);
        }
    },1000);

}
function Valor_Carta(mazoUser)
{
    var i = 0;
    var Valor = [];
    var operacion = 0;
    mazoUser.forEach(function(element){
        operacion = 0;
        operacion = parseInt(element[0]) % 13;
        Valor.push(operacion + 1);
        i++;
    });
    return Valor;
}
function Verificar(numero, mazo)
{
    var ValorCarta = [];
    if(numero == 1)
    {
        setTimeout(function(){
            ValorCarta = Valor_Carta(mazo);
            Ganar(ValorCarta);
        },13000);
    }
    else
    {
        setTimeout(function(){
            ValorCarta = Valor_Carta(mazo);
            Ganar(ValorCarta);
        },1000);
    }
}
function revisarRepeticiones(ValorCarta)
{
    var n = 0;
    var contador = 0;
    for(var i = 0;i<ValorCarta.length - 1;i++)
    {
        n = 0;
        for(var a = i + 1;a<ValorCarta.length;a++)
        {
            if(ValorCarta[i] == ValorCarta[a])
            {
                n++;
                ValorCarta.splice(a,1);
                a--;
            }
        }
        if(n == 2 || n == 1)
        {
            contador++;
        }
    }
    return contador;
}
function Ganar(ValorCarta)
{
    var ValorCartaunicos = Array.from(new Set(ValorCarta));
    if(ValorCartaunicos.length == 2 && turno == false && revisarRepeticiones(ValorCarta) == 2)
    {
        alert("Felicidades Usted Ha ganado");
        voltearCartaComputer();
        reiniciar();
    }
    else if(ValorCartaunicos.length == 2 && turno == true && revisarRepeticiones(ValorCarta) == 2)
    {
        alert("Usted ha perdido");
        voltearCartaComputer();
        reiniciar();
    }
    else
    {

        Turno(evaluador);
        evaluador++;

    }
}
function Turno()
{   
    if(turno == false && evaluador > 1)
    {
        turno = true;
        JuegaComputer();
    }
    else
    {
        turno = false;
    }
}
function reiniciar()
{
    alert("Espera 5 segundos");
    setTimeout(function(){
        location.reload();
    },5000);
}
function voltearCartaComputer()
{
    var img = document.getElementsByClassName("cartaComputer");
    for(let i=0; i<img.length; i++){
        img[i].src = ComputerMazo[i][1];  
    }
}