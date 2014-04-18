subidas = 0;
pontuacao = 0;

$('#iniciar').click(function(){

	$('#iniciar').hide();

	acaoUsuario();
	setInterval(descer, 10);
	setInterval(subir, 5);
	setInterval(criarObstaculo, 2000);
	setInterval(andarObstaculos, 30);
});

function criarObstaculo(){

	pontuacao++;
	$('#pontuacao').text(pontuacao);

	random = Math.floor((Math.random()*3)+1);

	var cima = 0;
	var baixo = 0;

	if(random == 1){

		cima = 30;
		baixo = 30;
	}

	if(random == 2){

		cima = 10;
		baixo = 50;
	}

	if(random == 3){

		cima = 50;
		baixo = 10;
	}

	$('body').append("<div style='right:0%; height:" + cima + "%' class='obstaculo cima' > </div>");
	$('body').append("<div style='right:0%; height:" + baixo + "%' class='obstaculo baixo' > </div>");

	$('.obstaculo').each(function( i, item ) {

		if(!$(this).isOnScreen()){

			$(this).remove();
		}
	});
}

function andarObstaculos(){

	$('.obstaculo').css('right', '+=5');
}

function descer(){

	$('#passaro').css('top', '+=5');
	verificaSePerdeu();
}

function verificaSePerdeu(){

	verificaSeAindaTaNaTela();
	verificaSePassaroBateuEmObstaculo();
}

function verificaSePassaroBateuEmObstaculo(){

	var passaro = document.getElementById("passaro");

	$('.obstaculo').each(function( i, item ) {

		if(verificaSeEstaEncostando(passaro, item)){

			perder();
		}
	});
}

function acaoUsuario(){

	$('body').on('click', function(){

		aumentarSubidas();		
	});

	$('body').on('keydown', function(){

		aumentarSubidas();
	});
}

function aumentarSubidas(){

	subidas+=70;
}

function subir(){

	if(subidas > 0){

		$('#passaro').css('top', '-=5');
		subidas--;
		verificaSePerdeu();
	}
}

function verificaSeAindaTaNaTela(){

	if(!$('#passaro').isOnScreen()){

		perder();
	}
}

function perder(){

	$('body').empty();
	$('body').text(pontuacao + " pontos");
	$('body').append("<br> <button onClick='location.reload();' id='reiniciar' style='text-align: center'> Reiniciar </button>");
}

$.fn.isOnScreen = function(){
    
    var win = $(window);
    
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

function verificaSeEstaEncostando(el1, el2){

	el1.offsetBottom = el1.offsetTop + el1.offsetHeight;
    el1.offsetRight = el1.offsetLeft + el1.offsetWidth;
    el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
    el2.offsetRight = el2.offsetLeft + el2.offsetWidth;
    
    return !((el1.offsetBottom < el2.offsetTop) ||
             (el1.offsetTop > el2.offsetBottom) ||
             (el1.offsetRight < el2.offsetLeft) ||
             (el1.offsetLeft > el2.offsetRight))
}