<?php

/* jsExample/clickme.html.twig */
class __TwigTemplate_88a87706d6e8c51c390f5b4805449496480bd3b4dd756ab7b201ce9a03f6c4ac extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<!-- template/jsExample/clickme.twightml -->

<span class=\"click\">Click me!!!</span>

Hello ";
        // line 5
        echo twig_escape_filter($this->env, ($context["name"] ?? null), "html", null, true);
        echo "!
";
    }

    public function getTemplateName()
    {
        return "jsExample/clickme.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  25 => 5,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "jsExample/clickme.html.twig", "/var/www/html/web/themes/contrib/atomic_theme/atomic-docs/templates/jsExample/clickme.html.twig");
    }
}
