function JuegaComputer()
{
    var ValorCarta = Valor_Carta(ComputerMazo);
    var CartaVer = [];
    CartaVer.push(Carta[Carta.length - 1]); 
    var ValorCartaVer = Valor_Carta(CartaVer).toString();
    // Retorna el indice y la Cantidad de Cartas repetidas en el mazo de la computadora que se ven  en el mazo central izquierdo
    var Cantidad = 0;
    var indiceImportante = []
    var value  = ComputerRevisaCarta(ValorCarta,ValorCartaVer);
    Cantidad = parseInt(value[0]);
    value[1].forEach(function(element){
        indiceImportante.push(element);
    });
    ComputerAgregaCarta(Cantidad,ValorCarta,indiceImportante);
    

    //ComputerRevisaCarta(ValorCarta,CartaVer);
    
}
function ComputerRevisaCarta(ValorCarta, ValorCartaVer)
{
    var contador = 0;
    var guardaIndice = [];
    for(var i = 0; i<ComputerMazo.length;i++)
    {
        if(ValorCarta[i] == ValorCartaVer)
        {
            contador++;
            guardaIndice.push(i);
        }
    }
    return [contador, guardaIndice];
}
function ComputerAgregaCarta(Cantidad,ValorCarta,indiceImportante)
{
    if(Cantidad >= 1 && Cantidad < 3)
    {
        var i;
        var Indice = ComputerAnalisis(ValorCarta,indiceImportante);
        setTimeout(function()
        {
            console.log(ValorCarta);
            alert("La computadora esta pensando .... :D");
        },1000);
        setTimeout(function()
        {
            var numberRandom = Math.floor(0, Math.random() * Indice.length);
            i = parseInt(Indice[numberRandom]);
            moverCartaComputer(2);
        },10000);
        setTimeout(function()
        {
            Carta.push(ComputerMazo[i]);
            carta.src = Carta[Carta.length - 1][1];
            var LiEliminada = document.getElementById(ComputerMazo[i][0] + 'li');
            LiEliminada.remove();
            ComputerMazo.splice(i, 1);
            Verificar(2, ComputerMazo);
            ValorCarta = Valor_Carta(ComputerMazo);
            console.log(ValorCarta);
        }, 12000);
    }
    else
    {
        var i;
        var Indice = IndiceCartaNoCM(ValorCarta);
        setTimeout(function()
        {
            console.log(ValorCarta);
            alert("La computadora esta pensando .... :D");
        },1000);
        setTimeout(function()
        {
            var numberRandom = Math.floor(0, Math.random() * Indice.length);
            i = parseInt(Indice[numberRandom]);
            moverCartaComputer(1);
        },10000);
        setTimeout(function()
        {
            Carta.push(ComputerMazo[i]);
            carta.src = Carta[Carta.length - 1][1];
            var LiEliminada = document.getElementById(ComputerMazo[i][0] + 'li');
            LiEliminada.remove();
            ComputerMazo.splice(i, 1);
            Verificar(2, ComputerMazo);
            ValorCarta = Valor_Carta(ComputerMazo);
            console.log(ValorCarta);
        }, 12000);

    }
}
// En esta funcion la computadora analizara el indice o indices por cual intercambiara la carta - Retorna en un array los indices
function ComputerAnalisis(ValorCarta, indiceImportante)
{
    var IndiceCambio = [0,1,2,3,4];
    const ArrayTemp = []
    ValorCarta.forEach(function(element)
    {
        ArrayTemp.push(element);
    });

    for(var i = 0; i<IndiceCambio.length; i++)
    {
        for(var a = 0; a<indiceImportante.length; a++)
        {
            if(indiceImportante[a] == IndiceCambio[i])
            {
                IndiceCambio.splice(i,1);
                ArrayTemp.splice(i,1);
                i--;
            }
        }
    }
    for(var i = 0;i<ArrayTemp.length - 1;i++)
    {
        for(var a = i + 1; a<ArrayTemp.length;a++)
        {
            if(ArrayTemp[i] == ArrayTemp[a])
            {
                ArrayTemp.splice(i,1);
                ArrayTemp.splice(a - 1,1);
                IndiceCambio.splice(i,1);
                IndiceCambio.splice(a - 1,1);
                i--;
            }
        }
    }
    return IndiceCambio;
    
}
function moverCartaComputer(numero)
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
    var length = ComputerMazo.length;
    var ul = document.getElementById('parentComputer');
    var li = document.createElement('li');
    var carta = document.createElement('img');
    ComputerMazo.push(moverCarta);
    carta.src = "cartas/ParteTrasera.PNG";
    carta.id = ComputerMazo[length][0];
    li.id = ComputerMazo[length][0] + 'li';
    carta.className = "cartaComputer";
    carta.style.display = "block";
    li.appendChild(carta);
    ul.appendChild(li);
    apareceCarta(carta);
    cartaArriba();
}
// Devolver el indice de las cartas no comun
function IndiceCartaNoCM(ValorCarta)
{
    var CompMazo = [];
    ValorCarta.forEach(function(element)
    {
        CompMazo.push(element);
    });
    var a = 0;
    var indices = []
    for(var i = 0; i<CompMazo.length - 1;i++)
    {
        for(var j = i + 1; j<CompMazo.length;j++)
        {
            if(CompMazo[i] == CompMazo[j] && a < 2)
            {
                a += 1;
                indices.push(i);
                indices.push(j);
            }
        }
    }
    var NewArray = Array.from(new Set(indices));
    var indiceCambio = [0,1,2,3,4]
    for(var i = 0; i < indiceCambio.length ; i++)
    {
        for(var j = 0; j < NewArray.length; j++)
        {
            if(indiceCambio[i] == NewArray[j])
            {
                indiceCambio.splice(i,1);
                i--;
                break;
            }
        }
    }
    var indiceCambioPreferido = [];
    for(var i = 0; i<indiceCambio.length;i++)
    {
        a = 0;
        for(var j = 0; j<CompMazo.length; j++)
        {
            var numero = parseInt(indiceCambio[i]);
            if(CompMazo[numero] == CompMazo[j])
            {
                if(a > 1)
                {
                    indiceCambioPreferido.push(indiceCambio[i]);
                }
                a++;
            }
        }
    }
    var indiceNoComun = Array.from(new Set(indiceCambioPreferido));
    if(indiceNoComun.length == 0)
    {
        return indiceCambio;
    }
    else
    {
        return indiceNoComun;
    }
}

