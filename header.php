<?php
/**
 * Header template for 3P Patrimônio theme
 *
 * @package 3p-patrimonio
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <meta name="theme-color" content="#020617">
    
    <!-- Pré-conexão e DNS-Prefetch de Fontes e Assets para Máximo Desempenho -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">
    
    <!-- Schema.org JSON-LD de FinancialService se não houver plugin SEO -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "3P Patrimônio",
      "alternateName": "3P Patrimônio - Consultoria em Consórcios",
      "url": "<?php echo esc_url(home_url('/')); ?>",
      "description": "Consultoria independente especializada em consórcios imobiliários, pesados e veículos com estratégias personalizadas de contemplação e alavancagem.",
      "telephone": "+55-11-99687-6748",
      "email": "socios@3ppatrimonio.com.br",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Santo André",
        "addressRegion": "SP",
        "addressCountry": "BR"
      }
    }
    </script>

    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-amber-500 selection:text-slate-950'); ?>>
<?php
wp_body_open();

// Suporte para Elementor Theme Builder (Cabeçalho Customizado)
if (function_exists('elementor_theme_do_location') && elementor_theme_do_location('header')) {
    // Renderizado pelo Elementor
}
?>
