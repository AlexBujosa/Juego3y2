var idCard;
var clickeo = false;
function apareceCarta(carta)
{
    var timing = setTimeout(function(){
        carta.style.opacity = 1;
    },1000);
}
function dragstart(id)
{
    if(miMazo.length != 5 && turno == false)
    {
        var moverCarta = document.getElementById(id);
        moverCarta.addEventListener('dragstart', e => {
        console.log("drag start");
        });
        idCard = id;
        clickeo = true;
    }
}
function moverCartaMazoCentralOculto()
{
    moverCartaGenerico(1);
}
function moverCartaCentral()
{
    moverCartaGenerico(2);
}
function moverCartaGenerico(numero)
{
    var moverCarta;
    if(numero == 1)
    {
        moverCarta = mazo.pop();
    }
    else
    {
        moverCarta = Carta.pop();
    }
    var length = miMazo.length;
    var ul = document.getElementById('parent1');
    var li = document.createElement('li');
    var carta = document.createElement('img');
    miMazo.push(moverCarta);
    carta.src = miMazo[length][1];
    carta.id = miMazo[length][0];
    li.id = miMazo[length][0] + 'li';
    carta.setAttribute('onclick','dragstart('+ miMazo[length][0] +')');
    carta.className = "cartaJugador";
    carta.style.display = "block";
    li.appendChild(carta);
    ul.appendChild(li);
    apareceCarta(carta);
    cartaArriba();
}
function cartaArriba()
{
    carta = document.getElementById("MazoVer");
    if(Carta.length == 0)
    {
        carta.src = "cartas/sinCarta.PNG";
    }
    else
    {
        try
        {
            carta.src = Carta[Carta.length - 1][1];
             carta.style.display = "block";
        }
        catch(error)
        {

        }
    }
}
var MazoVer = document.querySelector('#MazoVer');

MazoVer.addEventListener('dragenter', e => {
    var elementIndex = null;
    var element = [];
    if(miMazo.length != 5 && clickeo == true)
    {
        for(var i = 0; i<miMazo.length;i++)
        {
            if(miMazo[i][0] == idCard)
            {
                elementIndex = i;
                element = miMazo[i];
            }
        }
        Carta.push(element);
        cartaArriba();
        miMazo.splice(elementIndex,1);
        var LiEliminada = document.getElementById(element[0] + 'li');
        LiEliminada.remove();
        clickeo = false;
        Verificar(2,miMazo);
    }    
});
    


    