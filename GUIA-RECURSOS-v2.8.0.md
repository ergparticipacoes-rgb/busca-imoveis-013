# 🎬 Guia Rápido — Como Adicionar Recursos Visuais (v2.8.0)

## 🎯 Visão Geral

Este guia ajuda você a adicionar **vídeo e imagens** ao projeto para completar a implementação da v2.8.0.

---

## 📦 Recursos Necessários

### ✅ OBRIGATÓRIOS (para funcionamento completo)
1. **Vídeo do Hero:** `public/video/baixada.mp4`
2. **Imagem Fallback:** `public/img/hero-bg.jpg`
3. **Imagens dos Cards:** `public/img/imovel1.jpg` a `imovel4.jpg`

### 🔜 OPCIONAIS (uso futuro)
- `public/img/drone-shot.jpg` (banners e miniaturas)

---

## 🎥 PASSO 1: Adicionar Vídeo do Hero

### Opção A: Banco de Vídeos Gratuitos (Recomendado)

**Sites sugeridos:**
- [Pexels Videos](https://www.pexels.com/search/videos/brazil%20beach%20drone/)
- [Pixabay Videos](https://pixabay.com/videos/search/beach%20drone%20sunset/)
- [Coverr](https://coverr.co/s?q=beach%20drone)

**Termos de busca:**
```
- "Brazil beach drone sunset"
- "Coastal city aerial golden hour"
- "Ocean beach drone 4k"
- "Santos beach aerial" (se disponível)
```

**O que procurar:**
- ✅ Duração: 6–10 segundos (será em loop)
- ✅ Momento: Pôr do sol / Golden hour
- ✅ Estilo: Drone cinematográfico
- ✅ Cores: Azul oceano + reflexos dourados
- ✅ Movimento: Suave (não agitado)

### Opção B: Contratar Filmagem Local

**Briefing para o cinegrafista:**
```
Preciso de um vídeo drone de 8 segundos mostrando:
- Orla de Santos, Guarujá ou Itanhaém
- Filmado ao pôr do sol (golden hour)
- Movimento suave passando pela praia
- Reflexos dourados na água
- Céu azul petróleo
- Loop natural (início e fim similares)
```

**Entrega:**
- Formato: MP4 (H.264)
- Resolução: 1920×1080 (Full HD)
- Duração: 6-8 segundos
- Tamanho: < 15 MB

### Como Processar o Vídeo

Se o arquivo estiver muito grande, otimize com **FFmpeg**:

```bash
# Instalar FFmpeg (Mac)
brew install ffmpeg

# Otimizar vídeo
ffmpeg -i original.mp4 \
  -vcodec h264 \
  -acodec none \
  -b:v 2500k \
  -s 1920x1080 \
  -t 8 \
  public/video/baixada.mp4
```

**Parâmetros:**
- `-vcodec h264`: Codec de vídeo
- `-acodec none`: Remove áudio (não necessário)
- `-b:v 2500k`: Bitrate de 2.5 Mbps
- `-s 1920x1080`: Resolução Full HD
- `-t 8`: Limita a 8 segundos

### Salvar o Vídeo

```bash
# Copiar para a pasta correta
cp seu-video.mp4 public/video/baixada.mp4

# Verificar tamanho
ls -lh public/video/baixada.mp4
# Deve ser < 15 MB
```

---

## 🖼️ PASSO 2: Adicionar Imagens

### Lista de Imagens Necessárias

| Arquivo | Descrição | Uso |
|---------|-----------|-----|
| `hero-bg.jpg` | Vista aérea orla Santos pôr do sol | Fallback do vídeo |
| `imovel1.jpg` | Casa moderna Itanhaém | Card destaque |
| `imovel2.jpg` | Apartamento vista mar Santos | Card destaque |
| `imovel3.jpg` | Sobrado com piscina Praia Grande | Card destaque |
| `imovel4.jpg` | Cobertura luxo Guarujá | Card destaque |

### Onde Buscar Imagens

#### Opção A: Bancos Gratuitos

**Unsplash** (qualidade premium):
- https://unsplash.com/s/photos/luxury-beach-house
- https://unsplash.com/s/photos/modern-house-ocean
- https://unsplash.com/s/photos/apartment-sea-view

**Pexels**:
- https://www.pexels.com/search/luxury%20house/
- https://www.pexels.com/search/beach%20house/
- https://www.pexels.com/search/modern%20apartment/

**Termos de busca sugeridos:**
```
Para imovel1.jpg (Casa Itanhaém):
- "modern beach house"
- "contemporary house tropical"

Para imovel2.jpg (Apartamento Santos):
- "apartment balcony ocean view"
- "luxury apartment beach"

Para imovel3.jpg (Sobrado Praia Grande):
- "house pool area"
- "modern house backyard pool"

Para imovel4.jpg (Cobertura Guarujá):
- "penthouse terrace ocean"
- "luxury rooftop panoramic"

Para hero-bg.jpg:
- "santos brazil aerial beach"
- "coastal city drone sunset"
- "brazil beach aerial golden hour"
```

#### Opção B: Bancos Premium

- **Envato Elements:** https://elements.envato.com/photos
- **Shutterstock:** https://www.shutterstock.com
- **Adobe Stock:** https://stock.adobe.com

#### Opção C: Fotografia Real

Contratar fotógrafo imobiliário local para fotos de imóveis reais na Baixada Santista.

### Como Processar Imagens

**Usando Squoosh (Online - Recomendado):**
1. Acesse: https://squoosh.app
2. Faça upload da imagem
3. Configure:
   - Formato: JPEG ou WebP
   - Quality: 80-85%
   - Resize: 1920×1080
4. Download e salve em `public/img/`

**Usando ImageMagick (Terminal):**

```bash
# Instalar ImageMagick (Mac)
brew install imagemagick

# Processar uma imagem
convert original.jpg \
  -resize 1920x1080^ \
  -gravity center \
  -extent 1920x1080 \
  -quality 85 \
  public/img/imovel1.jpg

# Processar todas de uma vez
for i in {1..4}; do
  convert imovel$i-original.jpg \
    -resize 1920x1080^ \
    -gravity center \
    -extent 1920x1080 \
    -quality 85 \
    public/img/imovel$i.jpg
done
```

### Salvar as Imagens

```bash
# Estrutura final
public/
├── img/
│   ├── hero-bg.jpg       # OBRIGATÓRIO
│   ├── imovel1.jpg       # OBRIGATÓRIO
│   ├── imovel2.jpg       # OBRIGATÓRIO
│   ├── imovel3.jpg       # OBRIGATÓRIO
│   ├── imovel4.jpg       # OBRIGATÓRIO
│   └── drone-shot.jpg    # Opcional
└── video/
    └── baixada.mp4       # OBRIGATÓRIO
```

---

## 🎨 PASSO 3: Validar Estilo Visual

### Checklist de Qualidade

Todas as imagens devem ter:

✅ **Paleta de Cores:**
- Tons azuis (oceano, céu)
- Reflexos dourados (pôr do sol)
- Contraste equilibrado

✅ **Iluminação:**
- Golden hour (luz suave e quente)
- Sem sombras duras
- Brilho natural

✅ **Composição:**
- Horizonte visível
- Enquadramento limpo
- Imóvel em destaque

✅ **Qualidade Técnica:**
- Resolução: 1920×1080
- Formato: JPG
- Tamanho: 100–300 KB por imagem
- Sem marcas d'água

---

## 🧪 PASSO 4: Testar Implementação

### Reiniciar Servidor

```bash
# Parar servidor atual (Ctrl+C)
# Reiniciar
npm run dev
```

### Validar no Navegador

Abra: http://localhost:3000

**Checklist de testes:**

✅ **Hero:**
- [ ] Vídeo carrega e faz loop
- [ ] Se remover vídeo, imagem hero-bg.jpg aparece
- [ ] Overlay azul petróleo visível
- [ ] Texto "IA" em dourado
- [ ] Botões funcionam

✅ **Cards de Imóveis:**
- [ ] 4 cards visíveis
- [ ] Imagens carregam corretamente
- [ ] Hover com zoom funciona
- [ ] Labels PRO/MAX visíveis
- [ ] Botões "Ver detalhes" funcionam

✅ **Performance:**
- [ ] Página carrega rápido (< 3s)
- [ ] Sem lag ou travamentos
- [ ] Responsivo em mobile

### Testar Fallbacks

**Teste 1: Vídeo ausente**
```bash
# Renomear vídeo temporariamente
mv public/video/baixada.mp4 public/video/baixada.mp4.bak

# Recarregar página → deve mostrar hero-bg.jpg

# Restaurar
mv public/video/baixada.mp4.bak public/video/baixada.mp4
```

**Teste 2: Imagem ausente**
```bash
# Renomear uma imagem
mv public/img/imovel1.jpg public/img/imovel1.jpg.bak

# Recarregar página → deve mostrar placeholder com gradiente

# Restaurar
mv public/img/imovel1.jpg.bak public/img/imovel1.jpg
```

---

## 🚀 PASSO 5: Otimização Final

### Vídeo

Se o vídeo estiver causando lentidão:

```bash
# Reduzir ainda mais o bitrate
ffmpeg -i public/video/baixada.mp4 \
  -b:v 1500k \
  public/video/baixada-optimized.mp4

# Substituir
mv public/video/baixada-optimized.mp4 public/video/baixada.mp4
```

### Imagens

Se as imagens estiverem pesadas:

```bash
# Converter para WebP (menor e mais rápido)
for img in public/img/*.jpg; do
  cwebp -q 80 "$img" -o "${img%.jpg}.webp"
done

# Atualizar código para usar .webp
```

---

## 📊 Tamanhos Recomendados

| Recurso | Tamanho Ideal | Máximo |
|---------|---------------|--------|
| `baixada.mp4` | 8–12 MB | 15 MB |
| `hero-bg.jpg` | 150–250 KB | 500 KB |
| `imovel1-4.jpg` | 100–200 KB cada | 300 KB |

**Total esperado:** ~10–15 MB com vídeo, ~1 MB sem vídeo

---

## ❓ Troubleshooting

### Vídeo não aparece
1. Verificar se arquivo existe: `ls -lh public/video/baixada.mp4`
2. Verificar formato: MP4 (H.264)
3. Verificar console do navegador (F12) por erros
4. Testar em outro navegador

### Imagem não carrega
1. Verificar nome do arquivo (case-sensitive)
2. Verificar caminho: `/img/imovel1.jpg`
3. Limpar cache do navegador (Cmd+Shift+R)
4. Verificar permissões: `chmod 644 public/img/*.jpg`

### Página lenta
1. Reduzir bitrate do vídeo
2. Comprimir imagens mais
3. Considerar lazy loading
4. Usar CDN para recursos

---

## 📝 Resumo dos Comandos

```bash
# 1. Processar vídeo
ffmpeg -i original.mp4 -vcodec h264 -acodec none -b:v 2500k -s 1920x1080 -t 8 public/video/baixada.mp4

# 2. Processar imagens
convert original.jpg -resize 1920x1080^ -gravity center -extent 1920x1080 -quality 85 public/img/imovel1.jpg

# 3. Verificar tamanhos
ls -lh public/video/ public/img/

# 4. Reiniciar servidor
npm run dev

# 5. Testar
open http://localhost:3000
```

---

## 🎯 Checklist Final

Antes de considerar completo:

- [ ] Vídeo `baixada.mp4` adicionado e testado
- [ ] Imagem `hero-bg.jpg` adicionada (fallback funciona)
- [ ] 4 imagens de imóveis adicionadas
- [ ] Todos recursos otimizados (< 15 MB total)
- [ ] Página carrega rápido e sem erros
- [ ] Fallbacks testados e funcionando
- [ ] Responsivo em mobile validado
- [ ] Cores e contraste corretos (Azul Petróleo + Dourado)

---

## 📚 Documentação Adicional

- **Especificações técnicas:** `/public/video/README.md`
- **Guia de imagens:** `/public/img/README.md`
- **Changelog completo:** `/CHANGELOG-v2.8.0.md`

---

## 🆘 Suporte

Se precisar de ajuda:
1. Consulte os READMEs em cada pasta
2. Verifique o CHANGELOG-v2.8.0.md
3. Entre em contato com o desenvolvedor

---

**Boa sorte! 🚀**

*Lembre-se: o sistema funciona mesmo sem os recursos finais (usa fallbacks), então você pode continuar desenvolvendo enquanto busca vídeos/imagens perfeitos.*

