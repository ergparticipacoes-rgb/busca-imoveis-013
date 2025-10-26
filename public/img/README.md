# 🖼️ Banco de Imagens Premium

## Imagens Necessárias

Todas as imagens devem seguir o **estilo visual institucional** da marca:

### Paleta de Cores
- **Azul Petróleo:** `#1E2F39` (principal)
- **Dourado:** `#F5A623` e `#FFC470` (destaques)
- **Contraste:** Alto, com granulação leve para efeito cinematográfico
- **Iluminação:** Tons quentes no topo, frios na base

---

## Lista de Arquivos

### 1. **hero-bg.jpg** (CRÍTICO)
- **Uso:** Fallback do vídeo hero (mobile ou baixa conexão)
- **Descrição:** Vista aérea da orla de Santos com reflexo dourado no mar
- **Resolução:** 1920×1080 px
- **Momento:** Pôr do sol / Golden hour
- **Enquadramento:** Horizonte ao centro, mar em primeiro plano

---

### 2. **imovel1.jpg**
- **Uso:** Card de destaque - Casa Moderna Itanhaém
- **Descrição:** Casa moderna térrea em Itanhaém, fachada iluminada, estilo resort
- **Resolução:** 1920×1080 px
- **Características:** 
  - Arquitetura contemporânea
  - Iluminação externa quente
  - Jardim ou área externa visível
  - Céu azul ou entardecer

---

### 3. **imovel2.jpg**
- **Uso:** Card de destaque - Apartamento Alto Padrão Santos
- **Descrição:** Apartamento vista mar em Santos, sacada ampla, entardecer
- **Resolução:** 1920×1080 px
- **Características:**
  - Vista panorâmica do mar
  - Sacada/varanda em destaque
  - Iluminação interna aconchegante
  - Horizonte dourado

---

### 4. **imovel3.jpg**
- **Uso:** Card de destaque - Sobrado Praia Grande
- **Descrição:** Sobrado com piscina em Praia Grande, área gourmet
- **Resolução:** 1920×1080 px
- **Características:**
  - Piscina em destaque
  - Área gourmet/externa
  - Iluminação de ambientação
  - Vegetação tropical

---

### 5. **imovel4.jpg**
- **Uso:** Card de destaque - Cobertura Luxo Guarujá
- **Descrição:** Cobertura luxo no Guarujá, terraço panorâmico
- **Resolução:** 1920×1080 px
- **Características:**
  - Vista 360° ou panorâmica
  - Terraço amplo
  - Alto padrão evidente
  - Iluminação sofisticada

---

### 6. **drone-shot.jpg**
- **Uso:** Miniaturas ou banners futuros
- **Descrição:** Drone sobrevoando a Baixada Santista, luz dourada suave
- **Resolução:** 1920×1080 px
- **Características:**
  - Vista aérea ampla
  - Múltiplas cidades visíveis
  - Golden hour
  - Sensação de movimento

---

## Como Obter as Imagens

### Opção 1: Bancos de Imagens Gratuitos
- [Unsplash](https://unsplash.com/s/photos/luxury-house-brazil)
- [Pexels](https://www.pexels.com/search/beach%20house/)
- [Pixabay](https://pixabay.com/images/search/modern%20house/)

**Termos de busca sugeridos:**
- "Modern beach house Brazil"
- "Luxury apartment sea view"
- "Contemporary house drone"
- "Santos beach aerial"

### Opção 2: Bancos Premium
- [Envato Elements](https://elements.envato.com/photos)
- [Shutterstock](https://www.shutterstock.com)
- [Adobe Stock](https://stock.adobe.com)

### Opção 3: Fotografia Profissional
Contratar fotógrafo imobiliário local para fotos exclusivas de imóveis reais na Baixada Santista.

---

## Processamento das Imagens

Para garantir carregamento rápido, otimize as imagens:

### Usando ImageMagick:
```bash
convert original.jpg -resize 1920x1080^ -gravity center -extent 1920x1080 -quality 85 imovel1.jpg
```

### Usando Online (Squoosh):
1. Acesse: https://squoosh.app
2. Faça upload da imagem
3. Configure: WebP, Quality 80-85%
4. Download e renomeie

---

## Validação

Após adicionar as imagens:
1. Verifique se os arquivos estão em `/public/img/`
2. Reinicie o servidor: `npm run dev`
3. Acesse: `http://localhost:3000`
4. Verifique se as imagens carregam nos cards
5. Teste responsividade em diferentes tamanhos de tela

---

## Placeholders Temporários

Enquanto as imagens reais não estão disponíveis, o sistema exibe:
- **Gradiente cinza** com o tipo do imóvel
- **Label PRO/MAX** visível
- **Estrutura completa** dos cards mantida

Isso permite continuar o desenvolvimento sem interrupções.

