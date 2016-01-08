<?php
$jsnutils	= JSNTplUtils::getInstance();
$doc		= $this->_document;

// Count module instances
$doc->hasRight		= $jsnutils->countModules('right');
$doc->hasLeft		= $jsnutils->countModules('left');
$doc->hasPromo		= $jsnutils->countModules('promo');
$doc->hasPromoLeft	= $jsnutils->countModules('promo-left');
$doc->hasPromoRight	= $jsnutils->countModules('promo-right');
$doc->hasInnerLeft	= $jsnutils->countModules('innerleft');
$doc->hasInnerRight	= $jsnutils->countModules('innerright');

// Define template colors
$doc->templateColors = array('blue', 'green', 'orange', 'red', 'violet', 'cyan');

if (isset($doc->sitetoolsColorsItems))
{
	$this->_document->templateColors = $doc->sitetoolsColorsItems;
}

// Apply K2 style
if ($jsnutils->checkK2())
{
	$doc->addStylesheet($doc->templateUrl . "/ext/k2/jsn_ext_k2.css");
}

// Apply VM style
if ($jsnutils->checkVM())
{
	$doc->addStylesheet($doc->templateUrl . "/ext/vm/jsn_ext_vm.css");
}
// Start generating custom styles
$customCss	= '
.jsn-desktop-on-mobile #jsn-header-inner{
	width: 100%;
}
.fullwidth {
	width: 100% !important;
}
';

// Process TPLFW v2 parameter
if (isset($doc->customWidth))
{
	if ($doc->customWidth != 'responsive')
	{
		$customCss .= '
	#jsn-topbar-inner,
	#jsn-topheader-inner,
	#header-inner,
	#jsn-pos-promo-full,
	#jsn-promo-inner,
	#jsn-pos-content-top,
	#jsn-pos-content-top-below,
	#jsn-content,
	#jsn-content-bottom-inner,
	#jsn-usermodules3-inner,
	#jsn-content-bottom-mid-inner,
	#jsn-content-bottom-below-inner,
	#jsn-footer-inner,
	#jsn-menu.jsn-menu-sticky,
	.demo-homepage-slider .galleria-info-text {
		width: ' . $doc->customWidth . ';
		min-width: ' . $doc->customWidth . ';
	}';
	}
}

// Setup main menu width parameter
if ($doc->mainMenuWidth)
{
	$menuMargin = $doc->mainMenuWidth;

	$customCss .= '
		div.jsn-modulecontainer ul.menu-mainmenu ul {
			width: ' . $doc->mainMenuWidth . 'px;
		}
		div.jsn-modulecontainer ul.menu-mainmenu ul ul {
		';
		if($doc->direction == 'ltr'){
			$customCss .= '
				margin-left: ' . $menuMargin . 'px;
			';
		}
		if($doc->direction == 'rtl'){
			$customCss .= '
				margin-right: ' . ( $menuMargin ) . 'px;
				margin-left: 0;
			';
		}
		$customCss .= '
		}
		div.jsn-modulecontainer ul.menu-mainmenu li.jsn-submenu-flipback ul ul {
		';
		if($doc->direction == 'rtl'){
			$customCss .= '
				left: ' . ( $menuMargin ) . 'px;
			';
		}
		if($doc->direction == 'ltr'){
			$customCss .= '
				right: ' . $menuMargin . 'px;
			';
		}
		$customCss .= '
		}
		#jsn-pos-toolbar div.jsn-modulecontainer ul.menu-mainmenu ul ul {
		';
		if($doc->direction == 'ltr'){
			$customCss .= '
				margin-right: '.$menuMargin.'px;
				margin-left : auto';
		}
		if($doc->direction == 'rtl'){
			$customCss .= '
				margin-left : '.$menuMargin.'px;
				margin-right: auto';
		}
		$customCss .= '
		}
	';
}

// Setup slide menu width parameter
if ($doc->sideMenuWidth)
{
	$sideMenuMargin = $doc->sideMenuWidth + 2;

	$customCss .= '
	div.jsn-modulecontainer ul.menu-sidemenu ul {
		width: ' . $doc->sideMenuWidth . 'px;
	}
	div.jsn-modulecontainer ul.menu-sidemenu li ul {
		right: -' . ($doc->sideMenuWidth + 2) . 'px;
		right: -' . ($doc->sideMenuWidth ) . 'px\9;
	}
	div.jsn-modulecontainer ul.menu-sidemenu li ul ul {
		right: -' . ($doc->sideMenuWidth + 17) . 'px;
		right: -' . ($doc->sideMenuWidth + 15 ) . 'px\9;
	}
	body.jsn-direction-rtl div.jsn-modulecontainer ul.menu-sidemenu li ul {
		left: -' . ($doc->sideMenuWidth + 2) . 'px;
		left: -' . ($doc->sideMenuWidth) . 'px\9;
		right: auto;
	}
	body.jsn-direction-rtl div.jsn-modulecontainer ul.menu-sidemenu li ul ul {
		left: -' . ($doc->sideMenuWidth + 17) . 'px;
		left: -' . ($doc->sideMenuWidth + 15) . 'px\9;
		right: auto;
	}
	}';
}

// Include CSS3 support for IE browser
if ($doc->isIE)
{
	$customCss .= '
	.text-box,
	.text-box-highlight,
	.text-box-highlight:hover,
	div[class*="box-"] div.jsn-modulecontainer_inner,
	div[class*="solid-"] div.jsn-modulecontainer_inner {
		behavior: url(' . $doc->rootUrl . '/templates/' . strtolower($doc->template) . '/css/PIE.htc);
	}
	.link-button {
		zoom: 1;
		position: relative;
		behavior: url(' . $doc->rootUrl . '/templates/' . strtolower($doc->template) . '/css/PIE.htc);
	}';
}

$doc->addStyleDeclaration(trim($customCss, "\n"));
