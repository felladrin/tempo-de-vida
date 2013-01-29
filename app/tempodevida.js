// Escrito por Victor em 27/01/2013.

var ultimoDia = 14;
var ultimoMes = 10;
var ultimoAno = 1988;

if (localStorage.dia)
{
    ultimoDia = localStorage.dia;
}

if (localStorage.mes)
{
    ultimoMes = localStorage.mes;
}

if (localStorage.ano)
{
    ultimoAno = localStorage.ano;
}

document.getElementById('nascimentoDia').value = ultimoDia;
document.getElementById('nascimentoMes').value = ultimoMes;
document.getElementById('nascimentoAno').value = ultimoAno;

var data = new Date();
var diaatual = data.getDate();
var mesatual = data.getMonth() + 1;
var anoatual = data.getFullYear();

function formataNumero(num)
{
    var valor = new String(num);
    valor = valor.split("").reverse();

    var formatado = "";
    for (var i = 0; i <= valor.length - 1; i++)
    {
        formatado = valor[i] + formatado;
        if ((i + 1) % 3 === 0 && (valor.length - 1) !== i)
        {
            formatado = '.' + formatado;
        }
    }
    return formatado;
}

function diasEmMeses(A, M)
{
    with (new Date(A, M, 1, 12))
    {
        setDate(0);
        return getDate();
    }
}

function diferenca(data1, data2)
{
    var a1 = data1.getFullYear(), m1 = data1.getMonth(), d1 = data1.getDate(), a2 = data2.getFullYear(), m2 = data2.getMonth(), d2 = data2.getDate();

    if (d1 < d2)
    {
        m1--;
        d1 += diasEmMeses(a2, m2);
    }

    if (m1 < m2)
    {
        a1--;
        m1 += 12;
    }

    return [a1 - a2, m1 - m2, d1 - d2];
}

function calcula()
{
    var nascimentoDia = document.getElementById('nascimentoDia').value;
    var nascimentoMes = document.getElementById('nascimentoMes').value;
    var nascimentoAno = document.getElementById('nascimentoAno').value;

    if (nascimentoAno >= 0 && nascimentoAno < 100)
    {
        return;
    }

    if (isNaN(parseInt(nascimentoDia)) || !isFinite(nascimentoDia) || parseInt(nascimentoDia) < 0)
    {
        document.getElementById('nascimentoDia').value = ultimoDia;
        nascimentoDia = ultimoDia;
    }

    if (isNaN(parseInt(nascimentoAno)) || !isFinite(nascimentoAno) || parseInt(nascimentoAno) < 0)
    {
        document.getElementById('nascimentoAno').value = ultimoAno;
        nascimentoAno = ultimoAno;
    }

    localStorage.dia = nascimentoDia;
    localStorage.mes = nascimentoMes;
    localStorage.ano = nascimentoAno;

    var dataAtual = new Date(anoatual, mesatual - 1, diaatual);
    var dataCalculo = new Date(nascimentoAno, nascimentoMes - 1, nascimentoDia);
    var dif = Date.UTC(anoatual, mesatual, diaatual, 0, 0, 0) - Date.UTC(nascimentoAno, nascimentoMes, nascimentoDia, 0, 0, 0);
    var idade = diferenca(dataAtual, dataCalculo);
    var tempoMeses = (idade[0] * 12) + idade[1];
    var tempoMinutos = dif / 1000 / 60;
    var tempoHoras = tempoMinutos / 60;
    var tempoDias = tempoHoras / 24;
    var aniv = parseInt(nascimentoAno) + idade[0] + 1;
    var dif = Date.UTC(aniv, nascimentoMes, nascimentoDia, 0, 0, 0) - Date.UTC(anoatual, mesatual, diaatual, 0, 0, 0);
    var proxAniversario = dif / 1000 / 60 / 60 / 24;

    document.getElementById('idadeAnos').innerHTML = idade[0];
    document.getElementById('idadeMeses').innerHTML = idade[1];
    document.getElementById('idadeDias').innerHTML = idade[2];
    document.getElementById('tempoMeses').innerHTML = formataNumero(tempoMeses);
    document.getElementById('tempoDias').innerHTML = formataNumero(tempoDias);
    document.getElementById('tempoHoras').innerHTML = formataNumero(tempoHoras);
    document.getElementById('tempoMinutos').innerHTML = formataNumero(tempoMinutos);

    if (Number(idade[1]) !== 0 || Number(idade[2]) !== 0)
    {
        document.getElementById('proxAniversario').innerHTML = "Daqui a " + proxAniversario + " dias";
    }
    else
    {
        document.getElementById('proxAniversario').innerHTML = "É hoje!";
    }
}