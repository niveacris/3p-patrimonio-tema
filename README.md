# Tema WordPress 3P Patrimônio

Tema oficial e exclusivo para WordPress e Elementor da **3P Patrimônio - Consultoria Estratégica em Consórcios**.

## Estrutura Compatível com WordPress e Hostinger

Este repositório contém **exclusivamente os arquivos do tema WordPress**, prontos para deploy direto na Hostinger via Git ou upload via `.zip`:

- `style.css`: Cabeçalho oficial do tema WordPress (Versão 1.2.1)
- `index.php`: Entrada com seletor de templates e fallback
- `front-page.php`: Página inicial executiva de conversão
- `header.php` e `footer.php`: Cabeçalho e rodapé corporativos com menus e tags SEO
- `functions.php`: Criação da tabela MySQL `wp_p3_leads`, rotas REST (`POST`, `DELETE`), fallback AJAX e exportação Excel/XLS
- `page-landing.php`: Modelo de Landing Page completa
- `page-templates/`: Modelos compatíveis com Elementor Canvas e Elementor Largura Total
- `screenshot.png`: Capa oficial do tema no painel `wp-admin`
- `assets/`: Folhas de estilo, logos institucionais, scripts e fontes autônomas

## Configuração do Git na Hostinger

No painel da Hostinger (hPanel):
1. Acesse **Avançado > Git**
2. **Repository:** `https://github.com/niveacris/3p-patrimonio-tema.git`
3. **Branch:** `main`
4. **Install Directory:** `public_html/wp-content/themes/3p-patrimonio`
*(Importante: nunca aponte para a raiz `public_html`, garantindo que o núcleo do WordPress nunca seja sobrescrito).*
