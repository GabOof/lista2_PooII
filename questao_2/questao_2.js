/* O padrão Composite permite tratar objetos individuais e composições de objetos de maneira uniforme, 
o que é alcançado aqui ao usar a classe Componente como uma classe base para ModificacaoGrafica e Palavra. 
As classes Palavra e ModificacaoGrafica são componentes que podem ser compostos dentro de um Texto, 
permitindo a criação de estruturas hierárquicas de texto com modificações gráficas.*/

// Classe base que representa um componente (Palavra ou ModificacaoGrafica)
class Componente {
  // Método render é responsável por renderizar o componente para a apresentação gráfica
  render() {
    throw new Error("Método render não implementado");
  }

  // Método getText é responsável por obter o texto do componente para a representação textual
  getText() {
    throw new Error("Método getText não implementado");
  }
}

// Classe que representa uma modificação gráfica em uma palavra
class ModificacaoGrafica extends Componente {
  // Construtor da ModificacaoGrafica recebe tipo (negrito, itálico, sublinhado, etc.) e conteúdo da modificação
  constructor(tipo, conteudo) {
    super(); // Chama o construtor da classe pai (Componente)
    this.tipo = tipo;
    this.conteudo = conteudo;
  }

  // Método render da ModificacaoGrafica retorna a representação gráfica da modificação
  render() {
    return `<${this.tipo}>${this.conteudo}</${this.tipo}>`;
  }

  // Método getText da ModificacaoGrafica retorna o conteúdo da modificação para a representação textual
  getText() {
    return this.conteudo;
  }
}

// Classe que representa uma palavra
class Palavra extends Componente {
  // Construtor da Palavra recebe o conteúdo da palavra
  constructor(conteudo) {
    super(); // Chama o construtor da classe pai (Componente)
    this.conteudo = conteudo;
    this.modificacoes = [];
  }

  // Método adicionarModificacao permite adicionar uma modificação gráfica à palavra
  adicionarModificacao(modificacao) {
    this.modificacoes.push(modificacao);
  }

  // Método render da Palavra retorna a representação gráfica da palavra com suas modificações
  render() {
    let resultado = this.conteudo;
    this.modificacoes.forEach((modificacao) => {
      resultado = modificacao.render(resultado);
    });
    return resultado;
  }

  // Método getText da Palavra retorna o conteúdo da palavra para a representação textual
  getText() {
    return this.conteudo;
  }
}

// Classe que representa o texto completo
class Texto extends Componente {
  // Construtor da Texto inicializa um array para armazenar os componentes do texto
  constructor() {
    super(); // Chama o construtor da classe pai (Componente)
    this.componentes = [];
  }

  // Método adicionarComponente permite adicionar uma palavra ou modificação gráfica ao texto
  adicionarComponente(componente) {
    this.componentes.push(componente);
  }

  // Método render da Texto retorna a representação gráfica completa do texto
  render() {
    return this.componentes.map((componente) => componente.render()).join(" ");
  }

  // Método getText da Texto retorna a representação textual completa do texto
  getText() {
    return this.componentes.map((componente) => componente.getText()).join(" ");
  }
}

// Função criarTexto cria uma instância de Texto com palavras e modificações e realiza logs
function criarTexto() {
  const texto = new Texto();

  const palavra1 = new Palavra("normal");
  const palavra2 = new Palavra("negrito");
  const palavra3 = new Palavra("italico");
  const palavra4 = new Palavra("sublinhado");

  palavra2.adicionarModificacao(new ModificacaoGrafica("b", "negrito"));
  palavra3.adicionarModificacao(new ModificacaoGrafica("i", "italico"));
  palavra4.adicionarModificacao(new ModificacaoGrafica("u", "sublinhado"));

  texto.adicionarComponente(palavra1);
  texto.adicionarComponente(palavra2);
  texto.adicionarComponente(palavra3);
  texto.adicionarComponente(palavra4);

  console.log("Texto Renderizado:", texto.render());
  console.log("Texto Original:", texto.getText());

  return texto;
}
