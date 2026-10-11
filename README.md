# Artpositiva — site de redesign

## Abrir
Extraia o ZIP e abra `index.html` no navegador. Não exige instalação ou build. As imagens estão no pacote; apenas a fonte do Google requer internet, com fontes alternativas disponíveis offline.

Para servir localmente, opcionalmente:
```
python -m http.server 8080
```
Abra http://localhost:8080 na pasta do projeto.

## Arquivos
- index.html: página completa e conteúdo.
- assets/style.css: identidade visual, animações e layouts responsivos.
- assets/app.js: menu, portfólio, modal, comparador, estúdio, foto e orçamento.
- assets/images/: fotos locais e ilustrações SVG.
- FONTES-DAS-IMAGENS.md: origem das fotografias.

## Recursos
Menu mobile, entrada de seções ao rolar, portfólio com filtros e ampliação, comparador ilustrativo, personalização do nome e da cor da fachada, modo dia/noite, formulário com validação e mensagem para WhatsApp, seleção local de foto, movimento reduzido e navegação por teclado.

## Orçamento e fotos
O formulário abre o WhatsApp com a mensagem pronta. O usuário ainda precisa enviá-la. Não há envio automático, backend, armazenamento ou IA. A foto é mostrada localmente e deve ser anexada manualmente na conversa. Limite: 10 MB, JPG/PNG/WebP.

## Personalizar e publicar
1. Confirme o contato `5511963354187` em assets/app.js e os links de WhatsApp em index.html. O número veio do site original.
2. Confirme o nome comercial: o site original mistura Artpositiva e Artmais. Este conceito utiliza Artpositiva.
3. Valide endereço, imagens e autorização de uso. As fotos vieram do site original; veja FONTES-DAS-IMAGENS.md.
4. Ajuste os textos e, se disponíveis, substitua o comparador ilustrativo por fotos reais do mesmo projeto.
5. Envie index.html e a pasta assets para a raiz de uma hospedagem estática. Os arquivos devem manter a estrutura do pacote.

As cores do simulador são representações digitais. Ele não calcula custo, não aplica uma fachada na foto do cliente e não substitui projeto técnico.

## Verificação
JavaScript validado sintaticamente, referências de arquivos locais e IDs checados; interações essenciais verificadas em DOM simulado. Identidade atualizada e inspecionada no navegador em desktop (1440 px) e mobile (390 px), sem transbordamento horizontal. Menu mobile, filtros, personalização de nome e revestimento e alternância dia/noite verificados. O envio real do WhatsApp não foi executado. Consulte IDENTIDADE-VISUAL.md para a paleta e as regras de uso da marca.
