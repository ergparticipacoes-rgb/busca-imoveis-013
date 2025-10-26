# 🎥 Vídeo Hero Cinematográfico

## Arquivo Necessário

**Nome:** `baixada.mp4`

## Especificações Técnicas

- **Duração:** 6–8 segundos
- **Resolução:** 1920×1080 px (Full HD)
- **Tamanho máximo:** 15 MB
- **Formato:** MP4 (H.264)
- **Áudio:** Sem áudio (muted)
- **Taxa de bits:** ~2.5 Mbps (para otimizar tamanho)

## Estilo Visual

🌅 **Drone cinematográfico** passando pelas praias de:
- Santos (orla)
- Itanhaém (praias)
- Guarujá (skyline)

### Características:
- Filmado ao **pôr do sol**
- Reflexos **dourados** no mar
- Tons de **azul petróleo** na água
- Loop natural (ondas, skyline, luzes da cidade)
- Transição suave para loop infinito

## Como Obter o Vídeo

### Opção 1: Banco de Vídeos (Recomendado)
- [Pexels](https://www.pexels.com/search/videos/santos%20beach%20drone/)
- [Pixabay](https://pixabay.com/videos/search/brazil%20beach%20drone/)
- [Envato Elements](https://elements.envato.com/video)

**Termos de busca sugeridos:**
- "Brazil beach drone sunset"
- "Santos beach aerial"
- "Coastal city drone golden hour"

### Opção 2: Filmagem Customizada
Contratar serviço de drone local na Baixada Santista para filmagem exclusiva.

### Opção 3: Placeholder Temporário
Enquanto não tiver o vídeo real, o sistema usa automaticamente a imagem `hero-bg.jpg` como fallback.

## Processamento do Vídeo

Se o arquivo estiver muito grande, use o **FFmpeg** para otimizar:

```bash
ffmpeg -i original.mp4 -vcodec h264 -acodec none -b:v 2500k -s 1920x1080 -t 8 baixada.mp4
```

## Validação

Após adicionar o vídeo:
1. Reinicie o servidor: `npm run dev`
2. Acesse: `http://localhost:3000`
3. Verifique se o vídeo carrega e faz loop suavemente
4. Teste o fallback removendo temporariamente o arquivo

