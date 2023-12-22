/*O padrão de projeto utilizado foi o padrão Decorator, que permite que novas funcionalidades (poderes) 
sejam adicionadas dinamicamente aos objetos existentes (ataques) sem modificar suas estruturas, 
promovendo a flexibilidade e extensibilidade do código, atendendo ao requisito de adicionar 
poderes dinamicamente ao ataque do personagem em tempo de execução.*/

// Variável para rastrear se o jogo está iniciado ou não
let jogoIniciado = false;

// Função para iniciar o jogo
function iniciarJogo() {
  // Verifica se o jogo já foi iniciado
  if (!jogoIniciado) {
    // Obtém referências aos botões de iniciar e terminar
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");

    // Desabilita o botão de iniciar e habilita o botão de terminar
    startButton.disabled = true;
    stopButton.disabled = false;

    // Inicia o jogo principal
    main();

    // Atualiza a flag indicando que o jogo está iniciado
    jogoIniciado = true;
  }
}

// Função para terminar o jogo
function terminarJogo() {
  // Obtém referências aos botões de iniciar e terminar
  const startButton = document.getElementById("startButton");
  const stopButton = document.getElementById("stopButton");

  // Habilita o botão de iniciar e desabilita o botão de terminar
  startButton.disabled = false;
  stopButton.disabled = true;

  // Atualiza a flag indicando que o jogo não está mais iniciado
  jogoIniciado = false;

  // Limpa a saída quando o jogo é terminado
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";
}

// Classe base para representar um ataque
class Ataque {
  executar() {}

  getDano() {}
}

// Classe que representa um ataque básico
class AtaqueBasico extends Ataque {
  constructor(dano) {
    super();
    this.dano = dano;
  }

  executar() {
    return "Ataque Básico";
  }

  getDano() {
    return this.dano;
  }
}

// Classe base para representar um decorador de poderes
class PoderDecorator extends Ataque {
  constructor(ataqueDecorado, descricao, danoAdicional) {
    super();
    this.ataqueDecorado = ataqueDecorado;
    this.descricao = descricao;
    this.danoAdicional = danoAdicional;
  }

  executar() {
    return `${this.ataqueDecorado.executar()} + ${this.descricao}`;
  }

  getDano() {
    return this.ataqueDecorado.getDano() + this.danoAdicional;
  }
}

// Classes concretas que representam diferentes poderes
class PoderFogo extends PoderDecorator {
  constructor(ataqueDecorado) {
    super(ataqueDecorado, "Dano de Fogo", 5);
  }
}

class PoderGelo extends PoderDecorator {
  constructor(ataqueDecorado) {
    super(ataqueDecorado, "Dano de Gelo", 3);
  }
}

class PoderTrovoada extends PoderDecorator {
  constructor(ataqueDecorado) {
    super(ataqueDecorado, "Dano de Trovoada", 8);
  }
}

// Função principal do jogo
function main() {
  // Cria um ataque básico
  const ataqueBasico = new AtaqueBasico(10);

  // Cria um personagem com o ataque básico
  const personagem = new Personagem("Herói", ataqueBasico);

  // Cria ataques com diferentes poderes
  const ataqueComPoderFogo = new PoderFogo(ataqueBasico);
  const ataqueComPoderGelo = new PoderGelo(ataqueBasico);
  const ataqueComPoderTrovoada = new PoderTrovoada(ataqueBasico);

  // Exibe os resultados dos ataques
  exibirResultado(personagem.realizarAtaque(), personagem.getDano());
  exibirResultado(ataqueComPoderFogo.executar(), ataqueComPoderFogo.getDano());
  exibirResultado(ataqueComPoderGelo.executar(), ataqueComPoderGelo.getDano());
  exibirResultado(ataqueComPoderTrovoada.executar(), ataqueComPoderTrovoada.getDano());
}

// Função para exibir resultados na tela
function exibirResultado(resultado, dano) {
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML += `<p>${resultado}</p><p>Dano: ${dano}</p>`;
}

// Classe que representa um personagem
class Personagem {
  constructor(nome, ataque) {
    this.nome = nome;
    this.ataque = ataque;
  }

  // Função para realizar um ataque
  realizarAtaque() {
    return `${this.nome} realiza o ataque: ${this.ataque.executar()}`;
  }

  // Função para obter o dano do ataque
  getDano() {
    return this.ataque.getDano();
  }
}
